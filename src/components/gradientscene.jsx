import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { PerspectiveCamera, OrbitControls, useTexture, Sparkles } from "@react-three/drei";
import PlaneWithShader from "./planeShader";

const GradientScene = ({colorA,colorB,colorC,colorD}) => {
  const cameraRef = useRef();
  const [aspect, setAspect] = useState(1);
  const colors = [colorA, colorB, colorC, colorD]; // Example colors array
  // Update the aspect ratio when the window resizes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setAspect(window.innerWidth / window.innerHeight);
      };

      handleResize(); // Initialize aspect ratio on first render

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
<>
      <div className="w-full h-full top-0 left-0 absolute" style={{ zIndex: 0,pointerEvents:'none' }}>
        <Canvas
          gl={{ antialias: true }}
          shadows
        >
       
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 0.1]}
          />
          <fog args={["rgba(2, 6, 8, 1)", 30, 10]} attach="fog" />

          <PlaneWithShader colors={colors}/>
        </Canvas>
      </div>
      
</>
  );
};

export default GradientScene;
