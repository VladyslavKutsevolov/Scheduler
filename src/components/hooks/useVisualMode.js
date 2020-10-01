import React, { useState } from 'react';

export const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
      setMode(newMode);
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length === 1) return mode;

    history.pop();
    setMode(history[history.length - 1]);
  };

  return {
    mode,
    transition,
    back,
  };
};
