class ComplexityAnalyzer {
  constructor() {
    this.dataPoints = [];
    this.operationCount = 0;
    this.comparisonCount = 0;
    this.swapCount = 0;
  }

  /**
   * Record an operation
   */
  recordOperation(type = 'general') {
    this.operationCount++;
    if (type === 'comparison') this.comparisonCount++;
    if (type === 'swap') this.swapCount++;

    this.dataPoints.push({
      step: this.dataPoints.length + 1,
      operations: this.operationCount,
      comparisons: this.comparisonCount,
      swaps: this.swapCount,
    });
  }

  /**
   * Generate theoretical complexity curves for comparison
   */
  static generateTheoreticalCurves(n, maxSteps) {
    const curves = [];
    for (let i = 1; i <= maxSteps; i++) {
      const x = (i / maxSteps) * n;
      curves.push({
        step: i,
        'O(1)': 1,
        'O(log n)': Math.max(1, Math.log2(Math.max(1, x))),
        'O(n)': x,
        'O(n log n)': Math.max(1, x * Math.log2(Math.max(1, x))),
        'O(n²)': x * x,
        'O(2^n)': Math.min(Math.pow(2, x), 10000), // Cap to prevent overflow
      });
    }
    return curves;
  }

  /**
   * Estimate the complexity class based on recorded data
   */
  estimateComplexity(inputSize) {
    if (this.operationCount <= 1) return 'O(1)';

    const ratio = this.operationCount / inputSize;

    if (ratio <= 1.5) return 'O(n)';
    if (ratio <= Math.log2(inputSize) * 1.5) return 'O(n log n)';
    if (ratio <= inputSize * 1.2) return 'O(n²)';
    if (ratio > inputSize) return 'O(2^n)';

    return 'O(n log n)';
  }

  getSnapshot() {
    return {
      dataPoints: [...this.dataPoints],
      operationCount: this.operationCount,
      comparisonCount: this.comparisonCount,
      swapCount: this.swapCount,
    };
  }

  reset() {
    this.dataPoints = [];
    this.operationCount = 0;
    this.comparisonCount = 0;
    this.swapCount = 0;
  }
}

export default ComplexityAnalyzer;