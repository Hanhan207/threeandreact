import './App.css';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import ScrollCom from './coms/scroll';
import Play from './coms/playwith';

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.z += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  return (
    <div>
      <div style={{height:'100px'}}>
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [5, 2, 10] }}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {/* <Box position={[-1.2, 0, 0]} /> */}
    <Box position={[0, 0, 0]} />
  </Canvas>
      </div>
 <div style={{height:'500px'}}>
 <ScrollCom/>
 </div>
  
    </div>
   
  );
}

export default App;
