import { useEffect, useRef, useCallback } from 'react';
import useVisualizerStore from '../store/useVisualizerStore';
import ExecutionEngine from '../engine/executionEngine';

const useExecutionPlayer = () => {
  const intervalRef = useRef(null);
  const engineRef = useRef(new ExecutionEngine());

  const {
    code,
    isPlaying,
    playSpeed,
    currentStepIndex,
    executionSteps,
    setExecutionSteps,
    nextStep,
    goToStep,
    setIsPlaying,
    setIsExecuting,
    reset,
  } = useVisualizerStore();

  // Execute code and generate steps
  const executeCode = useCallback(() => {
    if (!code.trim()) return;

    reset();
    setIsExecuting(true);

    try {
      const engine = engineRef.current;
      const steps = engine.execute(code);
      setExecutionSteps(steps);

      if (steps.length > 0) {
        goToStep(0);
      }
    } catch (error) {
      console.error('Execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  }, [code, reset, setIsExecuting, setExecutionSteps, goToStep]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const state = useVisualizerStore.getState();
        if (state.currentStepIndex < state.executionSteps.length - 1) {
          nextStep();
        } else {
          setIsPlaying(false);
        }
      }, playSpeed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playSpeed, nextStep, setIsPlaying]);

  const play = useCallback(() => {
    if (executionSteps.length === 0) {
      executeCode();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(true);
    }
  }, [executionSteps, executeCode, setIsPlaying]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  const restart = useCallback(() => {
    setIsPlaying(false);
    if (executionSteps.length > 0) {
      goToStep(0);
    }
  }, [setIsPlaying, executionSteps, goToStep]);

  return {
    executeCode,
    play,
    pause,
    restart,
    isAtEnd: currentStepIndex >= executionSteps.length - 1,
    isAtStart: currentStepIndex <= 0,
    progress: executionSteps.length > 0
      ? ((currentStepIndex + 1) / executionSteps.length) * 100
      : 0,
  };
};

export default useExecutionPlayer;