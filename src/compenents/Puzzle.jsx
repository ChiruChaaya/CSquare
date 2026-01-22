import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

const Puzzle = ({inView}) => {
    const inviewed=inView;
  return (
   <main className="flex justify-center-safe gap-60">
   <motion.img    
   animate={{x:inviewed?-50:0,scale:inviewed?1:0.5}}
   transition={{
    duration:0.8,
    ease:"easeInOut"
   }}
   src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="  rounded-xl h-50 top-1.5 z-20"/>

   <motion.img  
   animate={{x:inviewed?50:0,
            scale:inviewed?1:0.5  
   }}
   transition={{
    duration:0.8,
    ease:"easeInOut"
   }}
   src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="rounded-xl  h-50 z-20"/>
    </main>
  )
}

export default Puzzle