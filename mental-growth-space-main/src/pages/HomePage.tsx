import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HeroSection/HeroSection';
import Footer from '@/components/Footer/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
