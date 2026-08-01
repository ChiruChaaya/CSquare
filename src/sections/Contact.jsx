// src/sections/Contact.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

// ─── EmailJS Credentials ─────────────────────────────────────────────────
const EJ_SERVICE_ID  = 'service_2ojb2qa';
const EJ_TEMPLATE_ID = 'template_eo9aczo';
const EJ_PUBLIC_KEY  = 'x-nQVUSY3El8HMWK1';

// ─── Contact Details ─────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  { label: 'Email',    value: 'csquaredigital2026@gmail.com',         href: 'mailto:csquaredigital2026@gmail.com' },
  { label: 'WhatsApp', value: '+91 7338604106/7975222177',          href: 'https://wa.me/917338604106' },
  { label: 'Based In', value: 'India — Remote Worldwide', href: null },
];

const SERVICES = [
  'AI Automation',
  'CRM Systems (CSquare360)',
  'Web Development',
  'Cyber Security',
  'Digital Marketing',
  'Brand Experience',
  'Combo Pack',
  'Other / Custom',
];

// ─── Floating Label Form Field ───────────────────────────────────────────
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  as = 'input',
  children,
  index,
}) {
  const wrapRef = useRef(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    gsap.set(el, { y: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power4.out',
        }),
    });
  }, [index]);

  const isActive = focused || value?.length > 0;

  const sharedProps = {
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: 'w-full bg-transparent outline-none text-white text-sm md:text-base',
    style: {
      paddingTop: as === 'textarea' ? '1.25rem' : '0.75rem',
      paddingBottom: '0.75rem',
      color: 'rgba(255,255,255,0.9)',
      resize: as === 'textarea' ? 'none' : undefined,
    },
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="relative border-b transition-colors duration-300"
        style={{
          borderColor: error
            ? 'rgba(255,80,80,0.6)'
            : focused
            ? '#D9E8A5'
            : 'rgba(255,255,255,0.15)',
        }}
      >
        <label
          className="absolute left-0 font-mono tracking-widest uppercase pointer-events-none transition-all duration-300"
          style={{
            top: isActive ? '-0.8rem' : as === 'textarea' ? '1rem' : '0.75rem',
            fontSize: isActive ? '0.6rem' : '0.75rem',
            color: error
              ? 'rgba(255,80,80,0.8)'
              : isActive || focused
              ? '#D9E8A5'
              : 'rgba(255,255,255,0.4)',
          }}
        >
          {label}
        </label>

        {as === 'textarea' && <textarea {...sharedProps} rows={4} />}
        {as === 'select' && <select {...sharedProps}>{children}</select>}
        {as === 'input' && <input {...sharedProps} type={type} />}
      </div>

      {error && (
        <p
          className="text-xs mt-1.5 font-mono"
          style={{ color: 'rgba(255,80,80,0.8)' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Success State ───────────────────────────────────────────────────────
function SuccessState({ onReset }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-6 py-20 text-center"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
        style={{
          background: 'rgba(217,232,165,0.12)',
          border: '1px solid rgba(217,232,165,0.3)',
          color: '#D9E8A5',
        }}
      >
        ✓
      </div>
      <div>
        <p
          className="text-2xl md:text-3xl font-serif font-bold mb-2"
          style={{
            color: '#D9E8A5',
            textShadow: '0 0 40px rgba(217,232,165,0.4)',
          }}
        >
          Message sent!
        </p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          We&rsquo;ll get back within 24 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-xs font-mono tracking-widest uppercase px-5 py-2.5 rounded-full border transition-colors duration-300 hover:border-[#D9E8A5]"
        style={{
          borderColor: 'rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)',
        }}
        data-cursor="button"
      >
        Send another
      </button>
    </div>
  );
}

// ─── Main Contact Section ────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const detailsRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[\d\s+()-]{7,}$/.test(form.phone)) errs.phone = 'Invalid phone number';
    if (!form.service) errs.service = 'Please select a service';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      gsap.fromTo(
        btnRef.current,
        { x: -8 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
      return;
    }

    setStatus('sending');
    try {
      // ── Variables MATCH your EmailJS template exactly ──
      await emailjs.send(
        EJ_SERVICE_ID,
        EJ_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          phone_number: form.phone,
          service_type: form.service,
          message:      form.message,
        },
        EJ_PUBLIC_KEY
      );
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to(labelRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          }),
      });

      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.set(split.chars, { y: '110%', opacity: 0 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 72%',
        once: true,
        onEnter: () =>
          gsap.to(split.chars, {
            y: '0%',
            opacity: 1,
            duration: 1.1,
            stagger: 0.025,
            ease: 'power4.out',
          }),
      });

      if (formRef.current) {
        gsap.set(formRef.current, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () =>
            gsap.to(formRef.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.3,
              ease: 'power4.out',
            }),
        });
      }

      if (detailsRef.current) {
        gsap.set(detailsRef.current, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: detailsRef.current,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(detailsRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.2,
              ease: 'power3.out',
            }),
        });
      }

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen py-24 md:py-36 flex items-center"
      style={{ background: 'transparent' }}
    >
      {/* Vignette — darkens center where form sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.4) 45%,
            transparent 85%
          )`,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="text-xs font-mono tracking-[0.3em] uppercase mb-8"
          style={{ color: 'rgba(217,232,165,0.6)' }}
        >
          — Get In Touch
        </p>

        {/* Heading */}
        <div className="mb-16 max-w-4xl">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.08]"
          >
            Let&rsquo;s build something{' '}
            <span
              style={{
                color: '#D9E8A5',
                textShadow: '0 0 40px rgba(217,232,165,0.4)',
              }}
            >
              great
            </span>{' '}
            together.
          </h2>
        </div>

        {/* Form or Success */}
        {status === 'success' ? (
          <SuccessState
            onReset={() => {
              setStatus('idle');
              setForm({ name: '', email: '', phone: '', service: '', message: '' });
            }}
          />
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,15,15,0.94), rgba(5,5,5,0.97))',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                '0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset',
              padding: '2.5rem',
            }}
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <FormField
                label="Your Name"
                name="name"
                index={0}
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                index={1}
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            {/* Row 2: Phone + Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                index={2}
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <FormField
                label="Service Interested In"
                name="service"
                as="select"
                index={3}
                value={form.service}
                onChange={handleChange}
                error={errors.service}
              >
                <option value="" disabled />
                {SERVICES.map((s) => (
                  <option
                    key={s}
                    value={s}
                    style={{ background: '#0a0a0a', color: '#fff' }}
                  >
                    {s}
                  </option>
                ))}
              </FormField>
            </div>

            {/* Row 3: Message */}
            <div className="mb-12">
              <FormField
                label="Tell Us About Your Project"
                name="message"
                as="textarea"
                index={4}
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                ref={btnRef}
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 group"
                style={{
                  background: '#D9E8A5',
                  color: '#000',
                  boxShadow: '0 10px 30px rgba(217,232,165,0.25)',
                }}
                data-cursor="button"
              >
                {status === 'sending' ? (
                  <>
                    <span
                      className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      style={{ animation: 'spin 0.7s linear infinite' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p
                  className="text-sm font-mono"
                  style={{ color: 'rgba(255,80,80,0.8)' }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        )}

        {/* Contact details row */}
        <div
          ref={detailsRef}
          className="mt-16 pt-10 border-t grid grid-cols-1 sm:grid-cols-3 gap-8"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {CONTACT_DETAILS.map(({ label, value, href }) => (
            <div key={label}>
              <p
                className="text-xs font-mono tracking-[0.25em] uppercase mb-2"
                style={{ color: 'rgba(217,232,165,0.5)' }}
              >
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm transition-colors duration-300 hover:text-[#D9E8A5]"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  data-cursor="button"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 left-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 right-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
    </section>
  );
}