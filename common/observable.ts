export type ObserverSync = (event: string, ...args: any[]) => any
export type ObserverAsync = (event: string, ...args: any[]) => Promise<any>
export type Observer = ObserverSync | ObserverAsync

class Observable {
    protected readonly observers: Observer[]
    protected readonly specializedObservers: [string, Observer][]

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
                observer(observerEvent)
            }
        })
    }

    public on(event: string, observer: Observer): void {
        this.specializedObservers.push([ event, observer ])
    }
}

export default Observable