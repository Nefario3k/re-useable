// global-functions.js
import { EventBus } from "@/event-bus.js";

export function showToast(content, duration = 3000) {
  EventBus.$emit("show-toast", {
    duration,
    content,
  });
}
