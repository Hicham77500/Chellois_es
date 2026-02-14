"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/le-programme", label: "Le programme" },
  { href: "/chelloises", label: "Chellois·es" },
  { href: "/actions", label: "Actions" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-campaign-dark/60 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://ext.same-assets.com/3507938908/2273462532.png"
              alt="Chellois-es 2026"
              width={37}
              height={44}
              className="h-11 w-auto"
            />
            <span className="text-white font-bold text-lg">
              Chellois·es 2026
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const normalizedPathname = pathname.replace(/\/$/, '') || '/';
              const normalizedHref = link.href.replace(/\/$/, '') || '/';
              const isActive = normalizedPathname === normalizedHref;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active btn-outline text-white/95 px-4 py-2" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-3 bg-campaign-dark/95 rounded-2xl p-4 border border-white/10 shadow-xl">
              {navLinks.map((link) => {
                const normalizedPathname = pathname.replace(/\/$/, '') || '/';
                const normalizedHref = link.href.replace(/\/$/, '') || '/';
                const isActive = normalizedPathname === normalizedHref;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-white font-medium rounded-lg px-3 py-2 hover:bg-white/10 transition-colors ${isActive ? "text-campaign-red" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
