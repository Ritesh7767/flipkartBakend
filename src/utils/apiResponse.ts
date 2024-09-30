interface apiResponseInterface {
    status: number,
    data: object,
    message?: string
}

class ApiResponse implements apiResponseInterface {

    status: number;
    data: object;
    message?: string | undefined;
    success: boolean

    constructor(status: number, data: object, message: string = "Task successfull"){
        this.status = status
        this.data = data
        this.message = message
        this.success = status < 400
    }
}

export default ApiResponse