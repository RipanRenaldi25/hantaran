import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  MessageCircle,
} from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Mohon Lengkapi Form',
        description: 'Nama, email, dan pesan wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    const subject = encodeURIComponent(`Pesan dari ${formData.name} - Tanya Hantaran`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\nNomor Telepon: ${formData.phone}\n\nPesan:\n${formData.message}`
    );

    window.open(`mailto:salmanabdussalam@gmail.com?subject=${subject}&body=${body}`, '_blank');

    toast({
      title: 'Pesan Disiapkan',
      description: 'Aplikasi email Anda dibuka untuk mengirim pesan ini.',
    });
  };

  return (
    <div className="min-h-screen py-10 md:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kami Siap Membantu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Hubungi HantaranByJoo
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Punya pertanyaan mengenai tanggal pernikahan, ketersediaan box, atau ingin mendiskusikan
            konsep hantaran khusus? Tim kami siap melayani Anda dengan hangat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Location Info */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-border p-8 shadow-xs flex flex-col justify-between h-full">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-3">
                Informasi Studio & Pemesanan
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8">
                Anda juga dapat berkunjung langsung untuk melihat contoh display kotak akrilik dan
                katalog warna bunga kami.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Lokasi Studio</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      Jl. Margahayu Permai No. 123, Kota Bandung, Jawa Barat 40218
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Telepon & WhatsApp</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      <a
                        href="tel:082121087879"
                        className="hover:text-primary hover:underline transition-colors"
                      >
                        0821-2108-7879
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Email Resmi</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      <a
                        href="mailto:salmanabdussalam@gmail.com"
                        className="hover:text-primary hover:underline transition-colors"
                      >
                        salmanabdussalam@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Jam Pelayanan</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Senin – Minggu: 08.00 - 21.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="mt-10 pt-6 border-t border-border">
              <Button
                asChild
                className="w-full min-h-[46px] rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <a
                  href="https://wa.me/6282121087879?text=Halo%20HantaranByJoo,%20saya%20ingin%20konsultasi%20mengenai%20sewa%20hantaran"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat Cepat via WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-xs">
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">
              Kirim Pesan Konsultasi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-8">
              Isi data di bawah ini dan kami akan membalas pertanyaan Anda secepatnya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
                  Nama Lengkap Anda <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Rian & Amanda"
                  className="mt-1.5 min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
                    Alamat Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="mt-1.5 min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-xs font-semibold text-foreground">
                    Nomor WhatsApp / HP
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812-xxxx-xxxx"
                    className="mt-1.5 min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
                  Pesan atau Rencana Tanggal Acara <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ceritakan rencana tanggal pernikahan, jumlah kotak yang diinginkan, atau tema warna favorit Anda..."
                  className="mt-1.5 min-h-[120px] rounded-xl border-border focus-visible:ring-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full min-h-[48px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
