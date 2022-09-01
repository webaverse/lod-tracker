import * as THREE from 'three';
// import easing from './easing.js';
import metaversefile from 'metaversefile';
const {useApp, useFrame, useLocalPlayer, useProcGenManager} = metaversefile;

// const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

// const lod = 1;
// const lod1Range = 2;

export default e => {
  const app = useApp();
  const procGenManager = useProcGenManager();

  let frameCb = null;
  e.waitUntil((async () => {
    const instance = procGenManager.getInstance();

    const lodTracker = await instance.createLodChunkTracker({
      lods: 3,
      lod1Range: 2,
      debug: true,
    });
    app.add(lodTracker.debugMesh);
    lodTracker.debugMesh.position.y = 0.1;
    lodTracker.debugMesh.updateMatrixWorld();
    
    // console.log('got lod tracker', lodTracker);
    
    frameCb = () => {
      const localPlayer = useLocalPlayer();
      lodTracker.update(localPlayer.position);
    };
  })());

  useFrame(() => {
    frameCb && frameCb();
  });

  return app;
};