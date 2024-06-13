import { v4 as uuid } from "uuid"

export type BlockData = {
    id: string
    type: string
    state: any
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

export type BlockGeneratorConstructorOptions = {
    
}

export type BlockGeneratorGenerateOptions = {
    context: BlockContext
}

class BlockGenerator {
    public constructor({

    }: BlockGeneratorConstructorOptions) {

    }

    public generate({
        context
    }: BlockGeneratorGenerateOptions): BlockData {
        return {
            id: uuid(),
            type: "STONE",
            state: {}
        }
    }
}

export default BlockGenerator