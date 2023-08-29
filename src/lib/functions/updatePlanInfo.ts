import { planInformation } from "$lib/stores"

export default (data: Record<string, unknown>) => {
    if (!data) return

    for (const [key, value] of Object.entries(data)) {
        planInformation.update((current) => {
            return { ...current, [key]: value }
        })
    }
}