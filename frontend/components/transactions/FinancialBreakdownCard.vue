<script setup lang="ts">
import { computed } from "vue";
import type { Transaction, TransactionAgentRef } from "~/types/transaction";

const props = defineProps<{
  transaction: Transaction;
}>();

const t = props.transaction;
const b = t.commissionBreakdown!;

const getAgent = (a: string | TransactionAgentRef) =>
  typeof a === "string" ? { _id: a, fullName: a } : a;

const listing = getAgent(t.listingAgentId);
const selling = getAgent(t.sellingAgentId);

const isSame = listing._id === selling._id;

const format = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);

const scenarioText = computed(() => {
  if (isSame) {
    return "The same agent handled both listing and selling. Therefore, the full agent share is allocated to a single agent.";
  }

  return "Two different agents are involved. The agent share is split equally between listing and selling agents.";
});
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
    <div>
      <h3 class="text-lg font-semibold">Commission Breakdown</h3>
      <p class="text-sm text-slate-500">
        Financial distribution based on business rules
      </p>
    </div>

    <!-- SUMMARY -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Total Fee</p>
        <p class="text-lg font-semibold">{{ format(t.totalServiceFee) }}</p>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Agency (50%)</p>
        <p class="text-lg font-semibold">{{ format(b.agencyAmount) }}</p>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Agent Pool (50%)</p>
        <p class="text-lg font-semibold">{{ format(b.totalAgentAmount) }}</p>
      </div>
    </div>

    <!-- LOGIC -->
    <div class="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
      {{ scenarioText }}
    </div>

    <!-- DISTRIBUTION -->
    <div class="space-y-3 text-sm">
      <div v-if="isSame">
        <p>
          <strong>{{ listing.fullName }}</strong> receives:
        </p>
        <p class="text-lg font-semibold">
          {{ format(b.totalAgentAmount) }}
        </p>
      </div>

      <div v-else>
        <p>
          Listing Agent: <strong>{{ listing.fullName }}</strong>
        </p>
        <p>{{ format(b.listingAgentAmount) }}</p>

        <p class="mt-2">
          Selling Agent: <strong>{{ selling.fullName }}</strong>
        </p>
        <p>{{ format(b.sellingAgentAmount) }}</p>
      </div>
    </div>

    <!-- EXPLANATION -->
    <div class="bg-blue-50 p-4 rounded-xl text-sm text-blue-900">
      {{ b.explanation }}
    </div>
  </div>
</template>
