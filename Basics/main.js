import * as THREE from 'three';

(() => {
    const canvas = document.getElementById('canvas');

    //! --------- WebGLRenderer --------
    //* The renderer is responsible for taking the 3D scene and rendering it to the canvas element.
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    //! --------- PerspectiveCamera --------
    const fov = 75; //* Field of view in degrees - determines the extent of the scene visible on screen.
    const aspect = 2; //* Aspect ratio of the canvas, important for correct camera perspective.
    const near = .1; //* Near and far define the range of space that will be visible in the render.
    const far = 5;
    //? These settings together define a "frustum", a truncated pyramid representing the viewable space.

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2; //* Positioning the camera along the z-axis.

    //! --------- Scene --------
    const scene = new THREE.Scene();

    //! ------- Lighting -------
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    //! --------- BoxGeometry --------
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    //* Geometry defines the shape of the object. Here, a cube is created with given dimensions.

    //! --------- Mesh --------
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    //! --------- Render --------
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      
    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

})();
