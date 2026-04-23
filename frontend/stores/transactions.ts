import { defineStore } from "pinia";
import type { Transaction, TransactionStage } from "~/types/transaction";
import { useUiStore } from "~/stores/ui";

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
      const uiStore = useUiStore();

      try {
        await request(`/transactions/${id}/stage`, {
          method: "PATCH",
          body: { stage },
        });

        await this.fetchTransactions();

        if (this.selectedTransaction?._id === id) {
          await this.fetchTransactionById(id);
        }

        uiStore.showToast("Transaction stage updated successfully", "success");
      } catch (error: any) {
        this.error = error?.data?.message || "Failed to update stage";
        uiStore.showToast("Failed to update transaction stage", "error");
      }
    },

    async createTransaction(payload: {
      title: string;
      propertyAddress: string;
      transactionType: "sale" | "rental";
      totalServiceFee: number;
      listingAgentId: string;
      sellingAgentId: string;
    }) {
      const { request } = useApi();

      await request("/transactions", {
        method: "POST",
        body: payload,
      });

      await this.fetchTransactions();
    },
  },
});
