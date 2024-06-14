import { v4 as uuid } from "uuid"

import BlockGeneratorEvents from "../enums/block-generator-events"
import Observable from "../common/observable"
import PRNG from "../utils/prng"

export type BlockDataState = {
    liquidLevel?: number | "source"
}

export type BlockData = {
    id: string
    type: string
    state?: BlockDataState
}

export type BlockDataOrNull = BlockData | null

export type BlockContext = [
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull,
    BlockDataOrNull
]

export type BlockGeneratorConstructorOptions = {}

export type BlockGeneratorGenerateOptions = {
    prng: PRNG
    layer: number
    context: BlockContext
}

export type BlockGeneratorGenerateReturnType = {
    data: BlockData
    generationTime: number
}

class BlockGenerator extends Observable {
    public constructor({}: BlockGeneratorConstructorOptions) {
        super()
    }

    public generate({
        prng,
        layer,
        context
    }: BlockGeneratorGenerateOptions): BlockGeneratorGenerateReturnType {
        const startTime = Date.now()

        this.notifyAll(BlockGeneratorEvents.START, { startTime })

        let blockType = "air"

        if (
            layer === 0 ||
            layer === 1 && prng.next() > .25 ||
            layer === 2 && prng.next() > .45 ||
            layer === 3 && prng.next() > .65
        ) {
            blockType = "bedrock"
        } else if (layer < 70) {
            blockType = "stone"
        } else if (layer < 74) {
            blockType = "dirt"
        } else if (layer < 75) {
            blockType = "grass"
        }

        const endTime = Date.now()
        const generationTime = endTime - startTime

        this.notifyAll(BlockGeneratorEvents.END, { startTime, endTime, generationTime })

        const data = {
            id: uuid(),
            type: blockType
        }

        return { data, generationTime }
    }
}

export default BlockGenerator