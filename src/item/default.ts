import IItem, { ItemData } from "./interface"
import Observable from "../common/observable"

export type ItemOptions = {
    data: ItemData
}

class Item extends Observable implements IItem {
    public data: ItemData

    public constructor({ data }: ItemOptions) {
        super()

        this.data = data
    }
}

export default Item