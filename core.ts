import BlockGenerator from "./generators/block"
import ChunkGenerator from "./generators/chunk"
import WorldGenerator from "./generators/world"
import PRNG from "./utils/prng"

export type MarcuthCraftCoreConstructorOptions = {
    worldGenerator: WorldGenerator
    prngClass: typeof PRNG
}

class MarcuthCraftCore {
    public prngClass: typeof PRNG
    public worldGenerator: WorldGenerator

    public constructor({
        prngClass,
        worldGenerator
    }: MarcuthCraftCoreConstructorOptions) {
        this.prngClass = prngClass
        this.worldGenerator = worldGenerator
    }

    public static createDefault(): MarcuthCraftCore {
        const blockGenerator = new BlockGenerator({})

        const chunkGenerator = new ChunkGenerator({
            blockGenerator: blockGenerator
        })

        const worldGenerator = new WorldGenerator({
            prngClass: PRNG,
            chunkGenerator: chunkGenerator
        })

        const instance = new MarcuthCraftCore({
            prngClass: PRNG,
            worldGenerator: worldGenerator
        })

        return instance
    }
}

export default MarcuthCraftCore