import IBlock, { BlockData, IBlockDropItemMethodOptions, IBlockReplaceDataMethodOptions } from "./interface"
import Observable from "../common/observable"
import { BlockEvents, BlockTypes } from "../enums"

export type BlockOptions = {
    data: BlockData
}

class Block extends Observable implements IBlock {
    public data: BlockData

    public constructor({ data }: BlockOptions) {
        super()
        this.data = data
    }

    public destroy(): void {
        this.replaceData({
            newData: {
                type: BlockTypes.AIR,
                liquidSettings: undefined
            }
        })
        
        this.notifyAll(BlockEvents.DESTROYED)
    }

    public dropItem({
        id,
        amount
    }: IBlockDropItemMethodOptions): void {
        
        this.notifyAll(BlockEvents.ITEM_DROPPED, {
            id: id,
            amount: amount
        })
    }

    public replaceData({ newData }: IBlockReplaceDataMethodOptions): void {
        const oldData = {...this.data}

        this.data = Object.assign(this.data, newData)

        this.notifyAll(BlockEvents.REPLACED_DATA, {
            oldData: oldData,
            newData: newData
        })
    }
}

export default Block