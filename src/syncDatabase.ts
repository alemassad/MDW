import { Category, Car, User } from "./models";

/* const user = new User({
  name: "John",
    lastname: "Doe",
    birthdate: new Date("1990-01-01"),
    email: "John doe @gmail.com",
    isAdmin: false,
});

const car = new Car({
  name: "Toyota Xilus",
  description: "pickup 4x4",
  amount: 10,
  price: 20000,
  isActive: true,
  ownerId: "",
  image: "https://example.com/car.jpg",
});

const category = new Category({
  name: "SUV",
  description: "Sport Utility Vehicle",
  cars: []
}); */

export const syncDatabase = async () => {
    try {
        /* const newUser = await user.save();
        car.ownerId = newUser.id;
        await car.save();
        await category.save(); */
    
        console.log("Database synced successfully 🟢");
    } catch (error) {
        console.error("Error syncing database 🔴", error);
    }
    }
