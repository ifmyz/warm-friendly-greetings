
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import Loading from '@/components/shared/Loading';
import Header from '@/components/template/Header';
import Footer from '@/components/template/Footer';
import { Mail, Lock, User } from 'lucide-react';

const Register = () => {
  // Get role from URL parameter if present
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('type');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roleParam === 'freelancer' ? 'freelancer' : 'client');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [fullName, email, password, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      // For demo purposes, simulate registration failure with specific email
      if (email === 'error@example.com') {
        setError('This email is already registered. Please use a different email address.');
        setIsLoading(false);
        setIsSubmitting(false);
        return;
      }
      
      // For demo purposes, simulate successful registration
      console.log('Registration successful!', { fullName, email, password, role });
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Simulate redirect after successful registration
      setTimeout(() => {
        // In a real app, this would use navigation to redirect to dashboard
        alert(`Registration successful as ${role}! Redirecting to dashboard...`);
        
        // Reset form and states
        setFullName('');
        setEmail('');
        setPassword('');
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 1500);
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header headerStart={headerStart} className="shadow-sm" />
        
        <main className="flex-1 flex items-center justify-center">
          <Container className="max-w-md">
            <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 text-center">
              <div className="text-5xl mb-4 text-success">✅</div>
              <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for joining FreelanceDZ. We're redirecting you to the dashboard...
              </p>
              <Loading loading={true} />
            </div>
          </Container>
        </main>
        
        <Footer 
          pageContainerType="contained" 
          className="mt-auto border-t border-gray-200 dark:border-gray-700" 
        />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header headerStart={headerStart} className="shadow-sm" />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Container className="max-w-md">
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Join our freelance marketplace</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error text-error rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block mb-2 font-medium">Full Name</label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isSubmitting}
                    prefix={<User className="text-gray-500" />}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    prefix={<Mail className="text-gray-500" />}
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
                    prefix={<Lock className="text-gray-500" />}
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">I want to join as a:</label>
                  <div className="flex gap-6 mt-2">
                    <Radio.Group value={role} onChange={(value) => setRole(value)}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Radio value="freelancer" disabled={isSubmitting}>
                          Freelancer
                        </Radio>
                        <Radio value="client" disabled={isSubmitting}>
                          Client
                        </Radio>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                  disabled={isSubmitting}
                  loading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign In
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

export default Register;
