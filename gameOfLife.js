"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// יצירת ממשק לקריאת קלט מהמשתמש
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Print the grid to the console הדפסת הגריד לקונסולה
var printGrid = function (grid) {
    console.clear();
    grid.forEach(function (row) {
        console.log(row.map(function (cell) { return (cell ? "O" : "."); }).join(" "));
    });
    console.log("\n");
};
// Get the number of live neighbors of a given cell הפונקציה getLiveNeighbors מחשבת את מספר השכנים החיים (תאים חיים) של תא נתון בגריד.
var getLiveNeighbors = function (grid, row, col) {
    var liveNeighbors = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i === 0 && j === 0)
                continue; // Skip the current cell
            var newRow = row + i;
            var newCol = col + j;
            if (newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length) {
                liveNeighbors += grid[newRow][newCol];
            }
        }
    }
    return liveNeighbors;
};
// Compute the next generation of the grid   חישוב הדור הבא
var nextGeneration = function (grid) {
    var newGrid = grid.map(function (row, rowIndex) {
        return row.map(function (cell, colIndex) {
            var liveNeighbors = getLiveNeighbors(grid, rowIndex, colIndex);
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
var createBlinker = function () {
    var board = Array.from({ length: 10 }, function () { return Array(10).fill(0); });
    // הצבת התבנית "Blinker" (קו אנכי של 1 במרכז)
    board[4][4] = 1;
    board[5][4] = 1;
    board[6][4] = 1;
    return board;
};
// Run the game
var runGame = function (iterations, grid) {
    printGrid(grid);
    for (var i = 0; i < iterations; i++) {
        grid = nextGeneration(grid);
        printGrid(grid);
        // Add a delay between generations for better visualization
        var delay = 500;
        var now = Date.now();
        while (Date.now() - now < delay) { } // Blocking delay to slow down the output
    }
};
function askDimensions() {
    return new Promise(function (resolve, reject) {
        rl.question("Enter the number of rows: ", function (rows) {
            rl.question("Enter the number of columns: ", function (columns) {
                var numRows = parseInt(rows);
                var numColumns = parseInt(columns);
                // יצירת מערך דו-ממדי בגודל שנבחר
                var array = Array.from({ length: numRows }, function () {
                    return Array(numColumns).fill(0);
                });
                // קריאה לפונקציה להכניס ערכים לכל תא במערך
                askArrayValues(array, 0, 0)
                    .then(function () {
                    resolve(array); // החזרת המערך אחרי שסיימנו עם כל הקלט
                })
                    .catch(function (error) {
                    reject(error); // טיפול בשגיאות
                });
            });
        });
    });
}
// פונקציה לבקש ערכים מהמשתמש לכל תא במערך
function askArrayValues(array, row, col) {
    return new Promise(function (resolve, reject) {
        if (row < array.length) {
            if (col < array[row].length) {
                rl.question("Enter value for cell [".concat(row, ", ").concat(col, "]: "), function (value) {
                    array[row][col] = parseInt(value); // שמירת הערך במערך
                    askArrayValues(array, row, col + 1)
                        .then(resolve)
                        .catch(reject); // המשך לעמודה הבאה
                });
            }
            else {
                askArrayValues(array, row + 1, 0)
                    .then(resolve)
                    .catch(reject); // המעבר לשורה הבאה
            }
        }
        else {
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
    .then(function (array) {
    rl.close();
    console.log("Final array:");
    runGame(20, array);
})
    .catch(function (error) {
    rl.close();
});
