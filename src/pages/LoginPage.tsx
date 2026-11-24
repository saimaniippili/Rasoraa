import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESTAURANT_CONFIG } from '../config/restaurant.config';
import { Button } from '../components/common/Button';

const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter a valid email address or phone number'),
  authMethod: z.enum(['password', 'otp']),
  secret: z.string().min(4, 'Password / OTP code must be at least 4 characters'),
  rememberMe: z.boolean().default(true),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      authMethod: 'password',
      secret: '',
      rememberMe: true,
    },
  });

  const identifierValue = watch('identifier');

  const handleSendOtp = () => {
    if (!identifierValue || identifierValue.length < 5) {
      alert('Please enter your email or phone number first to receive a verification OTP.');
      return;
    }
    setOtpSent(true);
    setValue('secret', '5829');
  };

  const onSubmitLogin = (_data: LoginFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setShowForgotPassword(false);
      }, 3000);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen flex items-center justify-center font-sans">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        {/* Brand Crest Anchor */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block group mb-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <img
              src={RESTAURANT_CONFIG.brand.logoUrl}
              alt={RESTAURANT_CONFIG.brand.name}
              className="h-16 w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <p className="text-xs font-sans uppercase tracking-widest text-emerald-800 font-bold">
            Patron Circle & Table Reservations
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card">
          {authSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Welcome to Patron Circle
              </h3>
              <p className="text-sm text-slate-600">
                Authentication completed. You can now view your bookings, preferences, and private dining history.
              </p>
              <div className="pt-4 flex flex-col space-y-2">
                <Link to="/reservations">
                  <Button variant="primary" size="md" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                    Proceed to Table Booking
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAuthSuccess(false);
                    setIsRegisterMode(false);
                  }}
                >
                  Sign Out / Switch Account
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Card Title & Mode Toggle */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  {isRegisterMode ? 'Create Patron Account' : 'Sign In to Your Account'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isRegisterMode
                    ? 'Join our guestbook for priority table reservations and royal thali previews.'
                    : 'Access your reservation history and dining preferences.'}
                </p>
              </div>

              {/* Password vs OTP Switcher */}
              {!isRegisterMode && (
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('password');
                      setValue('authMethod', 'password');
                    }}
                    className={`py-2 text-xs font-sans uppercase tracking-wider font-bold rounded-lg transition-all ${
                      authMethod === 'password'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('otp');
                      setValue('authMethod', 'otp');
                    }}
                    className={`py-2 text-xs font-sans uppercase tracking-wider font-bold rounded-lg transition-all ${
                      authMethod === 'otp'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Passcode (OTP)
                  </button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                    Email Address or Mobile Number *
                  </label>
                  <input
                    type="text"
                    {...register('identifier')}
                    placeholder="e.g. priya@example.com"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.identifier && (
                    <p className="text-xs text-rose-600 mt-1">{errors.identifier.message}</p>
                  )}
                </div>

                {authMethod === 'password' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-emerald-700 hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      type="password"
                      {...register('secret')}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                    {errors.secret && (
                      <p className="text-xs text-rose-600 mt-1">{errors.secret.message}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold">
                        4-Digit Verification Code *
                      </label>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-xs text-emerald-700 hover:underline font-semibold"
                      >
                        {otpSent ? 'Resend Code' : 'Send Code via SMS'}
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      {...register('secret')}
                      placeholder="Enter 4-digit code (e.g. 5829)"
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white tracking-widest font-mono text-center transition-colors"
                    />
                    {otpSent && (
                      <p className="text-xs text-emerald-600 mt-1 font-medium">
                        Verification code 5829 dispatched to your device.
                      </p>
                    )}
                    {errors.secret && (
                      <p className="text-xs text-rose-600 mt-1">{errors.secret.message}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>Remember on this device</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md"
                >
                  {isSubmitting
                    ? 'Authenticating...'
                    : isRegisterMode
                    ? 'Complete Registration'
                    : 'Sign In to Patron Circle'}
                </Button>
              </form>

              {/* Mode Toggle Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  {isRegisterMode ? (
                    <>
                      Already have an account? <span className="text-emerald-700 font-bold">Sign In</span>
                    </>
                  ) : (
                    <>
                      First time visiting RASORAA? <span className="text-emerald-700 font-bold">Create an Account</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-modal border border-slate-200">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                  Reset Password
                </h3>
                <p className="text-xs text-slate-600 mb-4 font-sans">
                  Enter your email address and we will send you instructions to reset your patron credentials.
                </p>

                {forgotSent ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-700 text-center font-medium">
                    Reset link dispatched! Please inspect your inbox.
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowForgotPassword(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                      >
                        Send Link
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
