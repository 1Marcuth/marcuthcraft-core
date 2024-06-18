import { v4 as uuid } from "uuid"

import ChunkGeneratorEvents from "../enums/chunk-generator-events"
import BlockGenerator, { BlockData } from "./block"
import { ChunkSize } from "../default-configs/generation"
import Observable from "../common/observable"
import PRNG from "../utils/prng"

export type ChunkData = {
    id: string
    blocks: BlockData[]
}

export type ChunkGeneratorConstructorOptions = {
    blockGenerator: BlockGenerator
}

export type ChunkGeneratorGenerateOptions = {
    prng: PRNG
    size: ChunkSize
}

export type ChunkGeneratorGenerateReturnType = {
    data: ChunkData
    generationTime: number
}

class ChunkGenerator extends Observable {
    public readonly blockGenerator: BlockGenerator

    public constructor({
        blockGenerator
    }: ChunkGeneratorConstructorOptions) {
        super()

        this.blockGenerator = blockGenerator
    }

    public generate({
        prng,
        size
    }: ChunkGeneratorGenerateOptions): ChunkGeneratorGenerateReturnType {
        const startTime = Date.now()

        this.notifyAll(ChunkGeneratorEvents.START, { startTime })

        const blocks: BlockData[] = []

        this.notifyAll(ChunkGeneratorEvents.BLOCKS_GENERATION_STARTING)

        for (let i = 0; i < size.width * size.height; i++) {
            const layer = Math.floor(i / size.width)

            const { data: block } = this.blockGenerator.generate({
                prng: prng,
                layer: layer,
                context: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]
            })

            blocks.push(block)
        }

        this.notifyAll(ChunkGeneratorEvents.BLOCKS_GENERATION_FINISHING)

        const endTime = Date.now()
        const generationTime = endTime - startTime

        this.notifyAll(ChunkGeneratorEvents.END, { startTime, endTime, generationTime })

        const data = {
            id: uuid(),
            blocks: blocks
        }

        return { data, generationTime }
    }
}

export default ChunkGenerator