import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { useCurrency } from '../context/CurrencyContext';
import { Plus, Pencil, Trash2, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import TransactionModal from '../components/TransactionModal';

const Transactions = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category_id: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/transactions?${params}`);
      setTransactions(response.data);
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
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-base sm:text-lg font-semibold">{t('transactions.filters')}</h2>
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
            className="mt-3 text-sm text-blue-600 hover:underline"
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm sm:text-base">{t('transactions.date')}</th>
                  <th className="text-left py-3 px-4 text-sm sm:text-base">{t('transactions.category')}</th>
                  <th className="text-left py-3 px-4 text-sm sm:text-base hidden sm:table-cell">{t('transactions.description')}</th>
                  <th className="text-left py-3 px-4 text-sm sm:text-base">{t('transactions.type')}</th>
                  <th className="text-right py-3 px-4 text-sm sm:text-base">{t('transactions.amount')}</th>
                  <th className="text-right py-3 px-4 text-sm sm:text-base">{t('transactions.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {format(new Date(transaction.transaction_date), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: transaction.category_color }}
                        ></div>
                        {transaction.category_name || 'Uncategorized'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">
                      {transaction.description || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
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
        ) : (
          <div className="text-center py-12 text-gray-500">
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

