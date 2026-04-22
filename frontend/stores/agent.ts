import { defineStore } from "pinia";
import type { Agent } from "../types/agent";

export const useAgentsStore = defineStore("agents", {
  state: () => ({
    agents: [] as Agent[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAgents() {
      const { request } = useApi();
      this.loading = true;
      this.error = null;

      try {
        this.agents = await request<Agent[]>("/agents");
      } catch (error: any) {
        this.error = error?.data?.message || "Failed to fetch agents";
      } finally {
        this.loading = false;
      }
    },
  },
});
