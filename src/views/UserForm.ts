import { User } from "../models/User"

export class UserForm {
  constructor(public parent: Element, public model: User) { }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick
    };
  }
  onButtonClick(): void {
    console.log('Hi there');
  }

  template(): string {
    return `
    <div>
    <h1>User Form</h1>
    <input />
    <button>Click me</button>
    <h1>${this.model.get('name')}</h1>
    <h1>${this.model.get('age')}</h1>
    </div>
    `;
  }


  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)

    this.parent.append(templateElement.content);
  }
}