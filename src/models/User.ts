import { Eventing } from "./eventing";
import { Sync } from "./Sync"
import { Attributes } from "./Attributes"
import { AxiosPromise, AxiosResponse } from "axios";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void

const rootUrl = 'http://localhost:3000/users'

export class User {
  private events: Eventing = new Eventing();
  private Sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  private attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.get("id");

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.Sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.Sync.save(this.attributes.getAll()).then((response: AxiosResponse): void => {
      this.trigger('save');
    }).catch(() => {
      this.trigger('error');
    })
  }
}

