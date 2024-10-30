import { retry } from "../lib/retry";

describe('Retry', () => {
    test('콜백(첫번째 에러를 발생시키고 두번째 success를 반환함)을 받고 retry를 하면 success를 반환해야한다.', () => {
        let count = 0
        const retryCount = 2

        expect(retry(() => {
            if (count == 0) {
                count += 1
                throw new Error("An error occurred");
            }
            return "success"
        }, retryCount)).toEqual("success");
    })

    test('콜백(두번의 에러를 발생시키고 마지막으로 success를 반환함)을 받고 retry를 하면 success를 반환해야한다.', () => {
        let count = 0
        const retryCount = 3

        expect(retry(() => {
            if (count < 2) {
                count += 1
                throw new Error("An error occurred");
            }
            return "success"
        }, retryCount)).toEqual("success");
    })

    test('에러가 없으면 retry하지 않는다', () => {
        let count = 0
        const retryCount = 3

        expect(retry(() => {
            count += 1
            return "success"
        }, retryCount)).toEqual("success");
        expect(count).toEqual(1)
    })
})
