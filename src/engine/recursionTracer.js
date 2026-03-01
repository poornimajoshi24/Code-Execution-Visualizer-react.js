import { v4 as uuidv4 } from 'uuid';

class RecursionTracer {
  constructor() {
    this.tree = null;
    this.nodeMap = new Map();
    this.callOrder = [];
  }

  /**
   * Creates a new recursion tree node when a function is called
   */
  createNode(funcName, args, parentId = null) {
    const node = {
      id: uuidv4(),
      name: funcName,
      args: this.serializeArgs(args),
      children: [],
      status: 'computing', // computing | resolved | base-case
      result: undefined,
      depth: 0,
      order: this.callOrder.length,
    };

    if (parentId && this.nodeMap.has(parentId)) {
      const parent = this.nodeMap.get(parentId);
      parent.children.push(node);
      node.depth = parent.depth + 1;
    } else {
      this.tree = node;
    }

    this.nodeMap.set(node.id, node);
    this.callOrder.push(node.id);

    return node.id;
  }

  /**
   * Resolves a node with its return value
   */
  resolveNode(nodeId, result) {
    if (this.nodeMap.has(nodeId)) {
      const node = this.nodeMap.get(nodeId);
      node.status = 'resolved';
      node.result = result;
    }
  }

  /**
   * Marks a node as a base case
   */
  markBaseCase(nodeId, result) {
    if (this.nodeMap.has(nodeId)) {
      const node = this.nodeMap.get(nodeId);
      node.status = 'base-case';
      node.result = result;
    }
  }

  /**
   * Gets a snapshot of the current tree state
   */
  getSnapshot() {
    return this.tree ? JSON.parse(JSON.stringify(this.tree)) : null;
  }

  /**
   * Calculates tree statistics
   */
  getStats() {
    if (!this.tree) return { totalCalls: 0, maxDepth: 0, baseCases: 0 };

    let maxDepth = 0;
    let baseCases = 0;
    let totalCalls = 0;

    const traverse = (node) => {
      totalCalls++;
      maxDepth = Math.max(maxDepth, node.depth);
      if (node.status === 'base-case' || node.children.length === 0) {
        baseCases++;
      }
      node.children.forEach(traverse);
    };

    traverse(this.tree);
    return { totalCalls, maxDepth, baseCases };
  }

  serializeArgs(args) {
    return Object.entries(args)
      .map(([key, val]) => {
        if (Array.isArray(val)) return `[${val.join(',')}]`;
        return String(val);
      })
      .join(', ');
  }

  reset() {
    this.tree = null;
    this.nodeMap.clear();
    this.callOrder = [];
  }
}

export default RecursionTracer;