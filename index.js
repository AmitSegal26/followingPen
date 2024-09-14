const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clean-btn");
const ctx = canvas.getContext("2d");
const colorBar = document.getElementById("color-bar");

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
let initialColorValue = "000";
let painting = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const convertToHexadecimal = (num) => {
  let stringedNum = num.toString("16");
  return `#${stringedNum.padStart(6, "0")}`;
};
const convertBackToDecimal = (hexNum) => parseInt(hexNum.replace("#", ""), 16);
const changeColorValue = () => convertBackToDecimal(ctx.strokeStyle) + 1000;
ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = convertToHexadecimal(initialColorValue);

for (let i = 0; i < 360; i++) {
  const barWidth = window.innerWidth / 360;
  let colorValueText = `hsl(${i}, 100%, 50%)`;
  const colorDiv = document.createElement("div");
  colorDiv.id = `${i}`;
  colorDiv.style.width = `${barWidth}px`;
  colorDiv.style.backgroundColor = colorValueText;
  colorDiv.style.cursor = "pointer";
  colorBar.appendChild(colorDiv);
  colorDiv.addEventListener("click", () => {
    const childrenArray = Array.from(colorBar.children);
    // reset the other nodes (colors in colorbar)
    childrenArray.forEach((element) => {
      element.style.border = "none";
    });
    //* empethizes the chosen color on the color bar
    colorDiv.style.border = "2px solid black";

    document.getElementById("preview").style.backgroundColor = colorValueText;
    ctx.strokeStyle = colorValueText;
  });
}
const draw = (e) => {
  if (!painting) return;

  ctx.lineTo(e.clientX, e.clientY - 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - 100);
};
const startPosition = (e) => {
  painting = true;
  draw(e);
};
const endPosition = () => {
  painting = false;
  ctx.beginPath();
};

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
