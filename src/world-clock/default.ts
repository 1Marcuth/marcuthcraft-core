import IWorldClock from "./interface"

export type WorldClockOptions = {
    intervalTime: number
}

class WorldClock extends IWorldClock {
    public intervalTime: number
    public interval?: NodeJS.Timeout
    public tickCount: number = 0
    public readonly dayInTicks = 24000

    public constructor({ intervalTime }: WorldClockOptions) {
        super()

        this.intervalTime = intervalTime
    }

    public start(): void {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.tickCount++
                this.notifyAll("tick")
            }, this.intervalTime)
        }

        this.tickCount = 0
        clearInterval(this.interval)

        this.interval = setInterval(() => {
            this.tickCount++
            this.notifyAll("tick")
        }, this.intervalTime)
    }

    public get currentDay(): number {
        const currentDay = Math.floor(this.tickCount / this.dayInTicks)
        return currentDay
    }
}

export default WorldClock