// src/LoadingDots.js
import React from 'react';

const Loading = () => {
  const styles = {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },
    dot: {
      width: '20px',
      height: '20px',
      backgroundColor: '#e80927',
      borderRadius: '50%',
      margin: '0 5px',
      animation: 'dot-bounce 1.4s infinite ease-in-out both'
    },
    dot1: {
      animationDelay: '0s'
    },
    dot2: {
      animationDelay: '0.2s'
    },
    dot3: {
      animationDelay: '0.4s'
    },
    '@keyframes dot-bounce': {
      '0%, 80%, 100%': {
        transform: 'scale(0)'
      },
      '40%': {
        transform: 'scale(1)'
      }
    }
  };

  return (
    <div style={styles.loadingContainer}>
      <div style={{ ...styles.dot, ...styles.dot1 }}></div>
      <div style={{ ...styles.dot, ...styles.dot2 }}></div>
      <div style={{ ...styles.dot, ...styles.dot3 }}></div>
      <style>
        {`
          @keyframes dot-bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
