import { useContext } from 'react';
import { AppContextActions, AppContextState } from './AppContext.context';

export function useAppContextState() {
  const context = useContext(AppContextState);
  if (context === undefined) {
    throw new Error('useAppContextState must be used within a AppContextProvider');
  }
  return context;
}

export function useAppContextActions() {
  const context = useContext(AppContextActions);
  if (context === undefined) {
    throw new Error('useAppContextActions must be used within a AppContextProvider');
  }
  return context;
}
