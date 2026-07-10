import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ContactForm from "@/components/order/ContactForm";
import { BUSINESS, HOURS } from "@/data/business";

export default function Order() {
  useSEO(
    "Order & Locations | Piink Tea Studio",
    "Order Piink Tea Studio for delivery or visit us in Weldon Spring, MO. Hours, address, phone and directions."
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28">
      <ScrollReveal>
        <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Order & Visit</span>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4">Come Get Pink.</h1>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <ScrollReveal delay={0.1} className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="text-primary shrink-0 mt-1" size={26} />
            <div>
              <h3 className="font-heading font-bold text-lg">Address</h3>
              <a href={BUSINESS.mapLink} target="_blank" rel="noreferrer" className="text-black/60 hover:text-primary font-body" data-cursor-hover>
                {BUSINESS.address}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-primary shrink-0 mt-1" size={26} />
            <div>
              <h3 className="font-heading font-bold text-lg">Phone</h3>
              <a href={BUSINESS.phoneHref} className="text-black/60 hover:text-primary font-body" data-cursor-hover>
                {BUSINESS.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="text-primary shrink-0 mt-1" size={26} />
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Hours</h3>
              <ul className="font-mono text-sm text-black/60 space-y-1">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex gap-4">
                    <span className="w-24">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href={BUSINESS.doordash} target="_blank" rel="noreferrer" data-cursor-hover className="bg-primary text-black font-bold px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
              Order DoorDash
            </a>
            <a href={BUSINESS.ubereats} target="_blank" rel="noreferrer" data-cursor-hover className="bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors">
              Order Uber Eats
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="rounded-3xl overflow-hidden h-80 md:h-full min-h-[320px]">
          <iframe
            title="Piink Tea Studio Map"
            src={BUSINESS.mapEmbed}
            className="w-full h-full border-0 grayscale contrast-125"
            loading="lazy"
          />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1} className="mt-20 max-w-2xl">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-6">Get In Touch</h2>
        <ContactForm />
      </ScrollReveal>
    </div>
  );
}