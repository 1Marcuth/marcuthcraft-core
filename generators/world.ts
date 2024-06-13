import { v4 as uuid } from "uuid"

import ChunkGenerator, { ChunkData } from "./chunk"
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

export type WorldGenerationConfigChunkSize = {
    width: number
    height: number
}

export type WorldGenerationConfig = {
    chunkSize: WorldGenerationConfigChunkSize
}

export type WorldGeneratorConstructorOptions = {
    prngClass: typeof PRNG
    chunkGenerator: ChunkGenerator
    generationConfig: WorldGenerationConfig
}

export type WorldGeneratorGenerateOptions = {
    seed: string | number
    length: number
}

class WorldGenerator {
    protected prngClass: typeof PRNG
    protected chunkGenerator: ChunkGenerator
    protected generationConfig: WorldGenerationConfig

    public constructor({
        prngClass,
        chunkGenerator,
        generationConfig
    }: WorldGeneratorConstructorOptions) {
        this.prngClass = prngClass
        this.chunkGenerator = chunkGenerator
        this.generationConfig = generationConfig
    }

    public generate({
        seed,
        length
    }: WorldGeneratorGenerateOptions): WorldData {
        const prng = new this.prngClass(seed)
        const chunks: ChunkData[] = []

        for (let i = 0; i < length; i++) {
            const chunk = this.chunkGenerator.generate({
                size: this.generationConfig.chunkSize
            })

            chunks.push(chunk)
        }

        return {
            id: uuid(),
            seed: {
                original: seed,
                computed: prng.seed
            },
            chunks: chunks
        }
    }
}

export default WorldGenerator