import { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import axios from 'axios';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'KRW', name: 'Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' }
];

export default function CurrencySelector({ className = '' }) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  const handleSelect = async (currencyCode) => {
    try {
      await setCurrency(currencyCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing currency:', error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="text-xl">{selectedCurrency.flag}</span>
        <span className="font-medium">{selectedCurrency.code}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-y-auto">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelect(curr.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 ${
                  curr.code === currency ? 'bg-indigo-50' : ''
                }`}
              >
                <span className="text-2xl">{curr.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{curr.code}</div>
                  <div className="text-sm text-gray-500">{curr.name}</div>
                </div>
                {curr.code === currency && (
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

