export function retry(fn:(...params:any[]) => any, retryCount:number): any | RetryRuntimeException {
    try {
        return fn()
    } catch (error) {
        return retryWithError(fn, retryCount - 1, [(error as Error).message]);
    }
}

function retryWithError(fn:(...params:any[]) => any, retryCount:number, messages:string[]):any | RetryRuntimeException {
    try {
        if (retryCount == 0) {
            throw new RetryRuntimeException(messages.toString())
        }
        return fn()
    } catch (error) {
        if (error instanceof RetryRuntimeException) {
            throw error
        }
        return retryWithError(fn, retryCount - 1, [...messages, (error as Error).message])
    }
}

class RetryRuntimeException extends Error {}
