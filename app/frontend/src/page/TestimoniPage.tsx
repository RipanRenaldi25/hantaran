import { Star, Heart, Sparkles, Quote, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ITestimonial {
  name: string;
  weddingDate: string;
  location: string;
  theme: string;
  comment: string;
  highlight: string;
}

const testimonials: ITestimonial[] = [
  {
    name: 'Sarah & Dika',
    weddingDate: 'September 2024',
    location: 'Bandung',
    theme: 'White Pearl & Rose Gold',
    comment:
      'HantaranByJoo benar-benar penyelamat di saat kami sibuk mempersiapkan vendor lain. Kotak akriliknya sangat bening tanpa goresan sama sekali, dan dekorasi bunganya rapi sekali. Keluarga besar sangat memuji seserahan kami saat acara lamaran!',
    highlight: 'Kotak akrilik sangat bening & bunga rapi',
  },
  {
    name: 'Amanda & Rizky',
    weddingDate: 'Agustus 2024',
    location: 'Cimahi',
    theme: 'Terracotta Rustic',
    comment:
      'Warna kain satin dan dried flowers-nya match persis dengan tema kebaya saya. Pelayanannya sangat ramah dan sabar membantu kami menata barang-barang seserahan yang ukurannya beragam. Sangat direkomendasikan untuk calon pengantin!',
    highlight: 'Warna match persis dengan tema kebaya',
  },
  {
    name: 'Putri & Fauzan',
    weddingDate: 'Juli 2024',
    location: 'Bandung Barat',
    theme: 'Emerald & Gold Classic',
    comment:
      'Proses serah terima kotak sangat tepat waktu dan kotak diantar dalam kondisi steril berbungkus rapi. Harganya sangat transparan dan kualitasnya jauh melampaui ekspektasi kami. Terima kasih HantaranByJoo!',
    highlight: 'Tepat waktu & kualitas melampaui ekspektasi',
  },
  {
    name: 'Bella & Dimas',
    weddingDate: 'Juni 2024',
    location: 'Bandung',
    theme: 'Pure Crystal Ivory',
    comment:
      'Sangat terbantu karena bisa memilih 10 kotak lengkap dengan baki cincin dan tempat perhiasan. Penataannya estetik dan sangat fotogenik untuk dokumentasi foto akad nikah kami.',
    highlight: 'Sangat fotogenik untuk dokumentasi foto',
  },
];

const TestimoniPage = () => {
  return (
    <div className="min-h-screen py-10 md:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cerita Pasangan Berbahagia</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Ulasan Tulus dari Pasangan Pengantin
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Kebahagiaan Anda adalah kepuasan terbesar kami. Inilah cerita dari mereka yang telah
            mempercayakan momen seserahan sakralnya bersama HantaranByJoo.
          </p>

          {/* Overall Rating Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">5.0 / 5.0</span>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              Kepuasan Pelanggan Terjamin
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-border p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary mb-4">
                  Tema: {item.theme}
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Wedding Details */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-1">
                      <span>{item.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary inline" />
                    </h4>
                    <span>{item.location} • {item.weddingDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Conversation Highlight (Preserving Brand Persona) */}
        <div className="bg-white rounded-3xl border border-border p-8 max-w-2xl mx-auto shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <h3 className="font-serif text-lg font-bold text-foreground">
              Tanya Jawab & Layanan Cepat
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-secondary/60 p-4 rounded-2xl rounded-bl-xs max-w-[85%] self-start text-xs sm:text-sm text-foreground">
              "Halo Kak, apakah hantarannya bisa diantar ke venue atau harus diambil ke studio?"
              <div className="text-[10px] text-muted-foreground text-right mt-1">Calon Pengantin</div>
            </div>

            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-xs max-w-[85%] self-end text-xs sm:text-sm">
              "Halo Kak! Bisa keduanya ya kak. Kami melayani penyerahan di studio maupun pengiriman langsung ke venue/rumah Anda di wilayah Bandung dan sekitarnya."
              <div className="text-[10px] text-primary-foreground/80 text-right mt-1">HantaranByJoo Team</div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Jadikan seserahan pernikahan Anda indah dan berkesan bersama kami.
          </p>
          <Button
            asChild
            className="min-h-[48px] px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
          >
            <NavLink to="/register">Daftar & Pesan Kotak Sekarang</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestimoniPage;
