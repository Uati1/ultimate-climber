"use client";

import { motion, useReducedMotion } from "framer-motion";

const SVG = {
  climber: "/assets/climbing-climber-svgrepo-com.svg",
  mountains: "/assets/climbing-1-svgrepo-com.svg",
  wall: "/assets/climbing-wall-svgrepo-com.svg",
  carabiner: "/assets/carabiner-sports-and-competition-svgrepo-com.svg",
  rope: "/assets/rope-climbing-svgrepo-com.svg",
  gym: "/assets/gym-svgrepo-com.svg",
} as const;

type Piece = {
  id: string;
  src: string;
  x: string;
  y: string;
  size: number;
  opacity: number;
  duration: number;
  rx: number;
  ry: number;
  tilt: number;
  reverse: boolean;
  blur: boolean;
};

const PIECES: Piece[] = [
  {
    id: "climber-1",
    src: SVG.climber,
    x: "6%",
    y: "16%",
    size: 88,
    opacity: 0.2,
    duration: 32,
    rx: 40,
    ry: 24,
    tilt: 8,
    reverse: false,
    blur: false,
  },
  {
    id: "climber-2",
    src: SVG.climber,
    x: "72%",
    y: "58%",
    size: 72,
    opacity: 0.16,
    duration: 38,
    rx: 34,
    ry: 42,
    tilt: -7,
    reverse: true,
    blur: true,
  },
  {
    id: "climber-3",
    src: SVG.climber,
    x: "38%",
    y: "78%",
    size: 64,
    opacity: 0.14,
    duration: 28,
    rx: 48,
    ry: 18,
    tilt: 10,
    reverse: false,
    blur: false,
  },
  {
    id: "mountains-1",
    src: SVG.mountains,
    x: "78%",
    y: "10%",
    size: 110,
    opacity: 0.15,
    duration: 40,
    rx: 46,
    ry: 22,
    tilt: -5,
    reverse: true,
    blur: true,
  },
  {
    id: "mountains-2",
    src: SVG.mountains,
    x: "14%",
    y: "68%",
    size: 96,
    opacity: 0.18,
    duration: 34,
    rx: 30,
    ry: 36,
    tilt: 6,
    reverse: false,
    blur: false,
  },
  {
    id: "wall-1",
    src: SVG.wall,
    x: "88%",
    y: "32%",
    size: 78,
    opacity: 0.17,
    duration: 30,
    rx: 22,
    ry: 44,
    tilt: 9,
    reverse: false,
    blur: false,
  },
  {
    id: "wall-2",
    src: SVG.wall,
    x: "4%",
    y: "42%",
    size: 70,
    opacity: 0.14,
    duration: 36,
    rx: 28,
    ry: 32,
    tilt: -8,
    reverse: true,
    blur: true,
  },
  {
    id: "wall-3",
    src: SVG.wall,
    x: "58%",
    y: "82%",
    size: 62,
    opacity: 0.13,
    duration: 26,
    rx: 50,
    ry: 16,
    tilt: 4,
    reverse: false,
    blur: false,
  },
  {
    id: "carabiner-1",
    src: SVG.carabiner,
    x: "48%",
    y: "6%",
    size: 68,
    opacity: 0.18,
    duration: 29,
    rx: 54,
    ry: 20,
    tilt: 12,
    reverse: true,
    blur: false,
  },
  {
    id: "carabiner-2",
    src: SVG.carabiner,
    x: "84%",
    y: "72%",
    size: 80,
    opacity: 0.16,
    duration: 33,
    rx: 26,
    ry: 38,
    tilt: -6,
    reverse: false,
    blur: true,
  },
  {
    id: "carabiner-3",
    src: SVG.carabiner,
    x: "22%",
    y: "28%",
    size: 58,
    opacity: 0.15,
    duration: 24,
    rx: 36,
    ry: 28,
    tilt: 7,
    reverse: true,
    blur: false,
  },
  {
    id: "rope-1",
    src: SVG.rope,
    x: "64%",
    y: "22%",
    size: 92,
    opacity: 0.16,
    duration: 37,
    rx: 32,
    ry: 40,
    tilt: -9,
    reverse: false,
    blur: false,
  },
  {
    id: "rope-2",
    src: SVG.rope,
    x: "8%",
    y: "84%",
    size: 76,
    opacity: 0.14,
    duration: 31,
    rx: 44,
    ry: 24,
    tilt: 5,
    reverse: true,
    blur: true,
  },
  {
    id: "gym-1",
    src: SVG.gym,
    x: "30%",
    y: "8%",
    size: 86,
    opacity: 0.17,
    duration: 35,
    rx: 38,
    ry: 26,
    tilt: -4,
    reverse: false,
    blur: false,
  },
  {
    id: "gym-2",
    src: SVG.gym,
    x: "90%",
    y: "50%",
    size: 70,
    opacity: 0.15,
    duration: 27,
    rx: 20,
    ry: 46,
    tilt: 11,
    reverse: true,
    blur: true,
  },
];

function orbitKeyframes(rx: number, ry: number, reverse: boolean) {
  const x = [0, rx * 0.71, rx, rx * 0.71, 0, -rx * 0.71, -rx, -rx * 0.71, 0];
  const y = [-ry, -ry * 0.71, 0, ry * 0.71, ry, ry * 0.71, 0, -ry * 0.71, -ry];
  return reverse ? { x: x.map((v) => -v), y } : { x, y };
}

export default function GearConstellation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PIECES.map((piece) => {
        const orbit = orbitKeyframes(piece.rx, piece.ry, piece.reverse);
        return (
          <motion.div
            key={piece.id}
            className="absolute bg-accent"
            style={{
              left: piece.x,
              top: piece.y,
              width: piece.size,
              height: piece.size,
              opacity: piece.opacity,
              filter: piece.blur ? "blur(1.2px)" : undefined,
              WebkitMaskImage: `url(${piece.src})`,
              maskImage: `url(${piece.src})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
            animate={
              reduceMotion
                ? { x: 0, y: 0, rotate: 0 }
                : {
                    x: orbit.x,
                    y: orbit.y,
                    rotate: [
                      0,
                      piece.tilt * 0.6,
                      piece.tilt,
                      piece.tilt * 0.4,
                      0,
                      -piece.tilt * 0.6,
                      -piece.tilt,
                      -piece.tilt * 0.4,
                      0,
                    ],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: piece.duration, repeat: Infinity, ease: "linear" }
            }
          />
        );
      })}
    </div>
  );
}
