const AWS = require("aws-sdk");

// Set the region for AWS SDK
AWS.config.update({ region: "eu-north-1" }); // Replace with your region

// Set up the DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Define your dishes
const menuItems = [
  {
    menuId: "1",
    name: "Vegetable Stir Fry",
    description: "A colorful mix of stir-fried vegetables with a savory sauce.",
    price: 12.99,
    category: "Category 1",
  },
  {
    menuId: "2",
    name: "Vegan Burger",
    description:
      "A delicious patty made from black beans, served with lettuce and tomato.",
    price: 10.99,
    category: "Category 1",
  },
  {
    menuId: "3",
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh mozzarella, basil, and tomato sauce.",
    price: 14.99,
    category: "Category 2",
  },
  {
    menuId: "4",
    name: "Lentil Soup",
    description:
      "A hearty and filling soup made with lentils and a variety of vegetables.",
    price: 8.99,
    category: "Category 2",
  },
  {
    menuId: "5",
    name: "Tofu Scramble",
    description:
      "A vegan alternative to scrambled eggs made with tofu and veggies.",
    price: 9.99,
    category: "Category 3",
  },
  {
    menuId: "6",
    name: "Stuffed Bell Peppers",
    description: "Bell peppers stuffed with quinoa, black beans, and corn.",
    price: 11.49,
    category: "Category 3",
  },
  {
    menuId: "7",
    name: "Falafel Wrap",
    description:
      "Crispy falafel wrapped in pita with hummus, tomatoes, and cucumbers.",
    price: 10.49,
    category: "Category 4",
  },
  {
    menuId: "8",
    name: "Vegetarian Chili",
    description:
      "A hearty and spicy chili made with beans, tomatoes, and vegetables.",
    price: 13.49,
    category: "Category 4",
  },
];

// Define the table name (update this to your actual DynamoDB table name)
const tableName = "vegaway-sls-menu";

// Function to add items to the DynamoDB table
const populateMenu = async () => {
  for (const item of menuItems) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await dynamoDb.put(params).promise();
      console.log(`Successfully added: ${item.name}`);
    } catch (error) {
      console.error(`Error adding item: ${item.name}`, error);
    }
  }
};

// Run the function. Use "node populateMenu.js" in the console.
populateMenu();

/* 
Författare Isak
En temporär fil för att snabbt fylla ut menyn med data
*/
