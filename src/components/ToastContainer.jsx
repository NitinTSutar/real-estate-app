import { useDispatch, useSelector } from 'react-redux';
import Toast from './Toast';
import { removeToast } from '../store/toastSlice';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
