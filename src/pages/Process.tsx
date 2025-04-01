
import { useState, useEffect } from 'react';
import { Search, Shield, Database, FileCheck, Clock, CheckCircle2, Zap, Users } from 'lucide-react';
import CTAButton from '@/components/CTAButton';

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const processSteps = [
    {
      id: 1,
      title: "Diagnosa Awal & Backup",
      icon: <Search className="h-8 w-8 text-white" />,
      description: "Proses pembersihan malware dimulai dengan diagnosa menyeluruh untuk mengidentifikasi jenis malware, lokasi, dan cakupan infeksi. Kami melakukan backup lengkap website Anda sebelum melakukan tindakan apapun untuk memastikan data Anda aman.",
      details: [
        "Backup lengkap file website dan database",
        "Pemindaian malware mendalam dengan alat eksklusif",
        "Identifikasi jenis malware dan titik infeksi",
        "Analisis log server untuk mendeteksi aktivitas mencurigakan",
        "Evaluasi kerentanan sistem dan plugin"
      ],
      bgColor: "bg-blue-600",
      delay: "0.1s"
    },
    {
      id: 2,
      title: "Pembersihan & Pemulihan",
      icon: <Shield className="h-8 w-8 text-white" />,
      description: "Setelah identifikasi, kami menghapus semua malware, kode berbahaya, dan backdoor dari website Anda. Proses ini meliputi pembersihan file, database, dan komponen website lainnya yang terinfeksi.",
      details: [
        "Penghapusan malware dari semua file website",
        "Pembersihan kode berbahaya dari database",
        "Penanganan redirects berbahaya dan spam links",
        "Penghapusan backdoor dan akses tidak sah",
        "Pembersihan infeksi PHP, JavaScript, dan HTML"
      ],
      bgColor: "bg-green-600",
      delay: "0.3s"
    },
    {
      id: 3,
      title: "Security Hardening",
      icon: <Database className="h-8 w-8 text-white" />,
      description: "Tahap ini berfokus pada penguatan keamanan website untuk mencegah infeksi di masa depan. Kami memperbarui sistem, menambal kerentanan, dan mengimplementasikan praktik keamanan terbaik.",
      details: [
        "Update CMS, plugin, dan tema ke versi terbaru",
        "Konfigurasi dan pengoptimalan file .htaccess",
        "Penguatan izin file dan folder",
        "Implementasi firewall aplikasi web",
        "Pengaturan keamanan database dan login"
      ],
      bgColor: "bg-purple-600",
      delay: "0.5s"
    },
    {
      id: 4,
      title: "Pelaporan & Garansi",
      icon: <FileCheck className="h-8 w-8 text-white" />,
      description: "Setelah proses pembersihan dan pengamanan selesai, kami memberikan laporan lengkap dan memberikan garansi untuk memastikan website Anda tetap bersih dan aman.",
      details: [
        "Laporan detail tentang malware yang ditemukan",
        "Dokumentasi tindakan yang telah dilakukan",
        "Rekomendasi keamanan lanjutan",
        "Garansi bebas malware selama 30-90 hari (sesuai paket)",
        "Panduan pencegahan untuk pemilik website"
      ],
      bgColor: "bg-orange-600",
      delay: "0.7s"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Penanganan Cepat",
      description: "Proses pembersihan dimulai dalam 24 jam setelah order dikonfirmasi."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Tingkat Keberhasilan Tinggi",
      description: "Tingkat keberhasilan 99% dalam menangani berbagai jenis malware."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Tanpa Downtime",
      description: "Website tetap online selama proses pembersihan berlangsung."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Perlindungan Jangka Panjang",
      description: "Solusi keamanan yang membantu mencegah infeksi di masa depan."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Dukungan Pasca Layanan",
      description: "Bantuan teknis tersedia selama masa garansi."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Backup Aman",
      description: "Backup lengkap sebelum pembersihan untuk keamanan data Anda."
    }
  ];

  return (
    <div className={`page-transition pt-20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Proses Pembersihan Malware
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Metodologi kami dirancang untuk memberikan pembersihan malware yang menyeluruh dan perlindungan jangka panjang untuk website Anda.
            </p>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <div key={step.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up`} style={{ animationDelay: step.delay }}>
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center mb-6">
                    <div className={`h-14 w-14 rounded-full ${step.bgColor} flex items-center justify-center mr-4`}>
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-bold">Tahap {step.id}: {step.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className={`p-8 rounded-2xl h-full ${step.bgColor} bg-opacity-10 border border-opacity-30 shadow-lg relative overflow-hidden`} style={{ borderColor: step.bgColor }}>
                    <div className="absolute top-0 right-0 bottom-0 left-0 opacity-5">
                      <div className={`absolute inset-0 ${step.bgColor}`}></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`text-7xl font-bold ${step.bgColor} text-opacity-20 mb-6`}>{step.id}</div>
                      <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                      <p className="mb-8 text-muted-foreground">{step.description}</p>
                      <div className={`inline-block px-4 py-2 rounded-full ${step.bgColor} text-white font-medium`}>
                        {step.id === 1 && "Durasi: 2-4 Jam"}
                        {step.id === 2 && "Durasi: 4-8 Jam"}
                        {step.id === 3 && "Durasi: 2-4 Jam"}
                        {step.id === 4 && "Durasi: 1-2 Jam"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Manfaat Layanan Kami</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dengan metodologi yang telah teruji, kami memberikan hasil maksimal dengan risiko minimal untuk website Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Siap Menghilangkan Malware dari Website Anda?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Konsultasikan masalah website Anda dengan tim ahli kami dan dapatkan solusi terbaik sesuai kebutuhan Anda.
          </p>
          <CTAButton to="/kontak" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Konsultasi Gratis Sekarang
          </CTAButton>
        </div>
      </section>
    </div>
  );
};

export default Process;
