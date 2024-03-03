import IPRNG from "./interface"

class PRNG extends IPRNG {
    private a = 1664525
    private c = 1013904223
    private m = Math.pow(2, 32)

    private lcgRandom(): number {
        this.seed = (this.a * this.seed + this.c) % this.m
        return Math.abs(this.seed / this.m)
    }

    public next(minOrMax?: number, max?: number): number {
        const value = this.lcgRandom()

        let min: number | undefined = minOrMax

        if (!min) min = 0

        if (max) {
            const temp = min
            min = max
            max = temp
        }

        if (min === 0 || (!max || max === 0 || max === 1)) {
            return value
        }

        if (min === max) return value + min

        if (min > max) {
            minOrMax = max
            max = min
            min = minOrMax
        }

        return value * (max - min) + min
    }
}

export default PRNG