"use client"
import * as THREE from "three"
import { gsap } from "gsap"
import Image from "next/image";
import Experience from "./experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Preload } from "@react-three/drei";
import { Fragment, Suspense, useEffect, useRef } from "react";
import Article from "./article";
import Load from "./notloading";
import Main from "./main";

export default function Home() {
  return (
    <Fragment>
      <Main />
    </Fragment>
  );
}
