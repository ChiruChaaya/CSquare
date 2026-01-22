import { motion } from "framer-motion";
import puzzle from "../assets/images/puzzle.png";

const Puzzle = ({ inView }) => {
  return (
    <main className="hidden md:flex items-center justify-center gap-24 overflow-hidden">
      
      <motion.img
        src={puzzle}
        alt="About Us Image"
        className="rounded-xl w-60 lg:w-72 z-20"
        animate={{
          x: inView ? -40 : 0,
          scale: inView ? 1 : 0.7,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={puzzle}
        alt="About Us Image"
        className="rounded-xl w-60 lg:w-72 z-20"
        animate={{
          x: inView ? 40 : 0,
          scale: inView ? 1 : 0.7,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
    </main>
  );
};

export default Puzzle;
