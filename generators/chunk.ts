import { v4 as uuid } from "uuid"

import BlockGenerator, { BlockData } from "./block"

export type ChunkSize = {
    width: number
    height: number
}

export type ChunkData = {
    id: string
    blocks: BlockData[]
}

export type ChunkGeneratorConstructorOptions = {
    blockGenerator: BlockGenerator
}

export type ChunkGeneratorGenerateOptions = {
    size: ChunkSize
}

class ChunkGenerator {
    public constructor({
        blockGenerator
    }: ChunkGeneratorConstructorOptions) {

    }

    public generate({
        size
    }: ChunkGeneratorGenerateOptions): ChunkData {
        const blocks: BlockData[] = []

        for (let i = 0; i < size.width; i++) {
            for (let j = 0; j < size.height; j++) {
                const block = this.blo
            }
        }

        return {
            id: uuid(),
            blocks: blocks
        }
    }
}

export default ChunkGenerator