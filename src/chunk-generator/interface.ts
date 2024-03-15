import { BaseBiomeSettings } from "../world-generator/base-settings"
import IBlockGenerator from "../block-generator/interface"
import { BlockData } from "../block/interface"
import Observable from "../common/observable"
import { IPRNG } from "../prng"

export type ChunkSize = {
    width: number
    height: number
}

export type Biome = string

export interface IChunkData {
    id: string
    biome: Biome
    size: ChunkSize
    blocks: BlockData[]
}

export type ChunkGenerateMethodOptions = {
    prng: IPRNG
    biome: Biome
    size: ChunkSize
}

export type IChunkGenerateMethodOptions = {
    prng: IPRNG
    biome: Biome
    size: ChunkSize
    terrainNoise: number[]
    biomeSettings: BaseBiomeSettings
}

interface IChunkGenerator extends Observable {
    blockGenerator: IBlockGenerator

    generate(options: IChunkGenerateMethodOptions): IChunkData
}

export default IChunkGenerator