interface apiErrorInterface {
    status: number,
    message: string,
    data?: string,
    errors?: string[]
}

class ApiError extends Error implements apiErrorInterface {
    status: number
    message: string
    data: string | undefined
    errors: string[] | undefined
    success: boolean

    constructor(status: number, message: string, data: string = "", error: string[] = [], stack: string = ""){
        super(message)
        this.status = status
        this.message = message
        this.data = data
        this.errors = error
        this.success = false

        if(stack) this.stack = stack
        else Error.captureStackTrace(this, this.constructor)

    }
}

export default ApiError
