import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Award, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import logo from '@/assets/Logo.png';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-10 md:py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mengenal HantaranByJoo</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Menghias Janji Suci dengan Keindahan & Ketulusan
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Berawal dari apresiasi mendalam terhadap tradisi seserahan dan lamaran di Indonesia,
            HantaranByJoo hadir untuk memberikan sentuhan estetika modern yang mempercantik momen sekali seumur hidup Anda.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-xs mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-secondary shadow-lg bg-white p-2">
                  <img
                    src={logo}
                    alt="Logo HantaranByJoo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-3 rounded-full shadow-md">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Cerita Kami
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Dedikasi untuk Kesempurnaan Setiap Kotak Seserahan
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kami memahami bahwa setiap barang seserahan menyimpan makna kasih dan penghormatan.
                Oleh karena itu, setiap kotak di HantaranByJoo dirawat secara seksama—memastikan akrilik
                selalu jernih tanpa noda, bunga tertata anggun, dan pita terikat rapi sesuai warna impian calon pengantin.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Berlokasi di Kota Bandung, kami telah melayani ratusan pasangan yang mendambakan proses
                persiapan pernikahan yang tenang, praktis, dan memuaskan.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Values Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl font-bold text-foreground">Nilai Utama Pelayanan Kami</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Prinsip yang kami pegang teguh dalam setiap kotak yang kami hias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground text-base mb-2">Material Berkualitas</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Hanya menggunakan akrilik tebal 3mm kokoh dengan alas beludru lembut dan bunga imitasi grade premium.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground text-base mb-2">Disiplin Waktu</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Kotak seserahan Anda selesai dihias tepat waktu sehingga tidak menambah kekhawatiran menjelang hari H.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-foreground text-base mb-2">Keamanan & Kebersihan</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Semua barang seserahan dijaga dengan teliti dalam ruangan steril dan terlindung dari debu.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="bg-secondary/60 rounded-3xl p-8 border border-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-16">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">500+</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Pasangan Berbahagia</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">20+</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Pilihan Warna & Dekorasi</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">100%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Akrilik Bening Terawat</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">5★</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Ulasan Kepuasan</div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button
            asChild
            className="min-h-[48px] px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
          >
            <NavLink to="/collection" className="flex items-center gap-2">
              <span>Mulai Rancang Hantaran Anda</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
