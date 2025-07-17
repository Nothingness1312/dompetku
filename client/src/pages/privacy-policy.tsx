import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Lock, AlertCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-lg text-muted-foreground">
            Memahami bagaimana DompetKu melindungi data dan privasi Anda
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                1. Penyimpanan Data Lokal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                DompetKu dirancang untuk beroperasi sepenuhnya secara offline. Semua data 
                keuangan Anda disimpan secara lokal di perangkat atau server pribadi Anda 
                menggunakan SQLite database. Tidak ada data yang dikirim ke server eksternal 
                atau pihak ketiga.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                2. Tidak Ada Akses Pihak Ketiga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Aplikasi ini tidak menggunakan API eksternal atau layanan cloud. Chart.js 
                dan jsPDF berjalan secara lokal tanpa mengirim data ke server manapun. 
                Privasi data Anda terjamin 100%.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                3. Tanggung Jawab Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Pengguna bertanggung jawab penuh atas keamanan data mereka. Pastikan untuk 
                melakukan backup data secara berkala dan menjaga keamanan perangkat Anda. 
                DompetKu tidak dapat memulihkan data yang hilang.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                4. Keamanan Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Data login dan transaksi dienkripsi menggunakan standard industri. Namun, 
                pengguna disarankan untuk menggunakan password yang kuat dan tidak membagikan 
                informasi akun kepada siapapun.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-primary">
                Penting untuk Diingat:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Data hanya tersimpan di perangkat Anda
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Tidak ada sinkronisasi cloud atau backup otomatis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Pengguna bertanggung jawab atas keamanan data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Aplikasi dapat digunakan tanpa koneksi internet
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Penggunaan Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Data yang Anda masukkan dalam aplikasi DompetKu hanya digunakan untuk:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Menampilkan statistik keuangan pribadi Anda
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Menghasilkan laporan dan grafik analisis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Melacak progress target tabungan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Mengekspor laporan dalam format PDF
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Perubahan Kebijakan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Kebijakan privasi ini dapat diperbarui sewaktu-waktu untuk mencerminkan 
                perubahan dalam aplikasi. Namun, prinsip utama kami untuk menjaga privasi 
                dan keamanan data lokal tidak akan berubah.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
