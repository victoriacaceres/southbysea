import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "South by Sea",
  description: "Custom apparel & promotional items for Greek life, college, business, and events.",
  icons: { icon: "/favicon.png" },
};

type NavItem = { href: string; label: string; external?: boolean };

const nav: NavItem[] = [
  { href: "/get-started", label: "Get Started" },
  { href: "/browse-designs", label: "Browse Designs" },
  { href: "/browse-products", label: "Browse Products" },
  { href: "/decoration-options", label: "Browse Decoration Options" },
  { href: "/work-for-us", label: "Work for Us" },
  { href: "https://shop.southbysea.com/", label: "Shop Retail", external: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur border-b border-black/5">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/south-by-sea-logo-color.png" alt="South by Sea" width={180} height={40} priority />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) =>
                n.external ? (
                  <a key={n.href} href={n.href} className="header-link" target="_blank" rel="noreferrer">
                    {n.label}
                  </a>
                ) : (
                  <Link key={n.href} href={n.href} className="header-link">
                    {n.label}
                  </Link>
                )
              )}
            </nav>
            <div className="md:hidden">
              <details className="relative">
                <summary className="cursor-pointer px-3 py-2 rounded-md border">Menu</summary>
                <div className="absolute right-0 mt-2 w-60 rounded-xl2 border bg-white shadow-soft p-2 space-y-2">
                  {nav.map((n) =>
                    n.external ? (
                      <a key={n.href} href={n.href} className="block px-3 py-2 rounded-md hover:bg-brand-accent/50" target="_blank" rel="noreferrer">
                        {n.label}
                      </a>
                    ) : (
                      <Link key={n.href} href={n.href} className="block px-3 py-2 rounded-md hover:bg-brand-accent/50">
                        {n.label}
                      </Link>
                    )
                  )}
                </div>
              </details>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-20 bg-[#201C1D] text-white">
          <div className="container py-10 grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Image src="/south-by-sea-logo-color-light.png" alt="South by Sea" width={200} height={44} />
              <p className="text-white/70 text-sm">We make custom apparel & promo items for every moment that matters.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-white/80">
                {nav.map((n) => (
                  <li key={n.href}>
                    {n.external ? (
                      <a href={n.href} target="_blank" rel="noreferrer">{n.label}</a>
                    ) : (
                      <Link href={n.href}>{n.label}</Link>
                    )}
                  </li>
                ))}
                <li><Link href="/support">Fast Support</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                <li><Link href="/legal/terms">Terms & Conditions</Link></li>
                <li><Link href="/legal/copyright">Copyright Infringement Takedown</Link></li>
                <li><Link href="/legal/user-agreement">User Agreement Policy</Link></li>
                <li><Link href="/legal/ccpa">CCPA Privacy Policy</Link></li>
                <li><Link href="/legal/ip-policy">Intellectual Property Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="container py-4 text-sm text-white/60">© {new Date().getFullYear()} South by Sea</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
