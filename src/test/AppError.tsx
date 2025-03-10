import { useToasts } from './ErrorContext.tsx';
import { ReactNode } from 'react';

type AppTestProps = {
  children: ReactNode;
};
function AppError({ children }: AppTestProps) {
  const { pushToast } = useToasts();

  const showError = () => {
    if (typeof children === 'string') {
      pushToast(children); // Ensure it's a string
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={showError}>Показать ошибку</button>
    </div>
  );
}

export default AppError;
