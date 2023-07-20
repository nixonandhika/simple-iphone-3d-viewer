import { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, MeshReflectorMaterial } from '@react-three/drei';
import Iphone from './Iphone';

const defaultCustomColor = '#857592';

function App() {
  const [customColor, setCustomColor] = useState(defaultCustomColor);

  const onColorChange = useCallback((event) => {
    setCustomColor(event.target.value);
  }, []);

  const onVariantChange = useCallback((_variant) => {
    let back;

    switch (_variant) {
      case 'black':
        back = '#000000';
        break;
      case 'silver':
        back = '#ADADAD';
        break;
      case 'gold':
        back = '#BEA274';
        break;
      case 'purple':
        back = '#37313F';
        break;
      default:
        back = defaultCustomColor;
        break;
    }

    setCustomColor(back);
  }, []);

  return (
    <div className="App">
      <div className="product-canvas">
        <Suspense fallback={null}>
          <Canvas shadows className="canvas">
            <OrbitControls enablePan enableZoom enableRotate />
            <PerspectiveCamera makeDefault fov={60} position={[0, 1.5, 3]}/>

            <color args={[0, 0, 0]} attach="background" />

            <pointLight intensity={1} position={[15, 0, 0]}/>
            <pointLight intensity={1} position={[-15, 0, 0]}/>
            <pointLight intensity={1} position={[0, 0, 15]}/>
            <pointLight intensity={1} position={[0, 0, -15]}/>

            <spotLight intensity={0.5} angle={0.1} penumbra={0.5} position={[15, 15, 15]} castShadow />
            <spotLight intensity={0.5} angle={0.1} penumbra={0.5} position={[-15, 15, -15]} castShadow />
            <spotLight intensity={0.5} angle={0.1} penumbra={0.5} position={[15, 15, -15]} castShadow />
            <spotLight intensity={0.5} angle={0.1} penumbra={0.5} position={[-15, 15, 15]} castShadow />

            {/* Ground */}
            <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow position={[0, -1.25, 0]} material-color="#FFFFFF">
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial />
            </mesh>

            <Iphone scale={[12, 12, 12]} position={[0, -1, 0]} customColor={customColor} />
          </Canvas>
        </Suspense>
      </div>

      <div className="variants-section">
        <label className="label">Custom Color Picker:</label>
        <input type="color" value={customColor} onChange={onColorChange} />
      </div>

      <div className="chooser-title">Choose Variant</div>
      <div className="variants-section">
        <button className="variant" onClick={() => onVariantChange('default')}>
          Default
        </button>
        <button className="variant" onClick={() => onVariantChange('black')}>
          Space Black
        </button>
        <button className="variant" onClick={() => onVariantChange('silver')}>
          Silver
        </button>
        <button className="variant" onClick={() => onVariantChange('gold')}>
          Gold
        </button>
        <button className="variant" onClick={() => onVariantChange('purple')}>
          Deep Purple
        </button>
      </div>
    </div>
  );
}

export default App;
