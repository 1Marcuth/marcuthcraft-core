import { WorldData } from "../world-generator/inferface"
import Observable from "../common/observable"

export type IGravityManagerOptions = {
    data: WorldData
    simulationDistance: number
}

abstract class IGravityManager extends Observable {
    public data: WorldData
    public simulationDistance: number

    public constructor({
        data,
        simulationDistance
    }: IGravityManagerOptions) {
        super()

        this.data = data
        this.simulationDistance = simulationDistance
    }

    public abstract update(): void

    public setSimulationDistance(newSimulationDistance: number): void {
        this.simulationDistance = newSimulationDistance
    }
}

export default IGravityManager