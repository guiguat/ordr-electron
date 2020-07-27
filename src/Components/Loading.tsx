import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;