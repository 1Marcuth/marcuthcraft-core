import fs from "fs"

import MarcuthcraftCore from "./src"
import WorldClock from "./src/world-clock"
import GravityManager from "./src/gravity-manager"

(async () => {
    const core = MarcuthcraftCore.createDefault()

    core.worldGenerator.subscribe(console.log)
    const worldHeight = 128

    const worldData = core.worldGenerator.generate({
        chunkSize: {
            width: 16,
            height: worldHeight
        },
        length: 10,
        seed: 123
    })

    core.worldGenerator.continueGeneration({
        chunkSize: {
            width: 16,
            height: worldHeight
        },
        length: 10,
        seed: 123,
        data: worldData,
        direction: "LEFT"
    })

    core.worldGenerator.continueGeneration({
        chunkSize: {
            width: 16,
            height: worldHeight
        },
        length: 10,
        seed: "123",
        data: worldData,
        direction: "RIGHT"
    })

    const worldClock = new WorldClock({ intervalTime: 50 })

    const gravityManager = new GravityManager({
        data: worldData,
        simulationDistance: 2
    })

    core.worldManager.setWorld({
        data: worldData,
        entities: [],
        worldClock: worldClock,
        gravityManager: gravityManager
    })

    core.worldManager.start()

    fs.writeFileSync("examples/world.json", JSON.stringify({
        entities: [],
        data: worldData
    }))

    // console.log(worldData.chunks.length)

    // const result = core.commandsManager.runCommand({
    //     name: "help",
    //     options: []
    // })

    // console.log(result)
})()