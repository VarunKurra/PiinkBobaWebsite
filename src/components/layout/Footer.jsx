import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { BUSINESS, HOURS, NAV_LINKS } from "@/data/business";

export default function Footer() {
  return (
    <footer className="bg-primary text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display font-extrabold text-4xl mb-4">PIINK TEA STUDIO</h3>
            <p className="font-body text-black/80 max-w-xs">Boba, matcha & pink energy — hand-crafted daily in Weldon Spring, MO.</p>
            <div className="flex gap-3 mt-6">
              <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href={BUSINESS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="font-semibold hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-4">Visit</h4>
            <a href={BUSINESS.mapLink} target="_blank" rel="noreferrer" className="flex items-start gap-2 mb-3 font-semibold hover:underline">
              <MapPin size={20} className="shrink-0 mt-0.5" /> {BUSINESS.address}
            </a>
            <a href={BUSINESS.phoneHref} className="flex items-center gap-2 mb-4 font-semibold hover:underline">
              <Phone size={18} /> {BUSINESS.phone}
            </a>
            <p className="font-mono text-sm">{HOURS[0].time}</p>
            <p className="font-mono text-sm text-black/70">Open 7 days a week</p>
          </div>
        </div>

        <div className="border-t border-black/20 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-2 text-sm font-body text-black/70">
          <span>© {new Date().getFullYear()} Piink Tea Studio. All rights reserved.</span>
          <span>Made loud. Made pink.</span>
        </div>
      </div>
    </footer>
  );
}