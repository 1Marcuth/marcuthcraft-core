import IWorldClock from "./interface"

export type WorldClockOptions = {
    intervalTime: number
}

class WorldClock extends IWorldClock {
    public intervalTime: number
    public interval?: NodeJS.Timeout

    public constructor({ intervalTime }: WorldClockOptions) {
        super()

        this.intervalTime = intervalTime
    }

    public start(): void {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.notifyAll("tick")
            }, this.intervalTime)
        }

        clearInterval(this.interval)

        this.interval = setInterval(() => {
            this.notifyAll("tick")
        }, this.intervalTime)
    }
}

export default WorldClock