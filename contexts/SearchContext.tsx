'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchState {
  query: string;
  isSearching: boolean;
}

interface SearchContextType {
  state: SearchState;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SearchState>({
    query: '',
    isSearching: false,
  });

  const setSearchQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      query,
      isSearching: query.length > 0,
    }));
  };

  const clearSearch = () => {
    setState({
      query: '',
      isSearching: false,
    });
  };

  return (
    <SearchContext.Provider value={{ state, setSearchQuery, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
