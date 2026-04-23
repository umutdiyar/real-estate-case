<template>
  <section class="space-y-6">
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">
          Transaction Details
        </h2>
        <p class="text-sm text-slate-500">
          Review lifecycle progress and financial distribution
        </p>
      </div>
      <NuxtLink to="/">
        <button
          class="text-slate-600 cursor-pointer mt-2 transition-all duration-300 ease-in-out hover:text-slate-900 hover:underline hover:-translate-x-1"
        >
          ← Go Back
        </button>
      </NuxtLink>
    </div>

    <div
      v-if="store.loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      Loading...
    </div>

    <div
      v-if="store.error"
      class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ store.error }}
    </div>

    <template v-else-if="store.selectedTransaction">
      <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div class="space-y-6">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 class="text-lg font-semibold text-slate-900">
              {{ store.selectedTransaction.title }}
            </h2>

            <p class="mt-2 text-sm text-slate-500">
              {{ store.selectedTransaction.propertyAddress }}
            </p>

            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p class="text-sm text-slate-500">Transaction Type</p>
                <p class="mt-1 font-medium capitalize text-slate-900">
                  {{ store.selectedTransaction.type }}
                </p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Service Fee</p>
                <p class="mt-1 font-medium text-slate-900">
                  {{
                    formatCurrency(store.selectedTransaction.totalServiceFee)
                  }}
                </p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Listing Agent</p>
                <p class="mt-1 font-medium text-slate-900">
                  {{ getAgentName(store.selectedTransaction.listingAgentId) }}
                </p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Selling Agent</p>
                <p class="mt-1 font-medium text-slate-900">
                  {{ getAgentName(store.selectedTransaction.sellingAgentId) }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-slate-900">Lifecycle</h3>
              <p class="text-sm text-slate-500">
                Current progress of the transaction
              </p>
            </div>

            <StageTimeline :current="store.selectedTransaction.stage" />
          </div>
        </div>

        <FinancialBreakdownCard
          v-if="store.selectedTransaction.commissionBreakdown"
          :transaction="store.selectedTransaction"
        />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useTransactionsStore } from "~/stores/transactions";
import type { TransactionAgentRef } from "~/types/transaction";

const route = useRoute();
const store = useTransactionsStore();
const id = route.params.id as string;

onMounted(async () => {
  await store.fetchTransactionById(id);
});

const getAgentName = (agent: string | TransactionAgentRef) => {
  if (typeof agent === "string") return agent;
  return agent?.fullName || "Unknown Agent";
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
</script>
