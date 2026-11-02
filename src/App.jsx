import React, { useState, useEffect, useRef } from 'react';
import workImg from '/work.png';
import logoImg from '/lgo.png';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const [projectType, setProjectType] = useState('portfolio');
  const [pagesCount, setPagesCount] = useState(3);
  const [needAnimation, setNeedAnimation] = useState(true);
  const [needAdmin, setNeedAdmin] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay prevented, waiting for interaction", err);
        });
      }
    };

    playAudio();

    const handleFirstInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const calculateEstimate = () => {
    let base = 0;
    if (projectType === 'portfolio') {
      const minPrice = 300;
      const maxPrice = 600;
      base = minPrice + ((pagesCount - 1) / 9) * (maxPrice - minPrice);
    } else {
      const minPrice = 3000;
      const maxPrice = 6000;
      base = minPrice + ((pagesCount - 1) / 9) * (maxPrice - minPrice);
    }
    
    let animCost = needAnimation ? 200 : 0;
    let adminCost = needAdmin ? 400 : 0;
    return Math.round(base + animCost + adminCost);
  };

  const calculateDays = () => {
    let baseDays = projectType === 'portfolio' ? 5 : 12;
    let extraDays = Math.ceil(pagesCount / 2);
    return baseDays + extraDays;
  };

  const projects = [
    {
      title: 'Nesej Luxury Perfume Store',
      category: 'E-Commerce & High-End Luxury',
      description: 'An interactive cinematic luxury perfume store featuring bottle size showcases, fragrance notes breakdown, and smooth navigation.',
      url: 'https://perfume-mocha-gamma.vercel.app/',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      badge: 'Luxury E-Commerce'
    },
    {
      title: 'Tyre Automotive Hub',
      category: 'E-Commerce & Automotive',
      description: 'A comprehensive automotive tyre shopping platform with dynamic filtering, tyre size finder, and high-performance design.',
      url: 'https://tyre-kc6u.vercel.app/',
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1000&q=80',
      badge: 'Automotive Store'
    },
    {
      title: 'Graphic Creative Agency',
      category: 'Corporate & Portfolio',
      description: 'A modern creative agency portfolio for graphic and media services with dark aesthetics, stunning layouts, and smooth animations.',
      url: 'https://graphic-hjci.vercel.app/',
      image: workImg,
      badge: 'Creative Agency'
    }
  ];

  const services = [
    {
      title: 'Brand & Corporate Websites',
      desc: 'We design and build professional websites tailored to your brand identity with high-end luxury aesthetics.'
    },
    {
      title: 'Full E-Commerce Stores',
      desc: 'Seamless shopping experience with interactive carts, lightning-fast checkouts, and conversion-optimized layouts.'
    },
    {
      title: 'Portfolios & Freelancers',
      desc: 'Showcase your work and professional skills in a custom, captivating way that leaves competitors behind.'
    },
    {
      title: 'Smooth Animations & Motion',
      desc: 'Enhance visitor engagement with custom visual effects and fluid interactions across every section.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden', direction: 'ltr', textAlign: 'left' }}>
      
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" autoPlay loop />

      {/* Floating Audio Controller */}
      <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid #334155', padding: '6px 12px', borderRadius: '9999px', backdropFilter: 'blur(12px)', boxShadow: '0 20px 25px -5px rgba(168, 85, 247, 0.3)' }}>
        <button 
          onClick={toggleMusic}
          style={{ background: 'linear-gradient(to right, #9333ea, #db2777)', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
        >
          {isPlaying ? '🎵 Playing' : '🎵 Play'}
        </button>
        <button 
          onClick={toggleMute}
          style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px' }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e293b', padding: '12px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #a855f7', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
              <img src={logoImg} alt="RMX Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#ffffff', letterSpacing: '0.5px' }}>RMX Solutions</span>
              <span style={{ fontSize: '9px', display: 'block', color: '#c084fc', letterSpacing: '1px', textTransform: 'uppercase' }}>Web Development</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a 
              href="https://instagram.com/rmx_webdesigners" 
              target="_blank" 
              rel="noreferrer"
              style={{ padding: '6px 10px', borderRadius: '9999px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f43f5e', textDecoration: 'none', fontSize: '11px', fontWeight: '600' }}
            >
              Insta
            </a>
            <a 
              href="https://wa.me/201224419331" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '9999px', background: 'linear-gradient(to right, #10b981, #0d9488)', color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '600', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
            >
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '60px 16px 40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', color: '#d8b4fe', fontSize: '11px', fontWeight: '600', marginBottom: '20px' }}>
          ✨ Welcome to RMX Design & Development Studio
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 5vw, 50px)', fontWeight: 'extrabold', lineHeight: '1.2', marginBottom: '20px' }}>
          Transforming Ideas into <span style={{ background: 'linear-gradient(to right, #c084fc, #f472b6, #fde047)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Unique & Sleek Websites</span>
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '650px', margin: '0 auto 28px', lineHeight: '1.6' }}>
          We design and build exceptional websites, e-commerce stores, and portfolios with top-tier precision, speed, and professional animations to elevate your brand.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <a 
            href="https://wa.me/201224419331" 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: '12px 24px', borderRadius: '9999px', background: 'linear-gradient(to right, #9333ea, #db2777, #d97706)', color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', boxShadow: '0 10px 25px rgba(147, 51, 234, 0.4)', transition: 'transform 0.3s' }}
          >
            Order Your Website Now 🚀
          </a>
          <a 
            href="#projects" 
            style={{ padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#e2e8f0', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}
          >
            Explore Live Projects
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '40px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Our Latest Executed Projects 🚀</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>Click "Visit Live Site" to launch and test the interactive live preview.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, border-color 0.3s' }}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#a855f7'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1e293b'; }}
            >
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'rgba(2, 6, 23, 0.85)', border: '1px solid #334155', color: '#d8b4fe', fontSize: '10px', fontWeight: '600', backdropFilter: 'blur(4px)' }}>
                  {proj.badge}
                </span>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#fbbf24', textTransform: 'uppercase', marginBottom: '6px' }}>{proj.category}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{proj.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>{proj.description}</p>
                </div>
                <a 
                  href={proj.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: '#1e293b', color: 'white', textAlign: 'center', textDecoration: 'none', fontSize: '12px', fontWeight: '600', boxSizing: 'border-box' }}
                >
                  Visit Live Site (Vercel) ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '40px 16px', maxWidth: '1200px', margin: '30px auto', backgroundColor: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid #1e293b' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>RMX Services ✨</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>We provide a comprehensive suite of luxury software solutions.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {services.map((serv, i) => (
            <div key={i} style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#020617', border: '1px solid #1e293b', transition: 'border-color 0.3px' }}
                 onMouseEnter={(e) => e.currentTarget.style.borderColor = '#475569'}
                 onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e293b'}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{serv.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.5' }}>{serv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section style={{ padding: '40px 16px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '30px 20px', borderRadius: '24px', background: 'linear-gradient(to bottom, #0f172a, #020617)', border: '1px solid rgba(147, 51, 234, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Project Calculator</span>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px', color: 'white' }}>Estimate Your Project Cost & Timeline 🧮</h2>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Portfolios: 300 - 600 EGP | Websites & Stores: 3000 - 6000 EGP</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>Project Type:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'portfolio', name: 'Portfolio (300-600 EGP)' },
                    { id: 'website', name: 'Website (3k-6k EGP)' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id)}
                      style={{ padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', border: '1px solid', backgroundColor: projectType === t.id ? '#9333ea' : '#020617', borderColor: projectType === t.id ? '#a855f7' : '#1e293b', color: projectType === t.id ? 'white' : '#94a3b8', transition: 'all 0.2s' }}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontWeight: 'bold', color: '#cbd5e1' }}>
                  <span>Number of Pages / Scale:</span>
                  <span style={{ color: '#c084fc' }}>{pagesCount} Pages</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={pagesCount} 
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#a855f7' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#cbd5e1' }}>
                  <input type="checkbox" checked={needAnimation} onChange={(e) => setNeedAnimation(e.target.checked)} style={{ accentColor: '#a855f7' }} />
                  Custom Luxury Animations & Motion
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#cbd5e1' }}>
                  <input type="checkbox" checked={needAdmin} onChange={(e) => setNeedAdmin(e.target.checked)} style={{ accentColor: '#a855f7' }} />
                  Admin Dashboard & Content Management
                </label>
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#020617', border: '1px solid #1e293b', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Estimated Cost & Timeline</div>
              <div style={{ fontSize: '32px', fontWeight: '900', background: 'linear-gradient(to right, #fde047, #f472b6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {calculateEstimate()} EGP
              </div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                Estimated Delivery: <strong style={{ color: '#d8b4fe' }}>{calculateDays()} Working Days</strong>
              </div>
              <a 
                href={`https://wa.me/201224419331?text=${encodeURIComponent(`Hello RMX, I would like to order a (${projectType}) project with ${pagesCount} pages. Estimated Cost: ${calculateEstimate()} EGP`)}`}
                target="_blank" 
                rel="noreferrer"
                style={{ padding: '11px', borderRadius: '10px', background: 'linear-gradient(to right, #10b981, #0d9488)', color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '12px', display: 'block', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
              >
                Confirm & Start via WhatsApp 💬
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', backgroundColor: '#020617', padding: '40px 16px 24px', marginTop: '50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #a855f7' }}>
                <img src={logoImg} alt="RMX Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>RMX Web Solutions</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6' }}>Your software agency for developing high-end, custom websites tailored for brands and individuals.</p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>Direct Contact Info</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
              <li>Phone/WhatsApp: <a href="https://wa.me/201224419331" style={{ color: '#fde047', textDecoration: 'none' }}>01224419331</a></li>
              <li>Email: <a href="mailto:rmx.webdesigners@gmail.com" style={{ color: '#d8b4fe', textDecoration: 'none' }}>rmx.webdesigners@gmail.com</a></li>
              <li>Instagram: <a href="https://instagram.com/rmx_webdesigners" target="_blank" rel="noreferrer" style={{ color: '#f472b6', textDecoration: 'none' }}>@rmx_webdesigners</a></li>
            </ul>
          </div>

          <div style={{ padding: '18px', borderRadius: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>Ready to launch your website?</h4>
              <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '14px' }}>Contact us today and we will start working immediately.</p>
            </div>
            <a 
              href="https://wa.me/201224419331" 
              target="_blank" 
              rel="noreferrer"
              style={{ padding: '9px', borderRadius: '8px', backgroundColor: '#9333ea', color: 'white', fontWeight: '600', textDecoration: 'none', fontSize: '11px', textAlign: 'center', display: 'block' }}
            >
              Message RMX Now 💬
            </a>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #0f172a', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: '#64748b', fontSize: '11px', gap: '8px' }}>
          <div>© 2026 RMX Web Solutions. All rights reserved.</div>
          <div>Designed & Developed by RMX Studio</div>
        </div>
      </footer>

    </div>
  );
}