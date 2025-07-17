import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  List, 
  TrendingUp, 
  TrendingDown, 
  Trash2, 
  Edit, 
  Utensils, 
  Car, 
  Gamepad2,
  Heart,
  ShoppingBag,
  Receipt,
  TrendingDownIcon,
  MoreHorizontal
} from "lucide-react";

const categoryIcons = {
  food: Utensils,
  salary: TrendingUp,
  transport: Car,
  entertainment: Gamepad2,
  health: Heart,
  shopping: ShoppingBag,
  bills: Receipt,
  investment: TrendingDownIcon,
  other: MoreHorizontal,
};

const categoryLabels = {
  food: "Makanan",
  salary: "Gaji",
  transport: "Transportasi",
  entertainment: "Hiburan",
  health: "Kesehatan",
  shopping: "Belanja",
  bills: "Tagihan",
  investment: "Investasi",
  other: "Lainnya",
};

export function TransactionList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showAll, setShowAll] = useState(false);

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const deleteTransaction = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Transaksi berhasil dihapus",
        description: "Data transaksi telah dihapus dari sistem",
      });
    },
    onError: () => {
      toast({
        title: "Gagal menghapus transaksi",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      });
    },
  });

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedTransactions = showAll 
    ? sortedTransactions 
    : sortedTransactions.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      deleteTransaction.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Transaksi Terbaru
          </CardTitle>
          {transactions.length > 5 && (
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="text-primary hover:text-primary"
            >
              {showAll ? "Sembunyikan" : "Lihat Semua"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {displayedTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Belum ada transaksi</p>
            <p className="text-sm">Tambahkan transaksi pertama Anda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedTransactions.map((transaction) => {
              const IconComponent = categoryIcons[transaction.category as keyof typeof categoryIcons] || MoreHorizontal;
              const amount = parseFloat(transaction.amount);
              
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income" 
                        ? "bg-secondary text-white" 
                        : "bg-destructive text-white"
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.description || categoryLabels[transaction.category as keyof typeof categoryLabels]}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[transaction.category as keyof typeof categoryLabels]}
                        </Badge>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      transaction.type === "income" 
                        ? "text-secondary" 
                        : "text-destructive"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(amount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
