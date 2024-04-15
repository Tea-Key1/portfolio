"use client"
import * as THREE from "three"
import { gsap } from "gsap"
import Image from "next/image";
import Experience from "./experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Preload } from "@react-three/drei";
import { Fragment, Suspense, useEffect, useRef } from "react";
import Article from "./article";
import Load from "./load";
import Main from "./main";

export default function Home() {
  const { progress } = useProgress();

  return (
    <Fragment>
      <Suspense fallback={<Load />}>
        <Main />
      </Suspense>
    </Fragment>
  );
}
