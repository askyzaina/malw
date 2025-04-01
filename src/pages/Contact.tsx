
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MessageSquare, Calendar } from 'lucide-react';
import ConsultationForm from '@/components/ConsultationForm';
import CTAButton from '@/components/CTAButton';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Telepon",
      description: "Hubungi kami langsung melalui telepon untuk konsultasi cepat",
      contact: "+62 812 3456 7890",
      action: {
        text: "Hubungi Sekarang",
        url: "tel:+6281234567890",
      }
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      description: "Kirim detail permasalahan Anda melalui email",
      contact: "info@securecleanse.com",
      action: {
        text: "Kirim Email",
        url: "mailto:info@securecleanse.com",
      }
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "WhatsApp",
      description: "Konsultasikan masalah website secara instan via WhatsApp",
      contact: "+62 812 3456 7890",
      action: {
        text: "Chat WhatsApp",
        url: "https://wa.me/6281234567890",
      }
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Jadwalkan Konsultasi",
      description: "Atur jadwal konsultasi dengan tim ahli kami",
      contact: "Pilih waktu yang tersedia",
      action: {
        text: "Atur Jadwal",
        url: "#consultation-form",
      }
    },
  ];

  const faqs = [
    {
      question: "Berapa lama proses pembersihan malware?",
      answer: "Waktu yang diperlukan bervariasi tergantung tingkat keparahan infeksi dan kompleksitas website. Secara umum, proses pembersihan membutuhkan waktu 24-48 jam untuk sebagian besar kasus."
    },
    {
      question: "Apakah website tetap online selama proses pembersihan?",
      answer: "Ya, kami melakukan pembersihan tanpa mengganggu operasional website. Website Anda tetap online dan dapat diakses selama proses pembersihan berlangsung."
    },
    {
      question: "Apakah ada garansi untuk layanan pembersihan malware?",
      answer: "Ya, kami memberikan garansi bebas malware selama periode tertentu setelah pembersihan. Garansi bervariasi tergantung paket layanan yang Anda pilih, mulai dari 30 hingga 90 hari."
    },
    {
      question: "Bagaimana cara mengetahui website saya terinfeksi malware?",
      answer: "Tanda-tanda umum infeksi malware termasuk peringatan keamanan dari Google, website menjadi sangat lambat, munculnya konten atau iklan yang tidak diinginkan, redirect otomatis ke website lain, atau akses ke dashboard admin yang diblokir."
    },
    {
      question: "Apakah Anda mengamankan website setelah pembersihan?",
      answer: "Ya, setelah proses pembersihan, kami melakukan security hardening untuk memperkuat keamanan website Anda. Langkah ini meliputi pembaruan sistem, penambal kerentanan, dan implementasi praktik keamanan terbaik untuk mencegah infeksi di masa depan."
    },
    {
      question: "Jenis website apa saja yang dapat Anda tangani?",
      answer: "Kami menangani berbagai jenis website termasuk WordPress, Joomla, Drupal, Magento, dan platform lainnya. Layanan kami mencakup website corporate, e-commerce, blog, dan jenis website lainnya."
    }
  ];

  return (
    <div className={`page-transition pt-20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Konsultasikan masalah malware website Anda dengan tim ahli kami dan dapatkan solusi terbaik untuk mengamankan website Anda.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Methods */}
      <section className="py-12 md:py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 animate-fade-in-up" 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <p className="font-medium mb-6">{method.contact}</p>
                <CTAButton to={method.action.url} external={!method.action.url.startsWith('#')} variant="outline" size="sm">
                  {method.action.text}
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Consultation Form */}
      <section className="py-16 md:py-24 bg-gray-50" id="consultation-form">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Konsultasi Gratis</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Jelaskan masalah yang Anda alami pada website dan tim ahli kami akan menghubungi Anda dengan solusi terbaik.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Isi Formulir</h3>
                    <p className="text-muted-foreground">Lengkapi formulir dengan detail website dan permasalahan yang Anda alami</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Analisis Awal</h3>
                    <p className="text-muted-foreground">Tim kami akan melakukan analisis awal terhadap website Anda</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Solusi & Penawaran</h3>
                    <p className="text-muted-foreground">Kami akan menghubungi Anda dengan solusi dan penawaran yang sesuai</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pertanyaan Umum</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan pembersihan malware kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Siap Mengamankan Website Anda?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Jangan biarkan malware merusak bisnis online Anda. Hubungi kami sekarang untuk mendapatkan website yang bersih dan aman.
          </p>
          <CTAButton to="/kontak" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Konsultasi Gratis Sekarang
          </CTAButton>
        </div>
      </section>
    </div>
  );
};

export default Contact;
