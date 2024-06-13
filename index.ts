import MarcuthCraftCore from "./core"

async function main(): Promise<void> {
    const core = MarcuthCraftCore.createDefault()
    const worldData = core.worldGenerator.generate({ seed: "teste123" })
    console.log(worldData)
}

main()