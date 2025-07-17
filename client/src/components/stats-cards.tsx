import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Transaction, UserSettings } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function StatsCards() {
  const queryClient = useQueryClient();
  
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: settings } = useQuery<UserSettings>({
    queryKey: ["/api/user-settings"],
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<UserSettings>) => {
      const response = await apiRequest("PUT", "/api/user-settings", newSettings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-settings"] });
    },
  });

  const isPrivacyMode = settings?.privacyMode || false;

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    if (isPrivacyMode) return "Rp •••••••••";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const togglePrivacyMode = () => {
    updateSettings.mutate({
      privacyMode: !isPrivacyMode,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-100">Total Saldo</h3>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePrivacyMode}
                  className="text-blue-200 hover:text-white hover:bg-blue-700/20 p-1"
                >
                  {isPrivacyMode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
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
              <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
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
              <p className="text-2xl font-bold">{formatCurrency(totalExpense)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
