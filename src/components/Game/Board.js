
import { GizmoHelper, GizmoViewport, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { useControls } from 'leva'

const cardHeight = 1;
const cardWidth = 0.5;
const gapHeight = 0.2;
const fieldHeight = cardHeight * 6 + (gapHeight * 4 ) + 0.3
const fieldWidth = cardWidth * 12

function CardField({ position }) {
    // const cardTexture = useTexture('path/to/cardTexture.png');
    const { cardRotation, color, visible } = useControls('cards', {

        cardRotation: {
            value: [0, 0, 0],
            step: 0.1,
            joystick: 'invertY'
        },
        color: "#5348be",
        visible: true
    })

    return (
        <Plane args={[cardWidth, cardHeight]} position={position} rotation={cardRotation}>
            <meshBasicMaterial color={color} />
        </Plane>
    );
}

export default function Board({ gameStore }) {
    const leftField = useMemo(() => {
        const leftCards = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 6; j++) {
                leftCards.push(<CardField key={`left-${i}-${j}`} position={[i, j + 0.2 ,0.2]} />);
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

    const { planeRotation, planePosition, color, visible } = useControls('field', {
        planePosition: {
            value: [0, 0, 0],
            step: 0.1,
            joystick: 'invertY'
        },
        planeRotation: {
            value: [0, 0, 0],
            step: 0.1,
            joystick: 'invertY'
        },
        color: "#c179c1",
        visible: true
    })

    return (
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 50,
                position: [0, 0, 10]
            }}
        >
            <OrbitControls />
            <GizmoHelper
                alignment="bottom-right" // widget alignment within scene
                margin={[80, 80]} // widget margins (X, Y)
            >
                <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                {/* alternative: <GizmoViewcube /> */}
            </GizmoHelper>
            <ambientLight />
            <Plane args={[fieldWidth, fieldHeight]}
                visible={visible}
                material-color={color}
                position={planePosition} rotation={planeRotation} ma />
                {leftField}
        </Canvas>

    );
}
