
import { ArrowRight, Shield, Zap, Award, Sparkles, Lock, BadgeCheck } from 'lucide-react';
import CTAButton from './CTAButton';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-50 to-white">
      {/* Abstract background elements */}
      <div className="absolute -z-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl top-20 -right-48 animate-pulse-soft"></div>
      <div className="absolute -z-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative cosmic particles */}
      <div className="cosmic-particle absolute top-1/4 left-1/3" style={{ animationDelay: '0.2s' }}></div>
      <div className="cosmic-particle absolute top-1/3 right-1/4" style={{ animationDelay: '0.8s' }}></div>
      <div className="cosmic-particle absolute bottom-1/4 left-1/2" style={{ animationDelay: '1.5s' }}></div>
      <div className="cosmic-particle absolute top-2/3 right-1/3" style={{ animationDelay: '2.2s' }}></div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-purple-500 via-primary to-purple-700 text-white text-sm font-bold tracking-wide shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse-soft relative overflow-hidden group">
              <span className="relative z-10">#1 Jasa Remove Malware Terpercaya</span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Bebaskan Website Anda Dari <span className="text-purple-600">Malware</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Kami menghilangkan malware dan mengamankan website Anda dengan cepat, efektif, dan disertai garansi 90 hari.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CTAButton to="/kontak" size="lg" className="bg-gradient-to-r from-purple-600 to-purple-800 animate-glow">
                Konsultasi Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </CTAButton>
              <Button variant="outline" size="lg" asChild className="border-purple-300 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-300">
                <a href="#layanan">Lihat Layanan</a>
              </Button>
            </div>
            
            {/* Decorative element */}
            <div className="absolute top-40 left-10 text-purple-400/30 animate-float hidden lg:block">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative animate-fade-in-up">
            <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden glass-card p-6 md:p-8 backdrop-blur border border-purple-100">
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                Garansi 90 Hari
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-purple-50 flex items-start animate-slide-in-left group hover:bg-purple-100/80 transition-colors duration-300" style={{ animationDelay: '0.4s' }}>
                  <Shield className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-purple-900 transition-colors duration-300">Perlindungan Total</h3>
                    <p className="text-sm text-muted-foreground">Menghapus semua jenis malware dan memperkuat keamanan</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 flex items-start animate-slide-in-right group hover:bg-purple-100/80 transition-colors duration-300" style={{ animationDelay: '0.5s' }}>
                  <Zap className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-purple-900 transition-colors duration-300">Respon Cepat</h3>
                    <p className="text-sm text-muted-foreground">Penanganan dalam 24 jam dengan hasil maksimal</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 flex items-start animate-slide-in-left group hover:bg-purple-100/80 transition-colors duration-300" style={{ animationDelay: '0.6s' }}>
                  <Award className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-purple-900 transition-colors duration-300">Tim Berpengalaman</h3>
                    <p className="text-sm text-muted-foreground">Ditangani oleh ahli keamanan web profesional</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 flex items-start animate-slide-in-right group hover:bg-purple-100/80 transition-colors duration-300" style={{ animationDelay: '0.7s' }}>
                  <BadgeCheck className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-purple-900 transition-colors duration-300">Harga Bersaing</h3>
                    <p className="text-sm text-muted-foreground">Layanan premium dengan harga terjangkau</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl top-0 right-0 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute -z-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3"></div>
            
            {/* Additional decorative elements */}
            <div className="absolute bottom-12 right-8 text-purple-600/40 animate-float" style={{ animationDelay: '0.5s' }}>
              <Lock className="h-5 w-5" />
            </div>
            <div className="absolute top-8 left-12 text-purple-600/30 animate-float" style={{ animationDelay: '1.2s' }}>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
