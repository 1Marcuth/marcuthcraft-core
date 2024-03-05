import { Command, /* Option, */ ICommandsManagerRunCommandMethodOutput } from "../commands-manager/interface"

const commands: Command[] = [
    {
        name: "help",
        onlyWithCheats: false,
        description: "Shows all available commands and their options.",
        run: (): ICommandsManagerRunCommandMethodOutput => {
            const output: ICommandsManagerRunCommandMethodOutput = {
                status: "success",
                logs: [],
            }

            output.logs.push("Hello World")

            return output
        }
    }
]

export default commands