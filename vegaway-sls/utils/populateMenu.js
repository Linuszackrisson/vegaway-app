const AWS = require("aws-sdk");

// Region for AWS SDK
AWS.config.update({ region: "eu-north-1" });

// DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Meny
const menuItems = [
  // New Releases
  {
    menuId: "1",
    name: "Spicy Mango Tofu",
    description:
      "Fresh tofu cubes stir-fried with mango slices in a spicy sauce.",
    price: 13.99,
    category: "New Releases",
    imageUrl:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Spicy tofu dish
  },
  {
    menuId: "2",
    name: "Quinoa Stuffed Eggplant",
    description: "Baked eggplant stuffed with seasoned quinoa and vegetables.",
    price: 14.99,
    category: "New Releases",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664647841256-1dd492ff7428?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Stuffed eggplant
  },
  {
    menuId: "3",
    name: "Vegan Sushi Platter",
    description: "An assortment of vegan sushi rolls with fresh vegetables.",
    price: 16.99,
    category: "New Releases",
    imageUrl:
      "https://images.unsplash.com/photo-1676037150304-e4c4a1d585f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan sushi
  },
  {
    menuId: "4",
    name: "Plant-based 'Meatball' Pasta",
    description: "Pasta with vegan 'meatballs' in tomato sauce.",
    price: 15.49,
    category: "New Releases",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1691948106030-d5e76d461b14?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan meatball pasta
  },
  {
    menuId: "5",
    name: "Avocado Gazpacho",
    description: "A chilled soup made with avocado, cucumber, and lime.",
    price: 9.99,
    category: "New Releases",
    imageUrl:
      "https://images.unsplash.com/photo-1478749485505-2a903a729c63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Avocado soup
  },
  {
    menuId: "6",
    name: "Jackfruit Tacos",
    description: "Soft tacos filled with spiced jackfruit and fresh salsa.",
    price: 12.99,
    category: "New Releases",
    imageUrl:
      "https://images.unsplash.com/photo-1524412529635-a258ed66c010?q=80&w=1395&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Jackfruit tacos
  },
  // Chef's Choice
  {
    menuId: "7",
    name: "Truffle Mushroom Risotto",
    description: "Creamy risotto with wild mushrooms and truffle oil.",
    price: 18.99,
    category: "Chef's Choice",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1695240028448-9a8bf3e164f5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mushroom risotto
  },
  {
    menuId: "8",
    name: "Grilled Vegetable Platter",
    description: "A selection of grilled seasonal vegetables with herbs.",
    price: 16.49,
    category: "Chef's Choice",
    imageUrl:
      "https://images.unsplash.com/photo-1653107509005-8a86a6f0c79c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Grilled vegetables
  },
  {
    menuId: "9",
    name: "Vegan Pad Thai",
    description:
      "Rice noodles stir-fried with tofu, vegetables, and tamarind sauce.",
    price: 14.99,
    category: "Chef's Choice",
    imageUrl:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan Pad Thai
  },
  {
    menuId: "10",
    name: "Beetroot Carpaccio",
    description: "Thinly sliced beetroot with arugula and balsamic glaze.",
    price: 12.49,
    category: "Chef's Choice",
    imageUrl:
      "https://images.unsplash.com/photo-1651745006249-0ee8686914eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Beetroot dish
  },
  {
    menuId: "11",
    name: "Coconut Curry Noodles",
    description: "Rice noodles in a creamy coconut curry with vegetables.",
    price: 15.99,
    category: "Chef's Choice",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1705406169429-df5950bc2995?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Coconut curry noodles
  },
  {
    menuId: "12",
    name: "Stuffed Portobello Mushrooms",
    description:
      "Baked portobello mushrooms filled with spinach and vegan cheese.",
    price: 17.49,
    category: "Chef's Choice",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1671377388704-c7b6a543dde8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Stuffed mushrooms
  },
  // Classics
  {
    menuId: "13",
    name: "Veggie Lasagna",
    description:
      "Layers of pasta with vegetables, tomato sauce, and vegan cheese.",
    price: 14.49,
    category: "Classics",
    imageUrl:
      "https://images.unsplash.com/photo-1709429790175-b02bb1b19207?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Veggie lasagna
  },
  {
    menuId: "14",
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh basil, tomato sauce, and vegan cheese.",
    price: 12.99,
    category: "Classics",
    imageUrl:
      "https://images.unsplash.com/photo-1664309641932-0e03e0771b97?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Margherita pizza
  },
  {
    menuId: "15",
    name: "Minestrone Soup",
    description: "Italian vegetable soup with beans and pasta.",
    price: 8.99,
    category: "Classics",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664391952734-2759eb94ba60?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Minestrone soup
  },
  {
    menuId: "16",
    name: "Eggplant Parmesan",
    description: "Breaded eggplant baked with tomato sauce and vegan cheese.",
    price: 13.99,
    category: "Classics",
    imageUrl:
      "https://images.unsplash.com/photo-1629536183119-6d49fdec88ec?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Eggplant Parmesan
  },
  {
    menuId: "17",
    name: "Vegetable Stir Fry",
    description: "Mixed vegetables stir-fried with soy sauce and garlic.",
    price: 11.99,
    category: "Classics",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1712762300153-90261e84e576?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegetable stir fry
  },
  {
    menuId: "18",
    name: "Vegan Burger",
    description: "Plant-based burger with lettuce, tomato, and vegan mayo.",
    price: 13.49,
    category: "Classics",
    imageUrl:
      "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan burger
  },
  // Only Greens
  {
    menuId: "19",
    name: "Kale Caesar Salad",
    description: "Fresh kale in vegan Caesar dressing with croutons.",
    price: 10.99,
    category: "Only Greens",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1710408904453-51db30221110?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Kale salad
  },
  {
    menuId: "20",
    name: "Quinoa and Arugula Salad",
    description:
      "Quinoa salad with arugula, cherry tomatoes, and lemon vinaigrette.",
    price: 11.49,
    category: "Only Greens",
    imageUrl:
      "https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=1277&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Quinoa salad
  },
  {
    menuId: "21",
    name: "Spinach and Strawberry Salad",
    description: "Baby spinach with fresh strawberries and balsamic dressing.",
    price: 9.99,
    category: "Only Greens",
    imageUrl:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Spinach strawberry salad
  },
  {
    menuId: "22",
    name: "Mediterranean Chickpea Salad",
    description: "Chickpeas with cucumber, tomatoes, olives, and vegan feta.",
    price: 12.49,
    category: "Only Greens",
    imageUrl:
      "https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Chickpea salad
  },
  {
    menuId: "23",
    name: "Grilled Asparagus Salad",
    description: "Grilled asparagus with mixed greens and citrus dressing.",
    price: 11.99,
    category: "Only Greens",
    imageUrl:
      "https://images.unsplash.com/photo-1653107509538-8cafc01d1f3b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Grilled asparagus
  },
  {
    menuId: "24",
    name: "Roasted Beet Salad",
    description: "Roasted beets with goat cheese, walnuts, and mixed greens.",
    price: 12.99,
    category: "Only Greens",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661628691602-1fbf4bcc5f62?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Roasted beet salad
  },
  // Desserts
  {
    menuId: "25",
    name: "Vegan Chocolate Cake",
    description: "Rich and moist chocolate cake with vegan frosting.",
    price: 6.99,
    category: "Desserts",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1715793630618-4480004a5bfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan chocolate cake
  },
  {
    menuId: "26",
    name: "Mango Sorbet",
    description: "Refreshing mango sorbet made from fresh mangoes.",
    price: 5.49,
    category: "Desserts",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1671559022093-11d633be2f39?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mango sorbet
  },
  {
    menuId: "27",
    name: "Berry Parfait",
    description: "Layers of mixed berries and coconut yogurt.",
    price: 7.49,
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1588911550337-af627bab5d4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Berry parfait
  },
  {
    menuId: "28",
    name: "Apple Crumble",
    description: "Baked apples with a crispy oat topping.",
    price: 6.49,
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1605698802040-b783f33b49a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Apple crumble
  },
  {
    menuId: "29",
    name: "Vegan Cheesecake",
    description: "Creamy cheesecake with a biscuit base.",
    price: 7.99,
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Vegan cheesecake
  },
  {
    menuId: "30",
    name: "Banana Bread",
    description: "Moist banana bread with walnuts and cinnamon.",
    price: 5.99,
    category: "Desserts",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1699986147202-c25bc32b136b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Banana bread
  },
];

// Define the table name (update to your actual DynamoDB table name)
const tableName = "vegaway-sls-menu";

// Function to add items to DynamoDB table
const populateMenu = async () => {
  for (const item of menuItems) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await dynamoDb.put(params).promise();
      console.log(`Added: ${item.name}`);
    } catch (error) {
      console.error(`Error adding: ${item.name}`, error);
    }
  }
};

// Run the function. Use "node populateMenu.js" in the console.
populateMenu();

/* 
Author Isak
A temporary file to quickly populate the menu with data

Updated
by Jacob - Six categories, six dishes in each, imageURL m.m
*/
