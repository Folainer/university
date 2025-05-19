import * as THREE from 'three'

interface BoxProps {
    position?: THREE.Vector3Tuple
    size?: THREE.Vector3Tuple
    color?: THREE.ColorRepresentation
  }

const CustomBox : React.FC<BoxProps> = ({position, size, color}) => {
    return (
        <mesh position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default CustomBox