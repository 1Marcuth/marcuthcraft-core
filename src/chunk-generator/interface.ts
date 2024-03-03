import IBlockGenerator, { IBlockData } from "../block-generator/interface"
import { KeyOf } from "../types/helper"
import { IPRNG } from "../prng"
import { BiomeTypes } from "../enums"

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
}

abstract class IChunkGenerator {
    public blockGenerator: IBlockGenerator

    public constructor({ blockGenerator }: IChunkGeneratorOptions) {
        this.blockGenerator = blockGenerator
    }

    public abstract generate(options: IChunkGenerateMethodOptions): IChunkData
}

export default IChunkGenerator