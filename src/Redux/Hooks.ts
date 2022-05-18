import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './RootReducer';
import type { AppDispatch } from './Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;