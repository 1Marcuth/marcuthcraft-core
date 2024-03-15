import ItemEntity from "../extended-entities/item"
import Observable from "../common/observable"

export type LiquidSettings = {
    isSource: boolean
    level: number
}

export type BlockDurability = number | "infinity" | "notTouchable"

export type BlockData =  {
    id: string
    type: string
    liquidSettings?: LiquidSettings
    durability: BlockDurability
}

export type IBlockDropItemMethodOptions = {
    amount: number
}

export type IBlockupdateDataMethodOptions = {
    newData: Partial<BlockData>
}

interface IBlock extends Observable {
    itemEntity: ItemEntity
    data: BlockData

    destroy(): void
    dropItem(options: IBlockDropItemMethodOptions): void
    updateData(options: IBlockupdateDataMethodOptions): void
}

export default IBlock