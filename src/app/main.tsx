"use client"
import * as THREE from "three"
import { gsap } from "gsap"
import Image from "next/image";
import Experience from "./experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Preload } from "@react-three/drei";
import { Fragment, Suspense, useEffect, useRef } from "react";
import Article from "./article";
import { AnimatePresence, motion } from "framer-motion";
import Load from "./notloading";

export default function Main() {
    const { progress } = useProgress()
    const tl = gsap.timeline()
    // useEffect(() => {
    //     tl.from("#main", { duration: 1, display: "none", opacity: 0 }, 0)
    // }, [])
    return (
        <Fragment>
            <Suspense fallback={<Load />} />
            <AnimatePresence>
                <motion.main className={`w-full h-auto p-0 m-0 top-0 left-0`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: 1
                    }}
                >
                    <section className="w-full h-[100dvh] p-0 m-0 top-0 left-0">
                        <div className="w-full h-[100dvh] fixed z-[-10] p-0 m-0">
                            <Canvas
                                shadows
                                orthographic={true}
                                camera={{ position: [0, 10, 10], near: 0.1, far: 100, zoom: 40 }}
                            >
                                <Experience />
                                {/* <OrbitControls /> */}
                                <Preload all />
                                {/* <gridHelper args={[30, 30, 0xff0000, 'teal']} /> */}
                            </Canvas>
                        </div>
                        <motion.div className="w-full h-auto fixed z-1 p-0 m-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.5
                            }}
                        >
                            <div id="menu" className={`w-80  h-[80dvh] absolute top-[10dvh] right-[2dvw] bg-black bg-opacity-35 rounded-xl`}></div>
                            <div id="toggle" className={`w-20  h-[100dvh] absolute top-0 left-0 bg-black bg-opacity-35 content-center`} >
                                <div className="w-4/5 h-[80dvh] mx-auto bg-blue bg-opacity-35 border-2 text-transparent">text</div>
                            </div>
                        </motion.div>
                    </section>
                    <Article />
                </motion.main>
            </AnimatePresence>
            <Suspense />
        </Fragment>
    )
}