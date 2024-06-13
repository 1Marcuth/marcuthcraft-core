import fs from "fs"

import MarcuthCraftCore from "./core"
import WorldGeneratorEvents from "./enums/world-generator-events"

async function main(): Promise<void> {
    const core = MarcuthCraftCore.createDefault()

    core.worldGenerator.on(WorldGeneratorEvents.START, () => {
        console.log("O mundo começou a ser gerado")
    })

    core.worldGenerator.on(WorldGeneratorEvents.END, () => {
        console.log("O mundo foi gerado com sucesso!")
    })

    const { data, generationTime } = core.worldGenerator.generate({
        seed: "teste123",
        length: 1
    })

    console.log(`World data generated in ${generationTime / 1000} seconds`)

    const worldDataString = JSON.stringify(data)
    await fs.promises.writeFile("world-data.json", worldDataString)
}

main()