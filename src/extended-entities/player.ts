import { EntityOptions } from "../entity/default"
import Entity, { IEntity } from "../entity"

export type Health = {
    current?: number
    initial: number
}

export type Damage = {
    current?: number
    initial: number
}

export type PlayerAttributs = {
    health: Health
    damage: Damage
}

export type PlayerOptions = EntityOptions & {
    attributes: PlayerAttributs
}

class Player extends Entity implements IEntity {
    public attributes: PlayerAttributs & {
        health: {
            current: number
            initial: number
        }
    }

    public constructor({
        data,
        position,
        attributes
    }: PlayerOptions) {
        super({
            data: data,
            position: position
        })

        this.attributes = {
            ...attributes,
            health: {
                initial: attributes.health.initial,
                current: attributes.health.current ?? attributes.health.initial
            }
        }

        if (attributes.damage) {
            attributes.damage = {
                initial: attributes.damage.initial,
                current: attributes.damage.current ?? attributes.damage.initial
            }
        }
    }

    public get isAlive() {
        return this.attributes.health.current > 0
    }

    public get isDead() {
        return !this.isAlive
    }
}

export default Player