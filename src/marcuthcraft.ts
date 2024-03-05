import defaultWorldGeneratorSettings from "./world-generator/base-settings"
import CommandsManager, { ICommandsManager } from "./commands-manager"
import WorldGenerator, { IWorldGenerator } from "./world-generator"
import WorldManager, { IWorldManager } from "./world-manager"
import ChunkGenerator from "./chunk-generator"
import BlockGenerator from "./block-generator"
import commands from "./presets/commands"
import Noise from "./noise"
import PRNG from "./prng"

export type MarcuthcraftOptions = {
    worldGenerator: IWorldGenerator
    worldManager: IWorldManager
    commandsManager: ICommandsManager
    // chatManager: IChatManager
}

class MarcuthcraftCore {
    public worldGenerator: IWorldGenerator
    public worldManager: IWorldManager
    public commandsManager: ICommandsManager

    public constructor({
        worldGenerator,
        worldManager,
        commandsManager
    }: MarcuthcraftOptions) {
        this.worldGenerator = worldGenerator
        this.worldManager = worldManager
        this.commandsManager = commandsManager
    }

    public static createDefault(): MarcuthcraftCore {
        const blockGenerator = new BlockGenerator()

        const chunkGenerator = new ChunkGenerator({
            blockGenerator: blockGenerator
        })

        const worldGenerator = new WorldGenerator({
            chunkGenerator: chunkGenerator,
            settings: defaultWorldGeneratorSettings,
            prngClass: PRNG,
            noiseClass: Noise
        })

        const worldManager = new WorldManager()

        const commandsManager = new CommandsManager(commands)

        const instance = new MarcuthcraftCore({
            worldGenerator: worldGenerator,
            worldManager: worldManager,
            commandsManager: commandsManager
        })

        return instance
    }
}

// import fs from "fs"


// const core = MarcuthcraftCore.createDefault()

// core.worldGenerator.subscribe(event => console.log(event))

// const worldData = core.worldGenerator.generate({
//     seed: "teste",
//     length: 100,
//     chunkSize: {
//         width: 16,
//         height: 16
//     },
//     prngClass: PRNG
// })

// core.worldManager.setWorld({
//     data: worldData,
//     entities: [],
//     players: []
// })

// // console.dir(worldData, { depth: null })

// fs.writeFileSync("data.json", JSON.stringify(worldData, null, 4))

export default MarcuthcraftCore