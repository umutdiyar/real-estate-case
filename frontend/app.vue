<script setup lang="ts">
import { LayoutDashboard, PlusCircle } from "lucide-vue-next";
</script>
<template>
  <div class="min-h-screen bg-slate-100">
    <div class="flex min-h-screen">
      <aside
        class="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col"
      >
        <NuxtLink to="/">
          <div class="border-b border-slate-200 px-6 py-6">
            <h1 class="text-lg font-semibold text-slate-900">
              Real Estate Case
            </h1>
            <p class="mt-1 text-sm text-slate-500">Transaction Operations</p>
          </div>
        </NuxtLink>

        <nav class="flex-1 space-y-2 px-4 py-6">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <LayoutDashboard class="h-4 w-4" />
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/transactions/new"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <PlusCircle class="h-4 w-4" />
            New Transaction
          </NuxtLink>
        </nav>
      </aside>

      <div class="flex min-h-screen flex-1 flex-col">
        <header class="border-b border-slate-200 bg-white">
          <div
            class="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4"
          >
            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Transaction Management Dashboard
              </h2>
              <p class="text-sm text-slate-500">
                Track lifecycle stages and commission-driven operations
              </p>
            </div>

            <NuxtLink
              to="/transactions/new"
              class="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              + New Transaction
            </NuxtLink>
          </div>
        </header>

        <main class="mx-auto w-full max-w-[1600px] flex-1 px-8 py-8">
          <NuxtPage />
        </main>
        <ToastMessage />
      </div>
    </div>
  </div>
</template>
