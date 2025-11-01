import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import { X, Plus } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const BudgetModal = ({ month, year, onClose }) => {
  const { t } = useTranslation();
  const { currency: userCurrency } = useCurrency();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    amount: '',
    currency: userCurrency || 'USD',
    month: month,
    year: year
  });
  const [loading, setLoading] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState('');

  const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'KRW', name: 'Korean Won', symbol: '₩' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories?type=expense');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        category_id: parseInt(formData.category_id),
        amount: parseFloat(formData.amount),
        input_currency: formData.currency, // Currency user chose for input
        month: formData.month,
        year: formData.year
      };

      await api.post('/budgets', data);
      toast.success(t('budgets.budgetSet'));
      onClose();
    } catch (error) {
      toast.error(t('budgets.failedToSet'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuickAddCategory = async () => {
    if (!quickAddName.trim()) {
      toast.error(t('categories.name') + ' is required');
      return;
    }

    try {
      const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      const response = await api.post('/categories', {
        name: quickAddName,
        type: 'expense', // Budget chỉ cho expense categories
        color: randomColor,
        icon: 'folder'
      });

      // Add new category to list
      const newCategory = response.data;
      setCategories([...categories, newCategory]);
      
      // Auto-select the new category
      setFormData({ ...formData, category_id: newCategory.id });
      
      // Reset quick add
      setQuickAddName('');
      setShowQuickAdd(false);
      
      toast.success(t('categories.categoryCreated'));
    } catch (error) {
      toast.error(t('categories.failedToCreate'));
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t('budgets.setBudget')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors" title="Close">
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('budgets.settingBudgetFor')}{' '}
              <span className="font-bold">
                {new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' })} {year}
              </span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
              <span>{t('transactions.category')}</span>
              <button
                type="button"
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <Plus size={14} />
                {t('categories.addCategory')}
              </button>
            </label>
            
            {showQuickAdd && (
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickAddName}
                    onChange={(e) => setQuickAddName(e.target.value)}
                    className="input flex-1"
                    placeholder={t('categories.categoryName')}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleQuickAddCategory())}
                  />
                  <button
                    type="button"
                    onClick={handleQuickAddCategory}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    {t('common.save') || 'Save'}
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  💡 Quick add expense category with random color
                </p>
              </div>
            )}
            
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">{t('budgets.selectCategory')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('budgets.onlyExpenseCategories')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('budgets.budgetAmount')}
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="any"
              min="0.01"
              max="999999999999.99"
              className="input"
              required
              placeholder="0.00"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('budgets.maxAmount')}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transactions.currency')}
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="input"
              required
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name} ({curr.code})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              💱 {t('budgets.inputCurrencyNote') || 'Select currency for input (will auto-convert to your display currency)'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-700 dark:text-gray-200">
              💡 <strong>{t('budgets.conversionNote') || 'Example'}:</strong><br/>
              {t('budgets.conversionExample') || 'If you enter 10 USD and your display currency is VND, it will be saved as ~260,000 VND (based on current exchange rate)'}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              {t('budgets.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? t('categories.saving') : t('budgets.setBudget')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;

