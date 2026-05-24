import { Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Certifications from "@/pages/Certifications";
import Github from "@/pages/GitHub";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";

import AIChatbot from "@/components/ai/AIChatbot";
import AdminPanel from "@/components/admin/AdminPanel";
import ScrollProgress from "@/components/effects/ScrollProgress";
import GrainOverlay from "@/components/effects/GrainOverlay";
import CursorGlow from "@/components/effects/CursorGlow";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <GrainOverlay />}
      {!isAdminRoute && <CursorGlow />}
      {!isAdminRoute && <Navbar />}

      {/* Push content below fixed navbar, except in admin panel */}
      <main className={isAdminRoute ? "" : "pt-20"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/github" element={<Github />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIChatbot />}
    </>
  );
}
