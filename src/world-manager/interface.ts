import IGravityManager from "../gravity-manager/interface"
import { IWorldData } from "../world-generator/inferface"
import Observable from "../common/observable"
import { IWorldClock } from "../world-clock"
import { MoveDirections } from "../enums"
import { KeyOf } from "../types/helper"

export type IEntity = {
    id: string
    move(): void
}

export type IPlayer = {
    id: string
    move(): void
}

export type IWorldManagerSetWorldMethodOptions = {
    data: IWorldData
    entities: IEntity[]
    players: IPlayer[]
    worldClock: IWorldClock
    gravityManager: IGravityManager
}

export type IWorldManagerMoveEntityMethodOptions = {
    id: string
    speed: string
    direction: KeyOf<typeof MoveDirections>
}

export type IWorldManagerMovePlayerMethodOptions = {
    id: string
    speed: string
    direction: KeyOf<typeof MoveDirections>
}

export type PlayerActionDefaultCommand = {
    id: string
    [key: string]: any
}

export type PlayerActionMoveCommand = {
    type: "move"
    speed: number
    direction: KeyOf<typeof MoveDirections>
}

export type PlayerActionCommand = (
    PlayerActionDefaultCommand &
    Partial<PlayerActionMoveCommand>
)

export type EntityActionDefaultCommand = {
    id: string
    [key: string]: any
}

export type EntityActionMoveCommand = {
    id: string
    type: "move"
    speed: number
    direction: KeyOf<typeof MoveDirections>
}

export type EntityActionCommand = (
    EntityActionDefaultCommand &
    Partial<EntityActionMoveCommand>
)

abstract class IWorldManager extends Observable {
    public data?: IWorldData
    public entities?: IEntity[]
    public players?: IPlayer[]
    public worldClock?: IWorldClock
    public gravityManager?: IGravityManager

    public abstract setWorld(options: IWorldManagerSetWorldMethodOptions): void

    public abstract start(): void

    public abstract executeEntityAction(command: EntityActionCommand): void

    public abstract executePlayerAction(command: PlayerActionCommand): void
}

export default IWorldManager