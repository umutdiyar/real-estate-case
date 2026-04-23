<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUiStore } from "~/stores/ui";

const uiStore = useUiStore();
const { toast } = storeToRefs(uiStore);
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
  >
    <div
      v-if="toast.visible"
      class="fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm font-medium shadow-lg"
      :class="
        toast.type === 'success'
          ? 'bg-emerald-600 text-white'
          : 'bg-red-600 text-white'
      "
    >
      {{ toast.message }}
    </div>
  </transition>
</template>
