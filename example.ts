import MarcuthcraftCore from "./src"

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

    console.log(worldData.chunks.length)



    // const result = core.commandsManager.runCommand({
    //     name: "help",
    //     options: []
    // })

    // console.log(result)
})()