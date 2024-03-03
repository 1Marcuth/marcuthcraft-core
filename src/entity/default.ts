import IEntity, { IEntityMoveMethodOptions } from "./interface"

export type EntityMoveMethodOptions = IEntityMoveMethodOptions & {}

class Entity extends IEntity {
    public move({
        speed,
        direction
    }: EntityMoveMethodOptions): void {
        
    }
}

const entity = new Entity({
    healthPoints: 1000,
    damagePoints: 1000
})

export default Entity