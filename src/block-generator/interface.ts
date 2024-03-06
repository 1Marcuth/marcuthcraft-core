import { KeyOf } from "../types/helper"
import { IPRNG } from "../prng"
import Observable from "../common/observable"

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

export type LiquidSettings = {
    isSource: boolean
    level: number
}

export interface IBlockData {
    id: string
    type: string
    durability: BlockDurability
    physicalState: PhysicalState
    liquidSettings?: LiquidSettings
}

export type IBlockDataOrNull = IBlockData | null

export type BlockContextBlocks = [
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull,
    IBlockDataOrNull
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

abstract class IBlockGenerator extends Observable {
    public abstract generate(options: IBlockGeneratorGenerateMethodOptions): IBlockData
}

export default IBlockGenerator