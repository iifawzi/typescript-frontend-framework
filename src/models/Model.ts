import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<k extends keyof T>(key: k): T[k]
  set(update: T): void;
  getAll(): T;

}

interface ApiSync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callbck: () => void): void;
  trigger(eventName: string): void;
}

interface hasId {
  id?: number
}

export class Model<T extends hasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: ApiSync<T>
  ) { }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.get("id");

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((response: AxiosResponse): void => {
      this.trigger('save');
    }).catch(() => {
      this.trigger('error');
    })
  }
}