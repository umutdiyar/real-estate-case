import { defineStore } from "pinia";

export const useAgentsStore = defineStore("agents", {
  state: () => ({
    agents: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchAgents() {
      const { request } = useApi();

      this.loading = true;

      try {
        this.agents = await request("/agents");
      } finally {
        this.loading = false;
      }
    },
  },
});
