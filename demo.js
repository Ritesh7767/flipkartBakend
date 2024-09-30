// import * as zod from 'zod'
const zod = require("zod")

const number = zod.number().refine(num => {
    return num.toString().length === 10
}, {
    message: "contact number cannot be empty"
})

response = number.safeParse(7767823741)
// console.log(response.error.formErrors.fieldErrors)