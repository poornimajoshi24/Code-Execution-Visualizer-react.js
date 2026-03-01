import { v4 as uuidv4 } from 'uuid';

class ExecutionEngine {
  constructor() {
    this.steps = [];
    this.callStack = [];
    this.memoryHeap = {};
    this.variables = {};
    this.output = [];
    this.recursionTree = null;
    this.complexityData = [];
    this.operationCount = 0;
    this.inputSize = 0;
  }

  /**
   * Main execution method — traces through code and records every step
   */
  execute(code) {
    this.reset();

    try {
      // Parse and trace the code
      this.traceExecution(code);
    } catch (error) {
      this.recordStep({
        type: 'error',
        description: `Error: ${error.message}`,
        lineNumber: 0,
      });
    }

    return this.steps;
  }

  reset() {
    this.steps = [];
    this.callStack = [];
    this.memoryHeap = {};
    this.variables = {};
    this.output = [];
    this.recursionTree = null;
    this.complexityData = [];
    this.operationCount = 0;
  }

  traceExecution(code) {
    // Build instrumented version of the code
    const instrumentedCode = this.instrumentCode(code);

    // Create the execution context with tracing functions
    const context = this.createExecutionContext();

    try {
      // Execute the instrumented code
      const executor = new Function(...Object.keys(context), instrumentedCode);
      executor(...Object.values(context));
    } catch (err) {
      this.recordStep({
        type: 'error',
        description: `Runtime Error: ${err.message}`,
        lineNumber: 0,
      });
    }
  }

  instrumentCode(code) {
    const lines = code.split('\n');
    let instrumented = '';
    let lineNum = 0;

    for (const line of lines) {
      lineNum++;
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('//') || trimmed === '{' || trimmed === '}') {
        instrumented += line + '\n';
        continue;
      }

      // Add line tracking before each meaningful line
      instrumented += `__traceLine(${lineNum}, ${JSON.stringify(trimmed)});\n`;
      instrumented += line + '\n';
    }

    return instrumented;
  }

  createExecutionContext() {
    const self = this;
    let callDepth = 0;
    const recursionNodes = new Map();

    return {
      __traceLine: (lineNum, lineContent) => {
        self.operationCount++;

        // Record complexity data point
        self.complexityData = [
          ...self.complexityData,
          {
            step: self.operationCount,
            operations: self.operationCount,
            label: `Line ${lineNum}`,
          },
        ];

        self.recordStep({
          type: 'line',
          lineNumber: lineNum,
          description: `Executing: ${lineContent}`,
        });
      },

      __traceCall: (funcName, args) => {
        callDepth++;
        const frame = {
          id: uuidv4(),
          name: funcName,
          args: JSON.parse(JSON.stringify(args)),
          depth: callDepth,
          status: 'active',
        };

        self.callStack = [...self.callStack, frame];

        // Build recursion tree node
        const nodeId = uuidv4();
        const parentNode = recursionNodes.get(callDepth - 1);
        const treeNode = {
          id: nodeId,
          name: funcName,
          args: self.formatArgs(args),
          children: [],
          status: 'computing',
          depth: callDepth,
          result: undefined,
        };

        if (parentNode) {
          parentNode.children = [...parentNode.children, treeNode];
        } else {
          self.recursionTree = treeNode;
        }
        recursionNodes.set(callDepth, treeNode);

        // Allocate memory for the function call
        const memAddress = `0x${(Math.random() * 0xffff).toString(16).slice(0, 4).toUpperCase()}`;
        self.memoryHeap = {
          ...self.memoryHeap,
          [memAddress]: {
            type: 'stack-frame',
            function: funcName,
            args: self.formatArgs(args),
            size: JSON.stringify(args).length * 2 + ' bytes',
          },
        };

        self.recordStep({
          type: 'call',
          lineNumber: null,
          description: `📞 Calling ${funcName}(${self.formatArgs(args)})`,
          highlight: 'push',
        });

        return nodeId;
      },

      __traceReturn: (funcName, returnValue) => {
        const currentNode = recursionNodes.get(callDepth);
        if (currentNode) {
          currentNode.status = 'resolved';
          currentNode.result = returnValue;
        }

        self.callStack = self.callStack.slice(0, -1);
        callDepth--;

        self.recordStep({
          type: 'return',
          lineNumber: null,
          description: `✅ ${funcName} returned ${JSON.stringify(returnValue)}`,
          highlight: 'pop',
        });

        return returnValue;
      },

      __traceVar: (name, value) => {
        self.variables = {
          ...self.variables,
          [name]: {
            value: JSON.parse(JSON.stringify(value)),
            type: typeof value,
            updated: self.operationCount,
          },
        };

        // Also show in memory heap
        const memAddress = `var_${name}`;
        self.memoryHeap = {
          ...self.memoryHeap,
          [memAddress]: {
            type: typeof value === 'object' ? 'reference' : 'primitive',
            name,
            value: JSON.parse(JSON.stringify(value)),
            size: JSON.stringify(value).length * 2 + ' bytes',
          },
        };
      },

      console: {
        log: (...args) => {
          self.output = [...self.output, args.join(' ')];
        },
      },

      Math,
      Array,
      Object,
      JSON,
      parseInt,
      parseFloat,
      String,
      Number,
      Boolean,
      undefined,
      null: null,
      Infinity,
      NaN,
    };
  }

  formatArgs(args) {
    if (!args || !Object.keys(args).length) return '';
    return Object.values(args)
      .map((v) => {
        if (Array.isArray(v)) return `[${v.join(',')}]`;
        if (typeof v === 'string') return `"${v}"`;
        return String(v);
      })
      .join(', ');
  }

  recordStep(stepInfo) {
    this.steps.push({
      id: uuidv4(),
      stepNumber: this.steps.length + 1,
      timestamp: Date.now(),
      ...stepInfo,
      // Snapshot the current state (deep copy)
      callStack: JSON.parse(JSON.stringify(this.callStack)),
      memoryHeap: JSON.parse(JSON.stringify(this.memoryHeap)),
      recursionTree: this.recursionTree
        ? JSON.parse(JSON.stringify(this.recursionTree))
        : null,
      complexityData: [...this.complexityData],
      variables: JSON.parse(JSON.stringify(this.variables)),
      output: [...this.output],
    });
  }
}

export default ExecutionEngine;