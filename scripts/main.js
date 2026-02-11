import {
	LoadingScreenPlugin,
	ProgressivePlugin,
	SSAAPlugin,
	ContactShadowGroundPlugin,
	ThreeViewer,
	// THREE.js internals
	Vector3,
} from 'threepipe'

async function setupViewer(canvasId, modelPath) {
	// Initialize the viewer
	const viewer = new ThreeViewer({
		canvas: document.getElementById(canvasId),
		msaa: false,
		renderScale: "auto",
		tonemap: true,
		plugins: [
			LoadingScreenPlugin,
			ProgressivePlugin, SSAAPlugin,
			ContactShadowGroundPlugin,
		],
		rgbm: false, // rgbm doesn't support transparent backgrounds
		backgroundColor: null,
		camera: {
			position: new Vector3(0, 0, -10),
			target: new Vector3(0, 0, 0),
		}
	});

// 	await addBasePlugins(viewer);
// 	viewer.renderer.refreshPipeline();

// 	// const manager = await viewer.addPlugin(AssetManagerPlugin);

	// Import and add a GLB file
	await viewer.load(modelPath);
	console.log("Active camera: ", viewer.scene.mainCamera);

	// Camera transform (set in constructor)
	// viewer.scene.mainCamera.target = new Vector3(0, 0, 0);
	// viewer.scene.mainCamera.position = new Vector3(0, 0, -10);
		
	// Camera options:
	// const options = viewer.scene.mainCamera.getCameraOptions();
	// options.fov = 25;
	// viewer.scene.mainCamera.setCameraOptions(options);	// const options = viewer.scene.mainCamera.getCameraOptions();
	viewer.scene.mainCamera.fov = 25;
	
// 	// Control options
	const controls = viewer.scene.mainCamera.controls;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 3;
	controls.enableDamping = true;
	controls.rotateSpeed = 2.0;
	controls.enableZoom = true;
	controls.enablePan = true;
	controls.minDistance = 1.5;
	controls.maxDistance = 10;
}

// // Set up scene for each canvas
setupViewer("canvas1", "./assets/oled tv.glb");
setupViewer("canvas2", "./assets/casio watch.glb");
