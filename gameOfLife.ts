// Define the size of the grid (can be adjusted) 1. הגדרת מידות הגריד
const gridWidth = 10;
const gridHeight = 10;

// Initialize the grid with random cells (0 = dead, 1 = alive) 1.  פונקציה createGrid - יצירת גריד התחלתי
const createGrid = (): number[][] => {
  const grid = [];
  for (let i = 0; i < gridHeight; i++) {
    const row = [];
    for (let j = 0; j < gridWidth; j++) {
      row.push(Math.floor(Math.random() * 2)); // Random 0 or 1
    }
    grid.push(row);
  }
  return grid;
};

// Print the grid to the console הדפסת הגריד לקונסולה
const printGrid = (grid: number[][]): void => {
  console.clear();
  grid.forEach((row) => {
    console.log(row.map((cell) => (cell ? "O" : ".")).join(" "));
  });
  console.log("\n");
};

// Get the number of live neighbors of a given cell הפונקציה getLiveNeighbors מחשבת את מספר השכנים החיים (תאים חיים) של תא נתון בגריד.
const getLiveNeighbors = (
  grid: number[][],
  row: number,
  col: number
): number => {
  let liveNeighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the current cell
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 &&
        newRow < gridHeight &&
        newCol >= 0 &&
        newCol < gridWidth
      ) {
        liveNeighbors += grid[newRow][newCol];
      }
    }
  }
  return liveNeighbors;
};

// Compute the next generation of the grid   חישוב הדור הבא
const nextGeneration = (grid: number[][]): number[][] => {
  const newGrid = grid.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const liveNeighbors = getLiveNeighbors(grid, rowIndex, colIndex);
      // Apply Conway's rules:
      if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        return 0; // Cell dies
      }
      if (cell === 0 && liveNeighbors === 3) {
        return 1; // Cell becomes alive
      }
      return cell; // Cell stays the same
    });
  });
  return newGrid;
};

const createBlinker = () => {
  let board = Array.from({ length: 10 }, () => Array(10).fill(0));

  // הצבת התבנית "Blinker" (קו אנכי של 1 במרכז)
  board[4][4] = 1;
  board[5][4] = 1;
  board[6][4] = 1;

  return board;
};

// Run the game
const runGame = (iterations: number, checkRules: boolean): void => {
  let grid = checkRules ? createBlinker() : createGrid();
  printGrid(grid);

  for (let i = 0; i < iterations; i++) {
    grid = nextGeneration(grid);
    printGrid(grid);
    // Add a delay between generations for better visualization
    const delay = 500;
    const now = Date.now();
    while (Date.now() - now < delay) {} // Blocking delay to slow down the output
  }
};

// Run the game for 20 iterations
console.log("check rules with blinker");
runGame(20, true);
console.log("new random grid");
runGame(20, false);
