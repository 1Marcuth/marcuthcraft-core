import { v4 as uuid } from "uuid"

import WorldGeneratorEvents from "../enums/world-generator-events"
import { GenerationConfig } from "../default-configs/generation"
import ChunkGenerator, { ChunkData } from "./chunk"
import Observable from "../common/observable"
import PRNG from "../utils/prng"

export type WorldDataSeed = {
    original: string | number
    computed: number
}

export type WorldData = {
    id: string
    seed: WorldDataSeed
    chunks: ChunkData[]
}

export type WorldGeneratorConstructorOptions = {
    prngClass: typeof PRNG
    chunkGenerator: ChunkGenerator
    generationConfig: GenerationConfig
}

export type WorldGeneratorGenerateOptions = {
    seed: string | number
    length: number
}

export type WorldGeneratorGenerateReturnType = {
    data: WorldData
    generationTime: number
}

class WorldGenerator extends Observable {
    protected readonly prngClass: typeof PRNG
    protected readonly chunkGenerator: ChunkGenerator
    protected readonly generationConfig: GenerationConfig

    public constructor({
        prngClass,
        chunkGenerator,
        generationConfig
    }: WorldGeneratorConstructorOptions) {
        super()

        this.prngClass = prngClass
        this.chunkGenerator = chunkGenerator
        this.generationConfig = generationConfig
    }

    public generate({
        seed,
        length
    }: WorldGeneratorGenerateOptions): WorldGeneratorGenerateReturnType {
        const startTime = Date.now()

        this.notifyAll(WorldGeneratorEvents.START, { startTime })

        const prng = new this.prngClass(seed)
        const chunks: ChunkData[] = []

        this.notifyAll(WorldGeneratorEvents.CHUNKS_GENERATION_STARTING)

        for (let i = 0; i < length; i++) {
            const { data: chunk } = this.chunkGenerator.generate({
                prng: prng,
                size: this.generationConfig.chunkSize
            })

            chunks.push(chunk)
        }

        this.notifyAll(WorldGeneratorEvents.CHUNKS_GENERATION_FINISHING)

        const endTime = Date.now()
        const generationTime = endTime - startTime

        this.notifyAll(WorldGeneratorEvents.END, { startTime, endTime, generationTime })

        const data = {
            id: uuid(),
            seed: {
                original: seed,
                computed: prng.seed
            },
            chunks: chunks
        }

        return { data, generationTime }
    }
}

export default WorldGenerator