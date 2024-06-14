import fs from "fs"

import MarcuthCraftCore from "./src/core"
import WorldGeneratorEvents from "./src/enums/world-generator-events"
import WorldClockManagerEvents from "./src/enums/world-clock-manager-events"
import { WorldClockData } from "./src/managers/world-clock"
import { EntityData } from "./src/managers/entity"

async function main(): Promise<void> {
    const core = MarcuthCraftCore.createDefault()

    core.worldGenerator.on(WorldGeneratorEvents.START, () => {
        console.log("O mundo começou a ser gerado")
    })

    core.worldGenerator.on(WorldGeneratorEvents.END, () => {
        console.log("O mundo foi gerado com sucesso!")
    })

    const { data: worldData, generationTime } = core.worldGenerator.generate({
        seed: "teste123",
        length: 1
    })

    const clockData: WorldClockData = { ticks: 0 }

    const entitiesData: EntityData[] = []

    // const { worldClockManager } = core.worldManager.execute({
    //     clockData: clockData,
    //     data: worldData,
    //     entitiesData: entitiesData
    // })

    // worldClockManager.on(WorldClockManagerEvents.TICK, ({ ticks }) => {
    //     console.log(ticks)
    // })

    console.log(`World data generated in ${generationTime / 1000} seconds`)

    const worldDataString = JSON.stringify({
        clock: clockData,
        entities: entitiesData,
        world: worldData
    })

    await fs.promises.writeFile("world.json", worldDataString)
}

main()