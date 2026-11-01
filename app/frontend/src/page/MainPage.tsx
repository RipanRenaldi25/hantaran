import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowRight,
  Gift,
  Palette,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Layers,
  MessageCircleHeart,
  ChevronRight,
} from 'lucide-react';

export const MainPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO SECTION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-secondary/60 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-2xs">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span>Sewa & Dekorasi Seserahan Pernikahan Modern</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              Wujudkan Momen Pernikahan Impian dengan{' '}
              <span className="text-primary italic font-normal">Hantaran Anggun</span> & Berkesan
            </h1>

            {/* Subtitle with High Contrast */}
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Layanan sewa kotak hantaran akrilik premium di Bandung. Bebas pilih perpaduan warna
              kain dan rangkaian bunga elegan yang serasi dengan tema hari bahagia Anda.
            </p>

            {/* CTAs with WCAG Touch Target (min 44px) */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <NavLink to="/collection" className="flex items-center justify-center gap-2">
                  <span>Lihat Koleksi Hantaran</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto min-h-[48px] px-8 rounded-full border-border bg-white hover:bg-secondary text-foreground text-base font-medium transition-all"
              >
                <NavLink to="/prices" className="flex items-center justify-center gap-2">
                  <span>Paket & Estimasi Harga</span>
                </NavLink>
              </Button>
            </div>

            {/* Highlights Strip */}
            <div className="mt-14 pt-8 border-t border-border/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-border/60 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Akrilik Premium</h4>
                  <p className="text-xs text-muted-foreground">Kondisi bersih, bening, dan kokoh</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-border/60 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Bebas Pilih Warna</h4>
                  <p className="text-xs text-muted-foreground">Serasi dengan busana pengantin</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-border/60 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Penataan Rapi</h4>
                  <p className="text-xs text-muted-foreground">Ditata indah siap pamer di acara</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. ALUR PEMESANAN MUDAH (SOLVING USER CONFUSION)                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-24 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Proses Praktis & Jelas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-2">
              3 Langkah Mudah Mempersiapkan Hantaran
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-3">
              Kami menyederhanakan proses sewa seserahan agar Anda dan pasangan dapat fokus pada persiapan pernikahan lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/80 shadow-2xs hover:shadow-md transition-shadow relative">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5 shadow-xs">
                1
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Pilih Kotak & Jumlah</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Jelajahi berbagai pilihan kotak akrilik dan tentukan jumlah box yang dibutuhkan untuk barang seserahan Anda.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/80 shadow-2xs hover:shadow-md transition-shadow relative">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5 shadow-xs">
                2
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Sesuaikan Warna & Bunga</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tentukan tema warna pita dan dekorasi bunga yang serasi dengan busana akad maupun resepsi pernikahan Anda.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/80 shadow-2xs hover:shadow-md transition-shadow relative">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-5 shadow-xs">
                3
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Konfirmasi & Siap Pakai</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lakukan checkout dan pembayaran aman via Transfer Bank atau QRIS. Hantaran siap diambil atau dikirim tepat waktu.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <NavLink
              to="/collection"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4 text-sm"
            >
              <span>Mulai lihat koleksi yang tersedia</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. JELAJAHI LAYANAN KAMI (MODERN CARDS)                            */}
      {/* ------------------------------------------------------------------ */}
      <section id="jelajahi" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Eksplorasi Layanan
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-2">
              Jelajahi Pilihan Terbaik untuk Hari Bahagia
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-3">
              Koleksi lengkap, paket transparan, dan cerita kepuasan dari pasangan yang telah mempercayakan momen hantaran mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Koleksi */}
            <div className="group bg-white rounded-2xl border border-border p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Koleksi Kotak Hantaran
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lihat aneka model kotak hantaran akrilik, ring box mewah, dan wadah mahar eksklusif untuk mempercantik seserahan Anda.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border">
                <NavLink
                  to="/collection"
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors text-sm min-h-[44px]"
                >
                  <span>Buka Galeri Koleksi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            </div>

            {/* Card 2: Paket & Harga */}
            <div className="group bg-white rounded-2xl border border-border p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Paket & Estimasi Biaya
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pilihan paket hemat dan fleksibel hingga 10 box lengkap dengan bunga dan dekorasi tanpa biaya tersembunyi.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border">
                <NavLink
                  to="/prices"
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors text-sm min-h-[44px]"
                >
                  <span>Cek Rincian Paket</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            </div>

            {/* Card 3: Testimoni */}
            <div className="group bg-white rounded-2xl border border-border p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircleHeart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Cerita Pengantin Bahagia
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pengalaman nyata dari pasangan pengantin yang telah mempercayakan hiasan seserahan mereka bersama HantaranByJoo.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border">
                <NavLink
                  to="/testimoni"
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors text-sm min-h-[44px]"
                >
                  <span>Baca Ulasan Pelanggan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. CALL TO ACTION BANNER                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-20 bg-secondary/40 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2B2421] to-[#3D332F] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-medium tracking-wide mb-4">
                <HeartHandshake className="w-3.5 h-3.5 text-primary" />
                Konsultasikan Tanggal Pernikahan Anda
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Siap Melangkah ke Hari Bahagia Bersama Kami?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed">
                Pesan kotak hantaran Anda jauh-jauh hari untuk memastikan ketersediaan jadwal dan
                pilihan dekorasi terbaik di tanggal spesial Anda.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
                >
                  <NavLink to="/register">Daftar & Mulai Pilih Box</NavLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium"
                >
                  <NavLink to="/contact">Hubungi Kami</NavLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
