import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          setVisible((prev) => {
            if (prev === shouldShow) return prev;
            return shouldShow;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      aria-label="Scroll to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={
        "fixed bottom-[90px] right-6 z-[55] w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow transition-transform duration-300 hover:scale-110"
      }
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      <ChevronUp className="w-6 h-6 text-gray-600" />
    </button>
  );
};

export default ScrollToTopButton;
