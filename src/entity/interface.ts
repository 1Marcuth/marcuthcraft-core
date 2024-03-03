import { v4 as uuidV4 } from "uuid"

import { DeathReasons, MoveDirections } from "../enums"
import Observable from "../common/observable"
import { KeyOf } from "../types/helper"

export type IEntityOptions = {
    healthPoints: number
    damagePoints: number
}

export type IEntityMoveMethodOptions = {
    speed: number
    direction: KeyOf<typeof MoveDirections>
}

export type IEntityIncreaseHealthPointOptions = {
    points: number
    reason: string
}

export type IEntityDecreaseHealthPointOptions = {
    points: number
    reason: string
}

export type IEntityBeAttackedMethodOptions = {
    byEntityId?: string
    damageType: string
    damage: number
}

export type IEntityAttackMethodOptions = {
    forEntity: IEntity
    damageType: string
    damage: number
}

export type IEntityDieMethodOptions = {
    reason: (KeyOf<typeof DeathReasons>) | string
}

export type IEntitySetHealthPointOptions = {
    points: number
}

abstract class IEntity extends Observable {
    public id: string
    protected originalHealthPoints: number
    protected originalDamagePoints: number
    public healthPoints: number
    public damagePoints: number

    public constructor({
        healthPoints,
        damagePoints
    }: IEntityOptions) {
        super()

        this.id = uuidV4()
        this.originalHealthPoints = healthPoints
        this.originalDamagePoints = damagePoints
        this.healthPoints = healthPoints
        this.damagePoints = damagePoints

        this.subscribe(this.handleEvent.bind(this))
    }

    protected handleEvent(event: string, ...args: any[]): void {
        switch (event) {
            case "LOST_HEALTH_POINTS": {
                const { healthPoints, reason } = args[0]

                if (healthPoints <= 0) {
                    this.die({ reason: reason })
                }

                break
            }
        }
    }

    public abstract move(options: IEntityMoveMethodOptions): void

    protected setHealthPoints({
        points
    }: IEntitySetHealthPointOptions): void {
        this.healthPoints = points
    }

    protected increaseHealthPoints({
        points,
        reason
    }: IEntityIncreaseHealthPointOptions): void {
        this.healthPoints = Math.min(this.healthPoints + points, this.originalHealthPoints)

        this.notifyAll("RECEIVED_HEALTH_POINTS", {
            points: points,
            healthPoints: this.healthPoints,
            reason: reason
        })
    }

    protected decreaseHealthPoints({
        points,
        reason
    }: IEntityDecreaseHealthPointOptions): void {
        this.healthPoints = Math.max(this.healthPoints - points, 0)

        this.notifyAll("LOST_HEALTH_POINTS", {
            points: points,
            healthPoints: this.healthPoints,
            reason: reason
        })
    }

    public beAttacked({
        damage,
        damageType,
        byEntityId
    }: IEntityBeAttackedMethodOptions): void {

        this.notifyAll("WAS_ATTACKED", {
            damage: damage,
            damageType: damageType,
            healthPoints: this.healthPoints,
            isAlive: this.isAlive,
            byEntityId: byEntityId
        })
    }

    public attack({
        damage,
        damageType,
        forEntity
    }: IEntityAttackMethodOptions): void {
        forEntity.beAttacked({
            damage: damage,
            damageType: damageType,
            byEntityId: this.id
        })

        this.notifyAll("ATTACKED", {
            damage: damage,
            damageType: damageType,
            forEntityId: forEntity.id
        })
    }

    protected die({
        reason
    }: IEntityDieMethodOptions): void {
        this.notifyAll("DIED", {
            reason: reason
        })
    }

    public get isAlive(): boolean {
        return this.healthPoints > 0
    }

    public get isDead(): boolean {
        return !this.isAlive
    }
}

export default IEntity