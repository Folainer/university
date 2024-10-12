class Time {
    public static check(func : Function, ...args : any) : number {
        let res = 0
        const quantity = 500
        for (let i = 0; i < quantity; i++) {
            const startTime = performance.now()
            func(...args)
            const endTime = performance.now()
            res += endTime - startTime
        }
        return res / quantity
    }
}