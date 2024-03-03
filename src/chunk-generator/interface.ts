import IBlockGenerator, { IBlockData } from "../block-generator/interface"
import { KeyOf } from "../types/helper"
import { IPRNG } from "../prng"

export type ChunkSize = {
    width: number
    height: number
}

export enum Biomes {
    OCEAN = "OCEAN",
    PLAINS = "PLAINS",
    DESERT = "DESERT",
    EXTREME_HILLS = "EXTREME_HILLS",
    FOREST = "FOREST",
    TAIGA = "TAIGA",
    SWAMPLAND = "SWAMPLAND",
    RIVER = "RIVER",
    NETHER = "NETHER",
    SKY = "SKY",
    FROZEN_OCEAN = "FROZEN_OCEAN",
    FROZEN_RIVER = "FROZEN_RIVER",
    ICE_PLAINS = "ICE_PLAINS",
    ICE_MOUNTAINS = "ICE_MOUNTAINS",
    MUSHROOM_ISLAND = "MUSHROOM_ISLAND",
    MUSHROOM_ISLAND_SHORE = "MUSHROOM_ISLAND_SHORE",
    BEACH = "BEACH",
    DESERT_HILLS = "DESERT_HILLS",
    FOREST_HILLS = "FOREST_HILLS",
    TAIGA_HILLS = "TAIGA_HILLS",
    EXTREME_HILLS_EDGE = "EXTREME_HILLS_EDGE",
    JUNGLE = "JUNGLE",
    JUNGLE_HILLS = "JUNGLE_HILLS",
    JUNGLE_EDGE = "JUNGLE_EDGE",
    DEEP_OCEAN = "DEEP_OCEAN",
    STONE_BEACH = "STONE_BEACH",
    COLD_BEACH = "COLD_BEACH",
    BIRCH_FOREST = "BIRCH_FOREST",
    BIRCH_FOREST_HILLS = "BIRCH_FOREST_HILLS",
    ROOFED_FOREST = "ROOFED_FOREST",
    COLD_TAIGA = "COLD_TAIGA",
    COLD_TAIGA_HILLS = "COLD_TAIGA_HILLS",
    MEGA_TAIGA = "MEGA_TAIGA",
    MEGA_TAIGA_HILLS = "MEGA_TAIGA_HILLS",
    EXTREME_HILLS_PLUS= "EXTREME_HILLS_PLUS",
    SAVANNA = "SAVANNA",
    SAVANNA_PLATEAU = "SAVANNA_PLATEAU",
    MESA = "MESA",
    MESA_PLATEAU_F = "MESA_PLATEAU_F",
    MESA_PLATEAU = "MESA_PLATEAU"
}

export type Biome = KeyOf<typeof Biomes>

export interface IChunkData {
    id: string
    biome: Biome
    size: ChunkSize
    blocks: IBlockData[]
}

export type ChunkGenerateMethodOptions = {
    prng: IPRNG
    biome: Biome
    size: ChunkSize
}

export type IChunkGeneratorOptions = {
    blockGenerator: IBlockGenerator
}

export type IChunkGenerateMethodOptions = {
    prng: IPRNG
    biome: Biome
    size: ChunkSize
}

abstract class IChunkGenerator {
    public blockGenerator: IBlockGenerator

    public constructor({ blockGenerator }: IChunkGeneratorOptions) {
        this.blockGenerator = blockGenerator
    }

    public abstract generate(options: IChunkGenerateMethodOptions): IChunkData
}

export default IChunkGenerator