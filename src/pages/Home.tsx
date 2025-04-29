
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/template/Header';
import Footer from '@/components/template/Footer';
import Container from '@/components/shared/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loading from '@/components/shared/Loading';
import { Search, ArrowRight } from 'lucide-react';

// Types for our mock data
type ServiceCategory = {
  id: number;
  name: string;
  icon: string;
  description: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

const Home = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<Error | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState<Error | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  // Mock fetch for service categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        
        // Simulate API call
        setTimeout(() => {
          const mockCategories: ServiceCategory[] = [
            { id: 1, name: 'Web Development', icon: '💻', description: 'Custom websites and web applications' },
            { id: 2, name: 'Graphic Design', icon: '🎨', description: 'Logos, branding, and print materials' },
            { id: 3, name: 'Content Writing', icon: '✍️', description: 'Blog posts, articles, and copywriting' },
            { id: 4, name: 'Digital Marketing', icon: '📱', description: 'SEO, social media, and ads campaigns' },
            { id: 5, name: 'Video Production', icon: '🎬', description: 'Video editing and animation' },
            { id: 6, name: 'Translation', icon: '🌐', description: 'Document translation and localization' },
          ];
          
          setCategories(mockCategories);
          setIsLoadingCategories(false);
        }, 1000);
      } catch (err) {
        setErrorCategories(err instanceof Error ? err : new Error('Failed to load categories'));
        setIsLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Mock fetch for testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoadingTestimonials(true);
        
        // Simulate API call
        setTimeout(() => {
          const mockTestimonials: Testimonial[] = [
            { 
              id: 1, 
              name: 'Sarah M.', 
              role: 'Project Manager', 
              company: 'TechCorp', 
              quote: 'I found the perfect developer for my project within 24 hours. The quality of work exceeded my expectations!', 
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg' 
            },
            { 
              id: 2, 
              name: 'Ahmed K.', 
              role: 'Startup Founder', 
              company: 'InnovateDZ', 
              quote: 'This platform helped me scale my business quickly by connecting me with talented local freelancers.', 
              avatar: 'https://randomuser.me/api/portraits/men/22.jpg' 
            },
            { 
              id: 3, 
              name: 'Lina B.', 
              role: 'Freelance Designer', 
              company: 'Self-employed', 
              quote: "Since joining as a freelancer, I have been able to build a consistent client base and grow my portfolio.", 
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg' 
            }
          ];
          
          setTestimonials(mockTestimonials);
          setIsLoadingTestimonials(false);
        }, 1500); // Slightly longer delay for second data set
      } catch (err) {
        setErrorTestimonials(err instanceof Error ? err : new Error('Failed to load testimonials'));
        setIsLoadingTestimonials(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  // Header components
  const headerStart = (
    <div className="flex items-center">
      <h2 className="text-2xl font-bold">FreelanceDZ</h2>
    </div>
  );
  
  const headerEnd = (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex gap-2">
        <select className="p-2 rounded-md border border-gray-300 dark:border-gray-700">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
        <Link to="/register?type=freelancer">
          <Button variant="default">Become a Seller</Button>
        </Link>
      </div>
      <Link to="/login">
        <Button variant="outline">Sign In</Button>
      </Link>
      <Link to="/register">
        <Button variant="default">Sign Up</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        headerStart={headerStart}
        headerEnd={headerEnd}
        className="shadow-sm"
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
          <Container>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">Find the perfect freelance talent in Algeria</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Connect with skilled professionals to get your projects done quickly and efficiently.</p>
                
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                  <Input 
                    className="pl-12 pr-4 py-3"
                    placeholder="Search for services..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-3 text-gray-500 text-xl" />
                </div>
                
                <div className="flex gap-4">
                  <Button size="lg" variant="default">
                    Find Talent <ArrowRight className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Browse Projects
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" 
                  alt="Freelancers collaborating" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </Container>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Post a Job</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create a detailed job post with your requirements, timeline, and budget.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Hire a Freelancer</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review proposals, compare profiles, and select the perfect candidate for your project.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Securely</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work is completed to your satisfaction before payment is released to the freelancer.
                </p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
            
            {isLoadingCategories && (
              <div className="py-12">
                <Loading loading={true} customLoader={<div className="text-center">Loading categories...</div>} />
              </div>
            )}
            
            {errorCategories && (
              <div className="py-12 text-center">
                <p className="text-error text-lg">Error: {errorCategories.message}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}
            
            {!isLoadingCategories && !errorCategories && categories.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <p>No categories available at the moment.</p>
              </div>
            )}
            
            {!isLoadingCategories && !errorCategories && categories.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            
            {isLoadingTestimonials && (
              <div className="py-12">
                <Loading loading={true} customLoader={<div className="text-center">Loading testimonials...</div>} />
              </div>
            )}
            
            {errorTestimonials && (
              <div className="py-12 text-center">
                <p className="text-error text-lg">Error: {errorTestimonials.message}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}
            
            {!isLoadingTestimonials && !errorTestimonials && testimonials.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <p>No testimonials available at the moment.</p>
              </div>
            )}
            
            {!isLoadingTestimonials && !errorTestimonials && testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="p-6 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer 
        pageContainerType="contained"
        className="mt-auto border-t border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

export default Home;
