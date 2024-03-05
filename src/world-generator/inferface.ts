import IChunkGenerator, { ChunkSize, IChunkData } from "../chunk-generator/interface"
import { BaseWorldGeneratorSettings } from "./base-settings"
import Observable from "../common/observable"
import { INoise } from "../noise"
import { IPRNG } from "../prng"

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
    prngClass: typeof IPRNG
    noiseClass: typeof INoise
}

export type IWorldGeneratorGenerateMethodOptions = {
    seed: string | number
    length: number
    chunkSize: ChunkSize
}

export type IWorldContinueGenerationMethodOptions = {
    seed: string | number
    length: number
    chunkSize: ChunkSize
    data: IWorldData
    direction: "LEFT" | "RIGHT"
}

abstract class IWorldGenerator extends Observable {
    public chunkGenerator: IChunkGenerator
    public settings: BaseWorldGeneratorSettings
    public prngClass: typeof IPRNG
    public noiseClass: typeof INoise

    public constructor({
        chunkGenerator,
        settings,
        prngClass,
        noiseClass
    }: IWorldGeneratorOptions) {
        super()
        this.chunkGenerator = chunkGenerator
        this.settings = settings
        this.prngClass = prngClass
        this.noiseClass = noiseClass
    }

    public abstract generate(options: IWorldGeneratorGenerateMethodOptions): IWorldData

    public abstract continueGeneration(options: IWorldContinueGenerationMethodOptions): void
}

export default IWorldGenerator