import { useRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/* -------------- Simple skyline generator -------------- */
function useSkyline(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    const layers = [1, 2, 3, 4, 5].map(layer => ({
      spd : 0.7 * layer*3,                    // parallax speed
      bld : Array.from({ length: 60 }, () => ({
        w: 20 + layer*12 + Math.random()*20,
        h: 80 + Math.random()*200 - layer*15,
      })),
      color: `hsl(220, ${20 + layer * 5}%, ${25 - layer * 3}%)`,
      x: 0
    }));

    let mouseX = 0;
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX / W;
    });

    function draw(t) {
      ctx.clearRect(0,0,W,H);
      layers.forEach(L => {
        L.x -= L.spd * (mouseX+0.3);         // scroll with mouse
        if (L.x < -W) L.x += W;
        ctx.save();
        ctx.translate(L.x, 0);
        ctx.fillStyle = L.color;
        L.bld.forEach((b,i) => {
          const x = i * (W / L.bld.length);
          ctx.fillRect(x, H - b.h, b.w, b.h);
        });
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);
}

/* -------------- Ratings helpers -------------- */
const getCF = h =>
  fetch(`https://codeforces.com/api/user.info?handles=${h}`)
    .then(r=>r.json()).then(d=>d.result[0]);
const getCC = u =>
  fetch(`http://localhost:5000/api/codechef/${u}`)
    .then(r=>r.json());

/* -------------- Main component -------------- */
export default function Experience() {
  const canvasRef = useRef(null);
  useSkyline(canvasRef);
  const [choice, setChoice] = useState(null);

  const { data: cf } = useQuery({
    queryKey: ['cf'],
    queryFn: () => getCF('JK_Thakur'),
    enabled: choice === 'ratings',
  });
  const { data: cc } = useQuery({
    queryKey: ['cc'],
    queryFn: () => getCC('jatin4kumar'),
    enabled: choice === 'ratings',
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 text-white overflow-x-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{
          background:
            'linear-gradient(to top, #adff2f 0%, #8a2be2 50%,#800080  100%)',
          zIndex: 0,
        }}
      />
      {/* Texture Layer */}
      <div
        className="fixed inset-0 opacity-60 z-0"
        style={{
          backgroundImage:
            "url('https://jackrugile.com/images/misc/skyline-texture.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-5xl text-center mt-20 mb-24 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
          {choice
            ? choice === 'ratings'
              ? 'Live Ratings'
              : 'Experience'
            : 'What do you want to know about Jatin?'}
        </h1>

        {!choice && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
            <button
              onClick={() => setChoice('exp')}
              className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition border-2"
            >
              Experience
            </button>
            <button
              onClick={() => setChoice('ratings')}
              className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition border-2"
            >
              Ratings
            </button>
          </div>
        )}

        {choice === 'exp' && (
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center ">
 <Card title={<a href="https://www.abilitygate.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ability Gate</a>}>
  <div className="text-left">
    I worked as a <strong>freelancer</strong> to build a <strong>full-stack hospital management system</strong> for Ability Gate.  
    Key features include:
    <ul className="list-disc list-inside mt-2">
      <li>QR-based payment system with admin-side verification</li>
      <li>Login/Logout functionality with secure authentication</li>
      <li>“Wall of Honors”, Internships, and Government Policy pages</li>
      <li>Colorful UI with animations and prescription upload</li>
      <li>Patient history tracking system</li>
    </ul>
  </div>
</Card>

<Card title={<a href="https://karunahealingmind.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Karuna Healing Mind (Intern)</a>}>
  <div className="text-left">
    Internship duration: <strong>May 2025 – June 2025</strong><br />
    I developed a <strong>full-stack website</strong> using the MERN stack.
    Key features include:
    <ul className="list-disc list-inside mt-2">
      <li>Login/Logout with bcrypt-secured authentication</li>
      <li>Email verification using Nodemailer</li>
      <li>Admin and Doctor dashboards (with availability toggle)</li>
      <li>Blog system (add/edit/delete) managed by admin</li>
      <li>Services and multi-section About pages</li>
      <li>Contact page with embedded map</li>
      <li>Cloudinary media support and secure REST APIs</li>
    </ul>
  </div>
</Card>


          </div>
        )}

        {choice === 'ratings' && (
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <RatingCard platform="Codeforces" data={cf} />
            <RatingCard platform="CodeChef" data={cc} />
          </div>
        )}
      </div>

      {/* Back Button - Fixed at Bottom Center */}
      {choice && (
        <div className="absolute bottom-6 w-full flex justify-center z-20 px-4">
          <button
            className="text-white bg-black/60 hover:bg-black px-6 py-2 rounded-lg transition"
            onClick={() => setChoice(null)}
          >
            ⬅ Back
          </button>
        </div>
      )}
    </section>
  );
}


/* ---------- small helpers ---------- */
function Card({title, children}) {
  return (
    <div className=" p-6 bg-white/70 border-2 border-black rounded-xl mb-10">
      <h2 className="text-2xl font-semibold mb-2 text-blue-800 underline">{title}</h2>
      <p className="text-sky-800">{children}</p>
    </div>
  );
}
function RatingCard({ platform, data }) {
  if (!data) return <p className="text-black">Loading {platform}…</p>;
  const fields = platform === 'Codeforces'
    ? ['rating', 'maxRating', 'rank']
    : ['rating', 'stars'];

  return (
    <div className="p-6 bg-white/70 border-2 border-black rounded-xl">
      <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-900 to-fuchsia-800 bg-clip-text text-transparent">
        {platform}
      </h2>
      {fields.map(k => (
        <p key={k} className="text-black">
          {`${k[0].toUpperCase() + k.slice(1)}: ${data[k]}`}
        </p>
      ))}
    </div>
  );
}

