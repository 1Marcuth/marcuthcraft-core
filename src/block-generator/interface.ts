import { KeyOf } from "../types/helper"
import { IPRNG } from "../prng"

export enum PhysicalStates {
    gaseous,
    solid,
    liquid
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
    context: BlockContext
}

abstract class IBlockGenerator {
    public abstract generate({
        prng,
        context,
        layer
    }: IBlockGeneratorGenerateMethodOptions): IBlockData
}

export default IBlockGenerator