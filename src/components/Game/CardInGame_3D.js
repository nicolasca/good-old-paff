import { Image, Plane } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { useState } from "react"



export const CardInGame_3D = ({ defaultStart = [2, 1, 0], path }) => {
    const controls = useThree((state) => state.controls)
    const [active, setActive] = useState(false)
    const [position, setPosition] = useState(defaultStart)

    const { width} = useThree((state) => state.viewport)
    const w = width / 4.7 * 1.2

    return (
        <Image 
            url={path}
            scale={[w / 2, w / 2 * 1.4, 1]}
            renderOrder={1000}
            position={position}
            rotation={[0, 0, 0]}
            onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
            onPointerLeave={ () => { document.body.style.cursor = 'default' } }
            onPointerDown={(event) => {
                event.stopPropagation()
                event.target.setPointerCapture(event.pointerId)
                controls.enabled = false
                setActive(true)
            }}
            onPointerUp={() => {
                setActive(false)
                controls.enabled = true
            }}
            onPointerMove={(event) => {
                if (active) {
                    setPosition(event.point)
                }
            }}
        />

    )
}