
export interface SortingStep {
  type: 'compare' | 'swap' | 'sorted';
  indices: number[];
  array?: number[];
}

export interface SortingAlgorithm {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  howItWorks: string[];
  sort: (array: number[]) => SortingStep[];
}

const bubbleSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1] });
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'swap', indices: [j, j + 1], array: [...arr] });
        swapped = true;
      }
    }
    steps.push({ type: 'sorted', indices: [n - i - 1] });
    if (!swapped) break;
  }
  
  if (n > 0) steps.push({ type: 'sorted', indices: [0] });
  return steps;
};

const selectionSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ type: 'swap', indices: [i, minIdx], array: [...arr] });
    }
    steps.push({ type: 'sorted', indices: [i] });
  }
  
  if (n > 0) steps.push({ type: 'sorted', indices: [n - 1] });
  return steps;
};

const insertionSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;

  steps.push({ type: 'sorted', indices: [0] });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      steps.push({ type: 'compare', indices: [j, j + 1] });
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        steps.push({ type: 'swap', indices: [j, j + 1], array: [...arr] });
        j--;
      } else {
        break;
      }
    }
    
    arr[j + 1] = key;
    if (j + 1 !== i) {
      steps.push({ type: 'swap', indices: [j + 1, i], array: [...arr] });
    }
    steps.push({ type: 'sorted', indices: [i] });
  }

  return steps;
};

const quickSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high] });
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({ type: 'swap', indices: [i, j], array: [...arr] });
        }
      }
    }

    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({ type: 'swap', indices: [i + 1, high], array: [...arr] });
    }
    
    return i + 1;
  };

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      steps.push({ type: 'sorted', indices: [pi] });
      
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      steps.push({ type: 'sorted', indices: [low] });
    }
  };

  if (arr.length > 0) {
    quickSortHelper(0, arr.length - 1);
  }
  
  return steps;
};

const mergeSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];

  const merge = (left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({ type: 'compare', indices: [left + i, mid + 1 + j] });
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      steps.push({ type: 'swap', indices: [k], array: [...arr] });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({ type: 'swap', indices: [k], array: [...arr] });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({ type: 'swap', indices: [k], array: [...arr] });
      j++;
      k++;
    }

    for (let idx = left; idx <= right; idx++) {
      steps.push({ type: 'sorted', indices: [idx] });
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  if (arr.length > 1) {
    mergeSortHelper(0, arr.length - 1);
  } else if (arr.length === 1) {
    steps.push({ type: 'sorted', indices: [0] });
  }

  return steps;
};

const heapSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;

  const heapify = (n: number, i: number) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
      steps.push({ type: 'compare', indices: [left, largest] });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      steps.push({ type: 'compare', indices: [right, largest] });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({ type: 'swap', indices: [i, largest], array: [...arr] });
      heapify(n, largest);
    }
  };

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({ type: 'swap', indices: [0, i], array: [...arr] });
    steps.push({ type: 'sorted', indices: [i] });
    heapify(i, 0);
  }

  if (n > 0) {
    steps.push({ type: 'sorted', indices: [0] });
  }

  return steps;
};

export const sortingAlgorithms: Record<string, SortingAlgorithm> = {
  bubbleSort: {
    name: 'Bubble Sort',
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    howItWorks: [
      'Compare adjacent elements in the array',
      'Swap them if they are in the wrong order',
      'Continue through the array until no more swaps are needed',
      'The largest element "bubbles up" to its correct position in each pass',
      'Repeat until the entire array is sorted'
    ],
    sort: bubbleSort
  },
  selectionSort: {
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    howItWorks: [
      'Find the minimum element in the unsorted portion of the array',
      'Swap it with the first element of the unsorted portion',
      'Move the boundary between sorted and unsorted portions one element to the right',
      'Repeat until the entire array is sorted',
      'The sorted portion grows from left to right'
    ],
    sort: selectionSort
  },
  insertionSort: {
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, inserting each element into its proper position among the previously sorted elements.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    howItWorks: [
      'Start with the second element (assume first is sorted)',
      'Compare the current element with the previous elements',
      'Shift all larger elements one position to the right',
      'Insert the current element in its correct position',
      'Repeat for all remaining elements'
    ],
    sort: insertionSort
  },
  quickSort: {
    name: 'Quick Sort',
    description: 'A highly efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around the pivot, then recursively sorts the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    howItWorks: [
      'Choose a pivot element from the array',
      'Partition the array so elements smaller than pivot come before it, larger elements come after',
      'Recursively apply the same process to the sub-arrays on either side of the pivot',
      'The pivot is now in its final sorted position',
      'Continue until all sub-arrays are sorted'
    ],
    sort: quickSort
  },
  mergeSort: {
    name: 'Merge Sort',
    description: 'A stable divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    howItWorks: [
      'Divide the array into two halves',
      'Recursively sort each half',
      'Merge the two sorted halves back together',
      'During merging, compare elements and place them in correct order',
      'Continue until the entire array is reconstructed and sorted'
    ],
    sort: mergeSort
  },
  heapSort: {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements by first building a max heap, then repeatedly extracting the maximum element.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    howItWorks: [
      'Build a max heap from the input array',
      'The largest element is now at the root of the heap',
      'Swap the root with the last element and reduce heap size',
      'Heapify the root to maintain the max heap property',
      'Repeat until all elements are sorted'
    ],
    sort: heapSort
  }
};
