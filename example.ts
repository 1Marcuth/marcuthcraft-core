import MarcuthcraftCore from "./src/marcuthcraft"
import Noise from "./src/noise/default"
import PRNG from "./src/prng"

(async () => {
    const core = MarcuthcraftCore.createDefault()

    const worldData = core.worldGenerator.generate({
        chunkSize: {
            width: 16,
            height: 16
        },
        length: 10,
        seed: 123,
        prngClass: PRNG
    })

    core.worldGenerator.continueGeneration({
        chunkSize: {
            width: 16,
            height: 16
        },
        length: 10,
        seed: 123,
        prngClass: PRNG,
        data: worldData,
        direction: "LEFT"
    })

    console.log(worldData.chunks.length)



    // const result = core.commandsHandler.runCommand({
    //     name: "help",
    //     options: []
    // })

    // console.log(result)
})()