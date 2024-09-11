import { NavLink } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div className="mainpage relative">
      <header>
        <h1> Selamat Datang di HantaranByJoo</h1>
        <p>
          {' '}
          Kami menyediakan layanan sewa hantaran dengan desain desain yang unik
          dan menarik
        </p>
      </header>
      <main>
        <section id="jelajahi">
          <div className="container">
            <h2>Jelajahi</h2>
            <div className="jelajahi-grid">
              <div className="jelajahi-item">
                <h3>Koleksi Hantaran</h3>
                <p>
                  Lihat koleksi hantaran kami yang indah dan elegan untuk setiap
                  tema pernikahan.
                </p>
                <NavLink to="collection" className="jelajahi-link">
                  Lihat Selengkapnya
                </NavLink>
              </div>
              <div className="jelajahi-item">
                <h3>Paket & Harga</h3>
                <p>
                  Temukan paket hantaran yang sesuai dengan kebutuhan dan
                  anggaran Anda.
                </p>
                <NavLink to="prices" className="jelajahi-link">
                  Lihat Selengkapnya
                </NavLink>
              </div>
              <div className="jelajahi-item">
                <h3>Testimoni</h3>
                <p>
                  Baca pengalaman pelanggan kami yang telah menggunakan layanan
                  HantaranByJoo.
                </p>
                <NavLink to="testimoni" className="jelajahi-link">
                  Lihat Selengkapnya
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
