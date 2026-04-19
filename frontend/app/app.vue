<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex items-center justify-between max-w-7xl px-6 py-4"
      >
        <div>
          <h1 class="text-xl font-semibold text-slate-900">
            Gayrimenkul İşlemleri
          </h1>
          <p class="text-sm text-slate-500">İşlemler ve komisyon yönetimi</p>
        </div>

        <nax class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Yeni İşlem
          </NuxtLink>
        </nax>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
