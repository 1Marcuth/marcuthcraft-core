import CommandHandler from "command-options-handler"

import ICommandsHandler, {
    ICommandsHandlerGetCommandMethodOptions,
    ICommandsHandlerGetCommandMethodOuput,
    ICommandsHandlerGetCommandsMethodOuput,
    ICommandsHandlerRunCommandMethodOptions,
    ICommandsHandlerRunCommandMethodOutput
} from "./interface"

class CommandsHandler extends ICommandsHandler {
    public runCommand({
        name,
        options
    }: ICommandsHandlerRunCommandMethodOptions): ICommandsHandlerRunCommandMethodOutput {
        const command = this.getCommand({ name: name })

        if (!command) {
            throw new Error(`The name command \`${name}\` does not exist!`)
        }

        const commandHandler = new CommandHandler(command)
        const handlingResult = commandHandler.handleStringOptions(options || [])

        if (!handlingResult.isValid) {
            const defaultMessage = `The \`${name}\` command options were not passed correctly, please check the writing and try again!`
            throw new Error(handlingResult.reason || defaultMessage)
        }

        const parsedOptions = handlingResult.optionsValidation.map(option => {
            return {
                name: option.name,
                value: option.value
            }
        })

        const runningResult = command.run(parsedOptions)

        return runningResult
    }

    public getCommand({
        name
    }: ICommandsHandlerGetCommandMethodOptions): ICommandsHandlerGetCommandMethodOuput {
        const command = this.commands.find(command => command.name === name)
        return command
    }

    public getCommands(): ICommandsHandlerGetCommandsMethodOuput {
        return this.commands
    }
}

export default CommandsHandler