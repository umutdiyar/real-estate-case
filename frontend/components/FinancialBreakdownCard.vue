<script setup lang="ts">
import type { CommissionBreakdown } from "~/types/transaction";

defineProps<{
  breakdown: CommissionBreakdown;
}>();

const format = (value: number) => {
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div class="rounded-2xl border bg-white border-slate-200 p-6 shadow-sm">
    <h2 class="text-lg font-semibold text-slate-900">Komisyon Dağılımı</h2>

    <div class="mt-4 grid gap-4 md:grid-cols-3">
      <div>
        <p class="text-sm text-slate-500">Ajans</p>
        <p class="text-xl font-semibold text-slate-900">
          {{ format(breakdown.agencyAmount) }}
        </p>
      </div>

      <div>
        <p class="text-sm text-slate-500">Listele Temsilcisi</p>
        <p class="text-xl font-semibold text-slate-900">
          {{ format(breakdown.listingAgentAmount) }}
        </p>
      </div>

      <div>
        <p class="text-sm text-slate-500">Satış Temsilcisi</p>
        <p class="text-xl font-semibold text-slate-900">
          {{ format(breakdown.sellingAgentAmount) }}
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
      {{ breakdown.explanation }}
    </div>
  </div>
</template>
