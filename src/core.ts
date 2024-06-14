import defaultGenerationConfig from "./default-configs/generation"
import { defaultTickIntervalTime } from "./default-configs/clock"
import WorldClockManager from "./managers/world-clock"
import BlockGenerator from "./generators/block"
import ChunkGenerator from "./generators/chunk"
import WorldGenerator from "./generators/world"
import WorldManager from "./managers/world"
import PRNG from "./utils/prng"

export type MarcuthCraftCoreConstructorOptions = {
    prngClass: typeof PRNG
    worldGenerator: WorldGenerator
    worldManager: WorldManager
}

class MarcuthCraftCore {
    public readonly prngClass: typeof PRNG
    public readonly worldGenerator: WorldGenerator
    public readonly worldManager: WorldManager

    public constructor({
        prngClass,
        worldGenerator,
        worldManager
    }: MarcuthCraftCoreConstructorOptions) {
        this.prngClass = prngClass
        this.worldGenerator = worldGenerator
        this.worldManager = worldManager
    }

    public static createDefault(): MarcuthCraftCore {
        const blockGenerator = new BlockGenerator({})

        const chunkGenerator = new ChunkGenerator({
            blockGenerator: blockGenerator
        })

        const worldGenerator = new WorldGenerator({
            prngClass: PRNG,
            chunkGenerator: chunkGenerator,
            generationConfig: defaultGenerationConfig
        })

        const worldManager = new WorldManager({
            worldClockManagerClass:  WorldClockManager,
            tickIntervalTime: defaultTickIntervalTime
        })

        const instance = new MarcuthCraftCore({
            prngClass: PRNG,
            worldGenerator: worldGenerator,
            worldManager: worldManager
        })

        return instance
    }
}

export default MarcuthCraftCore