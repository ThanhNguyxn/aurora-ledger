import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Plus, Trash2, TrendingDown, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import BudgetModal from '../components/BudgetModal';

const Budgets = () => {
  const { formatCurrency } = useCurrency();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth, selectedYear]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/budgets?month=${selectedMonth}&year=${selectedYear}`);
      setBudgets(response.data);
    } catch (error) {
      toast.error('Failed to load budgets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;

    try {
      await api.delete(`/budgets/${id}`);
      toast.success('Budget deleted');
      fetchBudgets();
    } catch (error) {
      toast.error('Failed to delete budget');
      console.error(error);
    }
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchBudgets();
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (percentage) => {
    if (percentage >= 100) {
      return <AlertTriangle className="text-red-500" size={20} />;
    }
    if (percentage >= 80) {
      return <TrendingDown className="text-yellow-500" size={20} />;
    }
    return null;
  };

  const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.amount), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + parseFloat(b.spent), 0);
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button onClick={handleAdd} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          Set Budget
        </button>
      </div>

      {/* Month/Year Selector */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="input"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      {budgets.length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-lg font-bold mb-4">Overall Budget</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${totalBudget - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalBudget - totalSpent >= 0 ? formatCurrency(totalBudget - totalSpent) : '-' + formatCurrency(Math.abs(totalBudget - totalSpent))}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${getProgressColor(overallPercentage)}`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {overallPercentage.toFixed(1)}% of total budget used
          </p>
        </div>
      )}

      {/* Budgets List */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const spent = parseFloat(budget.spent);
              const amount = parseFloat(budget.amount);
              const remaining = amount - spent;
              const percentage = (spent / amount * 100);

              return (
                <div key={budget.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: budget.category_color }}
                      >
                        {budget.category_name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{budget.category_name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Budget: {formatCurrency(amount)}</span>
                          <span>Spent: {formatCurrency(spent)}</span>
                          <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                            Remaining: {remaining >= 0 ? formatCurrency(remaining) : '-' + formatCurrency(Math.abs(remaining))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(percentage)}
                      <button
                        onClick={() => handleDelete(budget.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${getProgressColor(percentage)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{percentage.toFixed(1)}% used</span>
                      {percentage >= 100 && (
                        <span className="text-red-600 font-medium">
                          Over budget by {formatCurrency(spent - amount)}
                        </span>
                      )}
                      {percentage >= 80 && percentage < 100 && (
                        <span className="text-yellow-600 font-medium">
                          Approaching limit
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-4">No budgets set for this month</p>
            <button onClick={handleAdd} className="btn btn-primary">
              Set Your First Budget
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <BudgetModal
          month={selectedMonth}
          year={selectedYear}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Budgets;

