import { User } from "./models/User"


const user = new User({ id: 1, name: 'newewer name', age: 1389389893 })

user.on('save', () => {
  console.log(user);
});

user.save();
