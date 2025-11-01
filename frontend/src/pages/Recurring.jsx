import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useCurrency } from '../context/CurrencyContext';
import { Repeat, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Calendar, AlertCircle } from 'lucide-react';

const Recurring = () => {
  const { t } = useTranslation();
  const { displayCurrency, formatAmount } = useCurrency();
  const [recurring, setRecurring] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecurring, setEditingRecurring] = useState(null);
  const [filterActive, setFilterActive] = useState('all'); // 'all', 'active', 'inactive'

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    currency: displayCurrency,
    category_id: '',
    description: '',
    frequency: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
  });

  useEffect(() => {
    fetchRecurring();
    fetchCategories();
  }, []);

  const fetchRecurring = async () => {
    try {
      const response = await api.get('/recurring');
      setRecurring(response.data);
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount),
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        end_date: formData.end_date || null,
      };

      console.log('📤 Submitting recurring data:', submitData);

      if (editingRecurring) {
        await api.put(`/recurring/${editingRecurring.id}`, submitData);
        toast.success(t('recurring.recurringUpdated'));
      } else {
        await api.post('/recurring', submitData);
        toast.success(t('recurring.recurringCreated'));
      }

      setModalOpen(false);
      resetForm();
      fetchRecurring();
    } catch (error) {
      console.error('❌ Recurring error:', error.response?.data);
      const errorMsg = error.response?.data?.errors 
        ? error.response.data.errors.map(e => e.msg).join(', ')
        : error.response?.data?.error || t('common.error');
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('recurring.recurringDeleted'))) return;

    try {
      await api.delete(`/recurring/${id}`);
      toast.success(t('recurring.recurringDeleted'));
      fetchRecurring();
    } catch (error) {
      toast.error(t('common.error'));
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/recurring/${id}/toggle`);
      toast.success(t('common.success'));
      fetchRecurring();
    } catch (error) {
      toast.error(t('common.error'));
    }
  };

  const openModal = (rec = null) => {
    if (rec) {
      setEditingRecurring(rec);
      setFormData({
        type: rec.type,
        amount: rec.amount,
        currency: rec.currency,
        category_id: rec.category_id || '',
        description: rec.description || '',
        frequency: rec.frequency,
        start_date: rec.start_date,
        end_date: rec.end_date || '',
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      currency: displayCurrency,
      category_id: '',
      description: '',
      frequency: 'monthly',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
    });
    setEditingRecurring(null);
  };

  const filteredRecurring = recurring.filter(rec => {
    if (filterActive === 'active') return rec.is_active;
    if (filterActive === 'inactive') return !rec.is_active;
    return true;
  });

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
          <Repeat className="text-blue-600" />
          {t('recurring.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('recurring.willCreateOn')} {t('recurring.nextOccurrence').toLowerCase()}
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          {t('recurring.addRecurring')}
        </button>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setFilterActive('all')}
            className={`btn ${filterActive === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('common.all')}
          </button>
          <button
            onClick={() => setFilterActive('active')}
            className={`btn ${filterActive === 'active' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('recurring.active')}
          </button>
          <button
            onClick={() => setFilterActive('inactive')}
            className={`btn ${filterActive === 'inactive' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('recurring.inactive')}
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : filteredRecurring.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{t('transactions.noTransactions')}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredRecurring.map((rec) => (
            <div
              key={rec.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 ${
                !rec.is_active ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rec.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}>
                      {t(`transactions.${rec.type}`)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                      {t(`recurring.${rec.frequency}`)}
                    </span>
                    {rec.is_active ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        {t('recurring.active')}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400">
                        {t('recurring.inactive')}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {formatAmount(rec.amount, rec.currency)}
                  </h3>
                  
                  {rec.category_name && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rec.category_name}
                    </p>
                  )}
                  
                  {rec.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      {rec.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{t('recurring.nextOccurrence')}: {new Date(rec.next_occurrence).toLocaleDateString()}</span>
                    </div>
                    {rec.end_date && (
                      <span>{t('recurring.endDate')}: {new Date(rec.end_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(rec.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title={rec.is_active ? t('recurring.inactive') : t('recurring.active')}
                  >
                    {rec.is_active ? (
                      <ToggleRight size={24} className="text-green-600" />
                    ) : (
                      <ToggleLeft size={24} className="text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => openModal(rec)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit2 size={20} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {editingRecurring ? t('recurring.editRecurring') : t('recurring.addRecurring')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('transactions.type')}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value, category_id: '' })}
                    className="input"
                  >
                    <option value="income">{t('transactions.income')}</option>
                    <option value="expense">{t('transactions.expense')}</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('transactions.amount')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="input"
                    placeholder="0.00"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('transactions.transactionCurrency')}
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="input"
                  >
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="VND">🇻🇳 VND - Vietnamese Dong</option>
                    <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                    <option value="KRW">🇰🇷 KRW - Korean Won</option>
                    <option value="THB">🇹🇭 THB - Thai Baht</option>
                    <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
                    <option value="MYR">🇲🇾 MYR - Malaysian Ringgit</option>
                    <option value="IDR">🇮🇩 IDR - Indonesian Rupiah</option>
                    <option value="PHP">🇵🇭 PHP - Philippine Peso</option>
                    <option value="INR">🇮🇳 INR - Indian Rupee</option>
                    <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                    <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('transactions.willConvert')}
                  </p>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('recurring.frequency')}
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="input"
                  >
                    <option value="daily">{t('recurring.daily')}</option>
                    <option value="weekly">{t('recurring.weekly')}</option>
                    <option value="monthly">{t('recurring.monthly')}</option>
                    <option value="yearly">{t('recurring.yearly')}</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('transactions.category')}
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
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

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('recurring.startDate')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('recurring.endDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="input"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('transactions.description')} ({t('transactions.optional')})
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    rows="3"
                    placeholder={t('transactions.addNote')}
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    {t('common.cancel')}
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    {editingRecurring ? t('common.save') : t('transactions.create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recurring;

