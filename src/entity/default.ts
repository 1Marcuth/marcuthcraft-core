import { v4 as uuidV4 } from "uuid"

import IEntity, { EntityData, EntityMoveMethodOptions, Position } from "./interface"
import Observable from "../common/observable"

export type EntityOptions = {
    data: EntityData
    position: Position
}

export type EntityEliminatedMethodOptions = {
    reason: string
}

class Entity extends Observable implements IEntity {
    public id: string
    public data: EntityData
    public position: Position

    public constructor({
        data,
        position
    }: EntityOptions) {
        super()

        this.id = uuidV4()
        this.data = data
        this.position = position
    }

    public move({
        horizontal,
        vertical
    }: EntityMoveMethodOptions): void {
        if (horizontal) {
            if (horizontal === "ADD") {
                this.position.x += this.data.movementSpeed.horizontal
            } else if (horizontal === "SUBTRACT") {
                this.position.x -= this.data.movementSpeed.horizontal
            }
        } else if (vertical) {
            if (vertical === "ADD") {
                this.position.y += this.data.movementSpeed.vertical
            } else if (vertical === "SUBTRACT") {
                this.position.y -= this.data.movementSpeed.vertical
            }
        }
    }

    public eliminate({ reason }: EntityEliminatedMethodOptions): void {
        this.notifyAll("ELIMINATED", {
            reason: reason
        })
    }
}

export default Entity