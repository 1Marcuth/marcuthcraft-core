import IWorldGenerator, { IWorldData, IWorldGeneratorGenerateMethodOptions } from "./inferface"
import IChunkGenerator from "../chunk-generator/interface"
import { IPRNG } from "../prng"

export type WorldGeneratorOptions = {
    chunkGenerator: IChunkGenerator
}

export type WorldGeneratorGenerateMethodOptions = IWorldGeneratorGenerateMethodOptions & {}

class WorldGenerator implements IWorldGenerator {
    public chunkGenerator: IChunkGenerator

    public constructor({
        chunkGenerator
    }: WorldGeneratorOptions) {
        this.chunkGenerator = chunkGenerator
    }

    public generate({
        seed,
        length,
        chunkSize,
        prngClass
    }: WorldGeneratorGenerateMethodOptions): IWorldData {
        const prng = (new prngClass(seed)) as IPRNG

        const worldData: IWorldData = {
            seed: {
                original: seed,
                computed: prng.seed
            },
            chunks: []
        }

        for (let chunkIndex = 0; chunkIndex < length; chunkIndex++) {
            const chunkData = this.chunkGenerator.generate({
                biome: "FOREST_HILLS",
                prng: prng,
                size: chunkSize
            })

            worldData.chunks.push(chunkData)
        }

        return worldData
    }
}

export default WorldGenerator