import { useContext } from 'react';
import ToastContext from './toast-context.jsx';

export const useToast = () => useContext(ToastContext);
