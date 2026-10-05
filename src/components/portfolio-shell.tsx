import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
const links = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About' }, { to: '/services', label: 'Services' }, { to: '/contact', label: 'Contact' }] as const;
export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header relative z-20"><div className="container-shell grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6"><Link to="/" className="min-w-0" onClick={() => setOpen(false)} aria-label="Aarush Dadhwal home"><div className="brand-name">Aarush Dadhwal<span className="text-primary">.</span></div><div className="brand-caption">Student portfolio</div></Link><div className="hidden items-center gap-9 md:flex"><nav aria-label="Main navigation" className="flex gap-8">{links.map(link => <Link key={link.to} to={link.to} className="nav-link" activeProps={{ className: 'active', 'aria-current': 'page' }} activeOptions={{ exact: true }}>{link.label}</Link>)}</nav><Button asChild variant="outline" size="sm"><Link to="/contact">Let’s connect <ArrowUpRight /></Link></Button></div><Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">{links.map(link => <Link key={link.to} to={link.to} className="nav-link" activeProps={{ className: 'active', 'aria-current': 'page' }} activeOptions={{ exact: true }} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>}</header>;
}
export function PortfolioFooter() {
 return <footer className="footer"><div className="container-shell flex flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row"><p>© 2026 Aarush Dadhwal <span className="mx-2">·</span> Learning. Growing. Moving forward.</p><p>Sample student portfolio <span className="mx-2">·</span> <Link to="/contact" className="hover:text-primary">Get in touch <ArrowUpRight className="ml-1 inline size-3" /></Link></p></div></footer>;
}
export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
 return <section className="page-intro"><div className="container-shell reveal"><p className="eyebrow">{label}</p><h1 className="page-title">{title}</h1><p className="body-copy mt-5 max-w-xl">{description}</p></div></section>;
}
