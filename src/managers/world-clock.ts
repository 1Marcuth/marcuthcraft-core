import Observable from "../common/observable"
import WorldClockManagerEvents from "../enums/world-clock-manager-events"

export type WorldClockData = {
    ticks: number
}

export type WorldClockManagerConstructorOptions = {
    data: WorldClockData
    tickIntervalTime: number
}

class WorldClockManager extends Observable {
    protected readonly data: WorldClockData
    protected readonly tickIntervalTime: number
    protected interval?: NodeJS.Timer
    public isRunning: boolean = false
    
    public constructor({
        data,
        tickIntervalTime
    }: WorldClockManagerConstructorOptions) {
        super()

        this.data = data
        this.tickIntervalTime = tickIntervalTime
    }

    public start(): void {
        this.isRunning = true

        this.interval = setInterval(() => {
            this.data.ticks += 1

            this.notifyAll(WorldClockManagerEvents.TICK, { ticks: this.data.ticks })
        }, this.tickIntervalTime)
    }

    public stop(): void {
        this.isRunning = false

        if (this.interval) {
            clearInterval(this.interval as any)
        }

        this.interval = undefined
    }

    public export(): WorldClockData {
        return {...this.data}
    }
}

export default WorldClockManager