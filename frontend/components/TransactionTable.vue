<script setup lang="ts">
import type { Transaction, TransactionAgentRef } from "~/types/transaction";

defineProps<{
  transactions: Transaction[];
}>();

const getAgentName = (agent: string | TransactionAgentRef) => {
  if (typeof agent === "string") return agent;
  return agent?.fullName || "Unknown Agent";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">Title</th>
            <th class="px-4 py-3 text-left font-semibold">Property Address</th>
            <th class="px-4 py-3 text-left font-semibold">Transaction Type</th>
            <th class="px-4 py-3 text-left font-semibold">Service Fee</th>
            <th class="px-4 py-3 text-left font-semibold">Listing Agent</th>
            <th class="px-4 py-3 text-left font-semibold">Selling Acent</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction._id"
            class="border-t border-slate-100 hover:bg-slate-50"
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

            <td class="px-4 py-4 text-slate-600">
              <div>Listing: {{ getAgentName(transaction.listingAgentId) }}</div>
              <div class="mt-1">
                Selling: {{ getAgentName(transaction.sellingAgentId) }}
              </div>
            </td>

            <td class="px-4 py-4 font-medium text-slate-800">
              {{ formatCurrency(transaction.totalServiceFee) }}
            </td>

            <td class="px-4 py-4">
              <div class="flex flex-col gap-2">
                <NuxtLink
                  :to="`/transactions/${transaction._id}`"
                  class="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details
                </NuxtLink>

                <StageAction :transaction="transaction" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
