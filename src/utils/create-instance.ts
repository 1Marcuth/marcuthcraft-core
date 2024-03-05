const createInstance = <ObjetType = any>(object: any, ...args: any[]): ObjetType => {
    return new object(...args)
}

export default createInstance