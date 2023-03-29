import { GizmoHelper, GizmoViewport, OrbitControls, Plane, Text } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { useControls } from 'leva'
import * as THREE from "three"

const cardHeight = 1;
const cardWidth = 0.5;
const gapHeight = 0.2;
const fieldHeight = (cardHeight * 6 + (gapHeight * 4) + 0.3) * 6
const fieldWidth = (cardWidth * 12 + (gapHeight * 10) + 0.3) * 6
const planePadding = 0.1

function CardField({ position, index, color }) {
    // const cardTexture = useTexture('path/to/cardTexture.png');
    const { cardRotation } = useControls('cards', {

        cardRotation: {
            value: [0, 0, 0],
            step: 0.1,
            joystick: 'invertY'
        }
    })

    return (
        <Plane args={[cardWidth, cardHeight]} position={position} rotation={cardRotation}>
            <Text scale={0.2} anchorX="center" anchorY="middle" position-z={0.2} color="black">{index}</Text>
            <meshBasicMaterial color={color} />
        </Plane>
    );
}

function FogEffect() {
    const { scene } = useThree();
    scene.fog = new THREE.Fog("white", 25, 30);
    return null;
  }

export default function Board({ gameStore }) {
    function generateCardFields(startColumn, endColumn, isIndexed = false, cardColor = undefined) {
        const cards = [];
        let cardIndex = 1;
        for (let row = 0; row < 6; row++) {
            for (let column = startColumn; column < endColumn; column++) {
                const xPos = column * (cardWidth + gapHeight) - fieldWidth / 12 + cardWidth / 2 + planePadding;
                const yPos = row * (cardHeight + gapHeight) - fieldHeight / 12 + cardHeight / 2 + planePadding;
                cards.push(
                    <CardField
                        key={`${column}-${row}`}
                        position={[xPos, yPos, 0.1]}
                        index={isIndexed ? cardIndex : undefined}
                        color={cardColor}
                    />
                );
                if (isIndexed) {
                    cardIndex++;
                }
            }
        }
        return cards;
    }
    
    const leftField = useMemo(() => generateCardFields(0, 2, true), []);
    const flancCoco = useMemo(() => generateCardFields(2, 3, false, "black"), []);
    const middleField = useMemo(() => generateCardFields(3, 7, true), []);
    const flancPomme = useMemo(() => generateCardFields(7, 8, false, "black"), []);
    const rightField = useMemo(() => generateCardFields(8, 11, true), []);

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
        color: "#6db766",
        visible: true
    })

    const { groupRotation, groupPosition } = useControls('group', {
        groupPosition: {
            value: [0, 0.5, 0],
            step: 0.1,
            joystick: 'invertY'
        },
        groupRotation: {
            value: [-0.5, 0, 0],
            step: 0.1,
            joystick: 'invertY'
        },
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
            <FogEffect />
            <group position={groupPosition} rotation={groupRotation}>
                <Plane args={[fieldWidth, fieldHeight]}
                    visible={visible}
                    material-color={color}
                    position={planePosition} rotation={planeRotation} />
                {leftField}
                {flancCoco}
                {middleField}
                {flancPomme}
                {rightField}
            </group>
        </Canvas>

    );
}
