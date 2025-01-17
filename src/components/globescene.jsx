'use client';

import React, { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import PlaneWithShader from "./planeShader";
import { Model } from "@/components/Iphone";

const GlobeScene = () => {
  const cameraRef = useRef();

  return (
    <>
      <div
        className="right-0 absolute w-[350px]  bottom-0 h-[500px] md:w-[600px] xl:w-[700px] text-black "
        style={{ zIndex: 2 }}
      >
        <Canvas gl={{ antialias: true }} shadows>
          <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 150]} />
          <fog args={["rgba(2, 6, 8, 1)", 30, 10]} attach="fog" />
          {/* <OrbitControls /> */}
          
          <directionalLight
            position={[400, 170, -400]}
            intensity={800.5}
            castShadow
          />
           <directionalLight
            position={[-400, 470, 100]}
            intensity={17.5}
            castShadow
          />
  <group >
   
  <group  rotation={[0,-17.7,-0.1]} position={[-30,-40,0]}>
              {/* <Model/> */}
    
  </group></group>
        </Canvas>
        
  
      </div>

    </>
  )}

    export default GlobeScene;



