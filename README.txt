 תא חי עם פחות מ-2 שכנים חיים (תת-אוכלוסיה)
תא חי שמתברר כי יש לו פחות מ-2 תאים חיים לידו ימות, מכיוון שהוא סובל מתת-אוכלוסיה (אין מספיק תאים חיים סביבו).

2. תא חי עם 2 או 3 שכנים חיים
תא חי שימשיך להתקיים אם יש לו בדיוק 2 או 3 תאים חיים מסביבו (שימשיך להיות חי בגנראציה הבאה).

3. תא חי עם יותר מ-3 שכנים חיים (עודף אוכלוסייה)
תא חי שימשיך להתקיים רק אם יש לו בדיוק 2 או 3 תאים חיים לידו. אם יש יותר מ-3 תאים חיים לידו, הוא ימות עקב "עודף אוכלוסייה".

4. תא מת עם בדיוק 3 שכנים חיים (רבייה)
תא מת יהפוך לתא חי אם יש לו בדיוק 3 תאים חיים בסביבה שלו (נוצר מצב של רבייה).

סיכום החוקים:
תא חי עם 2 או 3 שכנים חיים – נשאר חי.

תא חי עם פחות מ-2 או יותר מ-3 שכנים חיים – מת.

תא מת עם בדיוק 3 שכנים חיים – הופך לחי.

English
## Rules
1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (overpopulation).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

## Getting Started

### Prerequisites
1. Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
2. TypeScript installed globally or via `npm install typescript --save-dev`.

### How to Run the Game
1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/game-of-life.git
   cd game-of-life

2   npm install

3 npx tsc gameOfLife.ts

4 node gameOfLife.js
