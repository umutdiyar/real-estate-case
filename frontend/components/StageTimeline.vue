<script setup lang="ts">
import type { TransactionStage } from "~/types/transaction";

const props = defineProps<{
  current: TransactionStage;
}>();

const stages: TransactionStage[] = [
  "agreement",
  "earnest_money",
  "title_deed",
  "completed",
];

const isActive = (stage: TransactionStage) => {
  return stages.indexOf(stage) <= stages.indexOf(props.current);
};
</script>

<template>
  <div class="flex items-center gap-3">
    <div
      class="flex items-center gap-3"
      :key="stage"
      v-for="(stage, i) in stages"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
        :class="
          isActive(stage)
            ? 'bg-slate-900 text-white'
            : 'bg-slate-200 text-slate-500'
        "
      >
        {{ i + 1 }}
      </div>

      <span
        :class="isActive(stage) ? 'text-slate-900' : 'text-slate-400'"
        class="text-sm capitalize"
        >{{ stage.replace("_", " ") }}
      </span>

      <div
        class="w-8 h-[2px]"
        :class="isActive(stage) ? 'bg-slate-900' : 'bg-slate-200'"
        v-if="i < stages.length - 1"
      ></div>
    </div>
  </div>
</template>
