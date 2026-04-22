<script setup lang="ts">
import { onMounted } from "vue";
import { useTransactionsStore } from "../stores/transactions";
import DashboardStats from "~/components/DashboardStats.vue";
import TransactionTable from "~/components/TransactionTable.vue";

const transactionsStore = useTransactionsStore();

onMounted(async () => {
  await transactionsStore.fetchTransactions();
});
</script>

<template>
  <section class="space-y-6">
    <div
      class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">İşlemler</h2>
        <p class="text-sm text-slate-500">
          Yaşam döngüsü aşamalarını takip edin ve komisyon bazlı gayrimenkul
          işlemlerini yönetin.
        </p>
      </div>

      <NuxtLink
        to="/transactions/new"
        class="inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Yeni İşlem Oluştur
      </NuxtLink>
    </div>

    <DashboardStats
      :total-transactions="transactionsStore.transactions.length"
      :completed-count="transactionsStore.completedCount"
      :total-volume="transactionsStore.totalVolume"
    />

    <div
      v-if="transactionsStore.loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      İşlemler yükleniyor...
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
      <h3 class="text-lg font-semibold text-slate-900">İşlem bulunamadı!</h3>
      <p class="mt-2 text-sm text-slate-500">
        İlk işleminizi oluşturarak başlayın ve işlemlerini yönetin.
      </p>
    </div>

    <TransactionTable v-else :transactions="transactionsStore.transactions" />
  </section>
</template>
