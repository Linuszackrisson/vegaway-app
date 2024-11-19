const AWS = require("aws-sdk");

// Sätt region för AWS SDK
AWS.config.update({ region: "eu-north-1" }); // Byt ut till din region

// Konfigurera DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Definiera dina maträtter
const menuItems = [
	// New Releases
	{
		menuId: "1",
		name: "Spicy Mango Tofu",
		description:
			"Fresh tofu cubes stir-fried with mango slices in a spicy sauce.",
		price: 13.99,
		category: "New Releases",
		imageUrl: "https://images.unsplash.com/photo-1601933471719-6b2308ba1f84", // Spicy tofu dish
	},
	{
		menuId: "2",
		name: "Quinoa Stuffed Eggplant",
		description: "Baked eggplant stuffed with seasoned quinoa and vegetables.",
		price: 14.99,
		category: "New Releases",
		imageUrl: "https://images.unsplash.com/photo-1612286307890-9d59d74c8d63", // Stuffed eggplant
	},
	{
		menuId: "3",
		name: "Vegan Sushi Platter",
		description: "An assortment of vegan sushi rolls with fresh vegetables.",
		price: 16.99,
		category: "New Releases",
		imageUrl: "https://images.unsplash.com/photo-1585238342028-3a69e45479a5", // Vegan sushi
	},
	{
		menuId: "4",
		name: "Plant-based 'Meatball' Pasta",
		description: "Pasta with vegan 'meatballs' in tomato sauce.",
		price: 15.49,
		category: "New Releases",
		imageUrl: "https://images.unsplash.com/photo-1603133872877-23c48e199e30", // Vegan meatball pasta
	},
	{
		menuId: "5",
		name: "Avocado Gazpacho",
		description: "A chilled soup made with avocado, cucumber, and lime.",
		price: 9.99,
		category: "New Releases",
		imageUrl: "https://images.unsplash.com/photo-1601315483751-614d48cd74b6", // Avocado soup
	},
	// Chef's Choice
	{
		menuId: "6",
		name: "Truffle Mushroom Risotto",
		description: "Creamy risotto with wild mushrooms and truffle oil.",
		price: 18.99,
		category: "Chef's Choice",
		imageUrl: "https://images.unsplash.com/photo-1602502208203-bc9b7bd524a7", // Mushroom risotto
	},
	{
		menuId: "7",
		name: "Grilled Vegetable Platter",
		description: "A selection of grilled seasonal vegetables with herbs.",
		price: 16.49,
		category: "Chef's Choice",
		imageUrl: "https://images.unsplash.com/photo-1604251382621-7114d962d872", // Grilled vegetables
	},
	{
		menuId: "8",
		name: "Vegan Pad Thai",
		description:
			"Rice noodles stir-fried with tofu, vegetables, and tamarind sauce.",
		price: 14.99,
		category: "Chef's Choice",
		imageUrl: "https://images.unsplash.com/photo-1609357893024-8e33f5e6cd59", // Vegan Pad Thai
	},
	{
		menuId: "9",
		name: "Beetroot Carpaccio",
		description: "Thinly sliced beetroot with arugula and balsamic glaze.",
		price: 12.49,
		category: "Chef's Choice",
		imageUrl: "https://images.unsplash.com/photo-1603296852745-d6b339e2fe22", // Beetroot dish
	},
	{
		menuId: "10",
		name: "Coconut Curry Noodles",
		description: "Rice noodles in a creamy coconut curry with vegetables.",
		price: 15.99,
		category: "Chef's Choice",
		imageUrl: "https://images.unsplash.com/photo-1607952953333-2bcd8e8c5271", // Coconut curry noodles
	},
	// Classics
	{
		menuId: "11",
		name: "Veggie Lasagna",
		description:
			"Layers of pasta with vegetables, tomato sauce, and vegan cheese.",
		price: 14.49,
		category: "Classics",
		imageUrl: "https://images.unsplash.com/photo-1613488163175-2c2b3e9119ae", // Veggie lasagna
	},
	{
		menuId: "12",
		name: "Margherita Pizza",
		description:
			"Classic pizza with fresh basil, tomato sauce, and vegan cheese.",
		price: 12.99,
		category: "Classics",
		imageUrl: "https://images.unsplash.com/photo-1594007650118-5c1b2a7fe3ab", // Margherita pizza
	},
	{
		menuId: "13",
		name: "Minestrone Soup",
		description: "Italian vegetable soup with beans and pasta.",
		price: 8.99,
		category: "Classics",
		imageUrl: "https://images.unsplash.com/photo-1596910708041-e944571f1b68", // Minestrone soup
	},
	{
		menuId: "14",
		name: "Eggplant Parmesan",
		description: "Breaded eggplant baked with tomato sauce and vegan cheese.",
		price: 13.99,
		category: "Classics",
		imageUrl: "https://images.unsplash.com/photo-1596405670077-0d982d7ee2fd", // Eggplant Parmesan
	},
	{
		menuId: "15",
		name: "Vegetable Stir Fry",
		description: "Mixed vegetables stir-fried with soy sauce and garlic.",
		price: 11.99,
		category: "Classics",
		imageUrl: "https://images.unsplash.com/photo-1615486360859-6e7a20e975d3", // Vegetable stir fry
	},
	// Only Greens
	{
		menuId: "16",
		name: "Kale Caesar Salad",
		description: "Fresh kale in vegan Caesar dressing with croutons.",
		price: 10.99,
		category: "Only Greens",
		imageUrl: "https://images.unsplash.com/photo-1589307000285-0e81bd7c485e", // Kale salad
	},
	{
		menuId: "17",
		name: "Quinoa and Arugula Salad",
		description:
			"Quinoa salad with arugula, cherry tomatoes, and lemon vinaigrette.",
		price: 11.49,
		category: "Only Greens",
		imageUrl: "https://images.unsplash.com/photo-1604005995300-7538b119c322", // Quinoa salad
	},
	{
		menuId: "18",
		name: "Spinach and Strawberry Salad",
		description: "Baby spinach with fresh strawberries and balsamic dressing.",
		price: 9.99,
		category: "Only Greens",
		imageUrl: "https://images.unsplash.com/photo-1611759416054-0f7c2e4ad889", // Spinach strawberry salad
	},
	{
		menuId: "19",
		name: "Mediterranean Chickpea Salad",
		description: "Chickpeas with cucumber, tomatoes, olives, and vegan feta.",
		price: 12.49,
		category: "Only Greens",
		imageUrl: "https://images.unsplash.com/photo-1604607054693-fca9a7c1d2cf", // Chickpea salad
	},
	{
		menuId: "20",
		name: "Grilled Asparagus Salad",
		description: "Grilled asparagus with mixed greens and citrus dressing.",
		price: 11.99,
		category: "Only Greens",
		imageUrl: "https://images.unsplash.com/photo-1607330286524-27e773c04755", // Grilled asparagus
	},
	// Desserts
	{
		menuId: "21",
		name: "Vegan Chocolate Cake",
		description: "Rich and moist chocolate cake with vegan frosting.",
		price: 6.99,
		category: "Desserts",
		imageUrl: "https://images.unsplash.com/photo-1612197523825-5ad5d836115c", // Vegan chocolate cake
	},
	{
		menuId: "22",
		name: "Mango Sorbet",
		description: "Refreshing mango sorbet made from fresh mangoes.",
		price: 5.49,
		category: "Desserts",
		imageUrl: "https://images.unsplash.com/photo-1621636952020-f640e0d2e0a8", // Mango sorbet
	},
	{
		menuId: "23",
		name: "Berry Parfait",
		description: "Layers of mixed berries and coconut yogurt.",
		price: 7.49,
		category: "Desserts",
		imageUrl: "https://images.unsplash.com/photo-1611174747038-3b605d31e929", // Berry parfait
	},
	{
		menuId: "24",
		name: "Apple Crumble",
		description: "Baked apples with a crispy oat topping.",
		price: 6.49,
		category: "Desserts",
		imageUrl: "https://images.unsplash.com/photo-1603126851155-6a6782b1d8bd", // Apple crumble
	},
	{
		menuId: "25",
		name: "Vegan Cheesecake",
		description: "Creamy cheesecake with a biscuit base.",
		price: 7.99,
		category: "Desserts",
		imageUrl: "https://images.unsplash.com/photo-1599058917211-2c1391d13f56", // Vegan cheesecake
	},
];

// Ange tabellnamnet (uppdatera till ditt faktiska DynamoDB-tabellnamn)
const tableName = "vegaway-sls-menu";

// Funktion för att lägga till artiklar i DynamoDB-tabellen
const populateMenu = async () => {
	for (const item of menuItems) {
		const params = {
			TableName: tableName,
			Item: item,
		};

		try {
			await dynamoDb.put(params).promise();
			console.log(`Lade till: ${item.name}`);
		} catch (error) {
			console.error(`Fel vid tillägg av: ${item.name}`, error);
		}
	}
};

// Kör funktionen. Använd "node populateMenu.js" i konsolen.
populateMenu();

/* 
Författare Isak
En temporär fil för att snabbt fylla ut menyn med data

Uppdaterad
av Jacob - Fem kategorier fem rätter i varje.
*/
