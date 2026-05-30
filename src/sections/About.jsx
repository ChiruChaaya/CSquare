import { motion, useInView, useScroll, useTransform } from "framer-motion";
import puzzle from "../assets/images/puzzle.png";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);

  const inviewed = useInView(ref, { amount: "all" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <>
      <section className="bg-[#183A3B] min-h-screen">
        {/* Top Puzzle Icons */}
        <section className="flex gap-2 sm:gap-4 md:gap-6 mx-auto justify-center bg-[#183A3B] pt-8">
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
        </section>

        {/* About Content */}
        <motion.section
          ref={ref}
          id="about"
          style={{ scale }}
          className="bg-[#183A3B] px-4 sm:px-6 md:px-10 py-10 md:py-16 scroll-mt-24"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-serif
              font-bold
              text-center
              text-white
              mb-6
              md:mb-10
            "
          >
            About Us
          </motion.h2>

          {/* Content */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              max-w-8xl
              mx-auto
              text-center
              font-sans
              text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl
              leading-relaxed
              md:leading-loose
              text-gray-200
            "
          >
            We are{" "}
            <span className="text-emerald-500 font-semibold">
              two passionate partners
            </span>{" "}
            dedicated to helping businesses grow through
            <span className="text-emerald-500 font-semibold">
              {" "}
              digital marketing, website development, branding, and creative
              design
            </span>
            . At CSquare, we work closely with startups, local businesses, and
            creators to build a strong online presence that drives
            <span className="text-emerald-500 font-semibold">
              {" "}
              visibility, engagement, and growth
            </span>
            .
            <br />
            <br />
            We believe every business deserves access to
            <span className="text-emerald-500 font-semibold">
              {" "}
              affordable, professional, and results-driven digital solutions
            </span>
            . Whether it's creating a modern website, managing social media,
            running Google and Meta advertising campaigns, or optimizing
            business profiles, our goal is to help clients stand out in today's
            competitive digital landscape.
            <br />
            <br />
            CSquare is more than a digital marketing agency—it is a
            <span className="text-emerald-500 font-semibold">
              {" "}
              passion project built on creativity, collaboration, and innovation
            </span>
            . We treat every project as a unique opportunity to understand your
            vision and transform it into impactful digital experiences that
            connect with your audience.
            <br />
            <br />
            Our commitment is simple:
            <span className="text-emerald-500 font-semibold">
              {" "}
              deliver quality work, build long-term relationships, and grow
              alongside our clients
            </span>
            . We put our heart, energy, and expertise into every project because
            your success is our success.
            <br />
            <br />
            Thank you for visiting CSquare. Explore the website to learn more
            about our services, portfolio, and solutions, and feel free to reach
            out with any questions. We are always excited to help businesses
            take the next step in their digital journey.
          </motion.p>
        </motion.section>

        {/* Bottom Puzzle Icons */}
        <section className="flex gap-2 sm:gap-4 md:gap-6 mx-auto justify-center bg-[#183A3B] pb-8">
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
          <motion.img
            whileHover={{ y: -20 }}
            src={puzzle}
            alt="Puzzle"
            className="h-10 sm:h-14 md:h-20"
          />
        </section>
      </section>
    </>
  );
}