require("dotenv").config();
require("../db");
const Cat = require("../models/Cat.model");

const cats = [
	{
		name: "Lola",
		url: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg",
	},
	{
		name: "Lalo",
		url: "https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_960_720.jpg",
	},
	{
		name: "Alol",
		url: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
	},
	{
		name: "Olal",
		url: "https://cdn.pixabay.com/photo/2015/06/07/19/42/animal-800760_960_720.jpg",
	},
	{
		name: "Llao",
		url: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/12/funny-owl5.jpg",
	},
	{
		name: "LLoa",
		url: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/12/funny-owl14.jpg",
	},
	{
		name: "Allo",
		url: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/12/funny-owl15.jpg",
	},
	{
		name: "Olla",
		url: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/12/funny-owl10.jpg",
	},
];

Cat.deleteMany()
	.then(() => {
		Cat.create(cats)
			.then((res) => {
				console.log(`Created ${res.length} cats (maybe) in the database.`);
				process.exit();
			})
			.catch((e) => console.error(e));
	})
	.catch((e) => console.error(e));
