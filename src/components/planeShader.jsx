import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Define the shader material
const FilmGrainShaderMaterial = shaderMaterial(
  {
    iResolution: new THREE.Vector3(1, 1, 1),
    iTime: 0,
    filmGrainIntensity: 0.1,
    color1: new THREE.Color(1.0, 0.0, 0.0), // Default red
    color2: new THREE.Color(0.0, 1.0, 0.0), // Default green
    color3: new THREE.Color(0.0, 0.0, 1.0), // Default blue
    color4: new THREE.Color(1.0, 1.0, 0.0), // Default yellow
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    #define filmGrainIntensity 0.1

    varying vec2 vUv;
    uniform vec3 iResolution;
    uniform float iTime;
    uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;

    mat2 Rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
    }

    vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
        return fract(sin(p) * 43758.5453);
    }

    float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        vec2 u = f * f * (3.0 - 2.0 * f);

        float n = mix(mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                          dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                      mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                          dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
        return 0.0 + 2.5 * n;
    }

    float filmGrainNoise(in vec2 uv) {
        return length(hash(vec2(uv.x, uv.y)));
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        float aspectRatio = iResolution.x / iResolution.y;

        // Center the UV coordinates
        vec2 tuv = uv - 0.5;

        // Adjust the X coordinate based on the aspect ratio
        tuv.x *= aspectRatio;

        // Rotate with noise
        float degree = noise(vec2(iTime * 0.2, tuv.y * -tuv.x));

        // Apply rotation matrix
        tuv *= Rot(radians((degree - 0.4) * 60.0 + 180.0));

        // Increase the size of the red color gradient
        tuv.y += 0.5; // Increase this value to make red larger

        // Define gradient colors
        vec3 lightRed = color1 ;
        vec3 darkRed = color2 ;
        vec3 lightBlue = color3 ;
        vec3 darkBlue = color4 ;

        // Interpolate between gradients with adjusted values
        float t = smoothstep(-0.2, 0.3, tuv.y); // Adjust these values to increase the size of red
        vec3 color = mix(lightBlue, lightRed, t);

        // Blend further to give smooth sides
        color = mix(color, darkBlue, smoothstep(-0.2, 1.0, abs(tuv.x)));

        // Apply film grain
        color = color - filmGrainNoise(uv) * filmGrainIntensity;

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend the shader material so it can be used as JSX
extend({ FilmGrainShaderMaterial });

const PlaneWithShader = ({colors}) => {
  const shaderRef = useRef();
  const [resolution, setResolution] = useState([window.innerWidth, window.innerHeight]);

  // Update screen resolution on window resize
  useEffect(() => {
    const handleResize = () => {
      setResolution([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update the time uniform to create animation
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.iTime = clock.getElapsedTime();
    }
  });

  // Convert colors from THREE.Color to vec3 format (scaled to 0-255)
  const convertColorToVec3 = (color) => {
    return new THREE.Vector3(
      color.r * 255,
      color.g * 255,
      color.b * 255
    );
  };

  const color1 = new THREE.Color(colors[0]);
  const color2 = new THREE.Color(colors[1]);
  const color3 = new THREE.Color(colors[2]);
  const color4 = new THREE.Color(colors[3]);

  return (
    <mesh>
      <planeGeometry args={[900, 100]} />
      <filmGrainShaderMaterial
        ref={shaderRef}
        iResolution={[resolution[0], resolution[1], 1]}
        color1={new THREE.Color(colors[0])}  // Converted to vec3
        color2={new THREE.Color(colors[1])}  // Converted to vec3
        color3={new THREE.Color(colors[2])}  // Converted to vec3
        color4={new THREE.Color(colors[3])}  // Converted to vec3
      />
    </mesh>
  );
};
{/* <GradientScene colorA={"#2BE12B"} colorB={"#2E3DFF"} colorC={"#0816C6"} colorD={"#F12865"}/></div> */}

const App = ({colors}) => {
  
  return (
      <PlaneWithShader colors={colors}/>
  );
};

export default App;