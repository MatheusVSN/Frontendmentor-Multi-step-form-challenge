import { writable } from "svelte/store"

export const yearlyPlan = writable(false)
export const planInformation = writable({
    yearlyInterval: false,
    plan: "arcade" as "arcade" | "advanced" | "pro",
    addOns: []
})