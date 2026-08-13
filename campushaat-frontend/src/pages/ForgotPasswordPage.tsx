import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const forgotPasswordSchema = z.object({
  universityEmail: z.string()
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith('.edu') || email.endsWith('.ac.in'), 
      "Must be a valid .edu or .ac.in university email"
    )
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Password reset requested for:', data.universityEmail);
    setSubmittedEmail(data.universityEmail);
    setIsSuccess(true);
  };

  const handleResend = () => {
    console.log('Resending reset link to:', submittedEmail);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,#eef2ff_0%,#f8fafc_100%)] flex items-center justify-center px-4 py-10 font-body text-text-primary">
      <div className="w-full max-w-[1100px] overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-0">
          <div className="relative hidden lg:flex flex-col justify-between gap-6 bg-gradient-to-br from-indigo-100 via-slate-50 to-slate-100 p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-sm shadow-indigo-100">
                <span className="text-sm font-semibold text-primary">CampusHaat</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-display font-bold tracking-[-0.04em] text-slate-950">
                  Forgot something? We’ve got you.
                </h2>
                <p className="max-w-[320px] text-sm text-text-secondary leading-6">
                  Enter your campus email and we’ll send a secure reset link right away.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl bg-white/90 p-4 shadow-sm border border-white/70">
                  <p className="text-sm font-semibold text-slate-900">Fast campus recovery</p>
                  <p className="text-sm text-text-secondary">Reset your password with one quick email.</p>
                </div>
                <div className="rounded-3xl bg-white/90 p-4 shadow-sm border border-white/70">
                  <p className="text-sm font-semibold text-slate-900">Verified accounts only</p>
                  <p className="text-sm text-text-secondary">We only send links to .edu / .ac.in emails.</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-end justify-center">
              <div className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute right-6 bottom-10 h-16 w-16 rounded-full bg-verified/20 blur-2xl" />
              <div className="relative z-10 w-full rounded-[32px] bg-white/90 p-6 shadow-xl border border-white/80">
                <p className="text-xs uppercase tracking-[0.28em] text-primary/80">CampusHaat Recovery</p>
                <h3 className="text-lg font-semibold text-slate-950">Get back into your account safely.</h3>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <button
              onClick={() => navigate('/login')}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium text-text-secondary transition hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>

            <div className="mb-8 space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Password reset</p>
                <h1 className="text-3xl font-display font-bold tracking-[-0.04em] text-slate-950">Forgot your password?</h1>
              </div>
              <p className="max-w-2xl text-sm text-text-secondary">
                No worries — just enter your university email and we’ll email you a secure reset link.
              </p>
            </div>

            <Card className="bg-background border border-border p-6 rounded-[28px] shadow-sm">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="request-state"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h2 className="font-display font-bold text-2xl text-text-primary tracking-tight">
                        Reset your CampusHaat password
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Use the email linked to your student account and we’ll send a reset link.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                      <Input
                        type="email"
                        placeholder="student@university.edu"
                        leftIcon={Mail}
                        {...register('universityEmail')}
                        error={errors.universityEmail?.message}
                        disabled={isSubmitting}
                      />

                      <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-base">
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmation-state"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-verified/10 text-verified">
                      <CheckCircle size={28} />
                    </div>
                    <h2 className="font-display font-semibold text-2xl text-text-primary">Check your email</h2>
                    <p className="text-sm text-text-secondary">
                      We’ve sent a reset link to <span className="font-medium text-text-primary">{submittedEmail}</span> if it matches a verified account.
                    </p>

                    <button
                      onClick={handleResend}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-all"
                    >
                      Didn’t get it? Resend link
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => navigate('/login')}
                    >
                      Back to Sign In
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
