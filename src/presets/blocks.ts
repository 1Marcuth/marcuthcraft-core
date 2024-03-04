import { PhysicalState, PhysicalStates } from "../block-generator/interface"
import { BlockTypes } from "../enums"

export type BlockSettings = {
    displayName: string
    type: string
    physicalState: PhysicalState
    initialDurability: number | "infinity" | "notTouchable"
    explosionResistance: number | "infinity" | "notTouchable"
}

const blocks: BlockSettings[] = [
    {
        displayName: "Air",
        type: BlockTypes.AIR,
        physicalState: PhysicalStates.GASEOUS,
        initialDurability: "notTouchable",
        explosionResistance: "notTouchable"
    },
    {
        displayName: "Bedrock",
        type: BlockTypes.BEDROCK,
        physicalState: PhysicalStates.SOLID,
        initialDurability: "infinity",
        explosionResistance: "infinity"
    },
    {
        displayName: "Coal Ore",
        type: BlockTypes.COAL_ORE,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 3000,
        explosionResistance: 6000
    },
    {
        displayName: "Diamond Ore",
        type: BlockTypes.DIAMOND_ORE,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 3000,
        explosionResistance: 3000
    },
    {
        displayName: "Dirt",
        type: BlockTypes.DIRT,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 500,
        explosionResistance: 500
    },
    {
        displayName: "Gold Ore",
        type: BlockTypes.GOLD_ORE,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 3000,
        explosionResistance: 3000
    },
    {
        displayName: "Grass",
        type: BlockTypes.GRASS,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 500,
        explosionResistance: 500
    },
    {
        displayName: "Iron Ore",
        type: BlockTypes.IRON_ORE,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 3000,
        explosionResistance: 15000
    },
    {
        displayName: "Lava",
        type: BlockTypes.LAVA,
        physicalState: PhysicalStates.LIQUID,
        initialDurability: "notTouchable",
        explosionResistance: "notTouchable"
    },
    {
        displayName: "Oak Leaf",
        type: BlockTypes.OAK_LEAF,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 200,
        explosionResistance: 200
    },
    {
        displayName: "Oak Trunk",
        type: BlockTypes.OAK_TRUNK,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 200,
        explosionResistance: 200
    },
    {
        displayName: "Stone",
        type: BlockTypes.STONE,
        physicalState: PhysicalStates.SOLID,
        initialDurability: 1500,
        explosionResistance: 6000
    },
    {
        displayName: "Water",
        type: BlockTypes.WATER,
        physicalState: PhysicalStates.LIQUID,
        initialDurability: "notTouchable",
        explosionResistance: "notTouchable"
    },
]

export default blocks