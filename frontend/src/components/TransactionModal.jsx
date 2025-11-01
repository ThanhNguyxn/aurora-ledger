import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import { X, Plus } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const TransactionModal = ({ transaction, categories: initialCategories, onClose }) => {
  const { t } = useTranslation();
  const { currency: userCurrency } = useCurrency();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    currency: userCurrency || 'USD',
    transaction_date: format(new Date(), 'yyyy-MM-dd'),
    category_id: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState('');

  useEffect(() => {
    if (transaction) {
      // Format date properly
      const date = transaction.transaction_date ? 
        format(new Date(transaction.transaction_date), 'yyyy-MM-dd') : 
        format(new Date(), 'yyyy-MM-dd');
        
      setFormData({
        type: transaction.type,
        amount: transaction.amount,
        currency: transaction.currency || 'USD',
        transaction_date: date,
        category_id: transaction.category_id || '',
        description: transaction.description || ''
      });
    }
  }, [transaction]);

  const filteredCategories = categories.filter(cat => cat.type === formData.type);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate and format data
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount');
        setLoading(false);
        return;
      }

      const data = {
        type: formData.type,
        amount: amount,
        currency: formData.currency,
        transaction_date: formData.transaction_date, // Already in yyyy-MM-dd format
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        description: formData.description || ''
      };

      if (transaction) {
        await api.put(`/transactions/${transaction.id}`, data);
        toast.success(t('transactions.transactionUpdated'));
      } else {
        await api.post('/transactions', data);
        toast.success(t('transactions.transactionCreated'));
      }

      onClose();
    } catch (error) {
      toast.error(transaction ? t('transactions.failedToUpdate') : t('transactions.failedToCreate'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' ? { category_id: '' } : {})
    }));
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
        type: formData.type,
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
      <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            {transaction ? t('transactions.editTransaction') : t('transactions.addTransaction')}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('transactions.type')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income', category_id: '' })}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('transactions.income')}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense', category_id: '' })}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('transactions.expense')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('transactions.amount')}
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="input"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 -mt-2">
            {t('transactions.maxAmount')} • {t('transactions.willConvert') || 'Will be converted to your display currency'}
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('transactions.date')}
            </label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
              <span>{t('transactions.category')}</span>
              <button
                type="button"
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus size={14} />
                {t('categories.addCategory')}
              </button>
            </label>
            
            {showQuickAdd && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
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
                    {t('common.save')}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  💡 Quick add {formData.type} category with random color
                </p>
              </div>
            )}
            
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="input"
            >
              <option value="">{t('transactions.uncategorized')}</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('transactions.description')} ({t('transactions.optional')})
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder={t('transactions.addNote')}
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              {t('transactions.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? t('transactions.saving') : (transaction ? t('transactions.update') : t('transactions.create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;

