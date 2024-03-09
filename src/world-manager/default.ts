import IWorldManager, { EntityActionCommand, IWorldManagerSetWorldMethodOptions, PlayerActionCommand } from "./interface"
import Observable from "../common/observable"
import { WorldData } from "../world-generator/inferface"
import { IEntity } from "../entity"
import { IWorldClock } from "../world-clock"
import { IGravityManager } from "../gravity-manager"

class WorldManager extends Observable implements IWorldManager {
    public data?: WorldData
    public entities?: IEntity[]
    public worldClock?: IWorldClock
    public gravityManager?: IGravityManager

    public constructor() {
        super()
    }

    public setWorld({
        data,
        entities,
        worldClock,
        gravityManager
    }: IWorldManagerSetWorldMethodOptions): void {
        this.data = data
        this.entities = entities
        this.worldClock = worldClock
        this.gravityManager = gravityManager

        this.worldClock.subscribe(this.handleTimeLoop.bind(this))
    }

    public start() {
        if (
            this.data === undefined ||
            this.entities === undefined ||
            this.worldClock === undefined ||
            this.gravityManager === undefined
        ) {
            throw new Error("You must define the clock, gravity manager, data, entities and players present in this before starting the world manager!")
        }

        this.worldClock.start()
    }

    public executeEntityAction(command: EntityActionCommand): void {
        if (!this.entities || this.entities.length <= 0) return

        if (command.type === "move") {
            const entity = this.entities.find(entity => entity.id === command.id)

            if (entity) {
                entity.move({
                    horizontal: command.horizontal,
                    vertical: command.vertical
                })
            }
        }
    }

    protected handleTimeLoop(event: string): void {
        if (
            this.data === undefined ||
            this.entities === undefined ||
            this.worldClock === undefined ||
            this.gravityManager === undefined
        ) {
            throw new Error("You must define the clock, gravity manager, data, entities and players present in this before starting the world manager!")
        }

        if (event === "tick") {
            this.gravityManager.update()
            console.log("Current Day:", this.worldClock.currentDay, "Tick Count:", this.worldClock.tickCount)
        }
    }
}

export default WorldManager