import { AtSign, MailIcon } from "lucide-react"

interface IVerifyEmailProps {
  email: string;
}

export const VerifyEmail = ({ email }: IVerifyEmailProps) => {
  return (
      <section className="flex items-center justify-center flex-col">
        <div className="rounded-full p-3 shadow-[0_0_60px_10px] shadow-tertiary bg-white ">
          <div className="rounded-full bg-primary text-white p-3">
          <MailIcon className="text-white"/>
          </div>
        </div>
        <p className="text-primary text-[0.8rem] mt-5">AKSES DENGAN EMAIL ANDA</p>
        <h1 className="text-primary text-2xl mt-1">Verifikasi Email Anda</h1>
        <p className="w-4/5 text-center text-[0.8rem] mt-2 text-black/70">Kami telah mengirimkan tautan verifikasi ke alamat email: </p>
        <div className="py-2 px-4 flex rounded-full items-center justify-center gap-2 bg-black/5 mt-4">
          <AtSign className="text-primary size-5"/>
          <h1 className="text-black font-semibold">{email}</h1>
        </div>
      </section>
  )
}