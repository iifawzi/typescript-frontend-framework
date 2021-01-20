import { User } from "./models/User"


const user = new User({ name: "myname", "age": 123 })

user.on('change', () => {
  console.log("change 1")
});


user.on('change', () => {
  console.log("tesst")
});

user.trigger('change');