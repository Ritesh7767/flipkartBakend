import * as zod from 'zod'

export const userNumber = zod.number().refine(num => {
    return num.toString().length === 10
})

export const userProfile = zod.object({
    email: zod.string().email(),
    gender: zod.enum(["Male", "Female", "Other"])
})

export const panCardValidation = zod.object({
    panNumber: zod.number().min(10).max(10, "Pancard number cannot be empty"),
    fullname: zod.string().min(1, "Name cannot be empty"),
    panImage: zod.string().url()
})



