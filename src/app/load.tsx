"use client"
import { Fragment } from "react"
import { OrbitControls, useProgress, Preload } from "@react-three/drei";

export default function Load() {
    const { progress } = useProgress()
    return (
        <Fragment>
            <main className="w-[100dvw] h-auto absolute p-0 m-0 top-0 left-0 overflow-hidden">
                <div className="w-full h-[100dvh] flex justify-center content-center items-center">
                    <div className="">
                        <div className="flex justify-center" aria-label="読み込み中">
                            <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}