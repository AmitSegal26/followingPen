const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clean-btn");
const ctx = canvas.getContext("2d");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
let initialColorValue = "000";
let painting = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const convertToHexadecimal = (num) => {
  let stringedNum = num.toString("16");
  return stringedNum.length === 3
    ? `#000${stringedNum}`
    : stringedNum.length === 4
    ? `#00${stringedNum}`
    : stringedNum.length === 5
    ? `#0${stringedNum}`
    : `#${stringedNum}`;
};
const convertBackToDecimal = (hexNum) => parseInt(hexNum.replace("#", ""), 16);
const changeColorValue = () => convertBackToDecimal(ctx.strokeStyle) + 1000;

ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = convertToHexadecimal(initialColorValue);

const draw = (e) => {
  if (!painting) return;

  ctx.lineTo(e.clientX, e.clientY - 80);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - 80);
};
const startPosition = (e) => {
  painting = true;
  draw(e);
};
const endPosition = () => {
  painting = false;
  ctx.beginPath();
  //! change color here (ADD FUNCTION)
  ctx.strokeStyle = convertToHexadecimal(changeColorValue());
};
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
