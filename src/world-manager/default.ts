import IWorldManager, { EntityActionCommand, IWorldManagerSetWorldMethodOptions, PlayerActionCommand } from "./interface"

class WorldManager extends IWorldManager {
    public setWorld({ data, entities, players, worldClock }: IWorldManagerSetWorldMethodOptions): void {
        this.data = data
        this.entities = entities
        this.players = players
        this.worldClock = worldClock

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
}

export default WorldManager