'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: any, camera: any, renderer: any, group: any;
    let mouseX = 0, mouseY = 0;

    const init = async () => {
      const THREE = await import('three');

      const w = window.innerWidth;
      const h = window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
      camera.position.z = 40;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // Create 3 particle layers — brand palette
      const createLayer = (count: number, hex: number, spread: number, size: number) => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
          pos[i] = (Math.random() - 0.5) * spread;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
          color: hex,
          size,
          transparent: true,
          opacity: 0.75,
          sizeAttenuation: true,
          depthWrite: false,
        });
        return new THREE.Points(geo, mat);
      };

      group = new THREE.Group();
      group.add(createLayer(350, 0x6366f1, 120, 0.13)); // indigo
      group.add(createLayer(200, 0x06b6d4, 150, 0.10)); // cyan
      group.add(createLayer(100, 0xf472b6, 90,  0.11)); // pink

      scene.add(group);

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      let t = 0;
      const animate = () => {
        animRef.current = requestAnimationFrame(animate);
        t += 0.0004;
        group.rotation.y = t + mouseX * 0.3;
        group.rotation.x = t * 0.3 + mouseY * 0.2;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(animRef.current);
      cleanup?.();
      renderer?.dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
