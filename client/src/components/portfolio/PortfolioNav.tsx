import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandFlicker } from "./BrandFlicker";
import { portfolioAssets } from "./portfolioAssets";

const links = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface PortfolioNavProps {
  isOpening?: boolean;
}

export default function PortfolioNav({ isOpening = false }: PortfolioNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-frame">
      <nav
        className={`site-nav${menuOpen ? " is-open" : ""}${isOpening ? " is-opening" : ""}`}
        aria-label="Main navigation"
      >
        <a className="brand-lockup" href="#home" onClick={closeMenu} aria-label="ABIZK home">
          <span className={`profile-photo-entry${isOpening ? " is-opening" : ""}`}>
            <img className="profile-image" src={portfolioAssets.profilePhoto} alt="Profile photo of ABIZK" />
          </span>
          <span className="brand-name">
            <span className="brand-name-final" aria-hidden={isOpening}>
              <BrandFlicker />
            </span>
            {isOpening && (
              <span className="opening-welcome" aria-hidden="true">
                Welcome to my portfolio
              </span>
            )}
          </span>
        </a>

        <div className="nav-links" id="primary-navigation">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          <span>LET’S TALK</span>
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
}
