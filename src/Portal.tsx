import { extend, Object3DNode, useLoader, useFrame, ThreeElements } from '@react-three/fiber'
import { useGLTF, Sparkles  } from '@react-three/drei'
import * as THREE from 'three'
import { glsl } from 'typed-glsl'
import Bulb from './Bulb'
import React from 'react'
import { Euler, Group, ShaderMaterial, Vector3 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export interface PortalProps {
    path: string,
    texturePath: string,
    rotation: Euler,
    position: Vector3,
    scale: Vector3
}

const Portal = ({path, texturePath, rotation, position, scale}: PortalProps) => {

    const firefliesScale = Float32Array.from({ length: 80 }, () => 0.5 + Math.random() * 5)
    const bakedTexture: any = useLoader(TextureLoader, texturePath)
    const { nodes }: any = useGLTF(path)
    //const portalMaterial = React.useRef<PortalMaterial>(null!);
    const portal = React.useRef<Group>(null!)
    
    return(
        <group ref={portal}>
            <Sparkles count={firefliesScale.length} size={firefliesScale} position={[-4, 4, 0]} scale={[10, 4, 10]} speed={0.3} />
            <mesh 
                geometry={nodes.portalLight.geometry} 
                position={[-3.8, 1.97, -4.2]} 
                rotation={[Math.PI / 2, 0, 0]}
                scale={scale}
            >
                <meshStandardMaterial color='hotpink' />
            </mesh>
            <mesh 
                geometry={nodes.poleLightA.geometry} 
                material-color="#f0bf94"
                position={[-1.036, 1.83, -1.03]}
                rotation={[Math.PI, 0, 0]}
                scale={scale} 
                >
                <Bulb position={[-1.036, 1.83, -1.03]}/>
            </mesh>
            <mesh 
                geometry={nodes.poleLightA.geometry} 
                material-color="#f0bf94" 
                position={[-6.186, 1.83, -1.03]}
                rotation={[Math.PI, 0, 0]}
                scale={scale}
            >
                    <Bulb position={[-6.186, 1.83, -1.03]}/>
            </mesh>
            <mesh geometry={nodes.baked.geometry} position={position} rotation={rotation} scale={scale}>
                <meshBasicMaterial map={bakedTexture} map-flipY={false} />
            </mesh>
        </group>
    )
} 

class PortalMaterial extends ShaderMaterial {
    constructor() {
      super({
        vertexShader: glsl`
        varying vec2 vUv;
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
          gl_Position = projectionPosition;
          vUv = uv;
        }`,
        fragmentShader: glsl`
        #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
        uniform float uTime;
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        varying vec2 vUv;
        void main() {
          vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
          float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
          float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
          strength += outerGlow;
          strength += step(-0.2, strength) * 0.8;
          strength = clamp(strength, 0.0, 1.0);
          vec3 color = mix(uColorStart, uColorEnd, strength);
          gl_FragColor = vec4(color, 1.0);
        }`,
        uniforms: { uTime: {value:0}, uColorStart: {value:new THREE.Color('black')}, uColorEnd: {value:new THREE.Color('white')} }
      })
    }
  }

extend({ PortalMaterial })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            portalMaterial: Object3DNode<PortalMaterial, typeof PortalMaterial>
        }
    }
}

export default Portal;