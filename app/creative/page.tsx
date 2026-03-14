"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { bentoImages } from "@/data/bentoImages";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";

export default function Creative() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <main className="min-h-screen">
        {/* ─── Header ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 80% 20%, rgba(200,85,160,0.38) 0%, transparent 60%)`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-8 pt-32 pb-16">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-6xl font-bold text-fg leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                All things{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #C855A0, #8A6FF0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  creative.
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base text-fg-muted max-w-md">
                Side projects, art, and creative explorations made outside of client work.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Masonry Gallery ─────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {bentoImages.map((image, i) => (
              <button
                key={image.id}
                onClick={() => setLightboxIndex(i)}
                className="group relative break-inside-avoid mb-3 w-full rounded-2xl overflow-hidden block"
                data-cursor="hover"
              >
                <div className="relative w-full overflow-hidden">
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div
                      className="w-full aspect-square group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      style={{ background: image.gradient }}
                    />
                  )}
                  <HoverOverlay title={image.title} category={image.category} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <Footer />
      </main>

      <Lightbox
        images={bentoImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}

function HoverOverlay({ title, category }: { title: string; category: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
      <p className="text-white/60 text-xs tracking-widest uppercase mb-0.5">{category}</p>
      <p className="text-white text-sm font-medium">{title}</p>
    </div>
  );
}
