<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTransactionsStore } from "~/stores/transactions";
import { useAgentsStore } from "~/stores/agents";
import { useRouter } from "vue-router";
import { useUiStore } from "~/stores/ui";

const uiStore = useUiStore();

const txStore = useTransactionsStore();
const agentStore = useAgentsStore();
const router = useRouter();

const form = ref({
  title: "",
  propertyAddress: "",
  transactionType: "sale" as "sale" | "rental",
  totalServiceFee: 0,
  listingAgentId: "",
  sellingAgentId: "",
});

const loading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  agentStore.fetchAgents();
});

const validate = () => {
  if (!form.value.title) return "Title is required";
  if (!form.value.propertyAddress) return "Property address is required";
  if (!form.value.listingAgentId) return "Listing agent is required";
  if (!form.value.sellingAgentId) return "Selling agent is required";
  if (form.value.totalServiceFee <= 0) return "Fee must be greater than 0";
  return null;
};

const handleSubmit = async () => {
  error.value = null;

  const validationError = validate();
  console.log("PAYLOAD:", form.value);

  if (validationError) {
    error.value = validationError;
    return;
  }

  try {
    loading.value = true;
    await txStore.createTransaction(form.value);
    uiStore.showToast("Transaction created successfully", "success");
    router.push("/");
  } catch {
    error.value = "Failed to create transaction";
    uiStore.showToast("Failed to create transaction", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-slate-900">Create Transaction</h3>

    <!-- Title -->
    <input
      v-model="form.title"
      placeholder="Transaction title"
      class="w-full rounded-lg border px-3 py-2"
    />

    <!-- Address -->
    <input
      v-model="form.propertyAddress"
      placeholder="Property address"
      class="w-full rounded-lg border px-3 py-2"
    />

    <!-- Type -->
    <select
      v-model="form.transactionType"
      class="w-full rounded-lg border px-3 py-2"
    >
      <option value="sale">Sale</option>
      <option value="rental">Rental</option>
    </select>

    <!-- Fee -->
    <input
      type="number"
      v-model.number="form.totalServiceFee"
      placeholder="Service fee"
      class="w-full rounded-lg border px-3 py-2"
    />

    <!-- Listing Agent -->
    <select
      v-model="form.listingAgentId"
      class="w-full rounded-lg border px-3 py-2"
    >
      <option value="">Select listing agent</option>
      <option v-for="a in agentStore.agents" :key="a._id" :value="a._id">
        {{ a.fullName }}
      </option>
    </select>

    <!-- Selling Agent -->
    <select
      v-model="form.sellingAgentId"
      class="w-full rounded-lg border px-3 py-2"
    >
      <option value="">Select selling agent</option>
      <option v-for="a in agentStore.agents" :key="a._id" :value="a._id">
        {{ a.fullName }}
      </option>
    </select>

    <!-- Error -->
    <div v-if="error" class="text-sm text-red-500">
      {{ error }}
    </div>

    <!-- Button -->
    <button
      class="w-full rounded-lg bg-slate-900 py-2 text-white"
      :disabled="loading"
    >
      {{ loading ? "Creating..." : "Create Transaction" }}
    </button>
  </form>
</template>
