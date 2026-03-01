export const presetAlgorithms = [
  {
    id: 'fibonacci',
    name: 'Fibonacci (Recursive)',
    category: 'Recursion',
    icon: '🌀',
    difficulty: 'Easy',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    description: 'Classic recursive Fibonacci — watch the call stack explode!',
    code: `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

let result = fibonacci(5);`,
  },
  {
    id: 'factorial',
    name: 'Factorial (Recursive)',
    category: 'Recursion',
    icon: '🔢',
    difficulty: 'Easy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'See how the stack builds up and unwinds for n!',
    code: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

let result = factorial(5);`,
  },
  {
    id: 'binarySearch',
    name: 'Binary Search',
    category: 'Searching',
    icon: '🔍',
    difficulty: 'Medium',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    description: 'Divide and conquer at its finest — logarithmic magic.',
    code: `function binarySearch(arr, target, low, high) {
  if (low > high) {
    return -1;
  }
  let mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) {
    return mid;
  }
  if (arr[mid] > target) {
    return binarySearch(arr, target, low, mid - 1);
  }
  return binarySearch(arr, target, mid + 1, high);
}

let arr = [1, 3, 5, 7, 9, 11, 13, 15];
let result = binarySearch(arr, 7, 0, arr.length - 1);`,
  },
  {
    id: 'mergeSort',
    name: 'Merge Sort',
    category: 'Sorting',
    icon: '🔀',
    difficulty: 'Medium',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Watch arrays split and merge back in sorted order.',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

let result = mergeSort([38, 27, 43, 3, 9, 82, 10]);`,
  },
  {
    id: 'towerOfHanoi',
    name: 'Tower of Hanoi',
    category: 'Recursion',
    icon: '🗼',
    difficulty: 'Medium',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    description: 'The classic recursion puzzle — visualize every disk move.',
    code: `function hanoi(n, from, to, aux) {
  if (n === 1) {
    return "Move disk 1 from " + from + " to " + to;
  }
  hanoi(n - 1, from, aux, to);
  hanoi(n - 1, aux, to, from);
}

hanoi(3, "A", "C", "B");`,
  },
  {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    category: 'Sorting',
    icon: '🫧',
    difficulty: 'Easy',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Watch the quadratic complexity unfold in real-time.',
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let result = bubbleSort([64, 34, 25, 12, 22, 11, 90]);`,
  },
];

export const getCategorizedPresets = () => {
  const categories = {};
  presetAlgorithms.forEach((preset) => {
    if (!categories[preset.category]) {
      categories[preset.category] = [];
    }
    categories[preset.category].push(preset);
  });
  return categories;
};