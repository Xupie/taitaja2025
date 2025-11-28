"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CarouselProps = {
    images: {
        img: string;
        id: string;
        text: string;
    }[],
};

export default function Carousel({ images }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    // Number of images visible depending on screen size
    // 1 on mobile/tablet, 2 on desktop
    let visible = typeof window !== "undefined" && window.innerWidth >= 1024 ? 2 : 1;

    const next = () => {
        setCurrent((prev) => (prev + visible) % images.length);
    };

    const prev = () => {
        setCurrent((prev) => (prev - visible + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

            {/* SLIDER WRAPPER */}
            <div
                className="flex h-full transition-transform duration-500"
                style={{
                    width: `${images.length * (100 / visible)}%`,
                    transform: `translateX(-${(current * 100) / images.length}%)`
                }}
            >
                {images.map((image, i) => (
                    <div
                        key={i}
                        className="relative h-96 flex-shrink-0"
                        style={{
                            width: `${100 / images.length}%`,
                        }}
                    >
                        <Link href={`/game/${image.id}`}>
                            <div className="">
                                <p className="absolute inset-0 flex items-center justify-center z-10 text-white text-2xl font-bold drop-shadow-lg">
                                    {image.text}
                                </p>
                            </div>

                            <Image
                                src={image.img}
                                alt={`slide-${i}`}
                                fill
                                className="object-cover"
                            />
                        </Link>
                    </div>
                ))}
            </div>

            {/* LEFT BUTTON */}
            <button
                onClick={prev}
                className="absolute px-5 left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white py-2 rounded-full hover:bg-black/70"
            >
                ‹
            </button>

            {/* RIGHT BUTTON */}
            <button
                onClick={next}
                className="absolute px-5 right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white py-2 rounded-full hover:bg-black/70"
            >
                ›
            </button>

            {/* DOTS (grouped by step size) */}
            <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {images.map((_, index) => {
                    // Only show dot for starting position of each "page"
                    if (index % visible !== 0) return null;

                    return (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-white/40"
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
