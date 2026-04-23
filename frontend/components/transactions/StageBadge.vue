<script setup lang="ts">
defineProps<{
  stage: string;
}>();

const colorMap: Record<string, string> = {
  agreement: "bg-slate-200 text-slate-800",
  earnest_money: "bg-amber-100 text-amber-800",
  title_deed: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
};

const labelMap: Record<string, string> = {
  agreement: "Agreement",
  earnest_money: "Earnest Money",
  title_deed: "Title Deed",
  completed: "Completed",
};
</script>
<template>
  <span
    class="inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize"
    :class="colorMap[stage] || 'bg-slate-200 text-slate-800'"
  >
    {{ labelMap[stage] || stage }}
  </span>
</template>
