// Define the size of the grid (can be adjusted) 1. הגדרת מידות הגריד
var gridWidth = 10;
var gridHeight = 10;
// Initialize the grid with random cells (0 = dead, 1 = alive) 1.  פונקציה createGrid - יצירת גריד התחלתי
var createGrid = function () {
    var grid = [];
    for (var i = 0; i < gridHeight; i++) {
        var row = [];
        for (var j = 0; j < gridWidth; j++) {
            row.push(Math.floor(Math.random() * 2)); // Random 0 or 1
        }
        grid.push(row);
    }
    return grid;
};
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
                newRow < gridHeight &&
                newCol >= 0 &&
                newCol < gridWidth) {
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
// Run the game
var runGame = function (iterations) {
    var grid = createGrid();
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
// Run the game for 20 iterations
runGame(20);
