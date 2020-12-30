import * as THREE from 'three/src/Three';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import {
  extend as applyThree,
  Canvas,
  useFrame,
  useThree,
} from 'react-three-fiber';

// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, a } from 'react-spring/three';
import './styles.css';
import Scene from '../components/Scene';

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from '../helpers/postprocessing/EffectComposer';
import { RenderPass } from '../helpers/postprocessing/RenderPass';
import { GlitchPass } from '../helpers/postprocessing/GlitchPass';
applySpring({ EffectComposer, RenderPass, GlitchPass });
applyThree({ EffectComposer, RenderPass, GlitchPass });

const IN = 'In';
const OUT = 'Out';

/** Main component */
export default function Main() {
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  const [breath, setBreath] = useState('in');
  const text1 = 'Breathe';

  useEffect(() => {
    const interval = setInterval(() => {
      setBreath((breath) => (breath === IN ? OUT : IN));
    }, 3500);

    return () => clearInterval(interval);
  });

  return (
    <Canvas className='canvas' style={{ height: '100vh' }}>
      <Scene top={top} mouse={mouse} text1={text1} text2={breath} />
    </Canvas>
  );
}
