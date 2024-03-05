import { IPRNG } from "../prng"

export type INoiseMap2D = number[][]

export type INoiseGenerateHeightMapOptions = {
    seed: number
    width: number
    offset: number
    scale: number
    octaves: number
    persistence: number
    lacunarity: number
}

export type INoiseGenerateCavesMapMethodOptions = {
    prng: IPRNG
    width: number
    height: number
    density: number
    iterations: number
}

export type INoiseGenerateOresMapMethodOptions = {
    prng: IPRNG
    width: number
    height: number
    density: number
    iterations: number
}

abstract class INoise {
    public static generateHeightMap(options: INoiseGenerateHeightMapOptions): number[] {
        throw new Error("This method has not been implemented!")
    }

    public static generateCavesMap(options: INoiseGenerateCavesMapMethodOptions): INoiseMap2D {
        throw new Error("This method has not been implemented!")
    }
    
    public static generateOresMap(options: INoiseGenerateOresMapMethodOptions): INoiseMap2D {
        throw new Error("This method has not been implemented!")
    }
}

export default INoise