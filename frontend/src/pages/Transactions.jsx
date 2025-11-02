import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { useCurrency } from '../context/CurrencyContext';
import { Plus, Pencil, Trash2, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, vi, es, fr, de, zhCN, ja, ko, pt, ru } from 'date-fns/locale';
import toast from 'react-hot-toast';
import TransactionModal from '../components/TransactionModal';

const Transactions = () => {
  const { t, i18n } = useTranslation();
  const { formatAmount, currency } = useCurrency();
  
  const getDateLocale = () => {
    const locales = { en: enUS, vi: vi, es: es, fr: fr, de: de, zh: zhCN, ja: ja, ko: ko, pt: pt, ru: ru };
    return locales[i18n.language] || enUS;
  };
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    type: '',
    category_id: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
    fetchTransactions();
    fetchCategories();
  }, [filters, currency]); // Add currency dependency

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      // Add display_currency parameter for conversion
      params.append('display_currency', currency);
      
      const response = await api.get(`/transactions?${params}`);
      const data = response.data;
      setTransactions(data.transactions || data || []);
    } catch (error) {
      toast.error(t('transactions.failedToLoad'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('transactions.deleteConfirm'))) return;

    try {
      await api.delete(`/transactions/${id}`);
      toast.success(t('transactions.transactionDeleted'));
      fetchTransactions();
    } catch (error) {
      toast.error(t('transactions.failedToDelete'));
      console.error(error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/reports/export?${params}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success(t('transactions.exportedSuccess') || 'Transactions exported');
    } catch (error) {
      toast.error(t('transactions.failedToExport') || 'Failed to export');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">{t('transactions.title')}</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button onClick={handleExport} className="btn btn-secondary flex items-center justify-center gap-2">
            <Download size={20} />
            <span className="hidden sm:inline">{t('transactions.exportCSV')}</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button onClick={handleAdd} className="btn btn-primary flex items-center justify-center gap-2">
            <Plus size={20} />
            <span>{t('transactions.addTransaction')}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600 dark:text-gray-400" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">{t('transactions.filters')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="input"
          >
            <option value="">{t('transactions.allTypes')}</option>
            <option value="income">{t('transactions.income')}</option>
            <option value="expense">{t('transactions.expense')}</option>
          </select>

          <select
            value={filters.category_id}
            onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
            className="input"
          >
            <option value="">{t('transactions.allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
            className="input"
            placeholder={t('transactions.startDate')}
          />

          <input
            type="date"
            value={filters.end_date}
            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
            className="input"
            placeholder={t('transactions.endDate')}
          />
        </div>
        {(filters.type || filters.category_id || filters.start_date || filters.end_date) && (
          <button
            onClick={() => setFilters({ type: '', category_id: '', start_date: '', end_date: '' })}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('transactions.clearFilters')}
          </button>
        )}
      </div>

      {/* Transactions List */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">{t('transactions.date')}</th>
                    <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">{t('transactions.category')}</th>
                    <th className="text-left py-3 px-4 text-sm sm:text-base hidden sm:table-cell text-gray-800 dark:text-gray-200">{t('transactions.description')}</th>
                    <th className="text-left py-3 px-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">{t('transactions.type')}</th>
                    <th className="text-right py-3 px-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">{t('transactions.amount')}</th>
                    <th className="text-right py-3 px-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">{t('transactions.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((transaction) => (
                  <tr key={transaction.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {format(new Date(transaction.transaction_date), 'MMM dd, yyyy', { locale: getDateLocale() })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: transaction.category_color }}
                        ></div>
                        <span className="text-gray-800 dark:text-gray-200">{transaction.category_name || t('transactions.uncategorized')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      {transaction.description || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-bold ${
                          transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Pagination */}
            {transactions.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('common.showing')} {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, transactions.length)} {t('common.of')} {transactions.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t('common.previous')}
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="text-sm font-medium">{currentPage}</span>
                    <span className="text-sm text-gray-500">/</span>
                    <span className="text-sm text-gray-500">{Math.ceil(transactions.length / itemsPerPage)}</span>
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(transactions.length / itemsPerPage), p + 1))}
                    disabled={currentPage >= Math.ceil(transactions.length / itemsPerPage)}
                    className="px-4 py-2 border dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t('common.next')}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('transactions.noTransactions')}
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          categories={categories}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Transactions;

