import defaultWorldGeneratorSettings from "./world-generator/base-settings"
import WorldGenerator, { IWorldGenerator } from "./world-generator"
import IWorldManager from "./world-manager/interface"
import WorldManager from "./world-manager/default"
import ChunkGenerator from "./chunk-generator"
import BlockGenerator from "./block-generator"
import PRNG from "./prng"

export type MarcuthcraftOptions = {
    worldGenerator: IWorldGenerator
    worldManager: IWorldManager
}

class MarcuthcraftCore {
    public worldGenerator: IWorldGenerator
    public worldManager: IWorldManager

    public constructor({
        worldGenerator,
        worldManager
    }: MarcuthcraftOptions) {
        this.worldGenerator = worldGenerator
        this.worldManager = worldManager
    }

    public static createDefault(): MarcuthcraftCore {
        const blockGenerator = new BlockGenerator()

        const chunkGenerator = new ChunkGenerator({
            blockGenerator: blockGenerator
        })

        const worldGenerator = new WorldGenerator({
            chunkGenerator: chunkGenerator,
            settings: defaultWorldGeneratorSettings
        })

        const worldManager = new WorldManager()

        const instance = new MarcuthcraftCore({
            worldGenerator: worldGenerator,
            worldManager: worldManager
        })

        return instance
    }
}

import fs from "fs"

const core = MarcuthcraftCore.createDefault()

core.worldGenerator.subscribe(event => console.log(event))

const worldData = core.worldGenerator.generate({
    seed: "teste",
    length: 100,
    chunkSize: {
        width: 16,
        height: 16
    },
    prngClass: PRNG
})

core.worldManager.setWorld({
    data: worldData,
    entities: [],
    players: []
})

// console.dir(worldData, { depth: null })

fs.writeFileSync("data.json", JSON.stringify(worldData, null, 4))

export default MarcuthcraftCore