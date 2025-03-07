import { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
  id: number;
  message: string;
};

type ToastContextType = {
  pushToast: (message: string) => void;
};

const ErrorContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (message: string) => {
    const id = Date.now(); // Генерируем уникальный ID
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ErrorContext.Provider value={{ pushToast }}>
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>
      {children}
    </ErrorContext.Provider>
  );
};

export const useToasts = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastProvider');
  }
  return context;
};
