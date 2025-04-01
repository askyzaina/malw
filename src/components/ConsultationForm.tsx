
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ConsultationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Pesan konsultasi berhasil dikirim! Tim kami akan menghubungi Anda segera.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        service: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6 md:p-8 rounded-xl animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Masukkan alamat email"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Nomor Telepon
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Masukkan nomor telepon"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            URL Website <span className="text-red-500">*</span>
          </label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            placeholder="https://example.com"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="service" className="text-sm font-medium">
            Pilih Layanan
          </label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih layanan yang diinginkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Paket Basic</SelectItem>
              <SelectItem value="advanced">Paket Advanced</SelectItem>
              <SelectItem value="premium">Paket Premium</SelectItem>
              <SelectItem value="custom">Konsultasi Khusus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Deskripsi Masalah <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Jelaskan masalah yang Anda alami pada website"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full md:w-auto px-8" disabled={isSubmitting}>
        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
      </Button>
    </form>
  );
};

export default ConsultationForm;
