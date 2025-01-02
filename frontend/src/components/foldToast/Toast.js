import React, { useEffect, useState } from 'react';
import './Toast.css';

function Toast({ message, duration = 2000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
}

export default Toast;
