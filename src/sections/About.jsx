import { motion,px,useInView,useScroll,useTransform } from "framer-motion";
import { useRef } from "react";
import Puzzle from "../compenents/Puzzle";
export default function About() {
  const ref = useRef(null);
  const inviewed=useInView(ref,{amount:"all"});
  const{scrollYProgress}=useScroll({
    target:ref,
    offset:["start end","center start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <>
    <section className="flex gap-4 mx-auto justify-center">
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="mt-12 rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className=" mt-12 rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src="src/assets/images/Puzzle_icon_in_iOS_Style-removebg-preview.png" alt="About Us Image" className="mt-12 rounded-xl  h-20 "/>
    </section>
    <motion.section
    ref={ref}
      id="about"
      style={
        {
         scale
        }
      }
      className="min-h-100vh
       px-8 py-15 scroll-mt-24">
        <motion.h2
        initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }} className="text-9xl font-bold text-center mb-8">About Us</motion.h2>
        <motion.p
        initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} className="text-center text-2xl">We are two partners driven by a shared passion for creating thoughtful, affordable designs, crafted to reflect each client’s unique style and needs, especially for small creators and businesses. We believe in collaboration and growing together with those we work with.
At CSquare, every project is more than just work,  it’s a chance to bring creativity and life to everything we do. This is not just a business for us; it’s a passion project and a dream we are building.
We believe the best work comes when you truly enjoy what you do. That’s why we put our heart, energy, and full effort into every collaboration, and why your support means so much to us.
You can find more details in the following pages. This brochure is updated regularly, and we’re always happy to answer any questions you may have.</motion.p>
   </motion.section>
   <Puzzle inView={inviewed}/>
    </>
  );
}
