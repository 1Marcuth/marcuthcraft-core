import { WorldData } from "../generators/world"
import WorldClockManager, { WorldClockData } from "./world-clock"
import Observable from "../common/observable"
import { EntityData } from "./entity"

export type WorldManagerConstructorOptions = {
    tickIntervalTime: number
    worldClockManagerClass: typeof WorldClockManager
}

export type WorldManagerExecuteOptions = {
    data: WorldData
    clockData: WorldClockData
    entitiesData: EntityData[]
}

class WorldManager extends Observable {
    private readonly tickIntervalTime: number
    private readonly worldClockManagerClass: typeof WorldClockManager

    public constructor({
        tickIntervalTime,
        worldClockManagerClass
    }: WorldManagerConstructorOptions) {
        super()

        this.tickIntervalTime = tickIntervalTime
        this.worldClockManagerClass = worldClockManagerClass
    }

    public execute({
        clockData,
        data,
        entitiesData
    }: WorldManagerExecuteOptions) {
        const worldClockManager = new this.worldClockManagerClass({
            data: clockData,
            tickIntervalTime: this.tickIntervalTime
        })

        worldClockManager.start()

        return {
            worldClockManager
        }
    }
}

export default WorldManager