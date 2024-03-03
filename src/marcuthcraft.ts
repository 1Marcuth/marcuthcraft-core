import defaultWorldGeneratorSettings from "./world-generator/base-settings"
import WorldGenerator, { IWorldGenerator } from "./world-generator"
import ChunkGenerator from "./chunk-generator"
import BlockGenerator from "./block-generator"
import PRNG from "./prng"

export type MarcuthcraftOptions = {
    worldGenerator: IWorldGenerator
}

class MarcuthcraftCore {
    public worldGenerator: IWorldGenerator

    public constructor({
        worldGenerator
    }: MarcuthcraftOptions) {
        this.worldGenerator = worldGenerator
    }

    public static default(): MarcuthcraftCore {
        const blockGenerator = new BlockGenerator()

        const chunkGenerator = new ChunkGenerator({
            blockGenerator: blockGenerator
        })

        const worldGenerator = new WorldGenerator({
            chunkGenerator: chunkGenerator,
            settings: defaultWorldGeneratorSettings
        }) 

        const instance = new MarcuthcraftCore({
            worldGenerator: worldGenerator
        })

        return instance
    }
}

import fs from "fs"

const core = MarcuthcraftCore.default()

const worldData = core.worldGenerator.generate({
    seed: "teste",
    length: 100,
    chunkSize: {
        width: 16,
        height: 16
    },
    prngClass: PRNG
})

// console.dir(worldData, { depth: null })

fs.writeFileSync("data.json", JSON.stringify(worldData))

export default MarcuthcraftCore