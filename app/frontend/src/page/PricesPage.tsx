import { formatCurrency } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, ArrowRight, HelpCircle, PhoneCall } from 'lucide-react';

interface IPackage {
  name: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  priceNumber: number;
  priceDisplay: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const packages: IPackage[] = [
  {
    name: 'Paket Kustom (Hemat)',
    description: 'Bebas menentukan jumlah kotak, variasi warna, dan dekorasi sesuai kebutuhan spesifik Anda.',
    priceNumber: 0,
    priceDisplay: 'Sesuai Kebutuhan',
    features: [
      'Jumlah box fleksibel (1 s.d. 6 box)',
      'Bebas pilih tema warna kain',
      'Pilihan dekorasi bunga sederhana',
      'Sudah termasuk peminjaman nampan akrilik',
      'Konsultasi penataan gratis',
    ],
    ctaText: 'Hubungi Kami',
    ctaLink: '/contact',
  },
  {
    name: 'Paket Standar Favorit',
    badge: 'Paling Populer',
    isPopular: true,
    description: 'Solusi lengkap seserahan ideal dengan 10 kotak akrilik, pilihan warna pita, dan ornamen bunga premium.',
    priceNumber: 500_000,
    priceDisplay: formatCurrency(500_000),
    features: [
      'Maksimal 10 box akrilik premium',
      'Bebas pilih 1 tema warna kain satin',
      'Bebas pilih 1 jenis dekorasi bunga',
      'Termasuk jasa penataan barang seserahan',
      'Dukungan kartu nama & pita ucapan',
      'Garansi kotak bersih dan bebas gores',
    ],
    ctaText: 'Pilih Paket Ini',
    ctaLink: '/register',
  },
  {
    name: 'Paket All-In Terima Beres',
    description: 'Pilihan praktis bagi pasangan sibuk, kombinasi warna dan bunga ditata artistik langsung oleh tim florist kami.',
    priceNumber: 500_000,
    priceDisplay: formatCurrency(500_000),
    features: [
      'Maksimal 10 box akrilik premium',
      'Warna & bunga dipilihkan oleh stylist kami',
      'Penataan elegan siap pamer di venue',
      'Sudah termasuk kotak cincin & mahar',
      'Prioritas jadwal serah terima barang',
    ],
    ctaText: 'Pilih Paket Ini',
    ctaLink: '/register',
  },
];

const PricesPage = () => {
  return (
    <div className="min-h-screen py-10 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparan Tanpa Biaya Tersembunyi</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Pilihan Paket Sewa Hantaran
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pilih paket yang paling sesuai dengan anggaran dan konsep pernikahan Anda. Semua paket
            menggunakan kotak akrilik bening kualitas terbaik demi kesempurnaan momen sakral Anda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-white border-2 border-primary shadow-xl md:-translate-y-2'
                  : 'bg-white border border-border shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Title & Description */}
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground min-h-[40px] leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="my-6 py-4 border-y border-border/80">
                  <span className="text-xs text-muted-foreground block font-medium">Mulai dari</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                      {pkg.priceDisplay}
                    </span>
                    {pkg.priceNumber > 0 && (
                      <span className="text-xs text-muted-foreground">/ paket acara</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Fasilitas yang Didapat:
                  </span>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                      <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button
                asChild
                className={`w-full min-h-[46px] rounded-xl font-semibold transition-all shadow-xs ${
                  pkg.isPopular
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md'
                    : 'bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground'
                }`}
              >
                <NavLink to={pkg.ctaLink} className="flex items-center justify-center gap-2">
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Strip */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-border shadow-xs max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-primary shrink-0" />
            <h3 className="font-serif text-lg font-bold text-foreground">
              Pertanyaan Seputar Sewa Hantaran
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <div>
              <strong className="text-foreground block mb-1">Kapan barang seserahan harus diserahkan?</strong>
              Barang seserahan dapat diantar ke studio kami paling lambat 3–5 hari sebelum hari pernikahan untuk proses penataan rapi.
            </div>
            <div>
              <strong className="text-foreground block mb-1">Berapa lama durasi peminjaman kotak?</strong>
              Durasi sewa standar adalah 3 hari (H-1 sebelum acara hingga H+1 setelah acara pernikahan).
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground text-center sm:text-left">
              Ada pertanyaan lain atau butuh saran khusus?
            </span>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <NavLink to="/contact" className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-primary" />
                <span>Konsultasikan via WhatsApp/Email</span>
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricesPage;
