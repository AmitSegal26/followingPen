const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false;

console.log("here");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "black";

const draw = (e) => {
  if (!painting) return;

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
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
