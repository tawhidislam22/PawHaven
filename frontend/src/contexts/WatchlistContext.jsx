import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const WatchlistContext = createContext();

// Watchlist reducer
const watchlistReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_WATCHLIST':
      return {
        ...state,
        items: action.payload
      };
    
    case 'ADD_TO_WATCHLIST': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        toast.error('Item already in watchlist! 💗');
        return state;
      }
      
      const newItems = [...state.items, { ...action.payload, addedAt: new Date().toISOString() }];
      localStorage.setItem('pawhaven-watchlist', JSON.stringify(newItems));
      toast.success(`${action.payload.name} added to watchlist! 💗`);
      
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'REMOVE_FROM_WATCHLIST': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('pawhaven-watchlist', JSON.stringify(filteredItems));
      toast.success('Item removed from watchlist');
      
      return {
        ...state,
        items: filteredItems
      };
    }
    
    case 'CLEAR_WATCHLIST':
      localStorage.removeItem('pawhaven-watchlist');
      toast.success('Watchlist cleared');
      
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

export const WatchlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('pawhaven-watchlist');
    if (savedWatchlist) {
      try {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        dispatch({ type: 'LOAD_WATCHLIST', payload: parsedWatchlist });
      } catch (error) {
        console.error('Error loading watchlist:', error);
        localStorage.removeItem('pawhaven-watchlist');
      }
    }
  }, []);

  // Action creators
  const addToWatchlist = (product) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: product });
  };

  const removeFromWatchlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: productId });
  };

  const clearWatchlist = () => {
    dispatch({ type: 'CLEAR_WATCHLIST' });
  };

  const isInWatchlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getWatchlistCount = () => {
    return state.items.length;
  };

  const value = {
    watchlist: state.items,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
    isInWatchlist,
    getWatchlistCount
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};