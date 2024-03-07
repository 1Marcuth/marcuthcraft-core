import Observable from "../common/observable"

export type IWorldClockStartMethodOptions = {
    intervalTime: number
}

abstract class IWorldClock extends Observable {
    public abstract tickCount: number
    
    public abstract start(): void
    public abstract get currentDay(): number
}

export default IWorldClock