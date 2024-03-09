import Observable from "../common/observable"

export type EntityMoveMethodOptions = {
    vertical?: false | "ADD" | "SUBTRACT"
    horizontal?: false | "ADD" | "SUBTRACT"
}

export type MovementSpeed = {
    vertical: number
    horizontal: number
}

export type EntityData = {
    movementSpeed: MovementSpeed
}

export type Position = {
    x: number
    y: number
}

interface IEntity extends Observable {
    id: string
    data: EntityData
    position: Position

    move(directions: EntityMoveMethodOptions): void
}

export default IEntity