import Observable from "../common/observable"

export type LiquidSettings = {
    isSource: boolean
    level: number
}

export type BlockData =  {
    id: string
    type: string
    liquidSettings?: LiquidSettings
}

export type IBlockDropItemMethodOptions = {
    id: string
    amount: number
}

export type IBlockReplaceDataMethodOptions = {
    newData: Partial<BlockData>
}

interface IBlock extends Observable {
    data: BlockData

    destroy(): void
    dropItem(options: IBlockDropItemMethodOptions): void
    replaceData(options: IBlockReplaceDataMethodOptions): void
}

export default IBlock