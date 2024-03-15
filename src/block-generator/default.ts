import { v4 as uuidV4 } from "uuid"

import IBlockGenerator, { IBlockGeneratorGenerateMethodOptions } from "./interface"
import { BlockData } from "../block/interface"
import Observable from "../common/observable"

export type BlockGeneratorGenerateMethodOptions = IBlockGeneratorGenerateMethodOptions & {}

class BlockGenerator extends Observable implements IBlockGenerator {
    public generate({
        prng,
        context,
        layer,
        terrainHeight
    }: BlockGeneratorGenerateMethodOptions): BlockData {
        let blockData: BlockData

        for (let contextBlockIndex = 0; contextBlockIndex < context.blocks.length; contextBlockIndex++) {
            const contextBlock = context.blocks[contextBlockIndex]

            if (contextBlock) {

            }
        }

        return blockData
    }
}

export default BlockGenerator