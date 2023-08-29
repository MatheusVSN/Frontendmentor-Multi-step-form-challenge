export const YEARLY_MULTIPLY = 10

export const PLAN_PRICE: Record<string, number> = {
    arcade: 9,
    advanced: 12,
    pro: 15,
} as const

export const ADDONS_PRICE: Record<string, number> = {
    online: 1,
    storage: 2,
    customizable: 2,
} as const