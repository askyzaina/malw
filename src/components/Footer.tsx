
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">SecureCleanse</h3>
            <p className="text-muted-foreground mb-6">
              Layanan profesional pembersihan malware dan pengamanan website yang terpercaya dengan garansi hasil maksimal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-muted-foreground hover:text-primary transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/proses" className="text-muted-foreground hover:text-primary transition-colors">
                  Proses Kerja
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Layanan</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/layanan#basic" className="text-muted-foreground hover:text-primary transition-colors">
                  Paket Basic
                </Link>
              </li>
              <li>
                <Link to="/layanan#advanced" className="text-muted-foreground hover:text-primary transition-colors">
                  Paket Advanced
                </Link>
              </li>
              <li>
                <Link to="/layanan#premium" className="text-muted-foreground hover:text-primary transition-colors">
                  Paket Premium
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-muted-foreground hover:text-primary transition-colors">
                  Konsultasi Khusus
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="mr-3 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-3 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">info@securecleanse.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SecureCleanse. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
