<script setup lang="ts">
defineProps<{
  totalTransactions: number;
  completedCount: number;
  totalVolume: number;
}>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-sm text-slate-500">Toplam İşlem Sayısı</p>
      <p class="mt-2 text-2xl font-semibold text-slate-900">
        {{ totalTransactions }}
      </p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-sm text-slate-500">Tamamlanan İşlem Sayısı</p>
      <p class="mt-2 text-2xl font-semibold text-slate-900">
        {{ completedCount }}
      </p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-sm text-slate-500">Toplam Hizmet Tutarı</p>
      <p class="mt-2 text-2xl font-semibold text-slate-900">
        {{ formatCurrency(totalVolume) }}
      </p>
    </div>
  </div>
</template>
