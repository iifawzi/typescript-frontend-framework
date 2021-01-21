import { Eventing } from "./eventing";
import { Sync } from "./Sync"
import { Attributes } from "./Attributes"

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
  public attributes: Attributes<UserProps>;


  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }
}

