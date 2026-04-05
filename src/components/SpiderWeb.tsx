import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SpiderWeb({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  // Generate random points in a sphere
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    return [pos, vel];
  }, [count]);

  // Pre-allocate memory for lines. Maximum possible lines if all connect is very large,
  // but we'll cap it to say 1000 lines.
  const maxLines = 1000;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;

    // Move points
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Simple box bounds bounce
      if (Math.abs(positions[i * 3]) > 5) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    // Make lines between close points
    let lineIndex = 0;
    // Optional: make it react to mouse
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 3 && lineIndex < maxLines) {
          linePositions[lineIndex * 6] = positions[i * 3];
          linePositions[lineIndex * 6 + 1] = positions[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = positions[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = positions[j * 3];
          linePositions[lineIndex * 6 + 4] = positions[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = positions[j * 3 + 2];
          lineIndex++;
        }
      }

      // Mouse interaction
      const mDx = positions[i * 3] - mouseX;
      const mDy = positions[i * 3 + 1] - mouseY;
      const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
      if (mDist < 2) {
        positions[i * 3] += mDx * 0.02;
        positions[i * 3 + 1] += mDy * 0.02;
      }
    }

    const linePosAttr = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    // Fill the rest with degenerate lines (0,0,0) to not draw them
    for (let i = lineIndex; i < maxLines; i++) {
      linePositions[i * 6] = 0;
      linePositions[i * 6 + 1] = 0;
      linePositions[i * 6 + 2] = 0;
      linePositions[i * 6 + 3] = 0;
      linePositions[i * 6 + 4] = 0;
      linePositions[i * 6 + 5] = 0;
    }

    linePosAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);

    // Slight rotation
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    linesRef.current.rotation.x += 0.0005;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fff"
          size={0.05}
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[array, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#E23636" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}
