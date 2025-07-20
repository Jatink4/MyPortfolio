// DrawingBoard.jsx
import React, { useRef, useState } from "react";

const tools = ["pencil", "eraser", "rectangle", "circle", "line", "text", "fill"];
const sizes = [2, 4, 6, 8, 10, 15, 20];

const extendedColors = [
  "#000000", "#4B5563", "#9CA3AF", "#D1D5DB", "#FFFFFF",
  "#FF0000", "#DC2626", "#F87171", "#FCA5A5", "#FEE2E2",
  "#FFA500", "#F97316", "#FDBA74", "#FED7AA", "#FFF7ED",
  "#FFFF00", "#EAB308", "#FACC15", "#FEF08A", "#FEFCE8",
  "#008000", "#16A34A", "#86EFAC", "#BBF7D0", "#ECFDF5",
  "#0000FF", "#2563EB", "#60A5FA", "#93C5FD", "#DBEAFE",
  "#800080", "#7C3AED", "#A78BFA", "#C4B5FD", "#EDE9FE"
];

export const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [startPos, setStartPos] = useState(null);
  const [scale, setScale] = useState(1);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / scale),
      y: Math.floor((e.clientY - rect.top) / scale),
    };
  };

  const floodFill = (x, y, fillColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const index = (x, y) => (y * canvas.width + x) * 4;

    const targetColor = data.slice(index(x, y), index(x, y) + 4);
    const fillR = parseInt(fillColor.slice(1, 3), 16);
    const fillG = parseInt(fillColor.slice(3, 5), 16);
    const fillB = parseInt(fillColor.slice(5, 7), 16);

    const matchColor = (i) =>
      data[i] === targetColor[0] &&
      data[i + 1] === targetColor[1] &&
      data[i + 2] === targetColor[2] &&
      data[i + 3] === targetColor[3];

    const colorPixel = (i) => {
      data[i] = fillR;
      data[i + 1] = fillG;
      data[i + 2] = fillB;
      data[i + 3] = 255;
    };

    const stack = [[x, y]];

    while (stack.length) {
      const [cx, cy] = stack.pop();
      let i = index(cx, cy);
      if (!matchColor(i)) continue;
      colorPixel(i);

      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < canvas.width - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < canvas.height - 1) stack.push([cx, cy + 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const startDrawing = (e) => {
    const pos = getMousePos(e);
    setStartPos(pos);
    const ctx = canvasRef.current.getContext("2d");
    if (tool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        ctx.fillStyle = color;
        ctx.font = `${brushSize * 5}px sans-serif`;
        ctx.fillText(text, pos.x, pos.y);
      }
      return;
    }
    if (tool === "fill") {
      floodFill(pos.x, pos.y, color);
      return;
    }
    if (tool !== "pencil" && tool !== "eraser") {
      setIsDrawing(true);
      return;
    }
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const ctx = canvasRef.current.getContext("2d");
    const pos = getMousePos(e);
    if (tool !== "pencil" && tool !== "eraser") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (tool === "rectangle") {
        ctx.rect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y);
      } else if (tool === "circle") {
        const radius = Math.hypot(pos.x - startPos.x, pos.y - startPos.y);
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      } else if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
    }
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing || tool === "text" || tool === "fill" || tool === "rectangle" || tool === "circle" || tool === "line") return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getMousePos(e);

    ctx.strokeStyle = tool === "eraser" ? "white" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  return (
    
  <div className="flex flex-col items-center p-4 gap-4 text-white mt-10 w-full max-w-full overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl text-amber-300 font-bold text-center">Paint Board</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 justify-center w-full">
        {/* Tool Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tools.map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={`px-3 py-1 rounded text-sm ${
                tool === t ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <div className="grid grid-cols-10 gap-1 justify-center">
          {extendedColors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white"
              style={{ backgroundColor: c }}
            ></button>
          ))}
        </div>

        {/* Size Select & Actions */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <select
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="border border-yellow-400 text-white bg-gray-800 px-2 py-1 rounded text-sm"
          >
            {sizes.map((s) => (
              <option key={s} value={s} className="bg-gray-800">
                {s}px
              </option>
            ))}
          </select>

          <button className="bg-yellow-400 text-black px-2 py-1 rounded text-sm" onClick={zoomIn}>
            Zoom In
          </button>
          <button className="bg-yellow-400 text-black px-2 py-1 rounded text-sm" onClick={zoomOut}>
            Zoom Out
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded text-sm" onClick={clearCanvas}>
            Clear
          </button>
          <button className="bg-green-600 text-white px-2 py-1 rounded text-sm" onClick={saveImage}>
            Save as PNG
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="w-full overflow-x-auto border-2 border-gray-400 bg-white rounded">
  <div
    className="mx-auto"
    style={{
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `min(80vw, ${800 * scale}px)`,
      height: `${500 * scale}px`,
    }}
  >
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      className="cursor-crosshair block w-full h-auto"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  </div>
</div>

  </div>


  );
};