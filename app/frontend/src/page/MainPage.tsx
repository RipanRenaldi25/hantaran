import React from 'react';

export const MainPage = () => {
  return (
    <div>
      <header className="mainpage">
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
                <a href="#" className="jelajahi-link">
                  Lihat Selengkapnya
                </a>
              </div>
              <div className="jelajahi-item">
                <h3>Paket & Harga</h3>
                <p>
                  Temukan paket hantaran yang sesuai dengan kebutuhan dan
                  anggaran Anda.
                </p>
                <a href="#" className="jelajahi-link">
                  Lihat Selengkapnya
                </a>
              </div>
              <div className="jelajahi-item">
                <h3>Testimoni</h3>
                <p>
                  Baca pengalaman pelanggan kami yang telah menggunakan layanan
                  HantaranByJoo.
                </p>
                <a href="#" className="jelajahi-link">
                  Lihat Selengkapnya
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
