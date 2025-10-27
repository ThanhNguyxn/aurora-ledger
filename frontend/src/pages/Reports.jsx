import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useCurrency } from '../context/CurrencyContext';
import { Calendar, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

const Reports = () => {
  const { formatCurrency } = useCurrency();
  const [dateRange, setDateRange] = useState({
    start_date: format(startOfMonth(subMonths(new Date(), 2)), 'yyyy-MM-dd'),
    end_date: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [overviewRes, trendsRes] = await Promise.all([
        api.get(`/reports/overview?start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`),
        api.get('/reports/trends?months=6')
      ]);

      setOverview(overviewRes.data);
      setTrends(trendsRes.data);
    } catch (error) {
      toast.error('Failed to load reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(
        `/reports/export?start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Report exported');
    } catch (error) {
      toast.error('Failed to export');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const income = overview?.totals?.income || 0;
  const expense = overview?.totals?.expense || 0;
  const balance = overview?.totals?.balance || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <button onClick={handleExport} className="btn btn-primary flex items-center gap-2">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold">Date Range</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start_date}
              onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end_date}
              onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Income</p>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <TrendingDown className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(expense)}</p>
        </div>

        <div className={`card bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-orange-50 to-orange-100 border-orange-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Net Balance</p>
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {balance >= 0 ? '+' + formatCurrency(balance) : '-' + formatCurrency(Math.abs(balance))}
          </p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Monthly Trends (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} name="Expenses" />
            <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2} name="Balance" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Income by Category</h2>
          {overview?.byCategory?.income?.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={overview.byCategory.income}
                    dataKey="total"
                    nameKey="category_name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => formatCurrency(entry.total)}
                  >
                    {overview.byCategory.income.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.category_color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {overview.byCategory.income.map((cat) => (
                  <div key={cat.category_id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.category_color }}
                      ></div>
                      <span>{cat.category_name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(cat.total)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No income data
            </div>
          )}
        </div>

        {/* Expense Breakdown */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
          {overview?.byCategory?.expense?.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={overview.byCategory.expense}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category_name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" name="Amount">
                    {overview.byCategory.expense.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.category_color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {overview.byCategory.expense.map((cat) => {
                  const percentage = (cat.total / expense * 100).toFixed(1);
                  return (
                    <div key={cat.category_id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: cat.category_color }}
                          ></div>
                          <span>{cat.category_name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(cat.total)} ({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No expense data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

