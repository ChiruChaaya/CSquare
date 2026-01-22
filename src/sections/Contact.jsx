import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const servicesList = [
  "Social Media Management",
  "Website Creation",
  "Video Editing",
  "Ad & Video Shoot",
  "Brochure Design",
  "Content Writing",
  "Other"
];

const ContactSection = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_2ojb2qa',
      'template_eo9aczo',
      {
        from_name: form.name,
        from_email: form.email,
        phone_number: form.phone,
        service_type: form.service,
        message: form.message,
        to_name: "Owner"
      },
      'x-nQVUSY3El8HMWK1'
    )
    .then(() => {
      setLoading(false);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    })
    .catch((error) => {
      setLoading(false);
      setStatus('error');
      console.error(error);
    });
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 md:px-10 overflow-hidden">
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#183A3B] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE: TEXT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">Get in Touch</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white mt-3 leading-tight">
              Let’s build something <span className="text-emerald-500">legendary.</span>
            </h2>
            <p className="text-neutral-400 mt-4 text-base sm:text-lg max-w-md">
              Ready to elevate your brand? Fill out the form, and let's discuss how we can turn your vision into reality.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>csquaredigital2026@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 text-white/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span>(+91) 7975222177 / 7338604106</span>
            </div>

            <div className="flex items-center gap-3 text-white/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z" />
                </svg>
              </div>
              <span>_hellocsquare_</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-900/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* Name */}
            <input
              type="text" name="name" value={form.name} onChange={handleChange} required
              placeholder="Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-500"
            />

            {/* Email */}
            <input
              type="email" name="email" value={form.email} onChange={handleChange} required
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-500"
            />

            {/* Phone */}
            <input
              type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-500"
            />

            {/* Service */}
            <select
              name="service" value={form.service} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="" disabled>Select a service</option>
              {servicesList.map((s, i) => <option key={i} value={s} className="bg-neutral-900 text-white">{s}</option>)}
            </select>

            {/* Message */}
            <textarea
              name="message" value={form.message} onChange={handleChange} required
              rows={5} placeholder="Your message..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-500 resize-none"
            />

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full py-3 sm:py-4 rounded-lg bg-emerald-600 text-white font-bold uppercase tracking-wide hover:bg-emerald-500 transition-all disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Status */}
            {status === 'success' && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center text-emerald-400 mt-2">Message sent successfully!</motion.p>}
            {status === 'error' && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center text-red-500 mt-2">Something went wrong. Please try again.</motion.p>}

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
