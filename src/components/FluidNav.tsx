import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  links: NavLink[];
}

export default function FluidNav({ links }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Map section IDs → link indices for scroll tracking
    const sectionMap = new Map<string, number>();
    links.forEach((l, i) => {
      const hash = l.href.split("#")[1];
      if (hash) sectionMap.set(hash, i);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionMap.get(entry.target.id);
            if (idx !== undefined) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    sectionMap.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  // Click handler: update active immediately for instant feedback
  const handleClick = (i: number) => {
    setActiveIndex(i);
  };

  return (
    <ul className="relative flex items-center gap-0.5">
      {links.map((link, i) => (
        <li key={link.href} className="relative">
          <a
            href={link.href}
            onClick={() => handleClick(i)}
            className={`relative z-10 block rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              i === activeIndex ? "nav-pill-active" : "nav-pill-inactive"
            }`}
          >
            {link.label}
          </a>
          {i === activeIndex && (
            <motion.div
              layoutId="navbar-active-indicator"
              className="nav-pill absolute inset-0 rounded-lg"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1,
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
