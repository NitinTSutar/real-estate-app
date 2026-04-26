import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';

  const icon = type === 'success' ? 'OK' : type === 'error' ? 'ERR' : 'INFO';

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm`}>
      <span className="text-xs font-semibold">{icon}</span>
      <div>
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="ml-auto text-white/80 hover:text-white">
        x
      </button>
    </div>
  );
};

export default Toast;
