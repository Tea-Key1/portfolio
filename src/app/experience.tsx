import * as THREE from "three"
import * as YUKA from "yuka"
import { gsap } from "gsap"
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useEffect, useMemo, useRef } from "react";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";


interface Model {
    nodes: {
        [key: string]: THREE.Mesh;
    };
    scene: {
        children: THREE.Mesh[];
    };
}

export default function Experience() {
    const { viewport } = useThree()
    const width = viewport.width;
    const height = viewport.height;

    const drone = useLoader(GLTFLoader, "/models/drone_01.glb", (loader): void => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/gltf/')
        loader.setDRACOLoader(dracoLoader)
    }) as Model

    const tothink = useLoader(GLTFLoader, "/models/tothink_03.glb", (loader): void => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/gltf/')
        loader.setDRACOLoader(dracoLoader)
    }) as Model

    const texture = useLoader(THREE.TextureLoader, "/models/palette.png")

    const screw1 = useRef<THREE.Mesh>(null!)
    const screw2 = useRef<THREE.Mesh>(null!)
    const screw3 = useRef<THREE.Mesh>(null!)
    const screw4 = useRef<THREE.Mesh>(null!)
    const droneRef = useRef<THREE.Group>(null!)
    const targetRef = useRef<THREE.Mesh>(null!)
    const vehicle = new YUKA.Vehicle();
    const target = new YUKA.GameEntity();
    const dronePhysics = useRef<RapierRigidBody>(null!)

    const electristic = useRef<THREE.Mesh>(null!)
    const circlegraph = useRef<THREE.Mesh>(null!)
    const arrow = useRef<THREE.Mesh>(null!)
    const panel = useRef<THREE.Mesh>(null!)
    const desktop = useRef<THREE.Mesh>(null!)
    const mobile = useRef<THREE.Mesh>(null!)
    const object1 = useRef<THREE.Mesh>(null!)
    const object2 = useRef<THREE.Mesh>(null!)

    const object = [
        "00electristic", "01circlegraph", "01arrow", "02panel", "02desktop", "02mobile", "03hand",
        "03red", "03yellow", "03white", "03object1", "03object2", "03cup"
    ];
    const icons = [
        "04LinkedIn", "04Slack", "04app_store", "04apple", "04css", "04discord", "04dropbox",
        "04github", "04google", "04instagram", "04js", "04twitter", "04youtube"
    ];
    const propeller = useMemo<THREE.Material>(() => { return new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 1 }); }, [])
    const dronemat = useMemo<THREE.Material>(() => { return new THREE.MeshStandardMaterial({ color: "#003366", roughness: 0.5, metalness: 1 }); }, [])
    const box = useMemo<THREE.BoxGeometry>(() => new THREE.BoxGeometry(), [])
    const boxmat = useMemo<THREE.Material>(() => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), [])
    const [electristicGeo, circlegraphGeo, arrowGeo, panelGeo, desktopGeo, mobileGeo, handGeo, redGeo, yellowGeo, whiteGeo, object1Geo, object2Geo, cupGeo]: any = object.map((ob) => (useMemo<THREE.BufferGeometry>(() => { return tothink.nodes[ob].geometry; }, [])))
    const [electristicPos, circlegraphPos, arrowPos, panelPos, desktopPos, mobilePos, handPos, redPos, yellowPos, whitePos, object1Pos, object2Pos, cupPos]: any = object.map((ob) => (useMemo<THREE.Vector3>(() => { return tothink.nodes[ob].position; }, [])))
    const iconsGeo: any = icons.map((e) => (useMemo<THREE.BufferGeometry>(() => { return tothink.nodes[e].geometry; }, [])))
    const iconsPos: any = icons.map((e) => (useMemo<THREE.Vector3>(() => { return tothink.nodes[e].position; }, [])))
    const mat = useMemo<THREE.MeshStandardMaterial>(() => { return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 1 }); }, [])

    const tl = gsap.timeline()
    useEffect(() => {
        if (circlegraph?.current) {
            tl.fromTo(circlegraph.current.scale, { x: 0, y: 0, z: 0 }, { duration: 0.5, x: 1, y: 1, z: 1 }, 0.25)
        }
        if (arrow?.current) {
            tl.fromTo(arrow.current.scale, { x: 0, y: 0, z: 0 }, { duration: 0.5, x: 1, y: 1, z: 1 }, 0.75)
        }
        if (panel?.current) {
            tl.fromTo(panel.current.scale, { x: 0, y: 0, z: 0 }, { duration: 0.5, x: 1, y: 1, z: 1 }, 0.25)
        }
        if (desktop?.current) {
            tl.fromTo(desktop.current.scale, { x: 0, y: 0, z: 0 }, { duration: 0.5, x: 1, y: 1, z: 1 }, 0.5)
        }
        if (mobile?.current) {
            tl.fromTo(mobile.current.scale, { x: 0, y: 0, z: 0 }, { duration: 0.5, x: 1, y: 1, z: 1 }, 0.5)
        }
    }, [])

    useEffect(() => {
        vehicle.setRenderComponent(droneRef.current, (entity: YUKA.GameEntity, renderComponent: { matrix: any }) => {
            renderComponent.matrix.copy(entity.worldMatrix);
        })
        target.setRenderComponent(targetRef.current, (entity: YUKA.GameEntity, renderComponent: { matrix: any }) => {
            renderComponent.matrix.copy(entity.worldMatrix);
        })
    }, [vehicle, target])

    const entityManager = new YUKA.EntityManager();
    entityManager.add(vehicle);
    entityManager.add(target);

    const arriveBehavior = new YUKA.ArriveBehavior(target.position, 1, 3);
    vehicle.steering.add(arriveBehavior)
    vehicle.maxSpeed = 10

    window.addEventListener("touchmove", (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const mobileX = (touchX / windowWidth) * 2 - 1;
        const mobileY = 1 - (touchY / windowHeight) * 2;

        const mx: number = (mobileX * width / 2);
        const my: number = (-mobileY * height / 2) * 1.4

        target.position.set(mx, 0, my)
    });

    addEventListener("mousemove", (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const moveX = e.clientX;
        const moveY = e.clientY;

        const pcX = (moveX / windowWidth) * 2 - 1;
        const pcY = 1 - (moveY / windowHeight) * 2;

        const px: number = (pcX * width / 2);
        const py: number = (-pcY * height / 2) * 1.4;

        target.position.set(px, 0, py)
    })

    useFrame(({ clock }, delta) => {
        screw1.current.rotation.y = clock.getElapsedTime() * 20
        screw2.current.rotation.y = clock.getElapsedTime() * 20
        screw3.current.rotation.y = clock.getElapsedTime() * 20
        screw4.current.rotation.y = clock.getElapsedTime() * 20
        entityManager.update(delta)
        object1.current.position.y = Math.sin(clock.getElapsedTime() * 2) / 5
        object2.current.position.y = Math.sin(clock.getElapsedTime() * 2) / 5
        dronePhysics.current?.setNextKinematicTranslation({ x: vehicle.position.x, y: 0, z: vehicle.position.z })
    })


    return (
        <group dispose={null}>
            <group ref={droneRef} matrixAutoUpdate={false} >
                <mesh geometry={drone.nodes.airscrew1.geometry} ref={screw1} position={[-0.443, 0.1, -0.85]} material={propeller}>
                </mesh>
                <mesh geometry={drone.nodes.airscrew2.geometry} ref={screw2} position={[-0.443, 0.1, 0.85]} material={propeller}>
                </mesh>
                <mesh geometry={drone.nodes.airscrew3.geometry} ref={screw3} position={[0.443, 0.1, 0.85]} material={propeller}>
                </mesh>
                <mesh geometry={drone.nodes.airscrew4.geometry} ref={screw4} position={[0.443, 0.1, -0.85]} material={propeller}>
                </mesh>
                <mesh geometry={drone.nodes.body1.geometry} material={propeller}>
                </mesh>
                <mesh geometry={drone.nodes.body2.geometry} material={dronemat}>
                </mesh>
                <mesh geometry={drone.nodes.body3.geometry} position={[0, 0.1, 0]} material={dronemat}>
                </mesh>
            </group>

            <Physics >
                <RigidBody mass={0.1} ref={dronePhysics} type="kinematicPosition" >
                    <mesh geometry={box} material={boxmat} />
                </RigidBody>

                <mesh ref={targetRef} matrixAutoUpdate={false} geometry={box} material={boxmat} />

                <group>
                    <RigidBody type="fixed" friction={2} colliders="cuboid">
                        <mesh
                            ref={electristic}
                            geometry={electristicGeo}
                            position={electristicPos}
                        // material={mat}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={circlegraph}
                            geometry={circlegraphGeo}
                            position={circlegraphPos}
                            material={mat}
                        />
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={arrow}
                            geometry={arrowGeo}
                            position={arrowPos}
                            material={mat}
                        />
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={panel}
                            geometry={panelGeo}
                            position={panelPos}
                            material={mat}
                        />
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={desktop}
                            geometry={desktopGeo}
                            position={desktopPos}
                            material={mat}
                        />
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={mobile}
                            geometry={mobileGeo}
                            position={mobilePos}
                            material={mat}
                        />
                    </RigidBody>
                    <mesh
                        geometry={handGeo}
                        position={handPos}
                        material={mat}
                    />
                    <mesh
                        geometry={redGeo}
                        position={redPos}
                        material={mat}
                    />
                    <mesh
                        geometry={yellowGeo}
                        position={yellowPos}
                        material={mat}
                    />
                    <mesh
                        geometry={whiteGeo}
                        position={whitePos}
                        material={mat}
                    />
                    <mesh
                        ref={object1}
                        geometry={object1Geo}
                        position={object1Pos}
                        material={mat}
                    />
                    <mesh
                        ref={object2}
                        geometry={object2Geo}
                        position={object2Pos}
                        material={mat}
                    />
                    <mesh
                        geometry={cupGeo}
                        position={cupPos}
                        material={mat}
                    />

                    {icons.map((icon, index) => (
                        <Float
                            key={icon}
                        >
                            <mesh
                                geometry={iconsGeo[index]}
                                position={iconsPos[index]}
                                material={mat}
                            />
                        </Float>
                    ))}
                </group>

            </Physics>

            <Environment preset="city" />
        </group>
    )
}

useGLTF.preload('/models/drone_01.glb')
useGLTF.preload('/models/tothink_02.glb')