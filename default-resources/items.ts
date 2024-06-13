export type ItemAttribues = {
    extraDamagePoints?: number
    extraDestructionPoints?: number
}

export type Item = {
    onUse?: null
    onHit?: null
    onDrop?: null
    attributes?: ItemAttribues
}

export type ItemSet = {
    [key: string]: Item
}

const defaultItems: ItemSet = {
    stone: {},
    dirt: {},
    grass: {},
    wood: {},
    water: {},
    sand: {},
    air: {}
}

export default defaultItems