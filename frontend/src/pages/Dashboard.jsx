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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'last30', 'all'

  const currentDate = new Date();
  const monthStart = format(startOfMonth(currentDate), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(currentDate), 'yyyy-MM-dd');

  useEffect(() => {
    fetchDashboardData();
  }, [viewMode]);

  const getDateRange = () => {
    const today = new Date();
    switch (viewMode) {
      case 'month':
        return {
          start: format(startOfMonth(today), 'yyyy-MM-dd'),
          end: format(endOfMonth(today), 'yyyy-MM-dd'),
          label: format(today, 'MMMM yyyy')
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
          label: format(today, 'MMMM yyyy')
        };
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dateRange = getDateRange();
      const [overviewRes, transactionsRes] = await Promise.all([
        api.get(`/reports/overview?start_date=${dateRange.start}&end_date=${dateRange.end}`),
        api.get('/transactions?limit=5')
      ]);

      setStats(overviewRes.data);
      setRecentTransactions(transactionsRes.data);
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

  const balance = stats?.totals?.balance || 0;
  const income = stats?.totals?.income || 0;
  const expense = stats?.totals?.expense || 0;

  const dateRange = getDateRange();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {t('dashboard.overviewFor')} {dateRange.label}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.thisMonth')}
          </button>
          <button
            onClick={() => setViewMode('last30')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'last30' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard.last30Days')}
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.balance')}</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {balance >= 0 ? formatCurrency(balance) : '-' + formatCurrency(Math.abs(balance))}
              </p>
            </div>
            <Wallet className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.income')}</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(income)}
              </p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="card border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.expenses')}</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(expense)}
              </p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="card">
          <h2 className="text-lg sm:text-xl font-bold mb-4">{t('dashboard.expenseBreakdown')}</h2>
          {stats?.byCategory?.expense?.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={stats.byCategory.expense}
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
                    {stats.byCategory.expense.map((entry, index) => (
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
                {stats.byCategory.expense.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.category_color }}
                    ></div>
                    <span className="truncate">{cat.category_name}</span>
                    <span className="font-medium text-gray-600 ml-auto">{formatCurrency(cat.total)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t('dashboard.noExpenseData')}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('dashboard.recentTransactions')}</h2>
            <Link to="/transactions" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
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
                      <p className="font-medium">{transaction.category_name || 'Uncategorized'}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(transaction.transaction_date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('dashboard.noTransactions')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {stats?.byCategory?.expense?.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">{t('dashboard.topSpendingCategories')}</h2>
          <div className="space-y-3">
            {stats.byCategory.expense.slice(0, 5).map((category) => {
              const percentage = (category.total / expense * 100).toFixed(1);
              return (
                <div key={category.category_id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{category.category_name}</span>
                    <span className="text-gray-600">{formatCurrency(category.total)} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
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

