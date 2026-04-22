<script setup lang="ts">
import { useTransactionsStore } from "@/stores/transactions";
import type { Transaction, TransactionStage } from "~/types/transaction";

const props = defineProps<{
  transaction: Transaction;
}>();

const store = useTransactionsStore();

const nextStageMap: Record<string, TransactionStage | null> = {
  agreement: "earnest_money",
  earnest_money: "title_deed",
  title_deed: "completed",
  completed: null,
};

const nextStage = computed(() => nextStageMap[props.transaction.stage]);

const handleMove = async () => {
  if (!nextStage.value) return;
  await store.updateStage(props.transaction._id, nextStage.value);
};
</script>

<template>
  <button
    class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
    v-if="nextStage"
    @click="handleMove"
  >
    Şuraya git {{ nextStage.replace("_", " ") }}
  </button>

  <span v-else class="text-sm font-medium text-emerald-700"> Tamamlandı </span>
</template>
