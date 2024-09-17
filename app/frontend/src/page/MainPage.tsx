import buket from '@/assets/bouquet.jpg';
import cake from '@/assets/cake.jpg';
import flower from '@/assets/flower.jpg';
import hand from '@/assets/hand.jpg';
import weddingBg from '@/assets/wedding-bg.jpg';
import FotoCardList from '@/components/FotoCardList';
import Love from '@/components/Love';
import { Button } from '@/components/ui/button';
import { CarouselWithHero } from '@/HOC/Carousel/WithHero';
import { NavLink, useNavigate } from 'react-router-dom';
import vid1 from '@/assets/vid.mov';
import weddingSea from '@/assets/wedding-sea.jpg';
import { cn } from '@/lib/utils';
import FotoCardv2 from '@/components/FotoCardv2';
import FotoCardListV2 from '@/components/FotoCardListv2';

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
      <section className="bg-red-500 object-contain relative h-[500px]">
        <img
          src={weddingSea}
          className="absolute w-full h-full object-cover object-center z-10"
        />
        <div className="overlay absolute z-20 inset-0 bg-[rgba(0,0,0,0.38)]"></div>
        <div className="z-30 relative flex flex-col items-center justify-center h-full text-slate-100 font-semibold text-center gap-3 px-4">
          <div className="md:text-3xl">
            <h1>MAKE YOUR DREAMS</h1>
            <h1>COME TRUE</h1>
          </div>
          <p className="md:text-xl">
            We're here to fill your needs by our services. We ensuring your
            happiness, no matter what
          </p>
          <Button className="bg-white text-black font-bold md:hidden" asChild>
            <a href="#first">Discover More</a>
          </Button>
          <Button
            className="bg-white text-black font-bold hidden md:flex md:text-center "
            asChild
            size={'lg'}
          >
            <a href="#first" className="text-xl">
              Discover More
            </a>
          </Button>
        </div>
      </section>
      <section
        className="px-6 flex justify-between gap-10 flex-col sm:flex-row py-5 sm:py-10 "
        id="first"
      >
        <div className="flex-1">
          <div className="mb-5 text-4xl font-thin md:text-6xl ">
            <h1>Hi There!</h1>
            <h1>This is</h1>
            <h1>Hantaran ByJoo~</h1>
          </div>
          <p className="text-sm mb-10 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            corporis repudiandae harum nemo, accusamus consequuntur eius
            laudantium, explicabo enim ducimus eum repellendus vero suscipit ex
            provident saepe expedita aliquam labore!
          </p>
          <Button
            className="bg-red-700 text-white font-semibold px-6 py-2 rounded-md md:text-xl"
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
        <p className="text-center bg-secondary2 mx-auto w-1/2 p-1 md:p-3 md:text-xl md:font-semibold text-red-500  rounded-md">
          OUR SERVICES
        </p>
        <h1 className="text-2xl font-semibold text-center">
          All you need is on us
        </h1>
        <p className="text-center md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          aliquid officiis quasi sapiente cupiditate repudiandae consectetur quo
          eveniet. Rerum, sed ut. Illum harum ipsa excepturi doloribus suscipit
          qui vitae molestias?
        </p>

        <CarouselWithHero contents={contents} />
      </section>
      <section className="flex flex-col gap-2 py-2 px-5 items-center bg-white md:text-2xl md:gap-3">
        <h1 className="text-xl font-semibold md:text-3xl">Our Expert Teams</h1>
        <Love />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:place-items-center md:place-contents-center">
          <FotoCardListV2
            fotoCards={[
              {
                image: buket,
                name: 'John Doe',
                position: 'Member',
                description: 'Best worker',
                instagram: 'www.instagram.com',
              },
              {
                image: hand,
                name: 'John Doe2',
                position: 'Member',
                description: 'Best worker',
                instagram: 'www.instagram.com',
                place: 'right',
              },
              {
                image: hand,
                name: 'John Doe2',
                position: 'Member',
                description: 'Best worker',
                instagram: 'www.instagram.com',
              },
              {
                image: hand,
                name: 'John Doe2',
                position: 'Member',
                description: 'Best worker',
                instagram: 'www.instagram.com',
                place: 'right',
              },
              {
                image: hand,
                name: 'John Doe2',
                position: 'Member',
                description: 'Best worker',
                instagram: 'www.instagram.com',
              },
            ]}
          />
          {/* <FotoCardList
            fotoCards={[
              { image: buket, name: 'John Doe', position: 'Member' },
              { image: hand, name: 'John Doe2', position: 'Member' },
              { image: hand, name: 'John Doe2', position: 'Member' },
              { image: hand, name: 'John Doe2', position: 'Member' },
              { image: hand, name: 'John Doe2', position: 'Member' },
            ]}
          /> */}
        </div>
      </section>
      <section className="bg-white py-3 px-5 flex flex-col gap-2 items-center md:gap-3">
        <h1 className="md:text-3xl font-semibold">What can we do</h1>
        <Love />
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:mb-3">
          <div className="border-2 border-secondary flex flex-col gap-2 pb-2 items-center text-center md:text-2xl">
            <img
              src={buket}
              alt="buket"
              className="size-36 object-cover object-center md:size-60"
            />
            <h1>Box design</h1>
          </div>
          <div className="border-4 border-secondary flex flex-col gap-2 pb-2 items-center text-center md:text-2xl">
            <img
              src={hand}
              alt="buket"
              className="size-36 object-cover object-center md:size-60"
            />
            <h1>Wedding Organizer</h1>
          </div>
          <div className="border-2 border-secondary flex flex-col gap-2 pb-2 items-center text-center md:text-2xl">
            <img
              src={flower}
              alt="buket"
              className="size-36 object-cover object-center md:size-60"
            />
            <h1>Event Planing</h1>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-3 px-5 py-2 text-center md:gap-4 md:text-2xl">
        <h1 className="text-xl font-semibold md:text-3xl">On Instagram</h1>
        <p className="font-thin">Here is product summary on our instagram</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          <div>
            <img src={buket} className="object-cover object-center" />
          </div>
          <div>
            <img src={hand} className="object-cover object-center" />
          </div>
          <div>
            <img src={weddingBg} className="object-cover object-center" />
          </div>
          <div>
            <img src={flower} className="object-cover object-center" />
          </div>
          <div>
            <img src={weddingBg} className="object-cover object-center" />
          </div>
          <div>
            <img src={hand} className="object-cover object-center" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2 items-center bg-bluethin px-2 py-5 h-[50%] md:text-2xl">
        <h1 className="text-xl md:text-3xl font-semibold">
          Celebrating Your Love
        </h1>
        <Love />
        <div className="relative md:h-[500px] md:w-full md:p-10">
          <video
            className="size-64 md:size-full object-cover object-center"
            controls
          >
            <source src={vid1} />
          </video>
        </div>
      </section>
      <section className="px-5 py-2 md:py-4 flex gap-2 flex-col md:gap-4 md:text-2xl items-center text-center">
        <h1 className="text-2xl font-semibold text-slate-600 md:text-3xl">
          Are you ready to plan a special day
        </h1>
        <p className="font-thin">
          Make your way to our instagram or just login to our website
        </p>
        <Button
          className={'bg-red-900 md:text-2xl p-8'}
          onClick={() => navigate('/contact')}
        >
          Let's Talk
        </Button>
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
