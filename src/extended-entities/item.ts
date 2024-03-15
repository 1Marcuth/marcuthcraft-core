import { EntityOptions } from "../entity/default"
import Item from "../item/default"
import Entity from "../entity"

export type ItemEntityOptions = EntityOptions & {
    item: Item
}

class ItemEntity extends Entity {
    public item: Item

    public constructor({
        data,
        item,
        position
    }: ItemEntityOptions) {
        super({
            data: data,
            position: position
        })

        this.item = item
    }
}

export default ItemEntity