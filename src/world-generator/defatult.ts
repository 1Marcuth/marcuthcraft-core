import { v4 as uuidV4 } from "uuid"

import IWorldGenerator, { IWorldContinueGenerationMethodOptions, IWorldData, IWorldGeneratorGenerateMethodOptions } from "./inferface"
import IChunkGenerator, { ChunkSize } from "../chunk-generator/interface"
import createInstance from "../utils/create-instance"
import { WorldGernerationStages } from "../enums"
import { IPRNG } from "../prng"

export type WorldGeneratorOptions = {
    chunkGenerator: IChunkGenerator
}

export type WorldGeneratorGenerateMethodOptions = IWorldGeneratorGenerateMethodOptions & {}

export type WorldGeneratorGenerateBlocksMethodOptions = {
    prng: IPRNG
    length: number
    worldData: IWorldData
    chunkSize: ChunkSize
    isContinuation?: boolean
}

export type WorldGeneratorMergeWorldDataMethodOptions = {
    original: IWorldData
    extra: IWorldData
    direction: "LEFT" | "RIGHT"
}

export type WorldGeneratorGenerateChunksMethodOptions = {
    prng: IPRNG
    length: number
    worldData: IWorldData
    chunkSize: ChunkSize
    chunkIndex: number
    isContinuation?: boolean
}

class WorldGenerator extends IWorldGenerator {
    protected generateBlocks({
        prng,
        length,
        worldData,
        chunkSize,
        isContinuation
    }: WorldGeneratorGenerateBlocksMethodOptions): void {
        this.notifyAll(
            isContinuation ?
            WorldGernerationStages["CONTINUATION.GENERATION_OF_CHUNKS_STARTED"] :
            WorldGernerationStages.GENERATION_OF_CHUNKS_STARTED
        )

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
            const biomeType = biomes[chunkIndex]

            const chunkData = this.chunkGenerator.generate({
                biome: biomeType,
                prng: prng,
                size: chunkSize,
                biomeSettings: this.settings.biomes[biomeType as any],
                terrainNoise: ,
            })

            worldData.chunks.push(chunkData)
        }

        this.notifyAll(
            isContinuation ?
            WorldGernerationStages["CONTINUATION.GENERATION_OF_CHUNKS_FINISHED"] :
            WorldGernerationStages.GENERATION_OF_CHUNKS_FINISHED
        )
    }

    protected generateChunks({
        prng,
        length,
        worldData,
        chunkSize,
        isContinuation
    }: WorldGeneratorGenerateChunksMethodOptions): void {
        this.notifyAll(
            isContinuation ?
            WorldGernerationStages["CONTINUATION.GENERATION_OF_CHUNKS_STARTED"] :
            WorldGernerationStages.GENERATION_OF_CHUNKS_STARTED
        )

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
            const terrainNoisePreset = this.settings.biomes[biomes[chunkIndex]].terrainNoise

            const terrainNoise = this.noiseClass.generateHeightMap({
                seed: prng.seed,
                offset: chunkIndex * chunkSize.width,
                width: chunkSize.width,
                ...terrainNoisePreset
            })

            const chunkData = this.chunkGenerator.generate({
                biome: biomes[chunkIndex],
                prng: prng,
                size: chunkSize,
                terrainNoise: terrainNoise,
                biomeSettings: 
            })

            worldData.chunks.push(chunkData)
        }

        this.notifyAll(
            isContinuation ?
            WorldGernerationStages["CONTINUATION.GENERATION_OF_CHUNKS_FINISHED"] :
            WorldGernerationStages.GENERATION_OF_CHUNKS_FINISHED
        )
    }

    public generate({
        seed,
        length,
        chunkSize
    }: WorldGeneratorGenerateMethodOptions): IWorldData {
        const prng = createInstance<IPRNG>(this.prngClass, seed)

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

    public static mergeWorldData({
        original,
        extra,
        direction
    }: WorldGeneratorMergeWorldDataMethodOptions): IWorldData {
        const finalWorldData = {...original}

        finalWorldData.chunks = direction === "LEFT" ?
            [...extra.chunks, ...original.chunks] :
            [...original.chunks, ...extra.chunks]

        return finalWorldData
    }

    public continueGeneration({
        seed,
        length,
        chunkSize,
        data,
        direction
    }: IWorldContinueGenerationMethodOptions): void {
        const prng = createInstance<IPRNG>(this.prngClass, seed)

        this.notifyAll(WorldGernerationStages["CONTINUATION.GENERATION_STARTED"])

        const extraWorldData = {
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
            worldData: extraWorldData,
            chunkSize: chunkSize,
            isContinuation: true
        })

        const finalWorldData = WorldGenerator.mergeWorldData({
            original: data,
            extra: extraWorldData,
            direction: direction
        })

        data = Object.assign(data, finalWorldData)

        this.notifyAll(WorldGernerationStages["CONTINUATION.GENERATION_FINISHED"])
    }
}

export default WorldGenerator