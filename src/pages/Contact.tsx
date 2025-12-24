import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  Calendar,
  AlertTriangle,
} from "lucide-react";

/* ================= EMAILJS CONFIG ================= */
const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID as string;
const ADMIN_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_ADMIN_TEMPLATE_ID as string;
const AUTO_REPLY_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID as string;
const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY as string;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // 1️⃣ Send message to YOU
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );

      // 2️⃣ Auto-reply to USER
      await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );

      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden min-h-screen">
        {/* Premium background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-primary/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-purple-500/15 rounded-full blur-[140px]" />
        </div>

        <div className="container-custom">
          <SectionHeading
            title="Let’s Connect"
            subtitle="Opportunities, collaborations, or meaningful conversations"
          />

          {/* ================= HERO ================= */}
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-12 text-center mb-20 hover-lift glow">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Ready to Build Something Real?
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                I’m actively looking for internships, placements, and impactful
                engineering roles. If you’re hiring or collaborating, let’s talk.
              </p>

              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-8">
                <MapPin className="h-4 w-4" />
                Open to remote & on-site opportunities
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2 glow hover-lift">
                  <a href="mailto:ydv.nitin2401@gmail.com">
                    <Mail className="h-5 w-5" />
                    Email Me
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 hover-lift"
                >
                  <a
                    href="https://calendly.com/ydv-nitin2401/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-5 w-5" />
                    Book a Call
                  </a>
                </Button>
              </div>
            </div>

            {/* ================= CONTACT FORM ================= */}
            <div className="glass-card rounded-3xl p-12 mb-20">
              <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
              <p className="text-muted-foreground mb-8">
                Your message goes directly to my inbox — with instant
                confirmation.
              </p>

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="form"
                    onSubmit={sendEmail}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <input
                      required
                      name="name"
                      placeholder="Your Name"
                      className="rounded-xl bg-muted px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="rounded-xl bg-muted px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />

                    <textarea
                      required
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      className="md:col-span-2 rounded-xl bg-muted px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="md:col-span-2 gap-2 glow hover-lift"
                      disabled={loading}
                    >
                      <Send className="h-5 w-5" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>

                    {error && (
                      <div className="md:col-span-2 flex items-center gap-2 text-sm text-red-500">
                        <AlertTriangle className="h-4 w-4" />
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16"
                  >
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-muted-foreground">
                      You’ll receive a confirmation email shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= SOCIAL ================= */}
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/in/ydv-nitin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 hover:text-primary transition" />
              </a>
              <a
                href="https://github.com/Nydv01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 hover:text-primary transition" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
