import * as readline from "readline";

// יצירת ממשק לקריאת קלט מהמשתמש
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// טיפוס עבור מערך דו-ממדי של מספרים
type Matrix = number[][];

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
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
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
const runGame = (iterations: number, grid: number[][]): void => {
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

function askDimensions(): Promise<Matrix> {
  return new Promise((resolve, reject) => {
    rl.question("Enter the number of rows: ", (rows: string) => {
      rl.question("Enter the number of columns: ", (columns: string) => {
        const numRows: number = parseInt(rows);
        const numColumns: number = parseInt(columns);

        // יצירת מערך דו-ממדי בגודל שנבחר
        let array: Matrix = Array.from({ length: numRows }, () =>
          Array(numColumns).fill(0)
        );

        // קריאה לפונקציה להכניס ערכים לכל תא במערך
        askArrayValues(array, 0, 0)
          .then(() => {
            resolve(array); // החזרת המערך אחרי שסיימנו עם כל הקלט
          })
          .catch((error) => {
            reject(error); // טיפול בשגיאות
          });
      });
    });
  });
}

// פונקציה לבקש ערכים מהמשתמש לכל תא במערך
function askArrayValues(
  array: Matrix,
  row: number,
  col: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (row < array.length) {
      if (col < array[row].length) {
        rl.question(
          `Enter value for cell [${row}, ${col}]: `,
          (value: string) => {
            array[row][col] = parseInt(value); // שמירת הערך במערך
            askArrayValues(array, row, col + 1)
              .then(resolve)
              .catch(reject); // המשך לעמודה הבאה
          }
        );
      } else {
        askArrayValues(array, row + 1, 0)
          .then(resolve)
          .catch(reject); // המעבר לשורה הבאה
      }
    } else {
      // כאשר כל הקלט הושלם
      resolve();
    }
  });
}

// Run the game for 20 iterations
console.log("check rules with blinker");
runGame(20, createBlinker());
console.log("read custom input");
askDimensions()
  .then((array) => {
    rl.close();
    console.log("Final array:");
    runGame(20, array);
  })
  .catch((error) => {
    rl.close();
  });
