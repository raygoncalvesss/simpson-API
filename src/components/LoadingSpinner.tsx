interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Carregando...', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} mb-4`}
        role="status"
        aria-label="Carregando"
      />
      {text && (
        <p className="text-gray-600 text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;