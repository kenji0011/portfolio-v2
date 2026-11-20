"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/types/portfolio";

type ImageZoomModalProps = {
  isZoomed: boolean;
  onClose: () => void;
  project: Project | null;
  galleryIndex: number;
};

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isZoomed,
  onClose,
  project,
  galleryIndex,
}) => {
  return (
    <AnimatePresence>
      {isZoomed && project && project.gallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-[95vw] max-h-[95vh]"
          >
            <Image
              src={project.gallery[galleryIndex]}
              alt="Zoomed screenshot"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close zoomed view"
            className="absolute top-5 right-5 z-20 p-2 rounded-lg border border-white/20 bg-zinc-900/80 text-white hover:bg-white hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
