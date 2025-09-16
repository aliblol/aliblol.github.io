import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

interface BookProps {
  position: [number, number, number];
  color: string;
}

function Book({ position, color }: BookProps) {
  const bookRef = useRef<Mesh | null>(null);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      ref={bookRef}
      position={position}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      <boxGeometry args={[0.6, 1, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Bookshelf() {
  return (
    <div id='canvas-container'>

    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Book position={[-1, 0, 0]} color="red" />
      <Book position={[0, 0, 0]} color="blue" />
      <Book position={[1, 0, 0]} color="green" />
    </Canvas>
    </div>
  );
}
