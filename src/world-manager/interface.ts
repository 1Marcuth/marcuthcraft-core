import { IWorldData } from "../world-generator/inferface"
import Observable from "../common/observable"
import { KeyOf, Optional } from "../types/helper"
import { MoveDirections } from "../enums"

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

    public setWorld({
        data,
        entities,
        players
    }: IWorldManagerSetWorldMethodOptions) {
        this.data = data
        this.entities = entities
        this.players = players
    }

    public executeEntityAction(command: EntityActionCommand): void {
        if (!this.entities || this.entities.length <= 0) return

        if (command.type === "move") {
            const entity = this.entities.find(entity => entity.id === command.id)

            if (entity) {
                entity.move()
            }
        }
    }

    public executePlayerAction(command: PlayerActionCommand): void {
        if (!this.players || this.players.length <= 0) return

        if (command.type === "move") {
            const player = this.players.find(player => player.id === command.id)

            if (player) {
                player.move()
            }
        }
    }
}

export default IWorldManager