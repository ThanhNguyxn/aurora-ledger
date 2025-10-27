import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import CategoryModal from '../components/CategoryModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? This will affect related transactions.')) return;

    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const filteredCategories = filter === 'all' 
    ? categories 
    : categories.filter(cat => cat.type === filter);

  const incomeCount = categories.filter(cat => cat.type === 'income').length;
  const expenseCount = categories.filter(cat => cat.type === 'expense').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button onClick={handleAdd} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-600">Total Categories</p>
          <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-gray-600">Income Categories</p>
          <p className="text-3xl font-bold text-green-600">{incomeCount}</p>
        </div>
        <div className="card bg-red-50 border-red-200">
          <p className="text-sm text-gray-600">Expense Categories</p>
          <p className="text-3xl font-bold text-red-600">{expenseCount}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          All ({categories.length})
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Income ({incomeCount})
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Expense ({expenseCount})
        </button>
      </div>

      {/* Categories Grid */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow"
                style={{ borderColor: category.color }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{category.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          category.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {category.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No categories found
          </div>
        )}
      </div>

      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Categories;

