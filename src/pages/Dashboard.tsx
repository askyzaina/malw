import { useState, useEffect } from 'react';
import { Shield, Clock, BarChart, Settings, AlertCircle, CheckCircle, FileText, ArrowUpRight, Table, Server, FileCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardStat from '@/components/DashboardStat';
import DashboardChart from '@/components/DashboardChart';
import WebsiteSecurityScore from '@/components/WebsiteSecurityScore';
import MalwareScanStatus from '@/components/MalwareScanStatus';
import ServiceSummaryTable, { ServiceItem } from '@/components/ServiceSummaryTable';
import { useAuth } from '@/context/AuthContext';

type ScanStatus = 'clean' | 'threats-found' | 'in-progress';

interface RecentScan {
  date: string;
  status: ScanStatus;
  threats: number;
  duration: string;
}

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    securityScore: 87,
    threatsBlocked: 142,
    issuesResolved: 3,
    daysProtected: 15
  });

  const serviceItems: ServiceItem[] = [
    {
      id: 1,
      description: "Pembersihan Malware Website",
      quantity: "14 website",
      unitPrice: 250000,
      subtotal: 3500000
    },
    {
      id: 2,
      description: "Pengecekan Sistem cPanel",
      quantity: "1 layanan",
      unitPrice: 150000,
      subtotal: 150000
    },
    {
      id: 3,
      description: "Setup Server VPS Baru",
      quantity: "2 layanan",
      unitPrice: 300000,
      subtotal: 600000
    }
  ];

  const totalAmount = serviceItems.reduce((total, item) => total + item.subtotal, 0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const securityIssues = [
    {
      title: 'Plugin Vulnerabilities',
      description: 'Outdated plugins contain known security vulnerabilities',
      severity: 'high',
      status: 'resolved'
    },
    {
      title: 'Admin Password Strength',
      description: 'Admin password should be strengthened',
      severity: 'medium',
      status: 'pending'
    },
    {
      title: 'Login Security',
      description: 'Two-factor authentication recommended',
      severity: 'medium',
      status: 'pending'
    }
  ];

  const recentScans: RecentScan[] = [
    {
      date: '2023-06-12',
      status: 'clean',
      threats: 0,
      duration: '2m 43s'
    },
    {
      date: '2023-06-05',
      status: 'threats-found',
      threats: 3,
      duration: '3m 12s'
    },
    {
      date: '2023-05-29',
      status: 'clean',
      threats: 0,
      duration: '2m 51s'
    }
  ];

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative py-12 bg-gradient-to-br from-purple-900/10 to-background">
        <div className="absolute inset-0 bg-dark-pattern opacity-5"></div>
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Website Security Dashboard</h1>
              <p className="text-muted-foreground">
                Monitoring dan protecting your website dari serangan malware
              </p>
              {profile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selamat datang, {profile.full_name || 'Pengguna'}
                </p>
              )}
            </div>
            <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
              Mulai Scan Baru <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="grid place-items-center h-[60vh]">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-t-purple-600 border-r-purple-200 border-b-purple-200 border-l-purple-200 animate-spin"></div>
                <p className="text-lg font-medium">Memuat dashboard Anda...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up">
                <DashboardStat 
                  title="Security Score" 
                  value={`${stats.securityScore}%`} 
                  description="Skor keamanan website Anda" 
                  icon={<Shield className="text-purple-600" />}
                  trend="up"
                  trendValue="+12%"
                />
                <DashboardStat 
                  title="Threats Blocked" 
                  value={stats.threatsBlocked} 
                  description="Ancaman yang telah diblokir" 
                  icon={<AlertCircle className="text-purple-600" />}
                  trend="up"
                  trendValue="+3"
                />
                <DashboardStat 
                  title="Issues Resolved" 
                  value={stats.issuesResolved} 
                  description="Masalah yang telah diperbaiki" 
                  icon={<CheckCircle className="text-purple-600" />}
                  trend="up"
                  trendValue="+2"
                />
                <DashboardStat 
                  title="Days Protected" 
                  value={stats.daysProtected} 
                  description="Durasi perlindungan aktif" 
                  icon={<Clock className="text-purple-600" />}
                  trend="up"
                  trendValue="+15"
                />
              </div>

              <Card className="w-full mb-10 animate-fade-in-up elegant-card">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Layanan Aktif</span>
                    <Table className="h-5 w-5 text-purple-600" />
                  </CardTitle>
                  <CardDescription>
                    Rincian layanan yang Anda gunakan saat ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceSummaryTable items={serviceItems} total={totalAmount} />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    <FileCheck className="mr-2 h-4 w-4" /> Lihat Invoice
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Server className="mr-2 h-4 w-4" /> Kelola Layanan
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <Card className="col-span-1 animate-fade-in-up elegant-card" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Website Security Score</span>
                      <Shield className="h-5 w-5 text-purple-600" />
                    </CardTitle>
                    <CardDescription>
                      Penilaian keamanan website Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WebsiteSecurityScore score={stats.securityScore} />
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Breakdown by Category</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Keamanan File</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Plugin Safety</span>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Database Security</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Login Protection</span>
                            <span className="text-sm font-medium">96%</span>
                          </div>
                          <Progress value={96} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> View Detailed Report
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-1 animate-fade-in-up elegant-card" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Security Issues</span>
                      <AlertCircle className="h-5 w-5 text-purple-600" />
                    </CardTitle>
                    <CardDescription>
                      Masalah keamanan terdeteksi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securityIssues.map((issue, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-background flex items-start">
                          <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                            issue.severity === 'high' 
                              ? 'bg-red-500' 
                              : issue.severity === 'medium' 
                                ? 'bg-orange-500' 
                                : 'bg-yellow-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{issue.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                issue.status === 'resolved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }`}>
                                {issue.status === 'resolved' ? 'Resolved' : 'Pending'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" /> Fix Security Issues
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-1 animate-fade-in-up elegant-card" style={{ animationDelay: '0.3s' }}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Recent Scans</span>
                      <Clock className="h-5 w-5 text-purple-600" />
                    </CardTitle>
                    <CardDescription>
                      Riwayat pemindaian terbaru
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentScans.map((scan, index) => (
                        <MalwareScanStatus 
                          key={index} 
                          date={scan.date} 
                          status={scan.status} 
                          threats={scan.threats} 
                          duration={scan.duration} 
                        />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Scan History
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="w-full mb-12 animate-fade-in-up elegant-card" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Security Analytics</span>
                    <BarChart className="h-5 w-5 text-purple-600" />
                  </CardTitle>
                  <CardDescription>
                    Analisis aktivitas keamanan 30 hari terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <DashboardChart />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button className="h-auto py-6 bg-purple-600 hover:bg-purple-700">
                  <div className="flex flex-col items-center">
                    <Shield className="h-6 w-6 mb-2" />
                    <span className="text-base font-medium">Run Full Security Scan</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-base font-medium">Download Security Report</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-6">
                  <div className="flex flex-col items-center">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-base font-medium">Configure Security Settings</span>
                  </div>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
