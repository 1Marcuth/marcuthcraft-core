import { v4 as uuidV4 } from "uuid"

import IWorldGenerator, { IWorldData, IWorldGeneratorGenerateMethodOptions } from "./inferface"
import IChunkGenerator from "../chunk-generator/interface"
import { WorldGernerationStages } from "../enums"
import { IPRNG } from "../prng"

export type WorldGeneratorOptions = {
    chunkGenerator: IChunkGenerator
}

export type WorldGeneratorGenerateMethodOptions = IWorldGeneratorGenerateMethodOptions & {}

class WorldGenerator extends IWorldGenerator {
    public generate({
        seed,
        length,
        chunkSize,
        prngClass
    }: WorldGeneratorGenerateMethodOptions): IWorldData {
        const prng = (new prngClass(seed)) as IPRNG

        this.notifyAll(WorldGernerationStages.STARTING_CHUNKS_GENERATION)

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

        const worldData: IWorldData = {
            id: uuidV4(),
            seed: {
                original: seed,
                computed: prng.seed
            },
            chunks: []
        }

        for (let chunkIndex = 0; chunkIndex < length; chunkIndex++) {
            const chunkData = this.chunkGenerator.generate({
                biome: biomes[chunkIndex],
                prng: prng,
                size: chunkSize
            })

            worldData.chunks.push(chunkData)
        }

        this.notifyAll(WorldGernerationStages.ENDING_CHUNKS_GENERATION)

        return worldData
    }
}

export default WorldGenerator