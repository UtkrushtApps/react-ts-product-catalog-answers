import React from 'react';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => (
  <div className="error">
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="error__retry">Retry</button>
    )}
  </div>
);

export default Error;
