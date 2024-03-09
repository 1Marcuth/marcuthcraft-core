import IGravityManager from "../gravity-manager/interface"
import { WorldData } from "../world-generator/inferface"
import Observable from "../common/observable"
import { IWorldClock } from "../world-clock"
import { MoveDirections } from "../enums"
import { KeyOf } from "../types/helper"
import { IEntity } from "../entity"

export type IWorldManagerSetWorldMethodOptions = {
    data: WorldData
    entities: IEntity[]
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

interface IWorldManager extends Observable {
    data?: WorldData
    entities?: IEntity[]
    worldClock?: IWorldClock
    gravityManager?: IGravityManager

    setWorld(options: IWorldManagerSetWorldMethodOptions): void
    start(): void
    executeEntityAction(command: EntityActionCommand): void
}

export default IWorldManager