import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main
        id="main-content"
        className="flex-1 pt-16 focus:outline-none"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
