import Entity from "../entity"
import { EntityOptions } from "../entity/default"

export type Health = {
    current?: number
    initial: number
}

export type Damage = {
    current?: number
    initial: number
}

export type MobAttributes = {
    health: Health
    damage?: Damage
}

export type MobOptions = EntityOptions & {
    attributes: MobAttributes
}

class Mob extends Entity {
    public attributes: MobAttributes & {
        health: {
            current: number
            initial: number
        }
    }

    public constructor({
        data,
        position,
        attributes
    }: MobOptions) {
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

export default Mob