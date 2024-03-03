export type KeyOf<Type extends object> = keyof Type | Type[keyof Type]

export type Optional<Type extends object> = Type | undefined