import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import '../App.css'

function Box({ text, color, ...props }) {
  const [hovered, set] = useState(false)
  return (
    <mesh {...props} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
      <boxGeometry args={[2, 2, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
    </mesh>
  )
}

function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree()
  const group = useRef()
  useFrame((state, delta) => {
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, viewport.height * scroll.current, 4, delta)
    // Or: group.current.position.lerp(vec.set(0, viewport.height * scroll.current, 0), 0.1)
  })
  return <group ref={group}>{children}</group>
}

function Scene() {
  const viewport = useThree((state) => state.viewport)
  //or const { viewport } = useThree()
  return (
    <>
      <Box text={<span style={{ backgroundColor: 'red' }}>This is HTML</span>} color="aquamarine" />
      <Box text={<h1>H1 caption</h1>} color="lightblue" position={[0, -viewport.height, 0]} />
      <Box text={<h1>H2 caption</h1>} color="aquamarine" position={[0, -viewport.height/3, 0]} />
    </>
  )
}

function ScrollCom() {
  const scrollRef = useRef()
  const scroll = useRef(0)
  console.log('scroll useRef',scroll)
  return (
    <>
    <div style={{height:'1000px'}}>
    <Canvas
        onCreated={(state) => state.events.connect(scrollRef.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <ScrollContainer scroll={scroll}>
          <Scene />
        </ScrollContainer>
      </Canvas>
    </div>
     
      <div
        ref={scrollRef}
        onScroll={(e) => (scroll.current = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight))}
        className="scroll">
        <div style={{ height: `1000px`, pointerEvents: 'none' }}></div>
      </div>
    </>
  )
}

export default ScrollCom

// ReactDOM.render(<App />, document.getElementById('root'))
