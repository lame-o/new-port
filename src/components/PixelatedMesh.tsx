import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { pixelationVertexShader, pixelationFragmentShader } from '../shaders/pixelation'

const PixelatedMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    if (meshRef.current) {
      const material = new THREE.ShaderMaterial({
        vertexShader: pixelationVertexShader,
        fragmentShader: pixelationFragmentShader,
        uniforms: {
          pixelSize: { value: 8.0 },
          resolution: { value: new THREE.Vector2(size.width, size.height) }
        }
      })
      
      shaderRef.current = material
      meshRef.current.material = material
    }
  }, [size])

  useFrame((state) => {
    if (shaderRef.current) {
      // Update uniforms here if needed
      shaderRef.current.uniforms.pixelSize.value = 8.0 + Math.sin(state.clock.elapsedTime) * 4.0
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  )
}

export default PixelatedMesh
