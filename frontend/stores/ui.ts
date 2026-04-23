import { defineStore } from "pinia";

type ToastType = "success" | "error";

export const useUiStore = defineStore("ui", {
  state: () => ({
    toast: {
      visible: false,
      message: "",
      type: "succes" as ToastType,
    },
  }),

  actions: {
    showToast(message: string, type: ToastType = "success") {
      this.toast.visible = true;
      this.toast.message = message;
      this.toast.type = type;

      setTimeout(() => {
        this.hideToast();
      }, 2500);
    },

    hideToast() {
      this.toast.visible = false;
      this.toast.message = "";
    },
  },
});
