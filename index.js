const cols = 60,
  rows = 7;
const raw = [
  "01110 10000 01110 10001 11111 10001 01110 10001",
  "00100 10000 10001 10001 10000 10001 10001 10001",
  "00100 10000 10001 10001 11110 11111 10001 10001",
  "00100 10000 10001 01010 10000 00100 10001 10001",
  "00100 10000 10001 01010 10000 00100 10001 10001",
  "00100 10000 10001 00100 10000 00100 10001 10001",
  "01110 11111 01110 00100 11111 00100 01110 01110",
];
const pattern = raw.map((r) => r.replace(/ /g, "0").padEnd(cols, "0"));

const grid = document.getElementById("grid");
// create all cells up front
const cells = [];
for (let r = 0; r < rows; r++) {
  cells[r] = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
    cells[r][c] = cell;
  }
}

// Define letter column ranges (start, end) for I, L, O, V, E, Y, O, U
const letterRanges = [
  [0, 4], // I
  [6, 10], // L
  [12, 16], // O
  [18, 22], // V
  [24, 28], // E
  [30, 34], // Y
  [36, 40], // O
  [42, 46], // U
];

// Build pixel lists for each letter
const letterPixels = letterRanges.map(([start, end]) => {
  const pixels = [];
  for (let r = 0; r < rows; r++) {
    for (let c = start; c <= end; c++) {
      if (pattern[r][c] === "1") {
        pixels.push({ r, c });
      }
    }
  }
  return pixels;
});

// Reveal each letter one by one, pixel-by-pixel
const pixelDelay = 80; // ms between pixels
let totalDelay = 0;
letterPixels.forEach((pixels) => {
  pixels.forEach((pix, i) => {
    setTimeout(() => {
      cells[pix.r][pix.c].classList.add("on");
    }, totalDelay + i * pixelDelay);
  });
  totalDelay += pixels.length * pixelDelay;
});
