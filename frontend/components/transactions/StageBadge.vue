<script setup lang="ts">
defineProps<{
  stage: string;
}>();

const colorMap: Record<string, string> = {
  agreement: "bg-slate-200 text-gray-700",
  earnest_money: "bg-yellow-100 text-yellow-800",
  title_deed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
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
    class="rounded-full px-2 py-1 text-xs font-medium"
    :class="colorMap[stage]"
  >
    {{ labelMap[stage] || stage }}
  </span>
</template>
