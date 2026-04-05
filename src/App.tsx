import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { SpiderWeb } from "./components/SpiderWeb";
import img1 from "@/assets/image/img-1.png";
import img2 from "@/assets/image/img-2.png";
import img3 from "@/assets/image/img-3.png";
import img4 from "@/assets/image/img-4.png";
import imgTobey from "@/assets/image/tobey.png";
import imgAndrew from "@/assets/image/andrew.png";
import imgTom from "@/assets/image/tom.png";

const glassClasses =
  "bg-[#0A1931]/40 backdrop-blur-xl border border-[#E23636]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl";
const btnPrimary =
  "px-6 py-3 font-bebas text-xl md:text-2xl uppercase tracking-widest rounded transition-all duration-300 relative overflow-hidden bg-primary-red text-white shadow-[0_0_15px_rgba(226,54,54,0.5)] hover:bg-dark-red hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(226,54,54,0.5)]";
const btnSecondary =
  "px-6 py-3 font-bebas text-xl md:text-2xl uppercase tracking-widest rounded transition-all duration-300 relative overflow-hidden bg-transparent text-white border-2 border-primary-red hover:bg-primary-red/10 hover:-translate-y-1";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const navLinks = [
    {
      name: "Games",
      path: "https://store.steampowered.com/app/1817070/Marvels_SpiderMan_Remastered/",
    },
    { name: "Movies", path: "https://www.sonypictures.com/movies/spiderman" },
    { name: "Merch", path: "#merch" },
  ];

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 3D Background */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ pointerEvents: "auto" }}
        >
          <color attach="background" args={["#03080F"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E23636" />
          <Suspense fallback={null}>
            <SpiderWeb count={250} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh position={[0, 0, -2]}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                  color="#B11313"
                  emissive="#E23636"
                  emissiveIntensity={0.5}
                  wireframe
                />
              </mesh>
            </Float>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 pointer-events-none w-full">
        {/* Child elements must have pointer-events-auto */}

        <nav className="fixed top-0 w-full py-4 z-50 pointer-events-auto bg-white/10 backdrop-blur-lg border-b border-white/10 shadow-lg">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
            <a href="#" className="flex items-center group shadow-2xl">
              <span className="font-anton text-4xl md:text-5xl text-primary-red bg-white px-2 pt-1 pb-0 tracking-tight">
                MARVEL
              </span>
              <span className="font-anton text-4xl md:text-5xl text-white tracking-tight border-y-2 border-white pt-1 pb-0 group-hover:text-primary-red transition-colors ml-1">
                STUDIOS
              </span>
            </a>
            <ul className="hidden md:flex gap-8 list-none">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-white/90 hover:text-primary-red font-semibold text-lg uppercase tracking-wider transition-colors hover:drop-shadow-lg"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <section className="relative w-full min-h-screen flex items-center pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pointer-events-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8 min-h-[80vh]">
            <motion.div
              className={`flex-1 w-full lg:max-w-xl p-8 md:p-12 ${glassClasses} z-10`}
              style={{ opacity: heroOpacity, y: heroY }}
            >
              <motion.p
                className="text-primary-red font-semibold tracking-[4px] uppercase mb-4 text-sm md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                The Next Chapter Begins
              </motion.p>
              <motion.h1
                className="font-bebas text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                SPIDER-MAN{" "}
                <span
                  className="text-primary-red drop-shadow-[0_0_20px_rgba(226,54,54,0.5)]"
                  style={{ WebkitTextFillColor: "var(--color-primary-red)" }}
                >
                  BEYOND
                </span>{" "}
                WEB
              </motion.h1>
              <motion.p
                className="text-lg text-white/70 mb-8 leading-relaxed md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Experience the ultimate web-slinging adventure. Swing through
                the vibrant, bustling streets of a seamlessly connected
                universe. The multiverse is just a thread away.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button className={btnPrimary}>Pre-Order Now</button>
                <a
                  href="https://youtu.be/aBlsrtxuwss"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={btnSecondary}>Watch Trailer</button>
                </a>{" "}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 w-full flex justify-center z-0 perspective-1000"
              style={{ opacity: heroOpacity, y: heroY }}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
            >
              <motion.img
                src={img4}
                alt="Spider-Man Hero"
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[700px] object-contain drop-shadow-[0_0_30px_rgba(226,54,54,0.5)]"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto pointer-events-auto">
          {[
            {
              img: img1,
              title: "ADVANCED SUIT 2.0",
              span: "SUIT 2.0",
              baseTitle: "ADVANCED",
              desc: "With an updated aesthetic and enhanced capabilities, the Advanced Suit 2.0 pushes Peter Parker's arsenal far beyond traditional limits. Optimized for combat and traversal fluidity.",
              btn: "Discover More",
              reverse: false,
            },
            {
              img: img2,
              title: "MILES MORALES",
              span: "MORALES",
              baseTitle: "MILES",
              desc: "Experience dual protagonists. Miles returns with bio-electric venom blasts and optical camouflage, offering a completely distinct playstyle in the ever-expanding New York.",
              btn: "View Abilities",
              reverse: true,
            },
            {
              img: img3,
              title: "SYMBIOTE DARKNESS",
              span: "DARKNESS",
              baseTitle: "SYMBIOTE",
              desc: "Embrace the darkness. The Symbiote suit amplifies Peter's strength and aggression, unlocking powerful tendril-based combat abilities that will shatter any adversary in your path.",
              btn: "Unleash Power",
              reverse: false,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 mb-32 ${item.reverse ? "lg:flex-row-reverse" : ""}`}
            >
              <motion.div
                className="flex-1 w-full relative overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#E23636]/20 group"
                initial={{
                  opacity: 0,
                  x: item.reverse ? 100 : -100,
                  scale: 0.95,
                }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto min-h-[300px] md:min-h-[500px] object-cover block sepia-[.3] hue-rotate-[-20deg] saturate-[1.2] transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, x: item.reverse ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-bebas text-5xl md:text-7xl mb-4 text-white drop-shadow-[0_0_10px_rgba(226,54,54,0.3)]">
                  {item.baseTitle}{" "}
                  <span className="text-primary-red">{item.span}</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                  {item.desc}
                </p>
                <button className={`${btnSecondary} text-lg px-6 py-2`}>
                  {item.btn}
                </button>
              </motion.div>
            </div>
          ))}
        </section>

        {/* Spider-Verse Gallery */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto pointer-events-auto relative z-10">
          <motion.h2 
            className="font-bebas text-5xl md:text-7xl text-center mb-4 drop-shadow-[0_0_10px_rgba(226,54,54,0.3)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ENTER THE <span className="text-primary-red">SPIDER-VERSE</span>
          </motion.h2>
          <motion.p 
            className="text-center text-white/70 text-lg md:text-xl mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Three universes. Three legends. One definitive web-slinging multiversal crossover experience.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: imgTobey, name: "Tobey Maguire", universe: "Earth-96283", desc: "The original cinematic wall-crawler. Experience the organic webbing and classic grit." },
              { img: imgAndrew, name: "Andrew Garfield", universe: "Earth-120703", desc: "The Amazing Spider-Man returns. Unmatched agility and bio-electric web fluid." },
              { img: imgTom, name: "Tom Holland", universe: "Earth-199999", desc: "The Avenger from the MCU. Enhanced with Stark tech and multiversal experience." }
            ].map((hero, i) => (
              <motion.div 
                key={i}
                className={`${glassClasses} overflow-hidden group border-white/5 hover:border-primary-red/40 transition-colors duration-500`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="relative h-96 w-full overflow-hidden">
                  <img 
                    src={hero.img} 
                    alt={hero.name} 
                    className="w-full h-full object-cover sepia-[.2] saturate-[1.2] transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03080F] via-[#03080F]/50 to-transparent opacity-90" />
                </div>
                <div className="p-8 relative z-10 -mt-24">
                  <p className="text-primary-red font-semibold tracking-widest text-sm mb-1">{hero.universe}</p>
                  <h3 className="font-bebas text-4xl lg:text-5xl text-white mb-3 drop-shadow-md">{hero.name}</h3>
                  <p className="text-white/70 leading-relaxed">{hero.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto pointer-events-auto">
          <motion.h2
            className="font-bebas text-5xl md:text-7xl text-center mb-16 md:mb-24"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            BE GREATER. <span className="text-primary-red">TOGETHER.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Seamless Web-Swinging",
                desc: "Experience the most flowing and exhilarating traversal system ever created. Feel every swing.",
              },
              {
                title: "Expanded NYC Maps",
                desc: "Explore Brooklyn, Queens, and new unseen regions with stunning realism and dynamic weather.",
              },
              {
                title: "Symbiote Powers",
                desc: "Unleash devastating new abilities. The black suit changes everything you thought you knew.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className={`${glassClasses} p-8 lg:p-10 flex flex-col gap-6`}
                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "var(--color-primary-red)",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-red/10 flex items-center justify-center text-primary-red">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <h3 className="font-bebas text-3xl text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#03080F] border-t border-white/10 py-12 pointer-events-auto relative z-10 text-center md:text-left">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <a href="#" className="flex items-center mb-4">
                <span className="font-anton text-3xl text-primary-red bg-white px-2 pt-1 pb-0 tracking-tight">
                  MARVEL
                </span>
                <span className="font-anton text-3xl text-white tracking-tight border-y-2 border-white pt-1 pb-0 ml-1">
                  STUDIOS
                </span>
              </a>
              <p className="text-white/50 text-sm">
                © 2026 MARVEL. Developed for Spider-Man Beyond Web.
              </p>
            </div>

            <ul className="flex flex-wrap justify-center gap-6 list-none">
              {[
                "Terms of Use",
                "Privacy Policy",
                "License Agreements",
                "Support",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white text-sm transition-colors uppercase tracking-wider"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
