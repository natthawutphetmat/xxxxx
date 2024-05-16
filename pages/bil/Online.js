import React, { useEffect } from 'react';
import io from 'socket.io-client';

const HomePage = () => {
  useEffect(() => {
    const socket = io();

    socket.emit('joinHome');

    return () => {
      socket.emit('leaveHome');
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    
    </div>
  );
};

export default HomePage;
