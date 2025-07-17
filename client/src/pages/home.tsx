import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartLine, 
  Shield, 
  Target, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  FileText,
  Eye,
  Users,
  Phone,
  Mail
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kelola Keuangan Pribadi dengan{" "}
              <span className="text-yellow-300">DompetKu</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Aplikasi manajemen keuangan yang sepenuhnya offline, aman, dan privat. 
              Catat transaksi, analisis pengeluaran, dan capai target tabungan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4"
                >
                  Mulai Gratis
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Fitur Unggulan DompetKu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8">
              <CardContent className="pt-6">
                <ChartLine className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-4">Statistik Real-time</h3>
                <p className="text-muted-foreground">
                  Visualisasi data keuangan dengan grafik interaktif menggunakan Chart.js
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-4">100% Offline</h3>
                <p className="text-muted-foreground">
                  Data tersimpan lokal di perangkat Anda, tidak ada akses server eksternal
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-4">Target Tabungan</h3>
                <p className="text-muted-foreground">
                  Tetapkan dan lacak progress pencapaian target keuangan Anda
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Dashboard Keuangan
          </h2>
          
          {/* Statistics Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-blue-100">Total Saldo</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold">Rp 12.500.000</p>
                      <Eye className="h-4 w-4 text-blue-200" />
                    </div>
                  </div>
                  <Wallet className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-secondary to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-green-100">Pemasukan</h3>
                    <p className="text-2xl font-bold">Rp 15.000.000</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-destructive to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-red-100">Pengeluaran</h3>
                    <p className="text-2xl font-bold">Rp 2.500.000</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Manajemen Transaksi</h3>
                <p className="text-muted-foreground mb-4">
                  Tambah, edit, dan hapus transaksi dengan mudah. Kategorikan 
                  pengeluaran dan pemasukan untuk analisis yang lebih baik.
                </p>
                <div className="flex items-center text-sm text-primary">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Dukungan multiple kategori
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Export Laporan</h3>
                <p className="text-muted-foreground mb-4">
                  Ekspor data transaksi ke format PDF untuk dokumentasi 
                  dan analisis keuangan yang mendalam.
                </p>
                <div className="flex items-center text-sm text-primary">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF export dengan jsPDF
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Mulai Kelola Keuangan Anda Hari Ini
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan 
            mengelola keuangan secara offline dan aman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-8 py-4">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 py-4">
                Sudah Punya Akun?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">DompetKu</span>
              </div>
              <p className="text-gray-400">
                Aplikasi manajemen keuangan pribadi yang aman, privat, dan sepenuhnya offline.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Fitur Utama</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Manajemen Transaksi</li>
                <li>• Statistik & Grafik</li>
                <li>• Target Tabungan</li>
                <li>• Export PDF</li>
                <li>• Mode Privasi</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>Panduan Penggunaan</li>
                <li>FAQ</li>
                <li>Kontak</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DompetKu. Semua hak cipta dilindungi. Aplikasi offline untuk privasi maksimal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
