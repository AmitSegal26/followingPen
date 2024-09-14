const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clean-btn");
const ctx = canvas.getContext("2d");
const colorBar = document.getElementById("color-bar");
const printBtn = document.getElementById("print-btn");

window.addEventListener("load", () => {
  if (window.innerWidth < 1200) {
    if (
      window.confirm(
        "The app is available on PC only! \nYou can use the mobile version by clicking 'ok'"
      )
    ) {
      window.location.href =
        "https://amitsegal26.github.io/following-pen-mobile/";
    }
  }
});
// print the canvas
printBtn.addEventListener("click", () => {
  let dataURL = canvas.toDataURL();
  let windowContent = "<!DOCTYPE html>";
  windowContent += "<html>";
  windowContent += "<head><title>Your Drawing 😁</title></head>";
  windowContent += `
  <style>
    @media print {
      @page {
        size: landscape;
        color: auto;
        margin: 0; /* Remove default margins */
      }
      body, html {
        height: 100%;
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        margin: 0; /* Remove default margins */
        padding: 0;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      img {
        max-width: 98vw; /* Larger image: 98% of viewport width */
        max-height: 98vh; /* Larger image: 98% of viewport height */
        object-fit: contain; /* Maintain aspect ratio */
        page-break-inside: avoid;
      }
    }
  </style>
`;
  windowContent += "<body>";
  windowContent += '<img src="' + dataURL + '">';
  windowContent += "</body>";
  windowContent += "</html>";
  let printWin = window.open(
    "",
    "",
    `width=${screen.width},height=${screen.height}, fullscreen=yes`
  );
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  printWin.close();
});
let initialColorValue = "000";
let painting = false;
const convertToHexadecimal = (num) => {
  let stringedNum = num.toString("16");
  return `#${stringedNum.padStart(6, "0")}`;
};

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.height = parseInt(
  window.getComputedStyle(document.getElementById("canvas-container")).height,
  10
);
canvas.width = parseInt(
  window.getComputedStyle(document.getElementById("canvas-container")).width,
  10
);

ctx.lineWidth = 5;
const lineJoinCapArr = ["round", "bevel", "miter"];
const chosenLineJoinCap = lineJoinCapArr[0];
ctx.lineJoin = chosenLineJoinCap;
ctx.lineCap = chosenLineJoinCap;
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

  const remainderOfY = 290;
  ctx.lineTo(e.clientX, e.clientY - remainderOfY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - remainderOfY);
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
