import Observable from "../common/observable"
import Vector2 from "../common/vector2"

export type EntityData = {
    type: string
    position: Vector2
}

export type EntityConstructorOptions = {
    data: EntityData
}

class Entity extends Observable {
    protected data: EntityData

    public constructor({
        data
    }: EntityConstructorOptions) {
        super()
        
        this.data = data
    }

    public setPosition(newPosition: Vector2): void {
        this.data.position = newPosition
    }

    public move(offset: Vector2): void {
        this.data.position = new Vector2(
            this.data.position.x + offset.x,
            this.data.position.y + offset.y
        )
    }

    public clone(): Entity {
        return new Entity({
            data: {
                type: this.data.type,
                position: new Vector2(this.data.position.x, this.data.position.y)
            }
        })
    }

    public destroy(): void {
        
    }
}

export default Entity