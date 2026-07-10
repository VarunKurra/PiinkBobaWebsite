const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await db.entities.ContactMessage.create(form);
    setSubmitting(false);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" className="font-mono text-xs uppercase tracking-widest">Name</Label>
          <Input id="name" name="name" required value={form.name} onChange={handleChange} className="mt-2 rounded-xl" />
        </div>
        <div>
          <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest">Email</Label>
          <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-2 rounded-xl" />
        </div>
      </div>
      <div>
        <Label htmlFor="phone" className="font-mono text-xs uppercase tracking-widest">Phone (optional)</Label>
        <Input id="phone" name="phone" value={form.phone} onChange={handleChange} className="mt-2 rounded-xl" />
      </div>
      <div>
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-widest">Message</Label>
        <Textarea id="message" name="message" required rows={4} value={form.message} onChange={handleChange} className="mt-2 rounded-xl" />
      </div>
      <Button type="submit" disabled={submitting} data-cursor-hover className="bg-primary text-black hover:bg-black hover:text-white rounded-full font-bold px-8 py-6 w-full sm:w-auto">
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}