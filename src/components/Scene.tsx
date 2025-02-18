import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DitheredWaves from './DitheredWaves'

const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      dpr={[1, 2]}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <DitheredWaves />
    </Canvas>
  )
}

export default Scene
