import { v4 as uuidV4 } from "uuid"

import IChunkGenerator, {
    IChunkData,
    IChunkGenerateMethodOptions
} from "./interface"
import { IBlockGenerator } from "../block-generator"
import Observable from "../common/observable"

export type ChunkGeneratorOptions = {
    blockGenerator: IBlockGenerator
}

export type ChunkGenerateMethodOptions = IChunkGenerateMethodOptions & {}

class ChunkGenerator extends Observable implements IChunkGenerator {
    public blockGenerator: IBlockGenerator

    public constructor({ blockGenerator }: ChunkGeneratorOptions) {
        super()

        this.blockGenerator = blockGenerator
    }

    public generate({
        prng,
        biome,
        size,
        terrainNoise,
        biomeSettings
    }: ChunkGenerateMethodOptions): IChunkData {
        const chunkData: IChunkData = {
            id: uuidV4(),
            biome,
            size,
            blocks: [],
        }

        const multiplier = biomeSettings.heightNoiseMultiplier 

        for (let blockIndex = 0; blockIndex < (size.width * size.height); blockIndex++) {
            const blockNoise = terrainNoise[blockIndex]
            const minHeight = Math.round(biomeSettings.maxHeight - multiplier + (blockNoise * multiplier))
            const maxHeight = size.height

            const terrainHeight = Math.min(maxHeight, minHeight)
            const y = Math.floor(blockIndex / size.width)

            const blockData = this.blockGenerator.generate({
                prng: prng,
                layer: y,
                terrainHeight: terrainHeight,
                context: {
                    blocks: [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ]
                }
            })

            chunkData.blocks.push(blockData)
        }

        return chunkData
    }
}

export default ChunkGenerator