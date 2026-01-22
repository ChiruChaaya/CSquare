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
  
  // 1. UPDATED STATE: Added 'phone'
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '', 
    service: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 2. UPDATED SEND FUNCTION: Added 'phone_number'
    emailjs.send(
      'service_2ojb2qa',     // Replace with actual ID
      'template_eo9aczo',    // Replace with actual ID
      {
        from_name: form.name,
        from_email: form.email,
        phone_number: form.phone,
        service_type: form.service,
        message: form.message,
        to_name: "Owner"
      },
      'x-nQVUSY3El8HMWK1'      // Replace with actual Key
    )
    .then(() => {
      setLoading(false);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, (error) => {
      setLoading(false);
      setStatus('error');
      console.error(error);
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 flex items-center justify-center py-20 px-4 md:px-10 overflow-hidden">
      
      <div className="absolute inset-0 bg-[#183A3B]/40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT SIDE: TEXT INFO */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center h-full space-y-8"
        >
          <div>
            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
              Get in Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-bold font-serif text-white mt-4 leading-tight">
              Let’s build something <span className="text-emerald-500">legendary.</span>
            </h2>
            <p className="text-neutral-400 mt-6 text-lg max-w-md">
              Ready to elevate your brand? Fill out the form, and let's discuss how we can turn your vision into reality.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span>hello@yourbrand.com</span>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-900/60 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neutral-400 uppercase">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neutral-400 uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* 3. NEW PHONE INPUT */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neutral-400 uppercase">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* Service Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neutral-400 uppercase">Service Interested In</label>
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  {servicesList.map((service, index) => (
                    <option key={index} value={service} className="bg-neutral-900 text-white">
                      {service}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neutral-400 uppercase">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-emerald-600 text-white font-bold tracking-wide uppercase hover:bg-emerald-500 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/20"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-emerald-400 text-sm font-medium"
              >
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-400 text-sm font-medium"
              >
                Something went wrong. Please try again later.
              </motion.div>
            )}

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;