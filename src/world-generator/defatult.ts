import { v4 as uuidV4 } from "uuid"

import IWorldGenerator, { IWorldData, IWorldGeneratorGenerateMethodOptions } from "./inferface"
import IChunkGenerator, { ChunkSize } from "../chunk-generator/interface"
import { WorldGernerationStages } from "../enums"
import { IPRNG } from "../prng"

export type WorldGeneratorOptions = {
    chunkGenerator: IChunkGenerator
}

export type WorldGeneratorGenerateMethodOptions = IWorldGeneratorGenerateMethodOptions & {}

export type WorldGeneratorGenerateBlocksMethodOptions = {
    prng: IPRNG
    length: number,
    worldData: IWorldData,
    chunkSize: ChunkSize
}

class WorldGenerator extends IWorldGenerator {
    protected generateBlocks({
        prng,
        length,
        worldData,
        chunkSize
    }: WorldGeneratorGenerateBlocksMethodOptions): void {
        this.notifyAll(WorldGernerationStages.GENERATION_OF_CHUNKS_STARTED)

        const allBiomeKeys = Object.keys(this.settings.biomes)
        const biomes: string[] = []
        
        while (biomes.length < length) {
            const selectedBiomeIndex = Math.floor(prng.next() * allBiomeKeys.length)
            const biomeType = allBiomeKeys[selectedBiomeIndex]
            const biome = this.settings.biomes[biomeType]
            const randomRange = prng.next(biome.lengthRange[0], biome.lengthRange[1])

            for (let i = 0; i < randomRange; i++) {
                biomes.push(biomeType)
            }
        }

        for (let chunkIndex = 0; chunkIndex < length; chunkIndex++) {
            const chunkData = this.chunkGenerator.generate({
                biome: biomes[chunkIndex],
                prng: prng,
                size: chunkSize
            })

            worldData.chunks.push(chunkData)
        }

        this.notifyAll(WorldGernerationStages.GENERATION_OF_CHUNKS_FINISHED)
    }

    public generate({
        seed,
        length,
        chunkSize,
        prngClass
    }: WorldGeneratorGenerateMethodOptions): IWorldData {
        const prng = (new prngClass(seed)) as IPRNG

        this.notifyAll(WorldGernerationStages.GENERATION_STARTED)

        const worldData: IWorldData = {
            id: uuidV4(),
            seed: {
                original: seed,
                computed: prng.seed
            },
            chunks: []
        }

        this.generateBlocks({
            prng: prng,
            length: length,
            worldData: worldData,
            chunkSize: chunkSize
        })

        this.notifyAll(WorldGernerationStages.GENERATION_FINISHED)

        return worldData
    }
}

export default WorldGenerator