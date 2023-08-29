import { z } from "zod"

export const PersonalInformationSchema = z.object({
    name: z.string().min(1, "This field is required"),
    email: z.string().email("Please insert a valid email").min(1, "This field is required"),
    phone: z.string().min(1, "This field is required")
})

export const PlanSchema = z.union([
    z.literal("arcade"),
    z.literal("advanced"),
    z.literal("pro")
])