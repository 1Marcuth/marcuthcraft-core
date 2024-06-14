export type ChunkSize = {
    width: number
    height: number
}

export type GenerationConfig = {
    chunkSize: ChunkSize
}

const defaultGenerationConfig: GenerationConfig = {
    chunkSize: {
        width: 16,
        height: 256
    }
}

export default defaultGenerationConfig