
import * as THREE from "three"
import { gsap } from "gsap"
import Image from "next/image";
import Experience from "./experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Preload } from "@react-three/drei";
import { Fragment, Suspense, useEffect, useRef } from "react";
import Article from "./article";

export default function Main() {
    const { progress } = useProgress()
    console.log(progress)
    return (
        <Fragment>
            <main className={`w-full h-auto p-0 m-0 top-0 left-0 overflow-hidden`}
            // style={{ display: progress === 100 ? 'block' : 'none' }}
            >
                <section className="w-full h-[100dvh] p-0 m-0 top-0 left-0">
                    <div className="w-full h-[100dvh] fixed z-[-10] p-0 m-0">
                        <Canvas
                            shadows
                            orthographic={true}
                            camera={{ position: [0, 10, 10], near: 0.1, far: 100, zoom: 45 }}
                        >
                            <Experience />
                            {/* <OrbitControls /> */}
                            <Preload all />
                            {/* <gridHelper args={[30, 30, 0xff0000, 'teal']} /> */}
                        </Canvas>
                    </div>
                    <div className="w-full h-auto fixed z-1 p-0 m-0" style={{ display: progress === 100 ? 'block' : 'none' }}>
                        <div id="menu" className={`w-80  h-[100dvh] absolute top-0 right-0 bg-white bg-opacity-35`} >text</div>
                        <div id="toggle" className={`w-20  h-[100dvh] absolute top-0 left-0 bg-white bg-opacity-35 content-center`} >
                            <div className="w-4/5 h-[80dvh] mx-auto bg-black">text</div>
                        </div>
                    </div>
                </section>
                <Article />
            </main>
        </Fragment>
    )
}