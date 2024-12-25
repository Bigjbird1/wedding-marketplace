import React, { useState } from 'react';
import { Eye, EyeOff, Check, ArrowRight, Mail, Key, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type UserType = 'buyer' | 'seller' | null;
type AuthMode = 'signup' | 'login' | 'verify';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [userType, setUserType] = useState<UserType>(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    // Validate inputs before proceeding
    if (!email || !password) {
      return;
    }
    setAuthMode('verify');
  };

  const renderContent = () => {
    if (authMode === 'signup' && !userType) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Join WeddingTransfer</h2>

          <div className="space-y-4">
            <button
              onClick={() => setUserType('buyer')}
              className="w-full p-4 border rounded-xl hover:border-gray-300 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium group-hover:text-gray-600">I'm looking to find a date</h3>
                <p className="text-sm text-gray-600">Browse available wedding dates and packages</p>
              </div>
            </button>

            <button
              onClick={() => setUserType('seller')}
              className="w-full p-4 border rounded-xl hover:border-gray-300 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Key className="w-6 h-6 text-rose-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium group-hover:text-gray-600">I'm looking to transfer my date</h3>
                <p className="text-sm text-gray-600">List your wedding date for transfer</p>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setAuthMode('login')}
                className="text-gray-900 font-medium hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      );
    }

    if (authMode === 'signup' && userType === 'buyer') {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Create your account</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Create a password"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setAuthMode('login')}
                className="text-gray-900 font-medium hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      );
    }

    if (authMode === 'signup' && userType === 'seller') {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Create seller account</h2>

          <Alert className="mb-6">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Before creating an account, please ensure you have the right to transfer your wedding date according to your venue's policy.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Create a password"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Venue Location</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter venue name and city"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Wedding Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setAuthMode('login')}
                className="text-gray-900 font-medium hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      );
    }

    if (authMode === 'login') {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Welcome back</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Enter your password"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800">
              Log in
            </button>

            <button className="w-full text-sm text-gray-600 hover:text-gray-900">
              Forgot password?
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  setUserType(null);
                }}
                className="text-gray-900 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      );
    }

    if (authMode === 'verify') {
      return (
        <div className="p-6">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">Verify your email</h2>
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification link to {email}
          </p>

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800">
            Open email app
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the email?{' '}
              <button className="text-gray-900 font-medium hover:underline">
                Click to resend
              </button>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthModal;