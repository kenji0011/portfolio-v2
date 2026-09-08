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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
            className="absolute top-5 right-5 z-20 p-2.5 rounded-xl border-2 border-white bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_white] transition-all cursor-pointer"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
