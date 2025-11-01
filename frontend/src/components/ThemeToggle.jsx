import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <Moon size={18} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun size={18} className="text-yellow-500" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
        }`}>
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
          }`} />
        </div>
      </div>
    </button>
  );
}

