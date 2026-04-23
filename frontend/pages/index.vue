<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTransactionsStore } from "../stores/transactions";
import TransactionTable from "~/components/transactions/TransactionTable.vue";

const transactionsStore = useTransactionsStore();

onMounted(async () => {
  await transactionsStore.fetchTransactions();
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const agreementCount = computed(
  () =>
    transactionsStore.transactions.filter((t) => t.stage === "agreement")
      .length,
);

const earnestMoneyCount = computed(
  () =>
    transactionsStore.transactions.filter((t) => t.stage === "earnest_money")
      .length,
);

const titleDeedCount = computed(
  () =>
    transactionsStore.transactions.filter((t) => t.stage === "title_deed")
      .length,
);

const completedCount = computed(
  () =>
    transactionsStore.transactions.filter((t) => t.stage === "completed")
      .length,
);

const inProgressCount = computed(
  () =>
    transactionsStore.transactions.filter((t) => t.stage !== "completed")
      .length,
);

const recentTransactions = computed(() =>
  transactionsStore.transactions.slice(0, 5),
);
</script>
<template>
  <section class="space-y-8">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="mt-1 text-sm text-slate-500">
        Tracking {{ transactionsStore.transactions.length }} transactions across
        lifecycle stages
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Transactions"
        :value="transactionsStore.transactions.length"
        description="All tracked records"
      />

      <StatsCard
        title="Completed Transactions"
        :value="completedCount"
        description="Transactions closed successfully"
      />

      <StatsCard
        title="In Progress"
        :value="inProgressCount"
        description="Transactions still moving through stages"
      />

      <StatsCard
        title="Total Service Volume"
        :value="formatCurrency(transactionsStore.totalVolume)"
        description="Sum of all service fees"
      />
    </div>

    <div
      v-if="transactionsStore.loading"
      class="text-center py-10 text-sm text-slate-500"
    >
      Loading dashboard data...
    </div>

    <div
      v-else-if="transactionsStore.error"
      class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ transactionsStore.error }}
    </div>

    <div
      v-else-if="transactionsStore.transactions.length === 0"
      class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
    >
      <h3 class="text-lg font-semibold text-slate-900">No transactions yet</h3>
      <p class="mt-2 text-sm text-slate-500">
        Create your first transaction to start tracking lifecycle and
        commissions.
      </p>
    </div>

    <template v-else>
      <div class="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <TransactionTable :transactions="transactionsStore.transactions" />

        <div class="space-y-6">
          <StageDistChart
            :agreement="agreementCount"
            :earnestMoney="earnestMoneyCount"
            :titleDeed="titleDeedCount"
            :completed="completedCount"
          />

          <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="mb-4">
              <h3 class="text-base font-semibold text-slate-900">
                Recent Transactions
              </h3>
              <p class="text-sm text-slate-500">
                Latest activity in the system
              </p>
            </div>

            <div class="space-y-3">
              <NuxtLink
                v-for="transaction in recentTransactions"
                :key="transaction._id"
                :to="`/transactions/${transaction._id}`"
                class="block rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="font-medium text-slate-900">
                      {{ transaction.title }}
                    </p>
                    <p class="mt-1 text-sm text-slate-500">
                      {{ transaction.propertyAddress }}
                    </p>
                  </div>

                  <StageBadge :stage="transaction.stage" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
