import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Nydv01",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/ydv-nitin",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:ydv.nitin2401@gmail.com",
    label: "Email",
  },
];

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Top Divider Glow */}
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

      {/* Footer Body */}
      <div className="relative border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="container-custom px-6 py-20">
          <div className="grid gap-12 md:grid-cols-3 items-start">
            
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="inline-block">
                <h3 className="text-2xl font-extrabold gradient-text">
                  Nitin Yadav
                </h3>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                Computer Science Engineering student focused on building
                scalable software systems and AI-powered applications with
                real-world impact.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:text-center"
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:text-right"
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
                Connect
              </h4>
              <div className="flex gap-4 md:justify-end">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all hover:-translate-y-1"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-border text-center"
          >
            <p className="text-sm text-muted-foreground text-center">
  Made by <span className="text-foreground font-medium">Nitin Yadav</span> © {new Date().getFullYear()}
</p>

          </motion.div>
        </div>
      </div>
    </footer>
  );
}
