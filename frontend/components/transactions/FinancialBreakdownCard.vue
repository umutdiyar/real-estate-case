<script setup lang="ts">
import { computed } from "vue";
import type { Transaction, TransactionAgentRef } from "~/types/transaction";

const props = defineProps<{
  transaction: Transaction;
}>();

const transaction = props.transaction;
const breakdown = transaction.commissionBreakdown!;

const getAgent = (a: string | TransactionAgentRef) =>
  typeof a === "string" ? { _id: a, fullName: a } : a;

const listingAgent = getAgent(transaction.listingAgentId);
const sellingAgent = getAgent(transaction.sellingAgentId);

const isSameAgent = listingAgent._id === sellingAgent._id;

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);

const scenarioTitle = computed(() =>
  isSameAgent
    ? "Scenario 1 — Same Listing and Selling Agent"
    : "Scenario 2 — Different Listing and Selling Agents",
);

const scenarioDescription = computed(() =>
  isSameAgent
    ? "The same agent handled both the listing and selling sides of the transaction. According to the policy, the full agent pool is assigned to that single agent."
    : "Two different agents are involved in the transaction. According to the policy, the agent pool is split equally between the listing and selling agents.",
);
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
    <div>
      <h3 class="text-lg font-semibold">Commission Breakdown</h3>
      <p class="text-sm text-slate-500">
        Financial distribution based on the agency commission policy
      </p>
    </div>

    <!-- SUMMARY -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Total Service Fee</p>
        <p class="text-lg font-semibold">
          {{ formatCurrency(transaction.totalServiceFee) }}
        </p>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Agency (50%)</p>
        <p class="text-lg font-semibold">
          {{ formatCurrency(breakdown.agencyAmount) }}
        </p>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl">
        <p class="text-xs text-slate-500">Agent Pool (50%)</p>
        <p class="text-lg font-semibold">
          {{ formatCurrency(breakdown.totalAgentAmount) }}
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-2xl border border-slate-200 p-5">
      <h4 class="text-sm font-semibold text-slate-900">Applied Scenario</h4>
      <p class="mt-3 text-sm font-medium text-slate-800">
        {{ scenarioTitle }}
      </p>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        {{ scenarioDescription }}
      </p>
    </div>

    <div class="mt-6 rounded-2xl border border-slate-200 p-5">
      <h4 class="text-sm font-semibold text-slate-900">Final Distribution</h4>

      <div class="mt-4 space-y-4">
        <div
          class="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4"
        >
          <div>
            <p class="text-sm font-medium text-slate-900">Agency</p>
            <p class="mt-1 text-xs text-slate-500">
              Fixed company share from the total service fee
            </p>
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-500">50%</p>
            <p class="text-base font-semibold text-slate-900">
              {{ formatCurrency(breakdown.agencyAmount) }}
            </p>
          </div>
        </div>

        <template v-if="isSameAgent">
          <div
            class="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4"
          >
            <div>
              <p class="text-sm font-medium text-slate-900">
                {{ listingAgent.fullName }}
              </p>
              <p class="mt-1 text-xs text-slate-500">
                Same person acted as both listing and selling agent
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-slate-500">50%</p>
              <p class="text-base font-semibold text-slate-900">
                {{ formatCurrency(breakdown.totalAgentAmount) }}
              </p>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            class="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4"
          >
            <div>
              <p class="text-sm font-medium text-slate-900">
                {{ listingAgent.fullName }}
              </p>
              <p class="mt-1 text-xs text-slate-500">Listing agent share</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-slate-500">25%</p>
              <p class="text-base font-semibold text-slate-900">
                {{ formatCurrency(breakdown.listingAgentAmount) }}
              </p>
            </div>
          </div>

          <div
            class="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4"
          >
            <div>
              <p class="text-sm font-medium text-slate-900">
                {{ sellingAgent.fullName }}
              </p>
              <p class="mt-1 text-xs text-slate-500">Selling agent share</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-slate-500">25%</p>
              <p class="text-base font-semibold text-slate-900">
                {{ formatCurrency(breakdown.sellingAgentAmount) }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- EXPLANATION -->
    <div class="mt-6 rounded-xl bg-blue 50 p-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-blue-900">
        Calculation Note
      </p>
      <p class="mt-2 text-sm leading-6 text-blue-900">
        {{ breakdown.explanation }}
      </p>
    </div>
  </div>
</template>
