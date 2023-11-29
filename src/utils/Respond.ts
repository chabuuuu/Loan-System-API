export function Respond(status: string, message: string, data: string): any {
    const respond = {
        status: status,
        message: message,
        data: data,
    };
    return respond;
}
