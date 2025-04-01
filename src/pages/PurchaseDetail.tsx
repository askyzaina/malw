
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePurchase } from '@/context/PurchaseContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ExternalLink, Download, Clock, Check, FileText, Shield } from 'lucide-react';

const PurchaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPurchase } = usePurchase();
  
  const purchase = getPurchase(id || '');
  
  if (!purchase) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Pesanan tidak ditemukan</h1>
        <p className="text-muted-foreground mb-8">Maaf, pesanan yang Anda cari tidak ditemukan atau telah dihapus.</p>
        <Button onClick={() => navigate('/')}>Kembali ke Halaman Utama</Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Diproses</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">Tidak Diketahui</Badge>;
    }
  };
  
  const getStatusTimeline = (status: string) => {
    const steps = [
      { id: 'pending', label: 'Pesanan Diterima', icon: <Clock className="h-5 w-5" /> },
      { id: 'processing', label: 'Sedang Diproses', icon: <FileText className="h-5 w-5" /> },
      { id: 'completed', label: 'Selesai', icon: <Check className="h-5 w-5" /> }
    ];
    
    const currentIndex = steps.findIndex(step => step.id === status);
    if (status === 'cancelled') return [];
    
    return steps.map((step, index) => ({
      ...step,
      status: index < currentIndex ? 'completed' : (index === currentIndex ? 'current' : 'upcoming')
    }));
  };
  
  const timeline = getStatusTimeline(purchase.status);
  
  return (
    <div className="container mx-auto py-10 max-w-4xl px-4">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Detail Pesanan</CardTitle>
                  <CardDescription>
                    Tanggal Pembelian: {formatDate(purchase.createdAt)}
                  </CardDescription>
                </div>
                {getStatusBadge(purchase.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="bg-muted/30 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">ID Pesanan:</h3>
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {purchase.orderId}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">
                      {purchase.status === 'pending' && 'Menunggu Proses'}
                      {purchase.status === 'processing' && 'Sedang Diproses'}
                      {purchase.status === 'completed' && 'Selesai'}
                      {purchase.status === 'cancelled' && 'Dibatalkan'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium">{purchase.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <a 
                      href={purchase.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-primary flex items-center"
                    >
                      {purchase.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Metode Pembayaran</span>
                    <span className="font-medium capitalize">{purchase.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              {timeline.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Status Pesanan</h3>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-muted" />
                    
                    {/* Timeline steps */}
                    <ol className="relative space-y-6">
                      {timeline.map((step, index) => (
                        <li key={step.id} className="flex items-start">
                          <div 
                            className={`z-10 flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 
                              ${step.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                step.status === 'current' ? 'bg-blue-100 text-blue-600' : 
                                'bg-gray-100 text-gray-400'}`}
                          >
                            {step.icon}
                          </div>
                          <div className="ml-4">
                            <h4 className={`font-medium
                              ${step.status === 'completed' ? 'text-green-600' : 
                                step.status === 'current' ? 'text-blue-600' : 
                                'text-gray-500'}`}>
                              {step.label}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.status === 'completed' && 'Selesai'}
                              {step.status === 'current' && 'Sedang berlangsung'}
                              {step.status === 'upcoming' && 'Menunggu'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold mb-4">Informasi Pelanggan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium">{purchase.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{purchase.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium">{purchase.customerPhone || '-'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {purchase.status === 'completed' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Laporan Hasil</CardTitle>
                <CardDescription>
                  Laporan hasil pembersihan malware website Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center border-2 border-dashed rounded-lg">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-3" />
                  <h3 className="font-medium mb-2">Laporan Pembersihan</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Laporan hasil pembersihan malware untuk website Anda
                  </p>
                  <Button variant="outline" className="mx-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Unduh Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rp {purchase.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PPN (0%)</span>
                  <span>Rp 0</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg text-primary">Rp {purchase.price.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Unduh Invoice
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Tim Layanan Pelanggan</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tim kami siap membantu jika Anda memiliki pertanyaan terkait pesanan.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Hubungi Kami
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
