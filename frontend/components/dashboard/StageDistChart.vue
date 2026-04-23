<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// 🔥 KRİTİK: register etmezsen chart çıkmaz
ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  agreement: number;
  earnestMoney: number;
  titleDeed: number;
  completed: number;
}>();

const chartData = computed(() => ({
  labels: ["Agreement", "Earnest Money", "Title Deed", "Completed"],
  datasets: [
    {
      data: [
        props.agreement,
        props.earnestMoney,
        props.titleDeed,
        props.completed,
      ],
      backgroundColor: ["#cbd5f5", "#fde68a", "#93c5fd", "#86efac"],
      borderWidth: 0,
    },
  ],
}));

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};
</script>

<template>
  <div class="rounded-2xl border bg-white p-5 shadow-sm">
    <h3 class="text-base font-semibold">Stage Distribution</h3>

    <div class="h-[300px] mt-4">
      <ClientOnly>
        <Doughnut :data="chartData" :options="options" />
      </ClientOnly>
    </div>
  </div>
</template>
