import { v4 as uuidV4 } from "uuid"

import IBlockGenerator, {
    IBlockGeneratorGenerateMethodOptions,
    IBlockData,
    PhysicalStates
} from "./interface"

export type BlockGeneratorGenerateMethodOptions = IBlockGeneratorGenerateMethodOptions & {}

class BlockGenerator extends IBlockGenerator {
    public generate({
        prng,
        context,
        layer
    }: BlockGeneratorGenerateMethodOptions): IBlockData {
        const blockData: IBlockData = {
            id: uuidV4(),
            type: "DIRTY",
            durability: {
                current: 0,
                max: 0
            },
            physicalState: PhysicalStates.solid,
            liquidSettings: {
                isSource: false,
                level: 1
            }
        }

        for (let contextBlockIndex = 0; contextBlockIndex < context.blocks.length; contextBlockIndex++) {
            const contextBlock = context.blocks[contextBlockIndex]

            if (contextBlock) {

            }
        }

        return blockData
    }
}

export default BlockGenerator