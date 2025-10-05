// src/PlanetaryAssets.jsx (VERSIÓN SIN ORBITCONTROLS)

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'; // Solo usamos useGLTF

      // src/PlanetaryAssets.jsx

      // ...

      // --- Componente de la Luna (Moon) ---
      function MoonAsset() {
        const gltf = useGLTF('/Moon.glb'); 
        return (
          <primitive 
            object={gltf.scene} 
            // ACERCAMOS LA LUNA: Z a -5 (antes estaba en -10)
            position={[2.5, -2.5, -5]} // [Derecha, Abajo, Cerca]
            scale={3.0} // ¡Más grande! (antes estaba en 2.0)
            rotation={[0, 0.5, 0]} 
          />
        );
      }

      // --- Componente de Marte (Mars) ---
      function MarsAsset() {
        const gltf = useGLTF('/Mars.glb'); 
        return (
          <primitive 
            object={gltf.scene} 
            // ACERCAMOS MARTE: Z a -5 (antes estaba en -10)
            position={[-3.5, 2.5, -5]} // [Izquierda, Arriba, Cerca]
            scale={2.5} // ¡Más grande! (antes estaba en 1.8)
            rotation={[0, -0.5, 0.5]} 
          />
        );
      }
      

// --- Componente Contenedor Principal ---
export default function PlanetaryAssets() {
// src/PlanetaryAssets.jsx (dentro de la función PlanetaryAssets)

return (
  // Asegúrate de que los estilos sean EXACTAMENTE así:
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    zIndex: -1 
  }}> // 💡 CAMBIO: Usaremos zIndex: -1
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* ... modelos, luces, etc. ... */}
    </Canvas>
  </div>
);
}