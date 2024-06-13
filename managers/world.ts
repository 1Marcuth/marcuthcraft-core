import { WorldData } from "../generators/world"
import Observable from "../common/observable"
import { EntityData } from "./entity"

export type WorldManagerConstructorOptions = {
    data: WorldData
    entities: EntityData[]
}

class WorldManager extends Observable {
    protected data: WorldData
    protected entities: EntityData[]

    public constructor({
        data,
        entities
    }: WorldManagerConstructorOptions) {
        super()

        this.data = data
        this.entities = entities
    }


}

export default WorldManager