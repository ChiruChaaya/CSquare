import { motion,px,useInView,useScroll,useTransform } from "framer-motion";
import puzzle from "../assets/images/puzzle.png";
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
    <section className="bg-[#183A3B]">
    <section className="flex gap-4 mx-auto justify-center bg-[#183A3B]">
    <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className="mt-12 rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src={puzzle}alt="About Us Image" className=" mt-12 rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src={puzzle}alt="About Us Image" className="mt-12 rounded-xl  h-20 "/>
    </section>
    <motion.section
    ref={ref}
      id="about"
      style={
        {
         scale
        }
      }
      className="min-h-100vh bg-[#183A3B] px-8 py-15 scroll-mt-24">
        <motion.h2
        initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }} className="text-7xl  font-serif font-bold text-center mb-8">About Us</motion.h2>
        <motion.p
        initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} className="text-center bg-[#183A3B] font-sans text-2xl">We are <span className="text-emerald-500">two partners </span>driven by a shared passion for <span className="text-emerald-500">creating thoughtful, affordable designs</span>, crafted to reflect each client’s <span className="text-emerald-500">unique style</span> and needs, especially for <span className="text-emerald-500">small creators and businesses</span>. We believe in collaboration and <span className="text-emerald-500">growing together</span> with those we work with.
At CSquare, every project is more than just work,  it’s a chance to bring creativity and life to everything we do. This is not just a business for us; it’s a <span className="text-emerald-500">passion project and a dream we are building</span>.
We believe the best work comes when you truly enjoy what you do. That’s why we put<span className="text-emerald-500"> our heart, energy, and full effort</span> into every collaboration, and why your <span className="text-emerald-500">support </span>means so much to us.
You can find more details in the following pages. This website is updated regularly, and we’re always happy to answer any questions you may have.</motion.p>
   </motion.section>
   <Puzzle inView={inviewed}/>
    <section className="flex gap-4 mx-auto justify-center bg-[#183A3B]">
    <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className=" rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className="rounded-xl  h-20 "/>
    <motion.img whileHover={{y:-20}} src={puzzle} alt="About Us Image" className="rounded-xl  h-20 "/>
    </section>
   </section>
    </>
  );
}
