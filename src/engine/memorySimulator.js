import { v4 as uuidv4 } from 'uuid';

class MemorySimulator {
  constructor() {
    this.stackMemory = []; // Stack frames
    this.heapMemory = {};  // Heap allocations
    this.totalAllocated = 0;
    this.peakMemory = 0;
    this.allocationHistory = [];
  }

  /**
   * Push a new stack frame
   */
  pushStackFrame(funcName, localVars = {}) {
    const frame = {
      id: uuidv4(),
      function: funcName,
      address: this.generateAddress(),
      locals: { ...localVars },
      size: this.calculateSize(localVars),
      createdAt: Date.now(),
    };

    this.stackMemory.push(frame);
    this.totalAllocated += frame.size;
    this.peakMemory = Math.max(this.peakMemory, this.totalAllocated);

    this.allocationHistory.push({
      type: 'stack-push',
      function: funcName,
      size: frame.size,
      totalMemory: this.totalAllocated,
    });

    return frame;
  }

  /**
   * Pop the top stack frame
   */
  popStackFrame() {
    const frame = this.stackMemory.pop();
    if (frame) {
      this.totalAllocated -= frame.size;
      this.allocationHistory.push({
        type: 'stack-pop',
        function: frame.function,
        size: frame.size,
        totalMemory: this.totalAllocated,
      });
    }
    return frame;
  }

  /**
   * Allocate memory on the heap
   */
  heapAllocate(name, value, type = 'object') {
    const address = this.generateAddress();
    const size = this.calculateSize(value);

    this.heapMemory[address] = {
      id: uuidv4(),
      name,
      value: JSON.parse(JSON.stringify(value)),
      type,
      size,
      address,
      references: 1,
    };

    this.totalAllocated += size;
    this.peakMemory = Math.max(this.peakMemory, this.totalAllocated);

    this.allocationHistory.push({
      type: 'heap-alloc',
      name,
      address,
      size,
      totalMemory: this.totalAllocated,
    });

    return address;
  }

  /**
   * Free heap memory (garbage collection simulation)
   */
  heapFree(address) {
    const allocation = this.heapMemory[address];
    if (allocation) {
      this.totalAllocated -= allocation.size;
      this.allocationHistory.push({
        type: 'heap-free',
        name: allocation.name,
        address,
        size: allocation.size,
        totalMemory: this.totalAllocated,
      });
      delete this.heapMemory[address];
    }
  }

  /**
   * Get snapshot of the memory state
   */
  getSnapshot() {
    return {
      stack: JSON.parse(JSON.stringify(this.stackMemory)),
      heap: JSON.parse(JSON.stringify(this.heapMemory)),
      totalAllocated: this.totalAllocated,
      peakMemory: this.peakMemory,
      history: [...this.allocationHistory],
    };
  }

  calculateSize(value) {
    const str = JSON.stringify(value);
    return str ? str.length * 2 : 0; // Rough approximation: 2 bytes per char
  }

  generateAddress() {
    return '0x' + Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase();
  }

  reset() {
    this.stackMemory = [];
    this.heapMemory = {};
    this.totalAllocated = 0;
    this.peakMemory = 0;
    this.allocationHistory = [];
  }
}

export default MemorySimulator;