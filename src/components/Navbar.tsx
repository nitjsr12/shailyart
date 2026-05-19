"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Classes", href: "/classes" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-foreground">
              Shaily <span className="text-primary">Verma</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-body text-sm font-medium transition-colors duration-300 hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="elegant" size="sm" asChild>
              <Link href="/classes">Book a Class</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "font-body text-base font-medium transition-colors duration-300 py-2",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="elegant" size="sm" className="w-full" asChild>
                  <Link href="/classes" onClick={() => setIsOpen(false)}>
                    Book a Class
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
