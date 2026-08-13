import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Globe, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CampusSeal } from '../components/ui/CampusSeal';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const StationeryIllustration: React.FC = () => (
  <svg viewBox="0 0 420 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
      <linearGradient id="pencilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>

    <circle cx="210" cy="210" r="200" fill="rgba(59,130,246,0.16)" />
    <rect x="50" y="80" width="250" height="300" rx="28" fill="url(#paperGradient)" stroke="#93c5fd" strokeWidth="4" />
    <path d="M72 110H268" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
    <path d="M72 150H268" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
    <path d="M72 190H220" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
    <path d="M72 230H240" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" />
    <rect x="228" y="250" width="32" height="68" rx="16" fill="#bfdbfe" />
    <g transform="rotate(-15 320 140)">
      <rect x="300" y="100" width="60" height="210" rx="22" fill="url(#pencilGradient)" />
      <polygon points="360,100 360,120 390,110" fill="#1d4ed8" />
      <rect x="300" y="300" width="60" height="16" fill="#1e40af" />
    </g>
    <rect x="95" y="320" width="70" height="30" rx="10" fill="#dbeafe" />
    <rect x="88" y="112" width="34" height="34" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="3" />
    <rect x="118" y="120" width="18" height="12" rx="4" fill="#93c5fd" />
    <circle cx="315" cy="320" r="35" fill="#fff" stroke="#93c5fd" strokeWidth="4" />
    <path d="M303 320C303 308 310 300 315 300C320 300 327 308 327 320" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
    <path d="M295 330L335 330" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    login({ universityEmail: data.email, fullName: data.email });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,#f5fbff_0%,#eef9ff_100%)] flex items-center justify-center px-4 py-10 font-body text-text-primary">
      <div className="w-full max-w-[1120px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-0">
          <div className="relative hidden lg:flex items-center justify-center bg-sky-50 p-10">
            <div className="relative w-full max-w-[380px] rounded-[36px] bg-white shadow-[0_25px_70px_rgba(56,189,248,0.16)] overflow-hidden border border-sky-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_35%)]" />
              <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-sky-300/10 blur-2xl" />
              <div className="absolute right-8 top-12 h-20 w-20 rounded-full bg-sky-200/20 blur-2xl" />
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">CampusHaat</span>
                  <h2 className="mt-6 text-3xl font-display font-bold tracking-[-0.04em] text-slate-950">Study supplies, campus deals, and quick trades.</h2>
                  <p className="mt-4 text-sm text-text-secondary max-w-[280px]">A student marketplace with fast onboarding, verified campus members, and trusted local exchange.</p>
                </div>
                <div className="mt-6 rounded-[32px] border border-sky-200 bg-slate-50 p-4 shadow-inner">
                  <div className="h-[320px] w-full">
                    <StationeryIllustration />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">CampusHaat</span>
                <h1 className="mt-3 text-3xl font-display font-bold tracking-[-0.04em] text-slate-950">Login</h1>
              </div>
              <CampusSeal color="indigo" size="md" />
            </div>
            <p className="max-w-xl text-sm text-text-secondary mb-10">Sign in to continue to CampusHaat and access your listings, chats, and dashboard.</p>

            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">Email</label>
                <Input
                  {...loginForm.register('email')}
                  placeholder="student@university.edu"
                  leftIcon={Mail}
                  error={loginForm.formState.errors.email?.message}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">Password</label>
                <div className="relative">
                  <Input
                    {...loginForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                    leftIcon={Lock}
                    error={loginForm.formState.errors.password?.message}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div />
                <a href="/forgot-password" className="text-sm font-medium text-sky-700 hover:text-sky-900">Forgot Password?</a>
              </div>

              <Button type="submit" className="w-full py-3 text-base" variant="primary">
                Log In
              </Button>
            </motion.form>

            <div className="relative my-8">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <p className="relative mx-auto w-fit bg-white px-3 text-sm text-text-secondary">Or continue with Google</p>
            </div>

            <div className="flex items-center justify-center">
              <Button type="button" className="w-full gap-3 py-3" variant="outline" leftIcon={Globe}>
                Continue with Google
              </Button>
            </div>
          
            <p className="mt-6 text-center text-sm text-text-secondary">Login with your Google account to continue.</p>
            <p className="mt-6 text-center text-sm text-text-secondary">Don’t have an account? <Link to="/signup" className="font-medium text-sky-700 hover:text-sky-900">Sign Up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
