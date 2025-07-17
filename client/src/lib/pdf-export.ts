import jsPDF from "jspdf";
import { Transaction } from "@shared/schema";

export function exportTransactionsToPDF(transactions: Transaction[], title: string = "Laporan Transaksi") {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  
  // Title
  doc.text(title, 20, 20);
  doc.text("DompetKu - Manajemen Keuangan Pribadi", 20, 30);
  
  // Date range
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Tanggal Export: ${new Date().toLocaleDateString("id-ID")}`, 20, 40);
  
  // Table headers
  const headers = ["Tanggal", "Jenis", "Kategori", "Deskripsi", "Jumlah"];
  const headerY = 55;
  
  doc.setFont("helvetica", "bold");
  doc.text("Tanggal", 20, headerY);
  doc.text("Jenis", 50, headerY);
  doc.text("Kategori", 80, headerY);
  doc.text("Deskripsi", 110, headerY);
  doc.text("Jumlah", 160, headerY);
  
  // Draw header line
  doc.line(20, headerY + 2, 190, headerY + 2);
  
  // Transaction data
  let yPos = headerY + 10;
  let totalIncome = 0;
  let totalExpense = 0;
  
  doc.setFont("helvetica", "normal");
  
  transactions.forEach((transaction) => {
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
    
    const date = new Date(transaction.date).toLocaleDateString("id-ID");
    const type = transaction.type === "income" ? "Masuk" : "Keluar";
    const amount = parseFloat(transaction.amount);
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
    
    if (transaction.type === "income") {
      totalIncome += amount;
    } else {
      totalExpense += amount;
    }
    
    doc.text(date, 20, yPos);
    doc.text(type, 50, yPos);
    doc.text(transaction.category, 80, yPos);
    doc.text(transaction.description || "-", 110, yPos);
    doc.text(formattedAmount, 160, yPos);
    
    yPos += 8;
  });
  
  // Summary
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  doc.setFont("helvetica", "bold");
  doc.text("RINGKASAN", 20, yPos);
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.text(`Total Pemasukan: ${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalIncome)}`, 20, yPos);
  yPos += 8;
  
  doc.text(`Total Pengeluaran: ${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalExpense)}`, 20, yPos);
  yPos += 8;
  
  doc.text(`Saldo Bersih: ${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalIncome - totalExpense)}`, 20, yPos);
  
  // Save the PDF
  doc.save(`${title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`);
}
