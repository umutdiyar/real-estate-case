<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  description?: string;
}>();
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p class="text-sm font-medium text-slate-500">
      {{ title }}
    </p>

    <p class="mt-3 text-2xl font-semibold text-slate-900">
      {{ value }}
    </p>

    <p v-if="description" class="mt-2 text-sm text-slate-400">
      {{ description }}
    </p>
  </div>
</template>
