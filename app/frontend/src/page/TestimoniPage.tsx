const TestimoniPage = () => {
  return (
    <div className="testimoni chat-container p-10 bg-white">
      <h1>Testimoni Pelanggan</h1>
      <div className="chat-box border px-5 flex flex-col gap-2 shadow-lg py-2">
        <div className="message customer">
          "HantaranByJoo sangat membantu dalam menyiapkan hantaran pernikahan
          saya. Kotak hantarannya elegan dan sesuai dengan permintaan saya!"
        </div>
        <div className="chat-time">10:45 AM</div>

        <div className="message hantaranbyjoo">
          "Terima kasih banyak atas kepercayaannya! Kami sangat senang Anda puas
          dengan layanan kami."
        </div>
        <div className="chat-time">10:50 AM</div>

        <div className="message customer">
          "Saya juga sangat terkesan dengan kecepatan respon dan pengirimannya
          yang tepat waktu. Sangat direkomendasikan!"
        </div>
        <div className="chat-time">11:00 AM</div>

        <div className="message hantaranbyjoo">
          "Kami selalu berusaha memberikan yang terbaik untuk pelanggan kami.
          Terima kasih atas rekomendasinya!"
        </div>
        <div className="chat-time">11:05 AM</div>
      </div>
    </div>
  );
};

export default TestimoniPage;
