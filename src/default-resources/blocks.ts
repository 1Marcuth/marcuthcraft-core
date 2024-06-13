export type BlockState = "solid" | "liquid" | "intangible"

export type Block = {
    hardness: number | "indestructible"
    state: BlockState
}

export type BlockSet = {
    [key: string]: Block
}

const defaultBlocks: BlockSet = {
    stone: {
        hardness: 1.5,
        state: "solid",
    },
    dirt: {
        hardness: 0.5,
        state: "solid",
    },
    grass: {
        hardness: 0.6,
        state: "solid",
    },
    wood: {
        hardness: 2.0,
        state: "solid",
    },
    water: {
        hardness: "indestructible",
        state: "liquid",
    },
    sand: {
        hardness: 0.4,
        state: "solid",
    },
    air: {
        hardness: "indestructible",
        state: "intangible",
    }
}

export default defaultBlocks