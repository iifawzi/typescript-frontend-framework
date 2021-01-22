import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing"
import { User } from "./User"

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}


export class UserCollection {
  models: User[] = [];
  events: Eventing = new Eventing();
  constructor(public rootUrl: string) { }
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(`${this.rootUrl}`).then((response: AxiosResponse) => {
      response.data.forEach((value: UserProps) => {
        const user = User.buildUser(value);
        this.models.push(user);
      });

      this.trigger('change');
    })
  }
}