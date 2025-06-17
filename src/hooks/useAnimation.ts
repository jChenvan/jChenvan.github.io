import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three"; 
import { GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";

export default function useAnimation() {
    const canvas = useRef(document.createElement("canvas"));
    const scene = useRef(new THREE.Scene());
    const renderer = useRef(new THREE.WebGLRenderer({ canvas: canvas.current, alpha: true, antialias: true }));
    const [gltf, setGltf] = useState<GLTF>();

    const sceneElements = useMemo(() => {
        if (!gltf) return;

        const gltfScene = gltf.scene;
        scene.current.add(gltfScene);

        const camera = gltf.cameras[0];

        const openEyes = gltfScene.getObjectByName("OpenEyes");
        const closedEyes = gltfScene.getObjectByName("ClosedEyes");
        if (closedEyes) closedEyes.visible = false;
        
        const rig = gltfScene.getObjectByName("Armature");
        const gear1 = gltfScene.getObjectByName("Gear");
        const gear2 = gltfScene.getObjectByName("Gear001");

        const body = gltfScene.getObjectByName("Cube_1") as THREE.SkinnedMesh;
        if (body.morphTargetInfluences) body.morphTargetInfluences[0] = 1;

        return {camera, openEyes, closedEyes, rig, gear1, gear2, body};
    }, [gltf]);

    const setProgress = useMemo(()=>{
        if (!sceneElements || !gltf) return ()=>{};
        const {rig, gear1, gear2, body} = sceneElements;
        if (!rig || !gear1 || !gear2 || !body) return ()=>{};

        const rigMixer = new THREE.AnimationMixer(rig);
        const gear1Mixer = new THREE.AnimationMixer(gear1);
        const gear2Mixer = new THREE.AnimationMixer(gear2);

        const rigClip = gltf.animations[0];
        const gear1Clip = gltf.animations[1];
        const gear2Clip = gltf.animations[2];

        const rigDuration = rigClip.duration;
        const gear1Duration = gear1Clip.duration;
        const gear2Duration = gear2Clip.duration;

        const rigAction = rigMixer.clipAction(rigClip);
        const gear1Action = gear1Mixer.clipAction(gear1Clip);
        const gear2Action = gear2Mixer.clipAction(gear2Clip);

        rigAction.play();
        gear1Action.play();
        gear2Action.play();

        return (progress:number) => {
            rigMixer.setTime(progress * rigDuration);
            gear1Mixer.setTime(progress * gear1Duration);
            gear2Mixer.setTime(progress * gear2Duration);

            /* const exhale = 4*progress*(1-progress);
            body.morphTargetInfluences![1] = exhale; */

            renderer.current.render(scene.current,sceneElements.camera);
        }
    }, [sceneElements]);

    useEffect(() => {
        if (!sceneElements) {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load("/crankyMe.glb", gltf => setGltf(gltf));
            return;
        }
        renderer.current.setSize(500, 500);
        renderer.current.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.current.toneMappingExposure = 3;
        renderer.current.setClearColor(0x000000,0);

        setProgress(0);

        new THREE.CubeTextureLoader().load([
            '/cube/px.png',
            '/cube/nx.png',
            '/cube/py.png',
            '/cube/ny.png',
            '/cube/pz.png',
            '/cube/nz.png',
        ], textureCube => {
            scene.current.environment = textureCube;
            renderer.current.render(scene.current,sceneElements.camera);
        });

        return () => {}
    }, [sceneElements, canvas]);

    return {canvas: canvas.current, setProgress};
}