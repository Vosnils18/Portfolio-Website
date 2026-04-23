import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Github, Linkedin, Mail, ArrowRight, Cpu, Database, Network, Zap, ChevronRight, FileText, Download, Globe } from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  github?: string;
  link?: string;
}

interface Service {
  index: string;
  title: string;
  description: string;
  icon: any;
}

// --- Data ---
const SERVICES: Service[] = [
  { index: "01", title: "Machine Learning", description: "End-to-end ML from research to production.", icon: Cpu },
  { index: "02", title: "Data Engineering", description: "Robust data architecture & insightful analytics.", icon: Database },
  { index: "03", title: "MLOps & Cloud", description: "Scalable infrastructure for model deployment.", icon: Zap },
  { index: "04", title: "Deep Learning & AI", description: "Computer vision and advanced AI research.", icon: Network }
];

const PROJECTS: Project[] = [
  { 
    id: "01", 
    title: "PlantSeg", 
    description: "Agricultural AI platform for high-precision plant segmentation.", 
    tags: ["Vision", "PyTorch"], 
    category: "AI",
    github: "https://github.com/Vosnils18/plantseg",
  },
  { 
    id: "02", 
    title: "Truck Predictive", 
    description: "Mechanical failure prediction for DAF commercial fleets.", 
    tags: ["IoT", "Analysis"], 
    category: "Industrial",
    github: "https://github.com/Vosnils18/predictive_maintenance"
  },
  { 
    id: "03", 
    title: "Roadie System", 
    description: "Traffic hazard detection AI for road safety.", 
    tags: ["Edge", "Safety"], 
    category: "AI",
    github: "https://github.com/Vosnils18/roadie_incident_predictor"
  },
  { 
    id: "04", 
    title: "Niagara Pipeline", 
    description: "Automated sensor data processing ecosystem.", 
    tags: ["BMS", "Data"], 
    category: "Infrastructure",
    github: "https://github.com/Vosnils18/niagara-ai-pipeline"
  },
  { 
    id: "05", 
    title: "ISMA Generator", 
    description: "Industrial IO mapping tool for PLC automation.", 
    tags: ["Python", "PLC"], 
    category: "Industrial",
    github: "https://github.com/Vosnils18/isma-io-generator"
  },
  { 
    id: "06", 
    title: "Depth Processing", 
    description: "Real-time 3D reconstruction for industrial sensors.", 
    tags: ["CV", "Robotics"], 
    category: "AI",
    github: "https://github.com/Vosnils18/depth_camera"
  }
];

const EXPERTISE = [
  { category: "ML & AI", skills: ["Deep Learning", "Computer Vision", "NLP", "PyTorch", "TensorFlow"] },
  { category: "Data Systems", skills: ["Data Modelling", "ETL Pipelines", "Data Warehousing", "Architecture"] },
  { category: "Infrasctructure", skills: ["Azure ML", "Docker", "MLOps Pipelines", "Linux Admin"] },
  { category: "Core", skills: ["Python (Advanced)", "PostgreSQL", "API Design", "Statistical Analysis"] }
];

// --- Components ---

const Navbar = ({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50">
      <div className="text-xl font-black tracking-tighter text-brand-black dark:text-white">NILS VOS<span className="text-brand-orange">.</span></div>
      
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-black/50 dark:text-white/50">
        {['About', 'Services', 'Work', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-orange transition-colors cursor-pointer text-brand-black dark:text-white">
            {item}
          </a>
        ))}
        <button onClick={toggleDark} className="hover:text-brand-orange transition-colors text-brand-black dark:text-white">
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-black dark:text-white">
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-white dark:bg-brand-black z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-brand-black dark:text-white"><X size={32} /></button>
            {['About', 'Services', 'Work', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-black tracking-tighter hover:text-brand-orange text-brand-black dark:text-white">
                {item}
              </a>
            ))}
            <button onClick={() => { toggleDark(); setIsOpen(false); }} className="text-brand-black dark:text-white">
                {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ThemeBackground = () => (
  <>
    <div className="absolute inset-0 grid-pattern pointer-events-none" />
    <div className="data-stream" />
    <div className="theme-blur-blue opacity-20" />
    <div className="theme-blur-orange opacity-10 dark:opacity-20" />
  </>
);

const InteractiveLetter = ({ char }: { char: string }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const [displayChar, setDisplayChar] = useState(char);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isHovered && char !== " ") {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayChar(letters[Math.floor(Math.random() * letters.length)]);
                iteration++;
                if (iteration > 5) {
                    clearInterval(interval);
                    setDisplayChar(char);
                }
            }, 50);
        } else {
            setDisplayChar(char);
        }
        return () => clearInterval(interval);
    }, [isHovered, char]);

    return (
        <motion.span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`inline-block cursor-default transition-colors duration-200 hover-glitch`}
        >
            {displayChar}
        </motion.span>
    );
};

const InteractiveTitle = ({ text }: { text: string }) => {
    return (
        <span className="inline-flex flex-wrap gap-[0.05em]">
            {text.split("").map((char, i) => (
                <InteractiveLetter key={i} char={char} />
            ))}
        </span>
    );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-brand-black text-brand-black dark:text-white relative font-sans overflow-x-hidden transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
      <ThemeBackground />

      {/* HERO SECTION */}
      <section className="relative min-h-screen grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center px-6 md:px-12 pt-32 lg:pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-brand-muted text-[10px] uppercase tracking-[0.5em] mb-6 font-bold">Data & AI solutions</p>
            <h1 className="text-[52px] sm:text-[70px] md:text-[140px] leading-[0.85] font-black tracking-tighter mb-12 uppercase text-brand-black dark:text-white">
              <InteractiveTitle text="NILS" /><br />
              <InteractiveTitle text="VOS" /><span className="text-brand-orange">.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 mt-4 items-start">
              <div className="max-w-sm">
                <p className="text-sm md:text-lg text-brand-black/60 dark:text-white/50 leading-relaxed font-medium">
                  Building high-performance intelligent experiences at the intersection of data science and engineered solutions. Specialized in ML, Advanced Analytics, and AI architecture.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#work" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full border border-brand-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-brand-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-brand-black transition-all duration-500">
                    <ArrowRight size={18} className="group-hover:rotate-45 transition-transform" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black">Portfolio</span>
                </a>
                <a href="/Nils_Vos_CV.pdf" download className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full border border-brand-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all duration-500">
                    <Download size={18} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black">Download CV</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex col-span-4 border-l border-brand-black/5 dark:border-white/5 flex-col bg-brand-black/[0.01] dark:bg-white/[0.01]">
          <div className="flex-1 p-12 border-b border-brand-black/5 dark:border-white/5 flex flex-col justify-end">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-black/20 dark:text-white/20 mb-8 font-bold">Featured Projects</p>
            <ul className="space-y-8">
              {PROJECTS.slice(0, 4).map((project) => (
                <li key={project.id} className="group cursor-pointer flex items-baseline">
                  <span className="text-[10px] font-mono text-brand-black/10 dark:text-white/10 mr-6">{project.id}</span>
                  <div className="flex-1">
                    <span className="text-2xl font-light tracking-tight group-hover:pl-4 transition-all block">{project.title}</span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">{project.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-64 p-12 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-black/20 dark:text-white/20 mb-4 font-bold">Expertise</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-brand-black/60 dark:text-white/60">
                 <span>PYTORCH</span>
                 <span>TENSORFLOW</span>
                 <span>PYTHON</span>
                 <span>COMPUTER VISION</span>
                 <span>MLOPS</span>
                 <span>TRANSFORMERS</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-16 h-[1px] bg-brand-black/10 dark:bg-white/10"></div>
              <p className="text-[10px] font-mono text-brand-black/10 dark:text-white/10">©2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 border-y border-brand-black/5 dark:border-white/5 bg-brand-black/[0.01] dark:bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICES.map((service) => (
              <motion.div 
                key={service.index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-[10px] font-mono text-brand-black/20 dark:text-white/20 mb-6">{service.index}</div>
                <h3 className="text-3xl mb-4 group-hover:text-brand-orange transition-colors">{service.title}</h3>
                <p className="text-sm text-brand-black/40 dark:text-white/40 leading-relaxed font-medium">{service.description}</p>
                <div className="mt-8 w-8 h-[1px] bg-brand-black/20 dark:bg-white/20 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK GRID */}
      <section id="work" className="py-32">
        <div className="container mx-auto px-6 md:px-12">
           <div className="flex items-center justify-between mb-20">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">SELECTED WORK<span className="text-brand-orange">.</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {PROJECTS.map((project, i) => (
                <motion.a 
                  key={project.id}
                  href={project.github || project.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative aspect-video theme-card theme-card-hover p-8 md:p-12 flex flex-col justify-between"
                >
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-brand-black/20 dark:text-white/20">{project.id}</span>
                      <div className="flex gap-4 pointer-events-none text-brand-black/40 dark:text-white/40 group-hover:text-brand-orange transition-colors">
                        {project.github && <Github size={18} />}
                        {project.link && <Globe size={18} />}
                      </div>
                   </div>
                   <div>
                      <h3 className="text-4xl md:text-5xl mb-4 uppercase tracking-tighter transition-colors group-hover:text-brand-orange">{project.title}</h3>
                      <p className="text-sm text-brand-black/40 dark:text-white/40 max-w-xs">{project.description}</p>
                   </div>
                   <div className="flex justify-between items-end">
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-brand-black/20 dark:text-white/20">{tag}</span>
                        ))}
                      </div>
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-brand-orange" />
                   </div>
                </motion.a>
              ))}
           </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="py-32 border-t border-brand-black/5 dark:border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center mb-20">
            <h2 className="text-4xl font-black uppercase">Technical Domains</h2>
        </div>
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {EXPERTISE.map((exp) => (
                <div key={exp.category} className="space-y-6">
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-brand-orange">{exp.category}</h4>
                    <ul className="space-y-3 font-medium text-lg tracking-tight">
                        {exp.skills.map(s => (
                            <li key={s} className="hover:translate-x-2 transition-transform cursor-default">{s}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 bg-white dark:bg-brand-black relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-brand-orange text-[10px] uppercase tracking-[1em] mb-12 font-black">GET IN TOUCH</p>
              <h2 className="text-4xl md:text-9xl font-black tracking-tighter uppercase mb-20 leading-none">
                <a href="mailto:info@nilsvos.dev" className="hover:text-brand-orange transition-colors">START A<br/>PROJECT</a>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-brand-black/30 dark:text-white/30">
                 <a href="https://linkedin.com/in/nils-vos-21b182208" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">LinkedIn</a>
                 <a href="https://github.com/Vosnils18" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">GitHub</a>
                 <a href="mailto:info@nilsvos.dev" className="hover:text-brand-orange transition-colors">Email</a>
              </div>
            </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-brand-black/5 dark:border-white/5 mt-20">
         <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] font-mono text-brand-black/20 dark:text-white/20 tracking-widest uppercase">©2026 NILS VOS — DATA & AI Solutions</div>
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-black bg-brand-black/5 dark:bg-white/5"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-black bg-brand-black/10 dark:bg-white/10"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-black bg-brand-black/20 dark:bg-white/20"></div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-brand-black/20 dark:text-white/20 font-bold">ROtterdam 51.92N 4.47E</div>
         </div>
      </footer>
    </div>
  );
}
