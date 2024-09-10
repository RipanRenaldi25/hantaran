const ActivateEmail = () => {
  return (
    <div className="email-container">
      <div className="email-header">
        <h1>Aktivasi Akun Kamu</h1>
      </div>
      <div className="email-body">
        <p>
          Terima kasih telah mendaftar! Klik tombol di bawah ini untuk
          mengaktifkan akun kamu:
        </p>
        <a href="https://www.example.com/aktivasi-akun">Aktivasi Akun</a>
      </div>
      <div className="email-footer">
        <p>Jika kamu tidak meminta akun ini, abaikan saja email ini.</p>
      </div>
    </div>
  );
};

export default ActivateEmail;
