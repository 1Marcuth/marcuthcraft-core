import fs from "fs"

import MarcuthcraftCore from "./src"
import WorldClock from "./src/world-clock"

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
        seed: 123,
        data: worldData,
        direction: "RIGHT"
    })

    const worldClock = new WorldClock({ intervalTime: 50 })

    worldClock.subscribe(console.log)

    core.worldManager.setWorld({
        data: worldData,
        entities: [],
        players: [],
        worldClock: worldClock
    })

    fs.writeFileSync("world.json", JSON.stringify(worldData))

    // console.log(worldData.chunks.length)



    // const result = core.commandsManager.runCommand({
    //     name: "help",
    //     options: []
    // })

    // console.log(result)
})()