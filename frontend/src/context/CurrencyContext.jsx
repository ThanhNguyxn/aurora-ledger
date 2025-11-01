import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Load user's preferred currency
  useEffect(() => {
    const loadUserCurrency = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${API_URL}/currency/user/preference`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setCurrency(response.data.currency || 'USD');
        }
      } catch (error) {
        console.error('Error loading user currency:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserCurrency();
  }, [API_URL]);

  // Load exchange rates when currency changes
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        const response = await axios.get(`${API_URL}/currency/rates/${currency}`);
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error loading exchange rates:', error);
      }
    };

    if (currency) {
      loadExchangeRates();
    }
  }, [currency, API_URL]);

  // Update user's currency preference
  const updateCurrency = async (newCurrency) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put(
          `${API_URL}/currency/user/preference`,
          { currency: newCurrency },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      setCurrency(newCurrency);
    } catch (error) {
      console.error('Error updating currency:', error);
      throw error;
    }
  };

  // Convert amount to user's currency
  const convertAmount = (amount, fromCurrency = 'USD') => {
    if (fromCurrency === currency) return amount;
    
    // Convert from fromCurrency to USD first (if needed)
    let amountInUSD = amount;
    if (fromCurrency !== 'USD') {
      const toUSDRate = exchangeRates[fromCurrency] ? 1 / exchangeRates[fromCurrency] : 1;
      amountInUSD = amount * toUSDRate;
    }
    
    // Then convert from USD to target currency
    const rate = exchangeRates[currency] || 1;
    return amountInUSD * rate;
  };

  // Format currency with proper symbol
  const formatCurrency = (amount, currencyCode = currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CNY: '¥',
      VND: '₫',
      KRW: '₩',
      THB: '฿',
      SGD: 'S$',
      MYR: 'RM',
      IDR: 'Rp',
      PHP: '₱',
      INR: '₹',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'Fr',
      HKD: 'HK$',
      NZD: 'NZ$',
      SEK: 'kr',
      NOK: 'kr',
      DKK: 'kr',
      PLN: 'zł',
      RUB: '₽',
      BRL: 'R$',
      MXN: '$',
      ZAR: 'R',
      TRY: '₺',
      AED: 'د.إ',
      SAR: 'ر.س'
    };

    const symbol = symbols[currencyCode] || currencyCode + ' ';
    
    // Currencies without decimal places
    const noDecimalCurrencies = ['VND', 'JPY', 'KRW', 'IDR'];
    
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: noDecimalCurrencies.includes(currencyCode) ? 0 : 2,
      maximumFractionDigits: noDecimalCurrencies.includes(currencyCode) ? 0 : 2
    }).format(Math.abs(amount));

    // Currencies that put symbol after amount
    const symbolAfterCurrencies = ['VND', 'JPY', 'KRW', 'IDR', 'SEK', 'NOK', 'DKK', 'PLN'];
    
    if (symbolAfterCurrencies.includes(currencyCode)) {
      return `${formattedAmount} ${symbol}`;
    }

    return `${symbol}${formattedAmount}`;
  };

  // Convert and format amount to user's display currency
  const formatAmount = (amount, fromCurrency = 'USD') => {
    const convertedAmount = convertAmount(amount, fromCurrency);
    return formatCurrency(convertedAmount, currency);
  };

  const value = {
    currency,
    setCurrency: updateCurrency,
    exchangeRates,
    convertAmount,
    formatCurrency,
    formatAmount,
    loading
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}

