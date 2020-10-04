import React, { useState } from 'react';

export const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      } else {
        return [...prev, newMode];
      }
    });
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
