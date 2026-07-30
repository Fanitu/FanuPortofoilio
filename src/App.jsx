import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Shop Management System',
      description: 'Automated order tracking and profit analytics for fast-food businesses. Real-time COGS calculation and daily reporting.',
      image: '🛍️',
      category: 'web',
      tech: ['React', 'Node.js', 'MongoDB', 'Vercel'],
      liveUrl: 'https://basic-managment.vercel.app',
      featured: true,
    },
    {
      id: 2,
      title: 'Inventory Management Dashboard',
      description: 'Complete stock tracking system with barcode scanning, low stock alerts, and supplier management.',
      image: '📦',
      category: 'web',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
      liveUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Customer Relationship Manager',
      description: 'CRM system for small businesses to track leads, manage follow-ups, and analyze sales pipeline.',
      image: '👥',
      category: 'web',
      tech: ['React', 'Express', 'MySQL', 'Redis'],
      liveUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Restaurant Ordering App',
      description: 'Mobile-friendly ordering system with QR code menu, WhatsApp integration, and order tracking.',
      image: '🍔',
      category: 'mobile',
      tech: ['React Native', 'Firebase', 'Node.js'],
      liveUrl: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'Expense Tracker PWA',
      description: 'Progressive web app for personal and business expense tracking with CSV export and charts.',
      image: '💰',
      category: 'web',
      tech: ['Vue.js', 'Chart.js', 'IndexedDB'],
      liveUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'E-commerce API',
      description: 'RESTful API for e-commerce platforms with authentication, product management, and order processing.',
      image: '🔌',
      category: 'backend',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      liveUrl: '#',
      featured: false,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const skills = [
    { name: 'React / Next.js', level: 90, icon: '⚛️' },
    { name: 'Node.js / Express', level: 85, icon: '🟢' },
    { name: 'MongoDB / PostgreSQL', level: 80, icon: '🗄️' },
    { name: 'Tailwind CSS', level: 95, icon: '🎨' },
    { name: 'JavaScript / TypeScript', level: 90, icon: '📜' },
    { name: 'Git / GitHub', level: 88, icon: '📦' },
  ];

  const testimonials = [
    {
      name: 'Abebe Kebede',
      role: 'Owner, Addis Fata House',
      content: 'The shop management system transformed how we track profit. We now know exactly which items make us the most money. Incredible work!',
      avatar: '👨🏽‍🍳',
    },
    {
      name: 'Tigist Haile',
      role: 'Manager, Bole Cafe',
      content: 'Professional, fast, and reliable. The inventory system saved us hours of manual counting every week.',
      avatar: '👩🏽‍💼',
    },
    {
      name: 'Samuel Tesfaye',
      role: 'Founder, TechStart Ethiopia',
      content: 'One of the most talented developers I\'ve worked with. Delivers clean code and actually understands business needs.',
      avatar: '👨🏽‍💻',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for reaching out! I will respond within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            <span className="logo-icon">{"</>"}</span>
            <span className="logo-text">Dev<span>Portfolio</span></span>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('hero')}>Home</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
            <button className="nav-resume" onClick={() => window.open('#', '_blank')}>
              Resume 📄
            </button>
          </div>

          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content fade-up">
            <span className="hero-badge">👋 Available for Work</span>
            <h1 className="hero-title">
              Crafting <span className="gradient-text">Digital Products</span> That Drive Results
            </h1>
            <p className="hero-description">
              Full-stack developer specializing in building exceptional web applications 
              for businesses that want to scale. 5+ projects delivered. 100% client satisfaction.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work →
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Let's Talk
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Coding</span>
              </div>
            </div>

            <div className="hero-tech">
              <span>Tech Stack:</span>
              <div className="tech-icons">
                <span>⚛️</span>
                <span>🟢</span>
                <span>🗄️</span>
                <span>🎨</span>
                <span>📜</span>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-up">
            <div className="code-card">
              <div className="code-header">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
                <span className="code-filename">developer.js</span>
              </div>
              <div className="code-content">
                <pre>
                  <code>
{`const developer = {
  name: "FANUEL BAHTA",
  role: "Full-Stack Dev",
  skills: ["React", "Node", 
           "MongoDB", "Express"],
  passion: "Building products 
            that solve real 
            business problems",
  available: true
};`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">👤 About Me</span>
            <h2>More Than Just Code</h2>
            <p className="section-subtitle">
              I bridge the gap between technical excellence and business value.
            </p>
          </div>

          <div className="about-content">
            <div className="about-text fade-up">
              <p className="about-intro">
                Hey! I'm <span className="highlight">FANUEL BAHTA</span>, a full-stack developer 
                based in Ethiopia. I've been building web applications for over 3 years, 
                specializing in React, Node.js, and MongoDB.
              </p>
              <p>
                What sets me apart? I don't just write code—I build solutions that help 
                businesses make more money. Whether it's automating profit calculations 
                for restaurants or creating inventory systems that save hours of work, 
                I focus on <strong>measurable results</strong>.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new tech, mentoring junior 
                developers, or enjoying Ethiopian coffee ☕.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🎯</span>
                  <div>
                    <h4>Business-First Approach</h4>
                    <p>I ask "why" before "how" to ensure every feature drives value.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⚡</span>
                  <div>
                    <h4>Fast Turnaround</h4>
                    <p>MVP in weeks, not months. Iterate based on real feedback.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔒</span>
                  <div>
                    <h4>Clean & Secure Code</h4>
                    <p>Best practices, proper authentication, and scalable architecture.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-card fade-up">
              <div className="experience-card">
                <h3>Why Work With Me?</h3>
                <ul className="experience-list">
                  <li>
                    <span className="check">✓</span>
                    <span><strong>5+ projects</strong> delivered successfully</span>
                  </li>
                  <li>
                    <span className="check">✓</span>
                    <span><strong>100% client</strong> satisfaction rate</span>
                  </li>
                  <li>
                    <span className="check">✓</span>
                    <span><strong>Full-stack</strong> capabilities (frontend to deployment)</span>
                  </li>
                  <li>
                    <span className="check">✓</span>
                    <span><strong>Post-launch</strong> support included</span>
                  </li>
                  <li>
                    <span className="check">✓</span>
                    <span><strong>Clear communication</strong> in Amharic or English</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">📁 Portfolio</span>
            <h2>Featured Projects</h2>
            <p className="section-subtitle">
              Real-world applications that solve real business problems.
            </p>
          </div>

          <div className="project-filters fade-up">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Apps
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveFilter('mobile')}
            >
              Mobile
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'backend' ? 'active' : ''}`}
              onClick={() => setActiveFilter('backend')}
            >
              Backend
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card fade-up ${project.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <span className="project-icon">{project.image}</span>
                  {project.featured && <span className="featured-badge">⭐ Featured</span>}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      Live Demo →
                    </a>
                    <button className="project-link secondary">Code</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="projects-cta fade-up">
            <p>Have a project in mind?</p>
            <button className="btn-primary" onClick={() => scrollToSection('contact')}>
              Let's Build It Together
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">🛠️ Expertise</span>
            <h2>Technical Skills</h2>
            <p className="section-subtitle">
              Technologies I work with daily to bring ideas to life.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card fade-up">
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="additional-skills fade-up">
            <h3>Also Experienced With:</h3>
            <div className="skill-tags">
              <span>Redux</span>
              <span>REST APIs</span>
              <span>JWT Auth</span>
              <span>WebSockets</span>
              <span>Docker</span>
              <span>AWS (EC2, S3)</span>
              <span>Vercel</span>
              <span>Netlify</span>
              <span>Figma</span>
              <span>Postman</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">💬 Testimonials</span>
            <h2>What Clients Say</h2>
            <p className="section-subtitle">
              Don't take my word for it—hear from the people I've worked with.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card fade-up">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-content">{testimonial.content}</p>
                <div className="testimonial-author">
                  <span className="author-avatar">{testimonial.avatar}</span>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrapper fade-up">
            <div className="contact-info">
              <span className="section-tag">📬 Get In Touch</span>
              <h2>Let's Build Something Great</h2>
              <p className="contact-description">
                Ready to take your business to the next level with custom software? 
                I'm just a message away.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <span className="method-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:your.email@example.com">your.email@example.com</a>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="method-icon">📱</span>
                  <div>
                    <h4>Telegram / Phone</h4>
                    <a href="https://t.me/yourusername">@yourusername</a>
                    <span className="phone">+251 9XX XXX XXX</span>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="method-icon">🌐</span>
                  <div>
                    <h4>Social</h4>
                    <div className="social-links">
                      <a href="#" target="_blank">GitHub</a>
                      <a href="#" target="_blank">LinkedIn</a>
                      <a href="#" target="_blank">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-availability">
                <span className="availability-dot"></span>
                Available for new projects • Response within 24 hours
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Abebe Kebede"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="abebe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea 
                    id="message"
                    rows="5"
                    placeholder="Tell me about your project, timeline, and budget..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">{"</>"} DevPortfolio</span>
              <p>Building digital products that drive results.</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Navigation</h4>
                <button onClick={() => scrollToSection('hero')}>Home</button>
                <button onClick={() => scrollToSection('about')}>About</button>
                <button onClick={() => scrollToSection('projects')}>Projects</button>
                <button onClick={() => scrollToSection('contact')}>Contact</button>
              </div>
              <div className="footer-links-column">
                <h4>Connect</h4>
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Telegram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 DevPortfolio. All rights reserved.</p>
            <p className="footer-tagline">Built with ⚛️ React & 💚 Vite</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;