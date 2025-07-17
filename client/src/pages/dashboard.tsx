import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { StatsCards } from "@/components/stats-cards";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { SavingsGoals } from "@/components/savings-goals";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { CategoryChart } from "@/components/charts/category-chart";
import { exportTransactionsToPDF } from "@/lib/pdf-export";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

export default function Dashboard() {
  const { data: auth, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    enabled: !!auth?.user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!auth?.user) {
    setLocation("/login");
    return null;
  }

  const handleExportThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startOfMonth && date <= endOfMonth;
    });
    
    exportTransactionsToPDF(monthlyTransactions, "Laporan Bulanan");
  };

  const handleExportAll = () => {
    exportTransactionsToPDF(transactions, "Laporan Semua Transaksi");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Selamat datang, {auth.user.fullName}!
          </h1>
          <p className="text-muted-foreground">
            Kelola keuangan pribadi Anda dengan mudah dan aman
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <IncomeExpenseChart />
          <CategoryChart />
        </div>

        {/* Transaction Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TransactionForm />
          <TransactionList />
        </div>

        {/* Savings Goals */}
        <div className="mb-8">
          <SavingsGoals />
        </div>

        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Export Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Ekspor data transaksi Anda ke format PDF untuk dokumentasi dan analisis
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleExportThisMonth} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Bulan Ini
              </Button>
              <Button variant="outline" onClick={handleExportAll} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export Semua Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
