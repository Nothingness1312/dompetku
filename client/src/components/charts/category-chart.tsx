import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { PieChart } from "lucide-react";

Chart.register(...registerables);

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

const categoryColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#C9CBCF",
  "#4BC0C0",
];

export function CategoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Process expense data by category
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    const categoryData = new Map<string, number>();

    expenseTransactions.forEach(transaction => {
      const category = transaction.category;
      const amount = parseFloat(transaction.amount);
      categoryData.set(category, (categoryData.get(category) || 0) + amount);
    });

    const sortedCategories = Array.from(categoryData.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8); // Top 8 categories

    if (sortedCategories.length === 0) {
      // Show empty state
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
        ctx.fillStyle = "#6B7280";
        ctx.font = "14px Inter";
        ctx.textAlign = "center";
        ctx.fillText("Tidak ada data pengeluaran", chartRef.current.width / 2, chartRef.current.height / 2);
      }
      return;
    }

    const config: ChartConfiguration = {
      type: "doughnut",
      data: {
        labels: sortedCategories.map(([category]) => 
          categoryLabels[category as keyof typeof categoryLabels] || category
        ),
        datasets: [
          {
            data: sortedCategories.map(([, amount]) => amount),
            backgroundColor: categoryColors.slice(0, sortedCategories.length),
            borderColor: categoryColors.slice(0, sortedCategories.length),
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                return `${context.label}: ${new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value)}`;
              },
            },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(chartRef.current, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Kategori Pengeluaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
