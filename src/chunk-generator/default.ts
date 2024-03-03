import { v4 as uuidV4 } from "uuid"

import IChunkGenerator, {
    IChunkData,
    IChunkGenerateMethodOptions
} from "./interface"

type ChunkGenerateMethodOptions = IChunkGenerateMethodOptions & {}

class ChunkGenerator extends IChunkGenerator {
    public generate({
        prng,
        biome,
        size
    }: ChunkGenerateMethodOptions): IChunkData {
        const chunkData: IChunkData = {
            id: uuidV4(),
            biome,
            size,
            blocks: [],
        }

        for (let blockIndex = 0; blockIndex < (size.width * size.height); blockIndex++) {
            const blockData = this.blockGenerator.generate({
                prng: prng,
                layer: 0,
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