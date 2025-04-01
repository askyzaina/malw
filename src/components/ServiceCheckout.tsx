
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { usePurchase } from '@/context/PurchaseContext';
import { useNavigate } from 'react-router-dom';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

interface ServiceCheckoutProps {
  selectedPlanId?: string;
  onClose: () => void;
}

const ServiceCheckout: React.FC<ServiceCheckoutProps> = ({ selectedPlanId, onClose }) => {
  const { addPurchase, updatePurchaseStatus, getAllPurchases } = usePurchase();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    paymentMethod: 'transfer',
    verificationCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  let planName = '';
  let planPrice = 0;

  // Map plan IDs to names and prices
  switch (selectedPlanId) {
    case 'basic':
      planName = 'Paket Basic';
      planPrice = 150000;
      break;
    case 'advanced':
      planName = 'Paket Advanced';
      planPrice = 350000;
      break;
    case 'premium':
      planName = 'Paket Premium';
      planPrice = 750000;
      break;
    default:
      planName = 'Paket Tidak Diketahui';
      planPrice = 0;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleVerificationCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, verificationCode: value }));
  };

  const validateFormData = () => {
    if (!formData.name.trim()) return 'Nama harus diisi';
    if (!formData.email.trim()) return 'Email harus diisi';
    if (!formData.email.includes('@')) return 'Email tidak valid';
    if (!formData.phone.trim()) return 'Nomor telepon harus diisi';
    if (!formData.website.trim()) return 'Alamat website harus diisi';
    return null;
  };

  const handleContinue = () => {
    const error = validateFormData();
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
      return;
    }
    setStep(2);
  };

  // Initial payment submission
  const handleSubmit = async () => {
    if (!selectedPlanId) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add purchase to context with pending status
      const purchase = addPurchase({
        planId: selectedPlanId,
        planName,
        price: planPrice,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        website: formData.website,
        paymentMethod: formData.paymentMethod,
        status: 'pending'
      });
      
      setOrderId(purchase.orderId);
      
      // Move to verification step
      setStep(3);
      
      toast({
        title: 'Pesanan Dibuat',
        description: 'Silakan lakukan pembayaran dan verifikasi.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat memproses pesanan Anda.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment verification step
  const handleVerifyPayment = async () => {
    if (formData.verificationCode.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Kode verifikasi harus 6 digit',
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Simulate verification API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update purchase status to completed
      if (orderId) {
        const purchases = getAllPurchases();
        const purchase = purchases.find(p => p.orderId === orderId);
        
        if (purchase) {
          updatePurchaseStatus(purchase.id, 'completed');
        }
      }
      
      setIsSuccess(true);
      
      toast({
        title: 'Pembayaran Berhasil!',
        description: 'Pembayaran Anda telah diverifikasi dan pesanan diproses.',
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan saat memverifikasi pembayaran.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate virtual account number based on payment method
  const getVirtualAccount = () => {
    if (formData.paymentMethod === 'transfer') {
      return '8277601234567890';
    } else {
      return '9388765432109876';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray-600 mb-6">
                  Terima kasih atas pesanan Anda. Kami akan segera memproses pembayaran dan menghubungi Anda.
                </p>
                <Button onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }} className="w-full">
                  Lihat Dashboard
                </Button>
              </div>
            ) : (
              <>
                <div className="flex mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                    <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                    <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-2">Detail Paket</h3>
                  <div className="flex justify-between items-center">
                    <span>{planName}</span>
                    <span className="font-bold">{formatCurrency(planPrice)}</span>
                  </div>
                </div>
                
                {step === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Masukkan nama lengkap Anda" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Masukkan email Anda" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="Masukkan nomor telepon Anda" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">Alamat Website</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        value={formData.website} 
                        onChange={handleInputChange} 
                        placeholder="https://example.com" 
                      />
                    </div>
                    
                    <Button onClick={handleContinue} className="w-full mt-4">
                      Lanjutkan ke Pembayaran
                    </Button>
                  </div>
                ) : step === 2 ? (
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Metode Pembayaran</Label>
                      <RadioGroup 
                        value={formData.paymentMethod} 
                        onValueChange={handlePaymentMethodChange}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="transfer" id="transfer" />
                          <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                            <div className="font-medium">Transfer Bank</div>
                            <div className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="ewallet" id="ewallet" />
                          <Label htmlFor="ewallet" className="flex-1 cursor-pointer">
                            <div className="font-medium">E-Wallet</div>
                            <div className="text-sm text-gray-500">OVO, GoPay, Dana, LinkAja</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)}
                      >
                        Kembali
                      </Button>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Memproses...' : 'Proses Pembayaran'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4 bg-primary/5">
                      <h3 className="font-medium mb-4 text-center">Instruksi Pembayaran</h3>
                      <div className="space-y-3">
                        <div className="text-center mb-4">
                          <div className="text-sm text-gray-600 mb-1">Virtual Account {formData.paymentMethod === 'transfer' ? 'Bank' : 'E-Wallet'}</div>
                          <div className="text-xl font-bold font-mono">{getVirtualAccount()}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Total Pembayaran</div>
                          <div className="text-xl font-bold text-primary">{formatCurrency(planPrice)}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                        <p className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                          Silakan lakukan pembayaran sesuai instruksi di atas. Setelah melakukan pembayaran, masukkan kode verifikasi yang diterima.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="verificationCode" className="mb-2 block">Kode Verifikasi Pembayaran</Label>
                      <div className="flex flex-col items-center space-y-4">
                        <InputOTP 
                          maxLength={6}
                          value={formData.verificationCode}
                          onChange={handleVerificationCodeChange}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} index={index} />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        *Untuk demo, masukkan 6 digit angka apapun
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleVerifyPayment} 
                      disabled={isVerifying || formData.verificationCode.length < 6}
                      className="w-full"
                    >
                      {isVerifying ? 'Memverifikasi...' : 'Verifikasi Pembayaran'}
                    </Button>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="link" 
                        onClick={() => setStep(2)}
                        className="text-sm"
                      >
                        Kembali ke metode pembayaran
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceCheckout;
