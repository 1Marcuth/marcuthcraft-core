import IChunkGenerator, { ChunkSize, IChunkData } from "../chunk-generator/interface"

export type WorldSeed = {
    original: string | number
    computed: number
}

export interface IWorldData {
    seed: WorldSeed
    chunks: IChunkData[]
}

export type IWorldGeneratorGenerateMethodOptions = {
    seed: string | number
    length: number
    chunkSize: ChunkSize
    prngClass: any
}

abstract class IWorldGenerator {
    public abstract chunkGenerator: IChunkGenerator

    public abstract generate({ seed, prngClass }: IWorldGeneratorGenerateMethodOptions): IWorldData
}

export default IWorldGenerator