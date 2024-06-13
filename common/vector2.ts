class Vector2 {
    public constructor(
        public x: number,
        public y: number
    ) {}

    public add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    public multiplyScalar(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar)
    }
}

export default Vector2