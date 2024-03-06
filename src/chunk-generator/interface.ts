import IBlockGenerator, { IBlockData } from "../block-generator/interface"
import { BaseBiomeSettings } from "../world-generator/base-settings"
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
    terrainNoise: number[]
    biomeSettings: BaseBiomeSettings
}

abstract class IChunkGenerator extends Observable {
    public blockGenerator: IBlockGenerator

    public constructor({
        blockGenerator
    }: IChunkGeneratorOptions) {
        super()
        this.blockGenerator = blockGenerator
    }

    public abstract generate(options: IChunkGenerateMethodOptions): IChunkData
}

export default IChunkGenerator