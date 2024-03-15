import IBlock, { BlockData, IBlockDropItemMethodOptions, IBlockupdateDataMethodOptions } from "./interface"
import ItemEntity from "../extended-entities/item"
import { BlockEvents, BlockTypes } from "../enums"
import Observable from "../common/observable"
import Item from "../item/default"

export type BlockOptions = {
    data: BlockData
    itemEntity: ItemEntity
}

class Block extends Observable implements IBlock {
    public data: BlockData
    public itemEntity: ItemEntity

    public constructor({
        data,
        itemEntity
    }: BlockOptions) {
        super()

        this.data = data
        this.itemEntity = itemEntity
    }

    public destroy(): void {
        this.updateData({
            newData: {
                type: BlockTypes.AIR,
                liquidSettings: undefined
            }
        })
        
        this.notifyAll(BlockEvents.DESTROYED)
    }

    public dropItem({ amount }: IBlockDropItemMethodOptions): void {
        
        this.notifyAll(BlockEvents.ITEM_DROPPED, {
            amount: amount
        })
    }

    public updateData({ newData }: IBlockupdateDataMethodOptions): void {
        const oldData = {...this.data}

        this.data = Object.assign(this.data, newData)

        this.notifyAll(BlockEvents.REPLACED_DATA, {
            oldData: oldData,
            newData: newData
        })
    }
}

const block = new Block({
    data: {
        id: "dsadasdsad-dsadd-dsdsadsadas",
        durability: 6000,
        type: BlockTypes.BEDROCK
    },
    itemEntity: new ItemEntity({
        data: {
            movementSpeed: {
                horizontal: 0,
                vertical: 0
            }
        },
        item: new Item({
            data: {
                id: "dsadasdsad-dsadd-dsdsadsadas",
                type: "BLOCK"
            }
        }),
        position: {
            x: 0,
            y: 0
        }
    })
})

export default Block