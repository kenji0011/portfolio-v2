import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export const cardHover = { y: -8, scale: 1.02 };

export const certSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 28 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
      staggerChildren: 0.03,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 28 },
      opacity: { duration: 0.18 },
      scale: { duration: 0.18 },
    },
  }),
};

export const certCardItemVariants: Variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};
