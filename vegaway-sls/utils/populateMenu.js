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
			"https://cdn.pixabay.com/photo/2016/11/20/09/20/tofu-1841296_1280.jpg", // Spicy tofu dish
	},
	{
		menuId: "2",
		name: "Quinoa Stuffed Eggplant",
		description: "Baked eggplant stuffed with seasoned quinoa and vegetables.",
		price: 14.99,
		category: "New Releases",
		imageUrl:
			"https://cdn.pixabay.com/photo/2018/03/10/18/10/eggplant-3216711_1280.jpg", // Stuffed eggplant
	},
	{
		menuId: "3",
		name: "Vegan Sushi Platter",
		description: "An assortment of vegan sushi rolls with fresh vegetables.",
		price: 16.99,
		category: "New Releases",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/03/05/19/02/sushi-1235942_1280.jpg", // Vegan sushi
	},
	{
		menuId: "4",
		name: "Plant-based 'Meatball' Pasta",
		description: "Pasta with vegan 'meatballs' in tomato sauce.",
		price: 15.49,
		category: "New Releases",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/06/07/12/54/meatball-2386807_1280.jpg", // Vegan meatball pasta
	},
	{
		menuId: "5",
		name: "Avocado Gazpacho",
		description: "A chilled soup made with avocado, cucumber, and lime.",
		price: 9.99,
		category: "New Releases",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/05/07/08/56/avocado-2298262_1280.jpg", // Avocado soup
	},
	{
		menuId: "6",
		name: "Jackfruit Tacos",
		description: "Soft tacos filled with spiced jackfruit and fresh salsa.",
		price: 12.99,
		category: "New Releases",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/09/02/13/41/taco-2704629_1280.jpg", // Jackfruit tacos
	},
	// Chef's Choice
	{
		menuId: "7",
		name: "Truffle Mushroom Risotto",
		description: "Creamy risotto with wild mushrooms and truffle oil.",
		price: 18.99,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2015/08/20/20/07/risotto-897046_1280.jpg", // Mushroom risotto
	},
	{
		menuId: "8",
		name: "Grilled Vegetable Platter",
		description: "A selection of grilled seasonal vegetables with herbs.",
		price: 16.49,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/03/27/14/46/vegetables-2179845_1280.jpg", // Grilled vegetables
	},
	{
		menuId: "9",
		name: "Vegan Pad Thai",
		description:
			"Rice noodles stir-fried with tofu, vegetables, and tamarind sauce.",
		price: 14.99,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2020/08/04/08/18/noodles-5462168_1280.jpg", // Vegan Pad Thai
	},
	{
		menuId: "10",
		name: "Beetroot Carpaccio",
		description: "Thinly sliced beetroot with arugula and balsamic glaze.",
		price: 12.49,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2018/05/06/14/35/salad-3378690_1280.jpg", // Beetroot dish
	},
	{
		menuId: "11",
		name: "Coconut Curry Noodles",
		description: "Rice noodles in a creamy coconut curry with vegetables.",
		price: 15.99,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/08/10/07/32/curry-2612828_1280.jpg", // Coconut curry noodles
	},
	{
		menuId: "12",
		name: "Stuffed Portobello Mushrooms",
		description:
			"Baked portobello mushrooms filled with spinach and vegan cheese.",
		price: 17.49,
		category: "Chef's Choice",
		imageUrl:
			"https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg", // Stuffed mushrooms
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
			"https://cdn.pixabay.com/photo/2017/01/22/19/20/lasagna-2001632_1280.jpg", // Veggie lasagna
	},
	{
		menuId: "14",
		name: "Margherita Pizza",
		description:
			"Classic pizza with fresh basil, tomato sauce, and vegan cheese.",
		price: 12.99,
		category: "Classics",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/03/05/19/02/pizza-1239071_1280.jpg", // Margherita pizza
	},
	{
		menuId: "15",
		name: "Minestrone Soup",
		description: "Italian vegetable soup with beans and pasta.",
		price: 8.99,
		category: "Classics",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/11/29/08/56/soup-1866395_1280.jpg", // Minestrone soup
	},
	{
		menuId: "16",
		name: "Eggplant Parmesan",
		description: "Breaded eggplant baked with tomato sauce and vegan cheese.",
		price: 13.99,
		category: "Classics",
		imageUrl:
			"https://cdn.pixabay.com/photo/2018/05/08/08/24/eggplant-3381090_1280.jpg", // Eggplant Parmesan
	},
	{
		menuId: "17",
		name: "Vegetable Stir Fry",
		description: "Mixed vegetables stir-fried with soy sauce and garlic.",
		price: 11.99,
		category: "Classics",
		imageUrl:
			"https://cdn.pixabay.com/photo/2018/03/17/15/01/fried-3235816_1280.jpg", // Vegetable stir fry
	},
	{
		menuId: "18",
		name: "Vegan Burger",
		description: "Plant-based burger with lettuce, tomato, and vegan mayo.",
		price: 13.49,
		category: "Classics",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/04/29/18/16/burger-2276160_1280.jpg", // Vegan burger
	},
	// Only Greens
	{
		menuId: "19",
		name: "Kale Caesar Salad",
		description: "Fresh kale in vegan Caesar dressing with croutons.",
		price: 10.99,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/07/16/10/43/salad-2508631_1280.jpg", // Kale salad
	},
	{
		menuId: "20",
		name: "Quinoa and Arugula Salad",
		description:
			"Quinoa salad with arugula, cherry tomatoes, and lemon vinaigrette.",
		price: 11.49,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2017/06/12/19/55/quinoa-salad-2392355_1280.jpg", // Quinoa salad
	},
	{
		menuId: "21",
		name: "Spinach and Strawberry Salad",
		description: "Baby spinach with fresh strawberries and balsamic dressing.",
		price: 9.99,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/03/05/19/02/salad-1238334_1280.jpg", // Spinach strawberry salad
	},
	{
		menuId: "22",
		name: "Mediterranean Chickpea Salad",
		description: "Chickpeas with cucumber, tomatoes, olives, and vegan feta.",
		price: 12.49,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/08/01/21/08/vegetables-1568565_1280.jpg", // Chickpea salad
	},
	{
		menuId: "23",
		name: "Grilled Asparagus Salad",
		description: "Grilled asparagus with mixed greens and citrus dressing.",
		price: 11.99,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/03/05/19/02/asparagus-1238335_1280.jpg", // Grilled asparagus
	},
	{
		menuId: "24",
		name: "Roasted Beet Salad",
		description: "Roasted beets with goat cheese, walnuts, and mixed greens.",
		price: 12.99,
		category: "Only Greens",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/03/27/22/16/beetroot-1280608_1280.jpg", // Roasted beet salad
	},
	// Desserts
	{
		menuId: "25",
		name: "Vegan Chocolate Cake",
		description: "Rich and moist chocolate cake with vegan frosting.",
		price: 6.99,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2015/04/20/13/25/cake-731888_1280.jpg", // Vegan chocolate cake
	},
	{
		menuId: "26",
		name: "Mango Sorbet",
		description: "Refreshing mango sorbet made from fresh mangoes.",
		price: 5.49,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2018/02/05/21/46/ice-cream-3134787_1280.jpg", // Mango sorbet
	},
	{
		menuId: "27",
		name: "Berry Parfait",
		description: "Layers of mixed berries and coconut yogurt.",
		price: 7.49,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2015/03/30/12/35/food-698587_1280.jpg", // Berry parfait
	},
	{
		menuId: "28",
		name: "Apple Crumble",
		description: "Baked apples with a crispy oat topping.",
		price: 6.49,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2014/10/18/15/25/apple-crumble-493170_1280.jpg", // Apple crumble
	},
	{
		menuId: "29",
		name: "Vegan Cheesecake",
		description: "Creamy cheesecake with a biscuit base.",
		price: 7.99,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg", // Vegan cheesecake
	},
	{
		menuId: "30",
		name: "Banana Bread",
		description: "Moist banana bread with walnuts and cinnamon.",
		price: 5.99,
		category: "Desserts",
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/11/29/03/03/bread-1867204_1280.jpg", // Banana bread
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
