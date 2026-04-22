<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <div>
          <h1 class="text-xl font-semibold text-slate-900">
            Gayrimenkul İşlemleri
          </h1>
          <p class="text-sm text-slate-500">İşlemler ve komisyon yönetimi</p>
        </div>

        <nav class="flex items-center gap-3">
          <NuxtLink to="/" class="rounded-lg px-4 py-2 text-sm">
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/transactions/new"
            class="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Yeni İşlem
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
