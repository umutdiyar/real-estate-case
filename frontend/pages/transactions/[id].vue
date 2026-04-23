<template>
  <section class="space-y-4">
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">
          Transaction Details
        </h2>
        <p class="text-sm text-slate-500">
          Detailed transaction information and commission breakdown.
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

    <div v-if="store.loading" class="text-slate-500">Loading...</div>

    <div v-if="store.error" class="text-red-500">
      {{ store.error }}
    </div>

    <div v-if="store.selectedTransaction" class="space-y-6">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-slate-900">
          {{ store.selectedTransaction.title }}
        </h3>

        <p class="mt-2 text-sm text-slate-500">
          {{ store.selectedTransaction.propertyAddress }}
        </p>

        <div class="mt-4 text-sm text-slate-600">
          <div>
            Listing:
            {{ store.selectedTransaction.listingAgentId?.fullName }}
          </div>
          <div>
            Selling:
            {{ store.selectedTransaction.sellingAgentId?.fullName }}
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="mb-4 font-semibold text-lg text-slate-900">Lifecycle</h3>

        <StageTimeline :current="store.selectedTransaction.stage" />
      </div>

      <FinancialBreakdownCard
        v-if="store.selectedTransaction.commissionBreakdown"
        :breakdown="store.selectedTransaction.commissionBreakdown"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useTransactionsStore } from "~/stores/transactions";
import StageTimeline from "~/components/StageTimeline.vue";
import FinancialBreakdownCard from "~/components/FinancialBreakdownCard.vue";

const route = useRoute();
const store = useTransactionsStore();
const id = route.params.id as string;

onMounted(() => {
  store.fetchTransactionById(id);
});
</script>
