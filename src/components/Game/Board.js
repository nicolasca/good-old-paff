import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

function CardField({ position }) {
    // const cardTexture = useTexture('path/to/cardTexture.png');
  
    return (
      <Plane args={[1, 1]} position={position} >
        <meshBasicMaterial color={"red"}/>
      </Plane>
    );
  }
  
  export default function Board({ gameStore }) {
    const leftField = useMemo(() => {
      const leftCards = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
          leftCards.push(<CardField key={`left-${i}-${j}`} position={[i, 0, j+0.2]} />);
        }
      }
      return leftCards;
    }, []);
  
    const middleField = useMemo(() => {
      const middleCards = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 9; j++) {
          middleCards.push(<CardField key={`middle-${i}-${j}`} position={[i + 3, 0, j]} />);
        }
      }
      return middleCards;
    }, []);
  
    const rightField = useMemo(() => {
      const rightCards = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
          rightCards.push(<CardField key={`right-${i}-${j}`} position={[i + 9, 0, j]} />);
        }
      }
      return rightCards;
    }, []);
  
    return (
      <Canvas camera={{fov: 40}}>
        <ambientLight />
        <OrbitControls />
        <Plane args={[20, 20]} position={[0, -0.1, 0]} rotation-x={-Math.PI / 2} />
        <group position={[-3.5, 0, -4.5]} rotation-x={Math.PI / 2}>
          {leftField}
          {middleField}
          {rightField}
        </group>
      </Canvas>
    );
  }
  