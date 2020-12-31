import React, { useState, useEffect } from 'react';

// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { extend as applyThree, Canvas } from 'react-three-fiber';

// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring } from 'react-spring/three';
import './styles.css';
import Scene from '../components/Scene';

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from '../helpers/postprocessing/EffectComposer';
import { RenderPass } from '../helpers/postprocessing/RenderPass';
import { GlitchPass } from '../helpers/postprocessing/GlitchPass';
applySpring({ EffectComposer, RenderPass, GlitchPass });
applyThree({ EffectComposer, RenderPass, GlitchPass });

const IN = 'In...';
const OUT = 'Out...';

/** Main component */
export default function Main() {
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  const [breath, setBreath] = useState('...');
  const [text, setText] = useState('Get Ready');

  useEffect(() => {
    const interval = setInterval(() => {
      setBreath((breath) => (breath === IN ? OUT : IN));
      setText('Breathe');
    }, 3500);

    return () => clearInterval(interval);
  });

  return (
    <Canvas className='canvas' style={{ height: '100vh' }}>
      <Scene top={top} mouse={mouse} text1={text} text2={breath} />
    </Canvas>
  );
}
