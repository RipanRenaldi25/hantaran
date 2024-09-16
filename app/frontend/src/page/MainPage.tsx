import buket from '@/assets/bouquet.jpg';
import flower from '@/assets/flower.jpg';
import hand from '@/assets/hand.jpg';
import weddingBg from '@/assets/wedding-bg.jpg';
import cake from '@/assets/cake.jpg';
import box1 from '@/assets/box1.jpg';
import { Button } from '@/components/ui/button';
import { CarouselWithHero } from '@/HOC/Carousel/WithHero';
import { useNavigate } from 'react-router-dom';
import Love from '@/components/Love';

const contents: { src: string; alt: string }[] = [
  {
    alt: 'bouquet',
    src: buket,
  },
  {
    alt: 'weddingBg',
    src: weddingBg,
  },
  {
    alt: 'hand',
    src: hand,
  },
  {
    alt: 'cake',
    src: cake,
  },
  {
    alt: 'flower',
    src: flower,
  },
];

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <article>
      <section className="px-10 flex justify-between gap-10 flex-col md:flex-row">
        <div className="flex-1">
          <div className="mb-5 text-5xl font-thin">
            <h1>Hi There</h1>
            <h1>This is</h1>
            <h1>~ Hantaran By Joo</h1>
          </div>
          <p className="text-sm mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            corporis repudiandae harum nemo, accusamus consequuntur eius
            laudantium, explicabo enim ducimus eum repellendus vero suscipit ex
            provident saepe expedita aliquam labore!
          </p>
          <Button
            className="bg-red-700 text-white font-semibold px-6 py-2 rounded-md"
            onClick={() => navigate('/login')}
          >
            Get in touch
          </Button>
        </div>
        <div className="relative flex-1 flex">
          <img src={buket} alt="hero" className="w-full z-40" loading="lazy" />
          <img src={hand} className="absolute z-20 rotate-3 w-full" />
          <img src={weddingBg} className="w-full absolute z-10 rotate-6" />
          <img
            src={flower}
            className="absolute z-40 size-36 rounded-t-full left-0 -translate-x-1/2 bottom-5 shadow-md "
          />
        </div>
      </section>
      <section className="px-5 py-4 flex flex-col gap-3">
        <p className="text-center bg-secondary2 mx-auto w-1/2 px-1 py-1 text-red-500  rounded-md">
          OUR SERVICES
        </p>
        <h1 className="text-2xl font-semibold text-center">
          All you need is on us
        </h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          aliquid officiis quasi sapiente cupiditate repudiandae consectetur quo
          eveniet. Rerum, sed ut. Illum harum ipsa excepturi doloribus suscipit
          qui vitae molestias?
        </p>

        <CarouselWithHero contents={contents} />
      </section>
      <section className="flex flex-col gap-2 py-2 items-center bg-white">
        <h1 className="text-xl font-semibold">Box design</h1>
        <Love />
      </section>
    </article>
    // <div className="mainpage relative">
    //   <header>
    //     <h1> Selamat Datang di HantaranByJoo</h1>
    //     <p>
    //       {' '}
    //       Kami menyediakan layanan sewa hantaran dengan desain desain yang unik
    //       dan menarik
    //     </p>
    //   </header>
    //   <main>
    //     <section id="jelajahi">
    //       <div className="container">
    //         <h2>Jelajahi</h2>
    //         <div className="jelajahi-grid">
    //           <div className="jelajahi-item">
    //             <h3>Koleksi Hantaran</h3>
    //             <p>
    //               Lihat koleksi hantaran kami yang indah dan elegan untuk setiap
    //               tema pernikahan.
    //             </p>
    //             <NavLink to="collection" className="jelajahi-link">
    //               Lihat Selengkapnya
    //             </NavLink>
    //           </div>
    //           <div className="jelajahi-item">
    //             <h3>Paket & Harga</h3>
    //             <p>
    //               Temukan paket hantaran yang sesuai dengan kebutuhan dan
    //               anggaran Anda.
    //             </p>
    //             <NavLink to="prices" className="jelajahi-link">
    //               Lihat Selengkapnya
    //             </NavLink>
    //           </div>
    //           <div className="jelajahi-item">
    //             <h3>Testimoni</h3>
    //             <p>
    //               Baca pengalaman pelanggan kami yang telah menggunakan layanan
    //               HantaranByJoo.
    //             </p>
    //             <NavLink to="testimoni" className="jelajahi-link">
    //               Lihat Selengkapnya
    //             </NavLink>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </div>
  );
};
