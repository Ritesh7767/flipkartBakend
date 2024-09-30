import * as zod from 'zod'

const cartValidate = zod.string().refine(id => id.length == 24)

export default cartValidate