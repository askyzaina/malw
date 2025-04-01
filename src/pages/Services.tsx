
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import ServiceCard, { ServiceFeature } from '@/components/ServiceCard';
import ServiceCheckout from '@/components/ServiceCheckout';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  features: ServiceFeature[];
  popular?: boolean;
}

const ServicesPage = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const services: Service[] = [
    {
      id: 'basic',
      title: 'Paket Basic',
      price: 'Rp 150.000',
      description: 'Pembersihan malware dasar untuk website WordPress',
      features: [
        { text: 'Scanning malware menyeluruh', included: true },
        { text: 'Pembersihan infeksi tingkat dasar', included: true },
        { text: 'Laporan keamanan', included: true },
        { text: 'Perlindungan lanjutan', included: false },
        { text: 'Keamanan firewall', included: false },
        { text: 'Monitoring 24/7', included: false },
      ]
    },
    {
      id: 'advanced',
      title: 'Paket Advanced',
      price: 'Rp 350.000',
      description: 'Solusi lengkap untuk website dengan infeksi menengah',
      features: [
        { text: 'Scanning malware menyeluruh', included: true },
        { text: 'Pembersihan infeksi tingkat lanjut', included: true },
        { text: 'Laporan keamanan detail', included: true },
        { text: 'Optimasi performa', included: true },
        { text: 'Keamanan firewall', included: true },
        { text: 'Monitoring 24/7', included: false },
      ],
      popular: true
    },
    {
      id: 'premium',
      title: 'Paket Premium',
      price: 'Rp 750.000',
      description: 'Solusi keamanan terlengkap untuk infeksi kompleks',
      features: [
        { text: 'Scanning malware menyeluruh', included: true },
        { text: 'Pembersihan infeksi tingkat lanjut', included: true },
        { text: 'Laporan keamanan detail', included: true },
        { text: 'Optimasi performa', included: true },
        { text: 'Keamanan firewall', included: true },
        { text: 'Monitoring 24/7', included: true },
      ]
    },
  ];

  const handleSelectPlan = (id: string) => {
    setSelectedPlanId(id);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Layanan Pembersihan Malware
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Pilih paket yang sesuai dengan kebutuhan website Anda untuk mendapatkan perlindungan maksimal dari ancaman malware.
            </p>
            <div className="inline-flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-100 text-green-800">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm font-medium">Semua paket dilengkapi dengan garansi kepuasan</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: services.indexOf(service) * 0.1 }}
              >
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  price={service.price}
                  description={service.description}
                  features={service.features}
                  popular={service.popular}
                  onSelect={handleSelectPlan}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Mengapa Memilih Layanan Kami?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Ahli Berpengalaman</h4>
                  <p className="text-sm text-gray-600">Tim kami terdiri dari ahli keamanan website dengan pengalaman lebih dari 10 tahun</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Proses Cepat</h4>
                  <p className="text-sm text-gray-600">Pembersihan malware dilakukan dalam waktu 24-48 jam untuk keamanan website Anda</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Hasil Permanen</h4>
                  <p className="text-sm text-gray-600">Kami membersihkan malware hingga ke akar masalah untuk hasil permanen</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Garansi Jaminan</h4>
                  <p className="text-sm text-gray-600">Semua paket didukung dengan garansi kepuasan hingga 90 hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {showCheckout && (
        <ServiceCheckout 
          selectedPlanId={selectedPlanId || undefined} 
          onClose={handleCloseCheckout} 
        />
      )}
    </>
  );
};

export default ServicesPage;
