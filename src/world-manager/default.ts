import IWorldManager, { EntityActionCommand, IWorldManagerSetWorldMethodOptions, PlayerActionCommand } from "./interface"

class WorldManager extends IWorldManager {
    public setWorld({
        data,
        entities,
        players,
        worldClock,
        gravityManager
    }: IWorldManagerSetWorldMethodOptions): void {
        this.data = data
        this.entities = entities
        this.players = players
        this.worldClock = worldClock
        this.gravityManager = gravityManager

        this.worldClock.subscribe(this.handleTimeLoop.bind(this))
    }

    public start() {
        if (
            this.data === undefined ||
            this.entities === undefined ||
            this.players === undefined ||
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

    protected handleTimeLoop(event: string): void {
        if (
            this.data === undefined ||
            this.entities === undefined ||
            this.players === undefined ||
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