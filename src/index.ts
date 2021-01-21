import { User } from "./models/User"


const user = new User({ name: "myname", "age": 123 })

console.log(user.get('name'));