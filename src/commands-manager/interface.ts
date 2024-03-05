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
    run: (options: Option[]) => ICommandsManagerRunCommandMethodOutput
}

export type ICommandsManagerRunCommandMethodOptions = {
    name: string
    options?: string[]
}

export type ICommandsManagerRunCommandMethodOutput = {
    status: "success" | "error"
    logs: string[]
}

export type ICommandsManagerGetCommandsMethodOuput = Command[]

export type ICommandsManagerGetCommandMethodOptions = {
    name: string
}

export type ICommandsManagerGetCommandMethodOuput = Optional<Command>

abstract class ICommandsManager extends Observable {
    public commands: Command[]

    public constructor(commands: Command[]) {
        super()
        this.commands = commands
    }

    public abstract runCommand(options: ICommandsManagerRunCommandMethodOptions): ICommandsManagerRunCommandMethodOutput
    public abstract getCommand(options: ICommandsManagerGetCommandMethodOptions): ICommandsManagerGetCommandMethodOuput
    public abstract getCommands(): ICommandsManagerGetCommandsMethodOuput
}

export default ICommandsManager