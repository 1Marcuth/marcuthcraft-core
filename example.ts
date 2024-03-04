import MarcuthcraftCore from "./src/marcuthcraft"

(async () => {
    const core = MarcuthcraftCore.createDefault()

    const result = core.commandsHandler.runCommand({
        name: "help",
        options: []
    })

    console.log(result)
})()