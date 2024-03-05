import INoise, {
    INoiseGenerateCavesMapMethodOptions,
    INoiseGenerateOresMapMethodOptions,
    INoiseGenerateHeightMapOptions,
    INoiseMap2D
} from "./interface"
import { IPRNG } from "../prng"
import Perlin from "../perlin"

export type NoiseGenerate2DMapMethodOptions = {
    prng: IPRNG
    width: number
    height: number
    density: number
    iterations: number
}

class Noise extends INoise {
    private static generate2DMap({
        prng,
        width,
        height,
        density,
        iterations,
    }: NoiseGenerate2DMapMethodOptions): INoiseMap2D {
        const generateInitialMap = (): INoiseMap2D => {
            const map2D: INoiseMap2D = []

            for (let x = 0; x < width; x++) {
                map2D[x] = []

                for (let y = 0; y < height; y++) {
                    map2D[x][y] = prng.next() < density ? 1 : 0
                }
            }

            return map2D
        }

        const iterateMap = (map2D: INoiseMap2D): void => {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const wallCount = getNeighborsWalls(map2D, x, y)
                    map2D[x][y] = wallCount > 4 ? 1 : 0
                }
            }
        }

        const getNeighborsWalls = (cavesMap: INoiseMap2D, x: number, y: number): number => {
            let wallCount = 0

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i !== x || j !== y) {
                        if (x + i < 0 || y + j < 0 || x + i >= width || y + j >= height) {
                            wallCount++
                        } else {
                            wallCount += cavesMap[x + i][y + j] ? 1 : 0
                        }
                    }
                }
            }

            return wallCount
        }

        const noiseMap2D = generateInitialMap()

        for (let i = 0; i < iterations; i++) {
            iterateMap(noiseMap2D)
        }

        return noiseMap2D
    }

    public static generateHeightMap({
        seed,
        width,
        offset,
        scale,
        octaves,
        persistence,
        lacunarity,
    }: INoiseGenerateHeightMapOptions): number[] {
        const hightMap: number[] = []

        if (scale <= 0) scale = 0.001

        for (let x = 0; x < width; x++) {
            let height = 0
            let frequency = 1
            let amplitude = 1

            for (let i = 0; i < octaves; i++) {
                const y = (x + offset) / scale * frequency
                height += Perlin.noise(seed, y) * amplitude
                amplitude *= persistence
                frequency *= lacunarity
            }

            hightMap[x] = height
        }

        return hightMap
    }

    public static generateCavesMap(options: INoiseGenerateOresMapMethodOptions): INoiseMap2D {
        return this.generate2DMap(options)
    }

    public static generateOresMap(options: INoiseGenerateCavesMapMethodOptions): INoiseMap2D {
        return this.generate2DMap(options)
    }
}

export default Noise