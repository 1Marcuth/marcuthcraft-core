import defaultWorldGeneratorSettings from "./world-generator/base-settings"
import WorldGenerator, { IWorldGenerator } from "./world-generator"
import ICommandsHandler from "./commands-handler/interface"
import IWorldManager from "./world-manager/interface"
import WorldManager from "./world-manager/default"
import CommandsHandler from "./commands-handler"
import ChunkGenerator from "./chunk-generator"
import BlockGenerator from "./block-generator"
import commands from "./presets/commands"
import PRNG from "./prng"
import Noise from "./noise"

export type MarcuthcraftOptions = {
    worldGenerator: IWorldGenerator
    worldManager: IWorldManager
    commandsHandler: ICommandsHandler
}

class MarcuthcraftCore {
    public worldGenerator: IWorldGenerator
    public worldManager: IWorldManager
    public commandsHandler: ICommandsHandler

    public constructor({
        worldGenerator,
        worldManager,
        commandsHandler
    }: MarcuthcraftOptions) {
        this.worldGenerator = worldGenerator
        this.worldManager = worldManager
        this.commandsHandler = commandsHandler
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

        const commandsHandler = new CommandsHandler(commands)

        const instance = new MarcuthcraftCore({
            worldGenerator: worldGenerator,
            worldManager: worldManager,
            commandsHandler: commandsHandler
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