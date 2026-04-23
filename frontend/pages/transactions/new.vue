<template>
  <section class="space-y-16 w-[1200px] mx-auto">
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">New Transaction</h2>
        <p class="text-sm text-slate-500">Create a new transaction record.</p>
      </div>
      <NuxtLink to="/">
        <button
          class="text-slate-600 cursor-pointer mt-2 transition-all duration-300 ease-in-out hover:text-slate-900 hover:underline hover:-translate-x-1"
        >
          ← Go Back
        </button>
      </NuxtLink>
    </div>

    <TransactionForm />
  </section>
</template>
