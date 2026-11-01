import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Check, Heart, ShieldCheck } from 'lucide-react';

import collection1 from '@/assets/Koleksi Hantaran 1.jpg';
import collection2 from '@/assets/Koleksi Hantaran 2.jpg';
import collection3 from '@/assets/Koleksi Hantaran 3.jpg';
import collection4 from '@/assets/Koleksi Hantaran 4.jpg';
import collection5 from '@/assets/Koleksi Hantaran 5.jpg';
import collection6 from '@/assets/Koleksi Hantaran 6.jpg';
import collection7 from '@/assets/Koleksi Hantaran 7.jpg';
import collection8 from '@/assets/Koleksi Hantaran 8.jpg';
import collection9 from '@/assets/Koleksi Hantaran 9.jpg';
import collection10 from '@/assets/Koleksi Hantaran 10.jpg';

interface ICollectionItem {
  id: number;
  image: string;
  title: string;
  theme: string;
  description: string;
  highlights: string[];
}

const collectionsData: ICollectionItem[] = [
  {
    id: 1,
    image: collection1,
    title: 'Hantaran White Pearl Blossom',
    theme: 'Klasik Elegan',
    description: 'Kotak akrilik bening kristal dengan rangkaian bunga mawar putih dan aksen pita satin mutiara.',
    highlights: ['Akrilik 3mm bening', 'Bunga artificial premium', 'Pita satin import'],
  },
  {
    id: 2,
    image: collection2,
    title: 'Hantaran Blush Rose Gold',
    theme: 'Romantis Pastel',
    description: 'Nuansa warna dusty pink dan rose gold yang anggun dan feminin untuk hiasan seserahan pakaian & riasan.',
    highlights: ['Nuansa warna soft', 'Rangkaian floral bertingkat', 'Alas suede lembut'],
  },
  {
    id: 3,
    image: collection3,
    title: 'Hantaran Emerald Royal Classic',
    theme: 'Mewah Tradisional',
    description: 'Aksen hijau zamrud dengan sentuhan pita keemasan, sangat cocok untuk tema adat dan busana bernuansa formal.',
    highlights: ['Warna royal & kontras', 'Sudut akrilik presisi', 'Bantalan cincin empuk'],
  },
  {
    id: 4,
    image: collection4,
    title: 'Hantaran Champagne Elegance',
    theme: 'Modern Warmth',
    description: 'Perpaduan warna krem sampanye dan bunga eucalyptus kering untuk kesan minimalis, bersih, dan berkelas.',
    highlights: ['Tema earthy hangat', 'Dekorasi dried flowers', 'Tutup magnetik rapi'],
  },
  {
    id: 5,
    image: collection5,
    title: 'Hantaran Lavender Dream',
    theme: 'Pastel Lilac',
    description: 'Warna ungu lavender lembut dengan ornamen mutiara sintetis, memberi atmosfer manis dan penuh kasih.',
    highlights: ['Harmoni warna manis', 'Bunga hortensia & baby breath', 'Kotak bebas baret'],
  },
  {
    id: 6,
    image: collection6,
    title: 'Hantaran Terracotta Botanical',
    theme: 'Bohemian Chic',
    description: 'Sentuhan nuansa bata terracotta dan dedaunan autumnal yang hangat, sangat digemari pasangan masa kini.',
    highlights: ['Gaya rustic modern', 'Warna hangat natural', 'Bebas kustom kartu ucapan'],
  },
  {
    id: 7,
    image: collection7,
    title: 'Hantaran Pure Crystal Ivory',
    theme: 'Monokrom Elegan',
    description: 'Desain serba putih gading yang suci dan sakral, melambangkan ketulusan janji suci pernikahan.',
    highlights: ['Simbol kesucian', 'Cocok untuk akad nikah', 'Pencahayaan memantul indah'],
  },
  {
    id: 8,
    image: collection8,
    title: 'Hantaran Sapphire Midnight',
    theme: 'Glamour Modern',
    description: 'Kemewahan biru safir berpadu dengan aksen perak mengkilap, menciptakan kesan tegas dan eksklusif.',
    highlights: ['Aksen maskulin elegan', 'Ideal untuk perlengkapan pria', 'Bunga krisan & mawar'],
  },
  {
    id: 9,
    image: collection9,
    title: 'Hantaran Golden Sunset',
    theme: 'Mewah Berkilau',
    description: 'Dominasi warna emas hangat dengan taburan bunga hydrangea dan pita renda brokat premium.',
    highlights: ['Aura megah berkilau', 'Pita jacquard emas', 'Kokoh & siap pajang'],
  },
  {
    id: 10,
    image: collection10,
    title: 'Hantaran Rustic Forest Whisper',
    theme: 'Nature & Rustic',
    description: 'Perpaduan aksen kayu alami, rumput pampas lembut, dan kotak akrilik modern untuk pesta bertema alam.',
    highlights: ['Sentuhan pampas grass', 'Nuansa outdoor ramah', 'Kombinasi estetik unik'],
  },
];

const themes = ['Semua Tema', 'Klasik Elegan', 'Romantis Pastel', 'Modern Warmth', 'Nature & Rustic'];

const CollectionPage = () => {
  const [selectedTheme, setSelectedTheme] = useState('Semua Tema');

  const filteredCollections =
    selectedTheme === 'Semua Tema'
      ? collectionsData
      : collectionsData.filter((item) =>
          selectedTheme === 'Nature & Rustic'
            ? item.theme === 'Nature & Rustic' || item.theme === 'Bohemian Chic'
            : item.theme.includes(selectedTheme)
        );

  return (
    <div className="min-h-screen py-10 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inspirasi Seserahan Pernikahan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Galeri Koleksi Hantaran Eksklusif
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Setiap kotak dirancang dengan ketelitian seni tinggi, bahan akrilik tebal berkilau, serta
            pilihan bunga dan pita yang dapat disesuaikan sepenuhnya dengan gaun dan tema pernikahan Anda.
          </p>

          {/* Theme Filters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all min-h-[44px] flex items-center ${
                  selectedTheme === theme
                    ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                    : 'bg-white text-muted-foreground hover:text-foreground border border-border hover:bg-secondary/60'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.theme} untuk seserahan pernikahan`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-foreground backdrop-blur-xs shadow-xs border border-border/60">
                      {item.theme}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-primary shadow-xs">
                      <Heart className="w-4 h-4 fill-primary/20" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-4 pt-4 border-t border-border/80 flex flex-col gap-1.5">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground/80">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-2">
                <Button
                  asChild
                  className="w-full min-h-[44px] rounded-xl bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground font-semibold transition-all group-hover:shadow-xs"
                >
                  <NavLink to="/register" className="flex items-center justify-center gap-2">
                    <span>Pilih Model & Pesan</span>
                    <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-secondary/60 border border-border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-foreground">
                Punya Konsep Seserahan Khusus?
              </h4>
              <p className="text-sm text-muted-foreground mt-0.5">
                Kami siap membantu mewujudkan tema warna unik atau permintaan kotak kustom impian Anda.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="min-h-[44px] px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
          >
            <NavLink to="/contact">Konsultasi Gratis</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
