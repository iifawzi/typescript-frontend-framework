import { Eventing } from "./eventing";
import { Sync } from "./Sync"
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void

const rootUrl = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing();
  public Sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  constructor(private data: UserProps) { }

  get(propName: string): string | number {
    return this.data[propName];
  }


  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

}

