import { BlockData } from "../block/interface"
import Observable from "../common/observable"
import { KeyOf } from "../types/helper"
import { IPRNG } from "../prng"

export enum PhysicalStates {
    GASEOUS = "GASEOUS",
    SOLID = "SOLID",
    LIQUID = "LIQUID"
}

export type BlockDurability = {
    current: number
    max: number
}

export type PhysicalState = KeyOf<typeof PhysicalStates>

export type BlockDataOrNull = BlockData | null

export type BlockContextBlocks = [
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull
]

export type BlockContext = {
    blocks: BlockContextBlocks
}

export type IBlockGeneratorGenerateMethodOptions = {
    prng: IPRNG
    layer: number
    terrainHeight: number
    context: BlockContext
}

interface IBlockGenerator extends Observable {
    generate(options: IBlockGeneratorGenerateMethodOptions): BlockData
}

export default IBlockGenerator