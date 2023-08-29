import { PersonalInformationSchema, PlanSchema } from '$lib/validations/schemas.js'
import { fail } from '@sveltejs/kit'
import type { ZodIssue } from 'zod'

type RequestType = {
    request: Request
}

export const actions = {
    personalInfo: async ({ request }: RequestType) => {
        const formData = await request.formData()

        const personalInformation = {
            name: String(formData.get("name")),
            email: String(formData.get("email")),
            phone: String(formData.get("phone"))
        }

        const safeParse = PersonalInformationSchema.safeParse(personalInformation)

        if (!safeParse.success) {
            const issues: Record<string, string> = {}
            safeParse.error.issues.forEach((issue: ZodIssue) => {
                const issueKey = issue.path[0] as string;
                issues[issueKey] = issue.message;
            })
            return fail(400, { issues })
        }

        return { success: true }
    },
    plan: async ({ request }: RequestType) => {
        const formData = await request.formData()
        const selectedPlan = formData.get("plan")
        const yearlyPlan = formData.get("yearly")

        const safeParse = PlanSchema.safeParse(selectedPlan)

        if (!safeParse.success) {
            return fail(400, {
                issues: {
                    message: "You must select a option between Arcade, Advanced or Pro"
                }
            })
        }

        return {
            success: true,
            data: {
                plan: selectedPlan,
                yearlyInterval: yearlyPlan ? true : false
            }
        }
    },
    addons: async ({ request }: RequestType) => {
        const formData = await request.formData()
        const addOns: string[] = []
        formData.forEach((_, addon) => {
            addOns.push(addon)
        })

        return {
            success: true,
            data: {
                addOns
            }
        }
    },
    finish: async () => {
        return {
            success: true
        }
    }
}