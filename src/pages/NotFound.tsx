
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
      
      <main className="flex-1 flex items-center justify-center">
        <Container className="max-w-lg text-center py-12">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">Oops! Page not found</p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              icon={<FiArrowLeft />}
              iconAlignment="start"
            >
              Go Back
            </Button>
            
            <Link to="/">
              <Button 
                variant="default"
                icon={<FiHome />}
                iconAlignment="start"
              >
                Return to Home
              </Button>
            </Link>
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

export default NotFound;
