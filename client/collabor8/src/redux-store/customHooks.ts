import { useDispatch as useReduxDispatch } from 'react-redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;