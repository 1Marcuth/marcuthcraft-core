import { Command, /* Option, */ ICommandsHandlerRunCommandMethodOutput } from "../commands-handler/interface"

const commands: Command[] = [
    {
        name: "help",
        onlyWithCheats: false,
        description: "Shows all available commands and their options.",
        run: (): ICommandsHandlerRunCommandMethodOutput => {
            const output: ICommandsHandlerRunCommandMethodOutput = {
                status: "success",
                logs: [],
            }

            output.logs.push("Hello World")

            return output
        }
    }
]

export default commands