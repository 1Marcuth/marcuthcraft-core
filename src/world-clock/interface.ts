import Observable from "../common/observable"

export type IWorldClockStartMethodOptions = {
    intervalTime: number
}

abstract class IWorldClock extends Observable {
    public abstract start(): void
}

export default IWorldClock