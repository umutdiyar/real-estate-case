<script setup lang="ts">
import type {
  Transaction,
  TransactionAgentRef,
  TransactionStage,
} from "~/types/transaction";

defineProps<{
  transactions: Transaction[];
}>();

const store = useTransactionsStore();

const getAgentName = (agent: string | TransactionAgentRef) => {
  if (typeof agent === "string") return agent;
  return agent?.fullName || "Unknown Agent";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const nextStageMap: Record<string, TransactionStage | null> = {
  agreement: "earnest_money",
  earnest_money: "title_deed",
  title_deed: "completed",
  completed: null,
};

const nextStageLabelMap: Record<string, string> = {
  earnest_money: "Earnest Money",
  title_deed: "Title Deed",
  completed: "Completed",
};

const nextStageLabel = (stage: string) => {
  const next = nextStageMap[stage];
  if (!next) return "";
  return nextStageLabelMap[next];
};

const handleStageChange = async (transaction: Transaction) => {
  const nextStage = nextStageMap[transaction.stage];
  if (!nextStage) return;

  await store.updateStage(transaction._id, nextStage);
};
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th class="px-4 py-3">Property</th>
            <th class="px-4 py-3">Location</th>
            <th class="px-4 py-3">Stage</th>
            <th class="px-4 py-3">Service Fee</th>
            <th class="px-4 py-3">Agents</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction._id"
            class="border-t border-slate-100 hover:bg-slate-50 transition"
          >
            <td class="px-4 py-4">
              <div class="font-semibold text-slate-900">
                {{ transaction.title }}
              </div>
              <div class="mt-1 text-xs text-slate-500 capitalize">
                {{ transaction.type }}
              </div>
            </td>

            <td class="px-4 py-4 text-slate-600">
              {{ transaction.propertyAddress }}
            </td>

            <td class="px-4 py-4">
              <StageBadge :stage="transaction.stage" />
            </td>

            <td class="px-4 py-4 font-medium text-slate-800">
              {{ formatCurrency(transaction.totalServiceFee) }}
            </td>
            <td class="px-4 py-4 text-slate-600">
              <div>Listing: {{ getAgentName(transaction.listingAgentId) }}</div>
              <div class="mt-1">
                Selling: {{ getAgentName(transaction.sellingAgentId) }}
              </div>
            </td>

            <td class="px-4 py-4">
              <div class="flex flex-col items-center gap-2 text-center">
                <NuxtLink
                  :to="`/transactions/${transaction._id}`"
                  class="text-sm font-medium text-slate-800 transition hover:underline"
                >
                  View Details
                </NuxtLink>

                <button
                  v-if="transaction.stage !== 'completed'"
                  @click="handleStageChange(transaction)"
                  class="w-[160px] rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
                >
                  Move to {{ nextStageLabel(transaction.stage) }}
                </button>

                <span v-else class="text-xs font-semibold text-emerald-600">
                  Completed
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
