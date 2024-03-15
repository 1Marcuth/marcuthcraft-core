import Observable from "../common/observable"

export type ItemType = "BLOCK" | "TOOL" | "WEAPON" | "ARMOR" 

export type ItemData = {
    id: string
    type: ItemType
}

interface IItem extends Observable {
    data: ItemData
}

export default IItem