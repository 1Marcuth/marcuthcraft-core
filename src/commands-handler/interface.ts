import { CommandOption } from "command-options-handler"
import Observable from "../common/observable"
import { Optional } from "../types/helper"

export type Option<Value = any> = {
    name: string
    value: Value
}

export type Command = {
    name: string
    onlyWithCheats: boolean
    description: string
    options?: CommandOption[]
    run: (options: Option[]) => ICommandsHandlerRunCommandMethodOutput
}

export type ICommandsHandlerRunCommandMethodOptions = {
    name: string
    options?: string[]
}

export type ICommandsHandlerRunCommandMethodOutput = {
    status: "success" | "error"
    logs: string[]
}

export type ICommandsHandlerGetCommandsMethodOuput = Command[]

export type ICommandsHandlerGetCommandMethodOptions = {
    name: string
}

export type ICommandsHandlerGetCommandMethodOuput = Optional<Command>

abstract class ICommandsHandler extends Observable {
    public commands: Command[]

    public constructor(commands: Command[]) {
        this.commands = commands
    }

    public abstract runCommand(options: ICommandsHandlerRunCommandMethodOptions): ICommandsHandlerRunCommandMethodOutput
    public abstract getCommand(options: ICommandsHandlerGetCommandMethodOptions): ICommandsHandlerGetCommandMethodOuput
    public abstract getCommands(): ICommandsHandlerGetCommandsMethodOuput
}

export default ICommandsHandler