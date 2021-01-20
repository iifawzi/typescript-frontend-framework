import { User } from "./models/User"


const user = new User({ name: "myname", "age": 123 })

user.events.on('change', () => {
  console.log("change 1")
});



user.events.trigger('change');