import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { useCurrency } from '../context/CurrencyContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowRight,
  Calendar 
} from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { enUS, vi, es, fr, de, zhCN, ja, ko, pt, ru } from 'date-fns/locale';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { formatCurrency, formatAmount, convertAmount, currency } = useCurrency();
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'last30', 'all'

  const currentDate = new Date();
  const monthStart = format(startOfMonth(currentDate), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(currentDate), 'yyyy-MM-dd');

  useEffect(() => {
    fetchDashboardData();
  }, [viewMode, currency]); // Add currency dependency

  const getDateLocale = () => {
    const locales = {
      en: enUS,
      vi: vi,
      es: es,
      fr: fr,
      de: de,
      zh: zhCN,
      ja: ja,
      ko: ko,
      pt: pt,
      ru: ru
    };
    return locales[i18n.language] || enUS;
  };

  const getDateRange = () => {
    const today = new Date();
    const locale = getDateLocale();
    
    switch (viewMode) {
      case 'month':
        return {
          start: format(startOfMonth(today), 'yyyy-MM-dd'),
          end: format(endOfMonth(today), 'yyyy-MM-dd'),
          label: format(today, 'MMMM yyyy', { locale })
        };
      case 'last30':
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return {
          start: format(thirtyDaysAgo, 'yyyy-MM-dd'),
          end: format(today, 'yyyy-MM-dd'),
          label: t('dashboard.last30Days')
        };
      case 'all':
        return {
          start: '2020-01-01',
          end: format(today, 'yyyy-MM-dd'),
          label: t('dashboard.allTime')
        };
      default:
        return {
          start: format(startOfMonth(today), 'yyyy-MM-dd'),
          end: format(endOfMonth(today), 'yyyy-MM-dd'),
          label: format(today, 'MMMM yyyy', { locale })
        };
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try new dashboard stats API first
      try {
        const response = await api.get(`/dashboard/stats?currency=${currency}`);
        setStats(response.data);
        
        // Recent transactions are included in the dashboard stats
        if (response.data.recentActivity) {
          setRecentTransactions(response.data.recentActivity.transactions || []);
        }
      } catch (dashboardError) {
        console.warn('Dashboard stats API failed, falling back to manual calculation:', dashboardError);
        
        try {
          // Fallback: Get transactions and calculate manually
          const dateRange = getDateRange();
          const transactionsRes = await api.get('/transactions', { 
            params: { 
              start_date: dateRange.start,
              end_date: dateRange.end,
              limit: 1000 // Get all transactions for accurate calculation
            } 
          });
          
          const transactions = transactionsRes.data.transactions || [];
          
          // If no transactions in user's currency, show all transactions anyway
          const hasUserCurrencyTransactions = transactions.some(t => t.currency === currency);
          
          // Manual calculation with currency filtering
          let totalIncome = 0;
          let totalExpense = 0;
          const categorySpending = {};
          
          transactions.forEach(t => {
            // Count transaction if: (1) matches user currency OR (2) no transactions match user currency
            const shouldCount = !hasUserCurrencyTransactions || t.currency === currency;
            
            if (shouldCount) {
              if (t.type === 'income') {
                totalIncome += parseFloat(t.amount || 0);
              } else if (t.type === 'expense') {
                totalExpense += parseFloat(t.amount || 0);
                
                // Aggregate by category
                if (t.category_name) {
                  if (!categorySpending[t.category_name]) {
                    categorySpending[t.category_name] = {
                      name: t.category_name,
                      color: t.category_color || '#6B7280',
                      icon: t.category_icon || '📦',
                      total: 0,
                      transaction_count: 0
                    };
                  }
                  categorySpending[t.category_name].total += parseFloat(t.amount || 0);
                  categorySpending[t.category_name].transaction_count += 1;
                }
              }
            }
          });
          
          // Convert category spending to array and sort
          const topCategories = Object.values(categorySpending)
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);
          
          setStats({
            month: {
              income: totalIncome,
              expense: totalExpense,
              savings: totalIncome - totalExpense,
              savingsRate: totalIncome > 0 
                ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
                : 0
            },
            topCategories: topCategories,
            recentActivity: {
              transactions: transactions.slice(0, 5) // Recent 5
            }
          });
          setRecentTransactions(transactions.slice(0, 5));
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          // Set empty data to prevent blank screen
          setStats({
            month: { income: 0, expense: 0, savings: 0, savingsRate: 0 },
            topCategories: [],
            recentActivity: { transactions: [] }
          });
          setRecentTransactions([]);
        }
      }
    } catch (error) {
      toast.error(t('dashboard.failedToLoad') || 'Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Extract data from new API structure
  const month = stats?.month || {};
  const balance = (month.income || 0) - (month.expense || 0);
  const income = month.income || 0;
  const expense = month.expense || 0;

  // Map top categories from new API
  const expenseByCategoryConverted = stats?.topCategories || [];

  const dateRange = getDateRange();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            {t('dashboard.overviewFor')} {dateRange.label}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('dashboard.thisMonth')}
          </button>
          <button
            onClick={() => setViewMode('last30')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'last30' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('dashboard.last30Days')}
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('dashboard.allTime')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="card border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.balance')}</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {balance >= 0 ? formatCurrency(balance) : '-' + formatCurrency(Math.abs(balance))}
              </p>
            </div>
            <Wallet className="text-blue-500 dark:text-blue-400" size={32} />
          </div>
        </div>

        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.income')}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(income)}
              </p>
            </div>
            <TrendingUp className="text-green-500 dark:text-green-400" size={32} />
          </div>
        </div>

        <div className="card border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.expenses')}</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(expense)}
              </p>
            </div>
            <TrendingDown className="text-red-500 dark:text-red-400" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="card">
          <h2 className="text-lg sm:text-xl font-bold mb-4">{t('dashboard.expenseBreakdown')}</h2>
          {expenseByCategoryConverted.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={expenseByCategoryConverted}
                    dataKey="total"
                    nameKey="category_name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={40}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {expenseByCategoryConverted.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.category_color} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {expenseByCategoryConverted.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.category_color }}
                    ></div>
                    <span className="truncate dark:text-gray-200">{cat.category_name}</span>
                    <span className="font-medium text-gray-600 dark:text-gray-400 ml-auto">{formatCurrency(cat.total)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t('dashboard.noExpenseData')}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dark:text-gray-100">{t('dashboard.recentTransactions')}</h2>
            <Link to="/transactions" className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1">
              {t('dashboard.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: transaction.category_color + '20' }}
                    >
                      <span className="text-xl">
                        {transaction.type === 'income' ? '↑' : '↓'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium dark:text-gray-200">{transaction.category_name || t('transactions.uncategorized')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(transaction.transaction_date), 'MMM dd, yyyy', { locale: getDateLocale() })}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t('dashboard.noTransactions')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {expenseByCategoryConverted.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">{t('dashboard.topSpendingCategories')}</h2>
          <div className="space-y-3">
            {expenseByCategoryConverted.slice(0, 5).map((category) => {
              const percentage = expense > 0 ? (category.total / expense * 100).toFixed(1) : 0;
              return (
                <div key={category.category_id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium dark:text-gray-200">{category.category_name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{formatCurrency(category.total)} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.category_color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

