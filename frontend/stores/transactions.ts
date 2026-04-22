import { defineStore } from "pinia";
import type { Transaction, TransactionStage } from "~/types/transaction";

export const useTransactionsStore = defineStore("transactions", {
  state: () => ({
    transactions: [] as Transaction[],
    selectedTransaction: null as Transaction | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    completedCount: (state) =>
      state.transactions.filter((t) => t.stage === "completed").length,

    totalVolume: (state) =>
      state.transactions.reduce((sum, t) => sum + t.totalServiceFee, 0),
  },

  actions: {
    async fetchTransactions() {
      const { request } = useApi();
      this.loading = true;
      this.error = null;

      try {
        this.transactions = await request<Transaction[]>("/transactions");
      } catch (error: any) {
        this.error = error?.data?.message || "İşlemler alınamadı!";
      } finally {
        this.loading = false;
      }
    },

    async fetchTransactionById(id: string) {
      const { request } = useApi();
      this.loading = true;
      this.error = null;

      try {
        this.selectedTransaction = await request<Transaction>(
          `/transactions/${id}`,
        );
      } catch (error: any) {
        this.error = error?.data?.message || "İşlemler alınamadı!";
      } finally {
        this.loading = false;
      }
    },

    async updateStage(id: string, stage: TransactionStage) {
      const { request } = useApi();

      try {
        await request(`/transactions/${id}/stage`, {
          method: "PATCH",
          body: { stage },
        });

        await this.fetchTransactions();
      } catch (error: any) {
        this.error = error?.data?.message || "Aşamalar güncellenemedi!";
      }
    },
  },
});
