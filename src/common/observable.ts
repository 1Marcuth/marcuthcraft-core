export type ObserverSync = (event: string, data: any) => any
export type ObserverAsync = (event: string, data: any) => Promise<any>
export type Observer = ObserverSync | ObserverAsync

export type SpecializedObserverSync = (data: any) => any
export type SpecializedObserverAsync = (data: any) => Promise<any>
export type SpecializedObserver = SpecializedObserverSync | SpecializedObserverAsync

class Observable {
    protected readonly observers: Observer[]
    protected readonly specializedObservers: [string, SpecializedObserver][]

    public constructor() {
        this.observers = []
        this.specializedObservers = []
    }

    public subscribe(observer: Observer): void {
        this.observers.push(observer)
    }

    protected notifyAll(event: string, data?: any): void {
        this.observers.forEach(observer => {
            observer(event, data)
        })

        this.specializedObservers.forEach(([ observerEvent, observer ]) => {
            if (event === observerEvent) {
                observer(data)
            }
        })
    }

    public on(event: string, observer: SpecializedObserver): void {
        this.specializedObservers.push([ event, observer ])
    }
}

export default Observable