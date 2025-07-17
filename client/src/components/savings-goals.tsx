import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SavingsGoal, insertSavingsGoalSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Target, Plus, Trash2, Edit, PlusCircle, MinusCircle } from "lucide-react";

const goalFormSchema = z.object({
  title: z.string().min(1, "Nama target harus diisi"),
  targetAmount: z.string().min(1, "Target jumlah harus diisi"),
  currentAmount: z.string().min(0, "Jumlah saat ini harus diisi"),
  deadline: z.date().optional(),
});

type GoalForm = z.infer<typeof goalFormSchema>;

export function SavingsGoals() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: goals = [] } = useQuery<SavingsGoal[]>({
    queryKey: ["/api/savings-goals"],
  });

  const form = useForm<GoalForm>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: new Date(),
    },
  });

  const editForm = useForm<GoalForm>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: new Date(),
    },
  });

  const createGoal = useMutation({
    mutationFn: async (data: GoalForm) => {
      const response = await apiRequest("POST", "/api/savings-goals", {
        ...data,
        targetAmount: parseFloat(data.targetAmount).toString(),
        currentAmount: parseFloat(data.currentAmount).toString(),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/savings-goals"] });
      toast({
        title: "Target tabungan berhasil ditambahkan",
        description: "Target baru telah disimpan",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Gagal menambahkan target",
        description: "Terjadi kesalahan saat menyimpan target",
        variant: "destructive",
      });
    },
  });

  const updateGoal = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<GoalForm> }) => {
      const response = await apiRequest("PUT", `/api/savings-goals/${id}`, {
        ...data,
        targetAmount: data.targetAmount ? parseFloat(data.targetAmount).toString() : undefined,
        currentAmount: data.currentAmount ? parseFloat(data.currentAmount).toString() : undefined,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/savings-goals"] });
      toast({
        title: "Target berhasil diperbarui",
        description: "Perubahan telah disimpan",
      });
      setIsEditDialogOpen(false);
      setEditingGoal(null);
    },
    onError: () => {
      toast({
        title: "Gagal memperbarui target",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive",
      });
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/savings-goals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/savings-goals"] });
      toast({
        title: "Target berhasil dihapus",
        description: "Target tabungan telah dihapus",
      });
    },
    onError: () => {
      toast({
        title: "Gagal menghapus target",
        description: "Terjadi kesalahan saat menghapus target",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GoalForm) => {
    createGoal.mutate(data);
  };

  const onEditSubmit = (data: GoalForm) => {
    if (editingGoal) {
      updateGoal.mutate({ id: editingGoal.id, data });
    }
  };

  const handleEdit = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    editForm.reset({
      title: goal.title,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      deadline: goal.deadline ? new Date(goal.deadline) : undefined,
    });
    setIsEditDialogOpen(true);
  };

  const addToSavings = (goal: SavingsGoal, amount: number) => {
    const newAmount = parseFloat(goal.currentAmount) + amount;
    updateGoal.mutate({ 
      id: goal.id, 
      data: { currentAmount: newAmount.toString() } 
    });
  };

  const subtractFromSavings = (goal: SavingsGoal, amount: number) => {
    const newAmount = Math.max(0, parseFloat(goal.currentAmount) - amount);
    updateGoal.mutate({ 
      id: goal.id, 
      data: { currentAmount: newAmount.toString() } 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus target ini?")) {
      deleteGoal.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Target Tabungan</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Target Baru
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Target Tabungan</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Target</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Laptop Gaming" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Jumlah</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Saat Ini</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createGoal.isPending}
                >
                  {createGoal.isPending ? "Menyimpan..." : "Simpan Target"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada target tabungan</p>
            <p className="text-sm text-muted-foreground">Buat target pertama Anda</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const current = parseFloat(goal.currentAmount);
            const target = parseFloat(goal.targetAmount);
            const progress = calculateProgress(current, target);
            
            return (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(current)}</span>
                      <span>{formatCurrency(target)}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Sisa: {formatCurrency(target - current)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const amount = prompt("Masukkan jumlah untuk ditambahkan:");
                            if (amount && !isNaN(Number(amount))) {
                              addToSavings(goal, Number(amount));
                            }
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const amount = prompt("Masukkan jumlah untuk dikurangi:");
                            if (amount && !isNaN(Number(amount))) {
                              subtractFromSavings(goal, Number(amount));
                            }
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Target Tabungan</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Target</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Laptop Gaming" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="targetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Jumlah</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="currentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Saat Ini</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={updateGoal.isPending}
              >
                {updateGoal.isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
