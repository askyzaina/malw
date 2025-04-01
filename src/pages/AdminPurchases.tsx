
import React, { useState } from 'react';
import { usePurchase, Purchase } from '@/context/PurchaseContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Filter, 
  FileSearch, 
  ExternalLink, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Trash2,
  Edit,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const AdminPurchases = () => {
  const { getAllPurchases, updatePurchaseStatus, updatePurchaseDetails, deletePurchase } = usePurchase();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Purchase['status'] | 'all'>('all');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  
  let purchases = getAllPurchases();
  
  // Apply filters
  if (searchTerm) {
    purchases = purchases.filter(purchase => 
      purchase.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.website.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (filterStatus !== 'all') {
    purchases = purchases.filter(purchase => purchase.status === filterStatus);
  }
  
  const handleStatusChange = (purchaseId: string, newStatus: Purchase['status']) => {
    updatePurchaseStatus(purchaseId, newStatus);
    toast.success(`Status pesanan berhasil diubah ke "${newStatus}"`);
  };
  
  const handleDeletePurchase = (purchaseId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      deletePurchase(purchaseId);
      setSelectedPurchase(null);
      toast.success('Pesanan berhasil dihapus');
    }
  };
  
  const handleSaveNotes = () => {
    if (selectedPurchase) {
      updatePurchaseDetails(selectedPurchase.id, { notes: editNotes });
      setIsEditingNotes(false);
      toast.success('Catatan berhasil disimpan');
    }
  };
  
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
  
  const getStatusBadge = (status: Purchase['status']) => {
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
  
  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manajemen Pembelian</h1>
          <p className="text-muted-foreground">Kelola dan pantau semua pesanan layanan pembersihan malware</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setFilterStatus('all')}>
            Semua
          </Button>
          <Button 
            variant="outline" 
            className={filterStatus === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : ''}
            onClick={() => setFilterStatus('pending')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Pending
          </Button>
          <Button 
            variant="outline" 
            className={filterStatus === 'processing' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
            onClick={() => setFilterStatus('processing')}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Diproses
          </Button>
          <Button 
            variant="outline" 
            className={filterStatus === 'completed' ? 'bg-green-50 border-green-200 text-green-700' : ''}
            onClick={() => setFilterStatus('completed')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Selesai
          </Button>
          <Button 
            variant="outline" 
            className={filterStatus === 'cancelled' ? 'bg-red-50 border-red-200 text-red-700' : ''}
            onClick={() => setFilterStatus('cancelled')}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Dibatalkan
          </Button>
        </div>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari berdasarkan ID pesanan, nama, email, atau website..." 
            className="pl-10 pr-4" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map(purchase => (
            <Card key={purchase.id} className="border border-gray-200 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {purchase.orderId}
                    </CardTitle>
                    <CardDescription>{formatDate(purchase.createdAt)}</CardDescription>
                  </div>
                  {getStatusBadge(purchase.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium">{purchase.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pelanggan</span>
                    <span className="font-medium">{purchase.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <span className="font-medium truncate max-w-[180px]">{purchase.website}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harga</span>
                    <span className="font-medium">Rp {purchase.price.toLocaleString('id-ID')}</span>
                  </div>
                  {purchase.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dibayar</span>
                      <span className="font-medium text-green-600">{formatDate(purchase.paymentDate)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => {
                    setSelectedPurchase(purchase);
                    setEditNotes(purchase.notes || '');
                    setIsEditingNotes(false);
                  }}
                >
                  <FileSearch className="h-4 w-4 mr-1" />
                  Detail
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      Ubah Status
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Ubah Status Pesanan</SheetTitle>
                      <SheetDescription>
                        Pesanan: {purchase.orderId}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-4">
                        <Button 
                          className="w-full justify-start" 
                          variant={purchase.status === 'pending' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(purchase.id, 'pending')}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Pending
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={purchase.status === 'processing' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(purchase.id, 'processing')}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Diproses
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={purchase.status === 'completed' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(purchase.id, 'completed')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Selesai
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={purchase.status === 'cancelled' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(purchase.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Dibatalkan
                        </Button>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Tutup</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Tidak ada pesanan ditemukan</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'Tidak ada pesanan yang cocok dengan filter saat ini. Coba ubah kriteria pencarian Anda.'
              : 'Belum ada pesanan yang terdaftar dalam sistem. Pesanan baru akan muncul di sini.'}
          </p>
        </div>
      )}
      
      {/* Purchase Detail Modal */}
      {selectedPurchase && (
        <Sheet open={!!selectedPurchase} onOpenChange={() => setSelectedPurchase(null)}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Detail Pesanan</SheetTitle>
              <SheetDescription>
                {selectedPurchase.orderId} - {formatDate(selectedPurchase.createdAt)}
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Informasi Pesanan</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <div>{getStatusBadge(selectedPurchase.status)}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium">{selectedPurchase.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harga</span>
                    <span className="font-medium">Rp {selectedPurchase.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Metode Pembayaran</span>
                    <span className="font-medium">{selectedPurchase.paymentMethod === 'transfer' ? 'Transfer Bank' : 'E-Wallet'}</span>
                  </div>
                  {selectedPurchase.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tanggal Pembayaran</span>
                      <span className="font-medium text-green-600">{formatDate(selectedPurchase.paymentDate)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Informasi Pelanggan</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama</span>
                    <span className="font-medium">{selectedPurchase.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{selectedPurchase.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telepon</span>
                    <span className="font-medium">{selectedPurchase.customerPhone}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Informasi Website</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">URL</span>
                    <a 
                      href={selectedPurchase.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-primary flex items-center"
                    >
                      {selectedPurchase.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Catatan Admin</h3>
                  {!isEditingNotes ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => setIsEditingNotes(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-green-600"
                      onClick={handleSaveNotes}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {!isEditingNotes ? (
                  <p className="text-sm text-gray-600 min-h-[60px]">
                    {selectedPurchase.notes || "Belum ada catatan untuk pesanan ini."}
                  </p>
                ) : (
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Tambahkan catatan untuk pesanan ini..."
                    className="min-h-[100px]"
                  />
                )}
              </div>
            </div>
            <SheetFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <Button 
                variant="destructive" 
                onClick={() => handleDeletePurchase(selectedPurchase.id)}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Pesanan
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedPurchase(null)}
                >
                  Tutup
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      Ubah Status
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-auto">
                    <SheetHeader>
                      <SheetTitle>Ubah Status Pesanan</SheetTitle>
                      <SheetDescription>
                        Pesanan: {selectedPurchase.orderId}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button 
                          className="w-full justify-start" 
                          variant={selectedPurchase.status === 'pending' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(selectedPurchase.id, 'pending')}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Pending
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={selectedPurchase.status === 'processing' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(selectedPurchase.id, 'processing')}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Diproses
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={selectedPurchase.status === 'completed' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(selectedPurchase.id, 'completed')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Selesai
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          variant={selectedPurchase.status === 'cancelled' ? 'default' : 'outline'}
                          onClick={() => handleStatusChange(selectedPurchase.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Dibatalkan
                        </Button>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button>Tutup</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default AdminPurchases;
