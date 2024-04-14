import * as THREE from "three"
import * as YUKA from "yuka"
import { gsap } from "gsap"
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useEffect, useRef } from "react";
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

    const tl = gsap.timeline()

    const electristic = useRef<THREE.Mesh>(null!)
    const circlegraph = useRef<THREE.Mesh>(null!)
    const arrow = useRef<THREE.Mesh>(null!)
    const panel = useRef<THREE.Mesh>(null!)
    const desktop = useRef<THREE.Mesh>(null!)
    const mobile = useRef<THREE.Mesh>(null!)
    const object1 = useRef<THREE.Mesh>(null!)
    const object2 = useRef<THREE.Mesh>(null!)

    const icons = [
        "04LinkedIn", "04Slack", "04app_store", "04apple", "04css", "04discord", "04dropbox",
        "04github", "04google", "04instagram", "04js", "04twitter", "04youtube"
    ];

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
        object1.current.position.y = Math.sin(clock.getElapsedTime()*2)/5
        object2.current.position.y = Math.sin(clock.getElapsedTime()*2)/5
        dronePhysics.current?.setNextKinematicTranslation({ x: vehicle.position.x, y: 0, z: vehicle.position.z })
    })


    return (
        <group >

            <group ref={droneRef} matrixAutoUpdate={false} >
                <mesh geometry={drone.nodes.airscrew1.geometry} ref={screw1} position={[-0.443, 0.1, -0.85]} >
                    <meshStandardMaterial />
                </mesh>
                <mesh geometry={drone.nodes.airscrew2.geometry} ref={screw2} position={[-0.443, 0.1, 0.85]}>
                    <meshStandardMaterial />
                </mesh>
                <mesh geometry={drone.nodes.airscrew3.geometry} ref={screw3} position={[0.443, 0.1, 0.85]}>
                    <meshStandardMaterial />
                </mesh>
                <mesh geometry={drone.nodes.airscrew4.geometry} ref={screw4} position={[0.443, 0.1, -0.85]}>
                    <meshStandardMaterial />
                </mesh>
                <mesh geometry={drone.nodes.body1.geometry}>
                    <meshStandardMaterial />
                </mesh>
                <mesh geometry={drone.nodes.body2.geometry} >
                    <meshStandardMaterial color={"#003366"} />
                </mesh>
                <mesh geometry={drone.nodes.body3.geometry} position={[0, 0.1, 0]}>
                    <meshStandardMaterial color={"#003366"} />
                </mesh>
            </group>

            <Physics >
                <group >
                    <RigidBody mass={0.1} ref={dronePhysics} type="kinematicPosition" linearDamping={3} angularDamping={1} friction={0} restitution={0}

                    >
                        <mesh >
                            <boxGeometry />
                            <meshStandardMaterial transparent opacity={0} />
                        </mesh>
                    </RigidBody>
                </group>

                <mesh ref={targetRef} matrixAutoUpdate={false}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshNormalMaterial transparent opacity={0} />
                </mesh>

                <group>
                    <RigidBody type="fixed" friction={2} colliders="cuboid">
                        <mesh
                            ref={electristic}
                            geometry={tothink.nodes["00electristic"].geometry}
                            position={tothink.nodes["00electristic"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={circlegraph}
                            geometry={tothink.nodes["01circlegraph"].geometry}
                            position={tothink.nodes["01circlegraph"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={arrow}
                            geometry={tothink.nodes["01arrow"].geometry}
                            position={tothink.nodes["01arrow"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={panel}
                            geometry={tothink.nodes["02panel"].geometry}
                            position={tothink.nodes["02panel"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={desktop}
                            geometry={tothink.nodes["02desktop"].geometry}
                            position={tothink.nodes["02desktop"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="dynamic" friction={2} colliders="cuboid">
                        <mesh
                            ref={mobile}
                            geometry={tothink.nodes["02mobile"].geometry}
                            position={tothink.nodes["02mobile"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            geometry={tothink.nodes["03hand"].geometry}
                            position={tothink.nodes["03hand"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            geometry={tothink.nodes["03red"].geometry}
                            position={tothink.nodes["03red"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            geometry={tothink.nodes["03yellow"].geometry}
                            position={tothink.nodes["03yellow"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            geometry={tothink.nodes["03white"].geometry}
                            position={tothink.nodes["03white"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            ref={object1}
                            geometry={tothink.nodes["03object1"].geometry}
                            position={tothink.nodes["03object1"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            ref={object2}
                            geometry={tothink.nodes["03object2"].geometry}
                            position={tothink.nodes["03object2"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>
                    <RigidBody type="kinematicPosition" friction={2} colliders="cuboid">
                        <mesh
                            geometry={tothink.nodes["03cup"].geometry}
                            position={tothink.nodes["03cup"].position}
                        >
                            <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                        </mesh>
                    </RigidBody>

                    {icons.map(icon => (
                        <Float
                            key={icon}
                        >
                            <mesh
                                geometry={tothink.nodes[icon].geometry}
                                position={tothink.nodes[icon].position}
                            >
                                <meshStandardMaterial map={texture} roughness={0.5} metalness={1} />
                            </mesh>
                        </Float>
                    ))}
                </group>

            </Physics>

            <Environment preset="forest" />
        </group>
    )
}

useGLTF.preload('/models/drone_01.glb')
useGLTF.preload('/models/tothink_02.glb')