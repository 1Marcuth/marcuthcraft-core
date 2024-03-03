abstract class IPRNG {
    public seed: number

    public constructor(seed: string | number, ...args: any[]) {
        if (typeof seed === "string") {
            this.seed = IPRNG.stringToSeed(seed)
        } else {
            this.seed = seed
        }
    }

    public static stringToSeed(seed: string): number {
        let result = 0

        for (let i = 0; i < seed.length; i++) {
            result = (result * 31 + seed.charCodeAt(i)) & 0xffffffff
        }

        return result
    }

    public abstract next(minOrMax?: number, max?: number): number
}

export default IPRNG