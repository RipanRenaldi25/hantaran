import { FormEvent, useId, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
} from 'lucide-react';
import { resetPassword } from '@/feature/user';

const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'Minimal 8 karakter',
    test: (v: string) => v.length >= 8,
  },
  {
    id: 'upper',
    label: 'Mengandung huruf besar',
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: 'number',
    label: 'Mengandung angka',
    test: (v: string) => /[0-9]/.test(v),
  },
  {
    id: 'special',
    label: 'Mengandung simbol',
    test: (v: string) => /[!@#$%^&*()_+{}]/.test(v),
  },
];

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder?: string;
  error?: string;
  describedBy?: string;
  disabled?: boolean;
}

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
  describedBy,
  disabled,
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className='space-y-1.5'>
      <label htmlFor={id} className='text-sm font-medium text-neutral'>
        {label}
      </label>

      <div className='relative'>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? errorId : null, describedBy].filter(Boolean).join(' ') ||
            undefined
          }
          className={`h-11 w-full rounded-lg border bg-white px-3 pr-11 text-sm text-neutral outline-none transition-colors placeholder:text-muted-foreground focus:border-prime focus:ring-2 focus:ring-tertiary disabled:cursor-not-allowed disabled:bg-muted ${
            error ? 'border-destructive' : 'border-input'
          }`}
        />
        <button
          type='button'
          onClick={() => setVisible((v) => !v)}
          aria-label={
            visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'
          }
          aria-pressed={visible}
          className='absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prime'
        >
          {visible ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
        </button>
      </div>

      {error && (
        <p id={errorId} className='text-xs text-destructive'>
          {error}
        </p>
      )}
    </div>
  );
};

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = (searchParams.get('token') ?? '')
    .replace(/^Bearer\s+/i, '')
    .trim();

  const passwordId = useId();
  const confirmId = useId();
  const rulesId = useId();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<{
    message: string;
    expired: boolean;
  } | null>(null);

  const ruleResults = PASSWORD_RULES.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));
  const allRulesMet = ruleResults.every((r) => r.met);
  const hasMismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = allRulesMet && confirm === password && !isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setApiError(null);
    try {
      await resetPassword(password, token);
      setIsSuccess(true);
    } catch (err) {
      setApiError({
        message: (err as { message: string }).message,
        expired: (err as { message: string }).message.includes('expired'),
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-secondary via-white to-secondary px-4 py-8'>
      <span className='mb-6 text-lg font-semibold tracking-wider text-primary'>
        HantaranByJoo
      </span>

      <main className='w-full max-w-md rounded-xl bg-white p-6 shadow-md md:p-8'>
        {/* ---------------- Tautan tidak valid (tanpa token) ---------------- */}
        {!token && (
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex size-12 items-center justify-center rounded-full bg-tertiary text-prime'>
              <AlertCircle className='size-6' />
            </div>
            <h1 className='text-xl font-semibold text-neutral'>
              Tautan tidak valid
            </h1>
            <p className='text-sm text-muted-foreground'>
              Tautan pemulihan tidak lengkap atau sudah tidak berlaku. Minta
              tautan baru untuk melanjutkan.
            </p>
            <Link
              to='/forgot-password'
              className='mt-2 flex h-11 w-full items-center justify-center rounded-full bg-prime text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90'
            >
              Minta tautan baru
            </Link>
          </div>
        )}

        {/* ------------------------------ Sukses ---------------------------- */}
        {token && isSuccess && (
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex size-12 items-center justify-center rounded-full bg-tertiary text-prime'>
              <CheckCircle2 className='size-6' />
            </div>
            <h1 className='text-xl font-semibold text-neutral'>
              Kata sandi berhasil diubah
            </h1>
            <p className='text-sm text-muted-foreground'>
              Silakan masuk dengan kata sandi baru Anda.
            </p>
            <Link
              to='/login'
              className='mt-2 flex h-11 w-full items-center justify-center rounded-full bg-prime text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90'
            >
              Masuk sekarang
            </Link>
          </div>
        )}

        {/* ------------------------------ Form ------------------------------ */}
        {token && !isSuccess && (
          <>
            <div className='flex flex-col items-center text-center'>
              <div className='flex size-12 items-center justify-center rounded-full bg-prime text-white ring-8 ring-tertiary'>
                <KeyRound className='size-5' />
              </div>
              <h1 className='mt-5 text-xl font-semibold text-neutral md:text-2xl'>
                Atur ulang kata sandi
              </h1>
              {/* aksen warna `second` */}
              <span className='mt-2 block h-1 w-10 rounded-full bg-second' />
              <p className='mt-3 text-sm text-muted-foreground'>
                Buat kata sandi baru yang kuat dan mudah Anda ingat.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className='mt-6 space-y-4'>
              <PasswordField
                id={passwordId}
                label='Kata sandi baru'
                value={password}
                onChange={setPassword}
                autoComplete='new-password'
                placeholder='Masukkan kata sandi baru'
                describedBy={rulesId}
                disabled={isLoading}
              />

              <ul
                id={rulesId}
                aria-label='Syarat kata sandi'
                className='space-y-1.5 rounded-lg bg-muted px-3 py-2.5'
              >
                {ruleResults.map((rule) => (
                  <li
                    key={rule.id}
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      rule.met
                        ? 'font-medium text-prime'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {rule.met ? (
                      <Check className='size-3.5 shrink-0' />
                    ) : (
                      <span className='mx-1 size-1.5 shrink-0 rounded-full bg-current' />
                    )}
                    <span className='sr-only'>
                      {rule.met ? 'Terpenuhi: ' : 'Belum terpenuhi: '}
                    </span>
                    {rule.label}
                  </li>
                ))}
              </ul>

              <PasswordField
                id={confirmId}
                label='Konfirmasi kata sandi'
                value={confirm}
                onChange={setConfirm}
                autoComplete='new-password'
                placeholder='Ulangi kata sandi baru'
                error={hasMismatch ? 'Kata sandi tidak sama' : undefined}
                disabled={isLoading}
              />

              {apiError && (
                <div
                  role='alert'
                  className='rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive'
                >
                  {apiError.message}{' '}
                  {apiError.expired && (
                    <Link
                      to='/forgot-password'
                      className='font-semibold underline'
                    >
                      Minta tautan baru
                    </Link>
                  )}
                </div>
              )}

              <button
                type='submit'
                disabled={!canSubmit}
                className='flex h-11 w-full items-center justify-center gap-2 rounded-full bg-prime text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prime focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:opacity-100'
              >
                {isLoading && <Loader2 className='size-4 animate-spin' />}
                {isLoading ? 'Menyimpan...' : 'Simpan kata sandi'}
              </button>
            </form>
          </>
        )}
      </main>

      <Link
        to='/login'
        className='mt-6 flex items-center gap-1 text-sm font-semibold text-prime'
      >
        <ArrowLeft className='size-4' />
        <span className='border-b border-prime'>Kembali ke halaman masuk</span>
      </Link>
    </div>
  );
};
