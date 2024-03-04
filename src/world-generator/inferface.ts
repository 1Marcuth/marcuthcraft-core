import IChunkGenerator, { ChunkSize, IChunkData } from "../chunk-generator/interface"
import { BaseWorldGeneratorSettings } from "./base-settings"
import Observable from "../common/observable"

export type WorldSeed = {
    original: string | number
    computed: number
}

export interface IWorldData {
    id: string
    seed: WorldSeed
    chunks: IChunkData[]
}

export type IWorldGeneratorOptions = {
    chunkGenerator: IChunkGenerator
    settings: BaseWorldGeneratorSettings
}

export type IWorldGeneratorGenerateMethodOptions = {
    seed: string | number
    length: number
    chunkSize: ChunkSize
    prngClass: any
}

export type IWorldContinueGenerationMethodOptions = {
    seed: string | number
    length: number
    chunkSize: ChunkSize
    prngClass: any
    data: IWorldData
    direction: "LEFT" | "RIGHT"
}

abstract class IWorldGenerator extends Observable {
    public chunkGenerator: IChunkGenerator
    public settings: BaseWorldGeneratorSettings

    public constructor(options: IWorldGeneratorOptions) {
        super()
        this.chunkGenerator = options.chunkGenerator
        this.settings = options.settings
    }

    public abstract generate(options: IWorldGeneratorGenerateMethodOptions): IWorldData

    public abstract continueGeneration(options: IWorldContinueGenerationMethodOptions): void
}

export default IWorldGenerator