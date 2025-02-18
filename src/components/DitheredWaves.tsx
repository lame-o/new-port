import { 
  OrthographicCamera,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

const fragmentShader = await import('../shaders/fragmentShader.glsl?raw');
const waveVertexShader = await import('../shaders/waveVertexShader.glsl?raw');
const waveFragmentShader = await import('../shaders/waveFragmentShader.glsl?raw');

const DPR = 1;

class CustomReceiptEffectImpl extends Effect {
  constructor({ pixelSize = 8.0 }) {
    const uniforms = new Map([['pixelSize', new THREE.Uniform(pixelSize)]]);

    super('CustomReceiptEffect', fragmentShader.default, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
  }
}

const CustomReceiptEffect = wrapEffect(CustomReceiptEffectImpl);

const ReceiptEffect = () => {
  const effectRef = useRef();
  const pixelSize = 8.0;

  useFrame(() => {
    if (effectRef.current) {
      effectRef.current.pixelSize = pixelSize;
    }
  });

  return (
    <EffectComposer>
      <CustomReceiptEffect ref={effectRef} pixelSize={pixelSize} />
    </EffectComposer>
  );
};

const DitheredWaves = () => {
  const mesh = useRef<THREE.Mesh>();
  const { viewport } = useThree();

  const uniforms = {
    time: {
      value: 0.0,
    },
    resolution: new THREE.Uniform(new THREE.Vector2()),
  };

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
      (mesh.current.material as THREE.ShaderMaterial).uniforms.resolution.value = new THREE.Vector2(
        window.innerWidth * DPR,
        window.innerHeight * DPR
      );
    }
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 1]}
        zoom={100}
        near={0.01}
        far={10}
      />
      <mesh ref={mesh} scale={[viewport.width * 1.5, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          key={uuidv4()}
          fragmentShader={waveFragmentShader.default}
          vertexShader={waveVertexShader.default}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
      <ReceiptEffect />
    </>
  );
};

export default DitheredWaves;
