
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Loading from '@/components/shared/Loading';
import Header from '@/components/template/Header';
import Footer from '@/components/template/Footer';
import { TbLock, TbMail } from 'react-icons/tb';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, simulate login failure with specific credentials
      if (email === 'error@example.com') {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        setIsSubmitting(false);
        return;
      }
      
      // For demo purposes, simulate successful login
      console.log('Login successful!', { email, password, rememberMe });
      
      // Simulate redirect to dashboard (in real app, this would use navigation)
      setIsLoading(false);
      alert('Login successful! Redirecting to dashboard...');
      
      // Reset form
      setEmail('');
      setPassword('');
      setRememberMe(false);
      setIsSubmitting(false);
    }, 1500);
  };

  // Header content
  const headerStart = (
    <div className="flex items-center">
      <Link to="/">
        <h2 className="text-2xl font-bold">FreelanceDZ</h2>
      </Link>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header headerStart={headerStart} className="shadow-sm" />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Container className="max-w-md">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error text-error rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    prefix={<TbMail className="text-gray-500" />}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    prefix={<TbLock className="text-gray-500" />}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                  >
                    Remember Me
                  </Checkbox>
                  
                  <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  variant="solid"
                  className="w-full"
                  disabled={isSubmitting}
                  loading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer 
        pageContainerType="contained" 
        className="mt-auto border-t border-gray-200 dark:border-gray-700" 
      />
    </div>
  );
};

export default Login;
