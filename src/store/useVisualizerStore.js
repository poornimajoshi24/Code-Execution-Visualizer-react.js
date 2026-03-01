import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useVisualizerStore = create((set, get) => ({
  // ===== CODE STATE =====
  code: '',
  selectedPreset: null,

  // ===== EXECUTION STATE =====
  executionSteps: [],
  currentStepIndex: -1,
  isPlaying: false,
  playSpeed: 1000, // ms between steps
  isExecuting: false,

  // ===== VISUALIZATION DATA =====
  callStack: [],
  memoryHeap: {},
  recursionTree: null,
  complexityData: [],
  activeLineNumber: null,
  variables: {},
  output: [],

  // ===== ACTIONS =====
  setCode: (code) => set({ code }),
  setSelectedPreset: (preset) => set({ selectedPreset: preset, code: preset.code }),

  setExecutionSteps: (steps) => set({
    executionSteps: steps,
    currentStepIndex: -1,
    isPlaying: false,
  }),

  goToStep: (index) => {
    const { executionSteps } = get();
    if (index < 0 || index >= executionSteps.length) return;

    const step = executionSteps[index];
    set({
      currentStepIndex: index,
      callStack: step.callStack || [],
      memoryHeap: step.memoryHeap || {},
      recursionTree: step.recursionTree || null,
      complexityData: step.complexityData || [],
      activeLineNumber: step.lineNumber,
      variables: step.variables || {},
      output: step.output || [],
    });
  },

  nextStep: () => {
    const { currentStepIndex, executionSteps } = get();
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < executionSteps.length) {
      get().goToStep(nextIndex);
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      get().goToStep(currentStepIndex - 1);
    }
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaySpeed: (speed) => set({ playSpeed: speed }),
  setIsExecuting: (isExecuting) => set({ isExecuting }),

  reset: () => set({
    executionSteps: [],
    currentStepIndex: -1,
    isPlaying: false,
    callStack: [],
    memoryHeap: {},
    recursionTree: null,
    complexityData: [],
    activeLineNumber: null,
    variables: {},
    output: [],
  }),

  // ===== CALL STACK HELPERS =====
  pushToCallStack: (frame) => set((state) => ({
    callStack: [...state.callStack, { ...frame, id: uuidv4() }],
  })),

  popFromCallStack: () => set((state) => ({
    callStack: state.callStack.slice(0, -1),
  })),

  // ===== MEMORY HEAP HELPERS =====
  allocateMemory: (address, value) => set((state) => ({
    memoryHeap: { ...state.memoryHeap, [address]: value },
  })),

  deallocateMemory: (address) => set((state) => {
    const newHeap = { ...state.memoryHeap };
    delete newHeap[address];
    return { memoryHeap: newHeap };
  }),
}));

export default useVisualizerStore;