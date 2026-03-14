"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { creativeItems, type CreativeItem } from "@/data/creative";
import { bentoImages } from "@/data/bentoImages";
import Modal from "@/components/Modal";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";

export default function Creative() {
  const [activeModal, setActiveModal] = useState<CreativeItem | null>(null);
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
              <motion.p
                variants={fadeUp}
                className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-6"
              >

              </motion.p>
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

        {/* ─── Bento Grid ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-2">
              Gallery
            </p>
            <div className="w-full h-px bg-border" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-3 gap-3"
            style={{ gridAutoRows: "200px" }}
          >
            {/* Item 1 — 2×2 featured */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(0)}
              className="group relative col-span-2 row-span-2 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[0]} />
              <HoverOverlay title={bentoImages[0].title} category={bentoImages[0].category} />
            </motion.button>

            {/* Item 2 — 1×1 */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(1)}
              className="group relative col-span-1 row-span-1 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[1]} />
              <HoverOverlay title={bentoImages[1].title} category={bentoImages[1].category} />
            </motion.button>

            {/* Item 3 — 1×1 */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(2)}
              className="group relative col-span-1 row-span-1 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[2]} />
              <HoverOverlay title={bentoImages[2].title} category={bentoImages[2].category} />
            </motion.button>

            {/* Item 4 — 1×1 */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(3)}
              className="group relative col-span-1 row-span-1 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[3]} />
              <HoverOverlay title={bentoImages[3].title} category={bentoImages[3].category} />
            </motion.button>

            {/* Item 5 — 2×1 wide */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(4)}
              className="group relative col-span-2 row-span-1 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[4]} />
              <HoverOverlay title={bentoImages[4].title} category={bentoImages[4].category} />
            </motion.button>

            {/* Item 6 — 1×1 */}
            <motion.button
              variants={fadeUp}
              onClick={() => setLightboxIndex(5)}
              className="group relative col-span-1 row-span-1 rounded-2xl overflow-hidden"
              data-cursor="hover"
            >
              <BentoCell image={bentoImages[5]} />
              <HoverOverlay title={bentoImages[5].title} category={bentoImages[5].category} />
            </motion.button>
          </motion.div>
        </section>

        <Footer />
      </main>

      <Modal item={activeModal} onClose={() => setActiveModal(null)} />
      <Lightbox
        images={bentoImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}

function BentoCell({ image }: { image: { src: string; alt: string; gradient: string } }) {
  return image.src ? (
    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  ) : (
    <div
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
      style={{ background: image.gradient }}
    />
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
