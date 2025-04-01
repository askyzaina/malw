import { useState, useEffect } from 'react';
import { Shield, Database, File, Zap, UserCheck, Clock, Sparkles, BadgeCheck, Lock, Award } from 'lucide-react';
import Hero from '@/components/Hero';
import ServiceCard, { ServiceFeature } from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ProcessStep from '@/components/ProcessStep';
import CTAButton from '@/components/CTAButton';
import ServiceCheckout from '@/components/ServiceCheckout';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const basicFeatures: ServiceFeature[] = [
    { text: 'Backup website lengkap', included: true },
    { text: 'Pembersihan malware dasar', included: true },
    { text: 'Pemindaian file terinfeksi', included: true },
    { text: 'Laporan singkat', included: true },
    { text: 'Garansi 30 hari', included: true },
    { text: 'Security hardening', included: false },
    { text: 'Optimasi performa', included: false },
  ];

  const advancedFeatures: ServiceFeature[] = [
    { text: 'Backup website lengkap', included: true },
    { text: 'Pembersihan malware menyeluruh', included: true },
    { text: 'Pemindaian file terinfeksi', included: true },
    { text: 'Laporan detail', included: true },
    { text: 'Garansi 60 hari', included: true },
    { text: 'Security hardening', included: true },
    { text: 'Optimasi performa', included: true },
  ];

  const premiumFeatures: ServiceFeature[] = [
    { text: 'Backup website lengkap', included: true },
    { text: 'Pembersihan malware premium', included: true },
    { text: 'Pemindaian file terinfeksi', included: true },
    { text: 'Laporan detail & rekomendasi', included: true },
    { text: 'Garansi 90 hari', included: true },
    { text: 'Security hardening tingkat lanjut', included: true },
    { text: 'Optimasi performa', included: true },
    { text: 'Monitoring keamanan 30 hari', included: true },
    { text: 'Dukungan prioritas 24/7', included: true },
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'E-commerce Owner',
      content: 'Website saya terinfeksi malware dan muncul di blacklist Google. Dalam 24 jam, mereka berhasil membersihkan dan mengembalikan status website saya. Sangat profesional!',
      rating: 5,
    },
    {
      name: 'Dewi Lestari',
      role: 'Blogger',
      content: 'Saya sangat puas dengan layanan yang diberikan. Mereka tidak hanya membersihkan malware, tetapi juga memberikan tips pencegahan agar website saya lebih aman ke depannya.',
      rating: 5,
    },
    {
      name: 'Ahmad Hidayat',
      role: 'Pemilik Bisnis',
      content: 'Proses pembersihan cepat dan transparan. Mereka menjelaskan setiap langkah yang dilakukan dan memberikan laporan lengkap. Harga juga sangat sebanding dengan kualitas layanan.',
      rating: 4,
    },
    {
      name: 'Siti Rahayu',
      role: 'Toko Online',
      content: 'Setelah website saya terinfeksi, penjualan menurun drastis. Berkat layanan mereka, website saya kembali aman dan pelanggan kembali berbelanja. Sangat merekomendasikan!',
      rating: 5,
    },
    {
      name: 'Joko Widodo',
      role: 'Pengusaha Digital',
      content: 'Layanan yang sangat profesional. Tim support sangat responsif dan pembersihan malware dilakukan dengan cepat tanpa mengganggu operasional website.',
      rating: 5,
    },
    {
      name: 'Ani Kusuma',
      role: 'Agensi Digital',
      content: 'Kami menggunakan layanan ini untuk beberapa klien kami yang terinfeksi malware. Hasilnya selalu memuaskan dan tepat waktu. Partner yang dapat diandalkan!',
      rating: 5,
    },
    {
      name: 'Rudi Hartono',
      role: 'Fotografer',
      content: 'Portfolio online saya terinfeksi dan menampilkan iklan spam. Dalam waktu singkat, website saya kembali bersih. Terima kasih atas layanan profesionalnya!',
      rating: 4,
    },
    {
      name: 'Maya Sari',
      role: 'Pemilik Startup',
      content: 'Ketika website startup kami terkena malware, kami panik. Untungnya kami menemukan layanan ini yang cepat dan efektif menyelesaikan masalah kami.',
      rating: 5,
    },
    {
      name: 'Dian Wahyu',
      role: 'Toko Dropship',
      content: 'Sebagai pemilik toko dropship, keamanan website sangat penting. Layanan pembersihan malware mereka sangat membantu menjaga kepercayaan pelanggan saya.',
      rating: 5,
    },
    {
      name: 'Irfan Hakim',
      role: 'Konsultan IT',
      content: 'Sebagai konsultan IT, saya menilai layanan mereka sangat teknis dan komprehensif. Laporan yang diberikan sangat detail dan solusi yang ditawarkan tepat sasaran.',
      rating: 5,
    },
  ];

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <Hero />
      
      {/* Malware Info Section */}
      <section className="py-16 md:py-24 bg-white" id="info">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Kenapa Malware Berbahaya?</h2>
            <p className="section-subtitle">
              Infeksi malware tidak hanya membahayakan website Anda, tetapi juga merusak reputasi dan bisnis Anda secara keseluruhan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kehilangan Data</h3>
              <p className="text-muted-foreground">
                Malware dapat mengakses, memodifikasi, atau menghapus data penting dari website dan database Anda.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                <UserCheck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kerusakan Reputasi</h3>
              <p className="text-muted-foreground">
                Google dapat mem-blacklist website Anda, membuat pengunjung mendapatkan peringatan bahaya saat mengakses situs Anda.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Penurunan Performa</h3>
              <p className="text-muted-foreground">
                Website menjadi lambat, tidak responsif, dan mengganggu pengalaman pengguna yang berdampak pada konversi.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50" id="layanan">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Pilih Paket Layanan Kami</h2>
            <p className="section-subtitle">
              Kami menawarkan berbagai paket layanan pembersihan malware yang disesuaikan dengan kebutuhan dan anggaran Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              id="basic"
              title="Paket Basic"
              price="Rp 150.000"
              description="Pembersihan malware dasar untuk website WordPress dengan infeksi ringan."
              features={basicFeatures}
              className="animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              onSelect={() => handleServiceSelect('basic')}
            />
            
            <ServiceCard
              id="advanced"
              title="Paket Advanced"
              price="Rp 350.000"
              description="Pembersihan malware menyeluruh dengan pengamanan dan optimasi."
              features={advancedFeatures}
              popular={true}
              className="animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              onSelect={() => handleServiceSelect('advanced')}
            />
            
            <ServiceCard
              id="premium"
              title="Paket Premium"
              price="Rp 750.000"
              description="Solusi keamanan komprehensif untuk website dengan infeksi berat atau e-commerce."
              features={premiumFeatures}
              className="animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              onSelect={() => handleServiceSelect('premium')}
            />
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white" id="proses">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Proses Pembersihan Malware</h2>
            <p className="section-subtitle">
              Kami mengikuti metodologi yang teliti dan sistematis untuk memastikan website Anda benar-benar bersih dan aman.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <ProcessStep
              number={1}
              title="Diagnosa Awal"
              description="Melakukan backup data dan analisis mendalam untuk mengidentifikasi jenis malware dan titik infeksi."
              icon={<File className="h-6 w-6 text-purple-600" />}
              style={{ animationDelay: '0.1s' }}
            />
            
            <ProcessStep
              number={2}
              title="Pembersihan"
              description="Menghapus semua malware dan file berbahaya dari website secara menyeluruh."
              icon={<Shield className="h-6 w-6 text-purple-600" />}
              style={{ animationDelay: '0.2s' }}
            />
            
            <ProcessStep
              number={3}
              title="Pengamanan"
              description="Meningkatkan keamanan website dengan security hardening dan update sistem."
              icon={<Lock className="h-6 w-6 text-purple-600" />}
              style={{ animationDelay: '0.3s' }}
            />
            
            <ProcessStep
              number={4}
              title="Pelaporan"
              description="Memberikan laporan lengkap dan rekomendasi untuk mencegah serangan di masa depan."
              icon={<BadgeCheck className="h-6 w-6 text-purple-600" />}
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Klien Kami Berkata</h2>
            <p className="section-subtitle">
              Lihat apa yang dikatakan pelanggan kami tentang layanan pembersihan malware kami.
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <TestimonialCard
                    {...testimonial}
                    style={{ animationDelay: `${0.1 * (index % 3 + 1)}s` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static transform-none bg-white hover:bg-primary hover:text-white" />
              <CarouselNext className="relative static transform-none bg-white hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Siap Bebaskan Website Anda dari Malware?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Dapatkan konsultasi gratis dan biarkan tim ahli kami membantu mengamankan website Anda hari ini juga.
          </p>
          <CTAButton to="/kontak" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Konsultasi Gratis Sekarang
          </CTAButton>
        </div>
      </section>

      {/* Service Checkout Modal */}
      {showCheckout && selectedService && (
        <ServiceCheckout
          selectedPlanId={selectedService}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
};

export default Index;
