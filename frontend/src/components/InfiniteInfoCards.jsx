// components/Carousel3D.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router

const cards = [
  { img: "/1.png", route: "/about" },
  { img: "/2.png", route: "/" },
  { img: "/3.png", route: "/contact" },
  { img: "/5.png", route: "/experience" },
  { img: "/4.png", route: "/projects" },
];

export default function Carousel3D() {
  const ringRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const navigate = useNavigate(); // for routing

  const radius = 250;
  const angleStep = 360 / cards.length;

  // Auto rotate (optional)
  useEffect(() => {
    const autoRotate = setInterval(() => {
      setAngle((prev) => prev + 0.2);
    }, 16); // ~60fps
    return () => clearInterval(autoRotate);
  }, []);

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${angle}deg)`;
    }
  }, [angle]);

  const rotateLeft = () => setAngle((prev) => prev - angleStep);

  return (
    <div className="w-full   flex flex-col items-center justify-center overflow-hidden relative">
      {/* 3D Ring */}
      <div
        ref={ringRef}
        className="relative w-[500px] h-[400px] flex items-center justify-center"
        style={{
          perspective: "700px",
          transformStyle: "preserve-3d",
          transform: `rotateY(${angle}deg)`,
          transition: "transform 0.6s ease-out",
        }}
      >
        {cards.map((card, i) => {
          const angle = angleStep * i;
          const transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

          return (
            <div
              key={i}
              onClick={() => navigate(card.route)}
              className="absolute w-[160px] h-[220px] cursor-pointer overflow-hidden rounded-xl shadow-xl border-2 bor bg-gradient-to-br from-slate-700 to-slate-900"
              style={{
                transform,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={card.img}
                alt={`card-${i}`}
                className="w-auto h-full object-cover  transition-transform duration-300"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
     <button
  onClick={rotateLeft}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 
             text-black text-4xl bg-white backdrop-blur-md 
             hover:bg-white/50 px-4 py-2 rounded-full shadow-lg"
>
  ‹
</button>


    </div>
  );
}
