import { useEffect, useRef } from "react";

function ParticleBackground({ theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationId;
        let mouse = { x: -9999, y: -9999 };
        let particles = [];

        const PARTICLE_COUNT = 100;
        const CONNECTION_DIST = 150;
        const MOUSE_DIST = 220;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 2 + 1,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = theme === "dark";
            const dotColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
            const lineColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";

            // Move particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
                        ctx.strokeStyle = lineColor + opacity + ")";
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw connections to mouse + draw particles
            for (const p of particles) {
                // Mouse connection
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_DIST) {
                    const opacity = (1 - dist / MOUSE_DIST) * 0.3;
                    ctx.strokeStyle = lineColor + opacity + ")";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                // Draw dot
                ctx.fillStyle = dotColor + "0.4)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        }

        function onMouseMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY + window.scrollY;
        }

        function onMouseLeave() {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        resize();
        createParticles();
        draw();

        window.addEventListener("resize", () => { resize(); createParticles(); });
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        // Observe body height changes to resize canvas
        const resizeObserver = new ResizeObserver(() => {
            canvas.height = document.documentElement.scrollHeight;
        });
        resizeObserver.observe(document.body);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            resizeObserver.disconnect();
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.8 }}
        />
    );
}

export default ParticleBackground;
