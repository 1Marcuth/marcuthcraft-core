import { BlockTypes, BiomeTypes } from "../enums"
import { Range } from "../types/common"

export type LayerIndex = "highest" | "chunkHeight" | number

export type StartOrEndLayerRange = (LayerIndex | {
    layer: LayerIndex
    operator: "+" | "-"
    operand: number
})

export type LayerRange = [StartOrEndLayerRange, StartOrEndLayerRange]

export type BaseBlockSettings = {
    range: LayerRange
    spawnChance?: number
    alternativeBlocks?: (keyof typeof BlockTypes)[]
}[]

export type BaseBlocksSettigs = {
    [key in Exclude<
        keyof typeof BlockTypes,
        "DIAMOND_ORE" |
        "GOLD_ORE" |
        "IRON_ORE" |
        "COAL_ORE" |
        "OAK_TRUNK" |
        "OAK_LEAF" |
        "WATER" |
        "LAVA" |
        "DIRT" |
        "GRASS"
    >]: BaseBlockSettings
} & {
    [key: string]: BaseBlockSettings
}

export type BaseBiomeSettings = {
    lengthRange: Range
    blocks: BaseBlocksSettigs
}

export type BaseBiomesSettings = {
    [key in BiomeTypes]: BaseBiomeSettings
} & {
    [key: string]: BaseBiomeSettings
}

export type BaseWorldGeneratorSettings = {
    biomes: BaseBiomesSettings
}

const defaultBedrockSettings: BaseBlockSettings = [
    {
        range: [0, 0]
    },
    {
        range: [1, 1],
        spawnChance: .95,
        alternativeBlocks: ["STONE"]
    },
    {
        range: [2, 2],
        spawnChance: .85,
        alternativeBlocks: ["STONE"]
    },
    {
        range: [3, 3],
        spawnChance: .75,
        alternativeBlocks: ["STONE"]
    }
]

const defaultWorldGeneratorSettings: BaseWorldGeneratorSettings = {
    biomes: {
        PLAINS: {
            lengthRange: [5, 16],
            blocks: {
                BEDROCK: defaultBedrockSettings,
                STONE: [
                    {
                        range: [
                            4, 
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 5
                            }
                        ]
                    }
                ],
                DIRT: [
                    {
                        range: [
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 5
                            },
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 1
                            }
                        ]
                    }
                ],
                GRASS: [
                    {
                        range: ["highest", "highest"]
                    }
                ],
                AIR: [
                    {
                        range: [
                            {
                                layer: "highest",
                                operator: "+",
                                operand: 1
                            },
                            "chunkHeight"
                        ]
                    }
                ]
            }
        },
        DESERT: {
            lengthRange: [5, 16],
            blocks: {
                BEDROCK: defaultBedrockSettings,
                STONE: [
                    {
                        range: [
                            4, 
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 8
                            }
                        ]
                    }
                ],
                SANDSTONE: [
                    {
                        range: [
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 9
                            }, 
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 4
                            }
                        ]
                    }
                ],
                SAND: [
                    {
                        range: [
                            {
                                layer: "highest",
                                operator: "-",
                                operand: 5
                            },
                            "highest"
                        ]
                    }
                ],
                AIR: [
                    {
                        range: [
                            {
                                layer: "highest",
                                operator: "+",
                                operand: 1
                            },
                            "chunkHeight"
                        ]
                    }
                ]
            }
        }
    }
}

export default defaultWorldGeneratorSettings