import { IBlockData } from "../block-generator/interface"
import Observable from "../common/observable"
import { IEntity } from "../entity"

export type ICollisionManagerOptions = {
    entities: IEntity[]
    surfaceBlocks: IBlockData[]
    wallBlocks: IBlockData[]
}

class ICollisionManager extends Observable {
    public entities: IEntity[]
    public surfaceBlocks: IBlockData[]
    public wallBlocks: IBlockData[]

    public constructor({
        entities,
        surfaceBlocks,
        wallBlocks
    }: ICollisionManagerOptions) {
        super()

        this.entities = entities
        this.surfaceBlocks = surfaceBlocks
        this.wallBlocks = wallBlocks
    }
}

export default ICollisionManager