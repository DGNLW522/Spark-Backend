const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/book");
const Member = require("./models/member");

const server = express();

const databaseURL="mongodb+srv://testUser:testUser@cluster0.usnqr.mongodb.net/lms?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;

mongoose
	.connect(databaseURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		console.log("Connected to DB");
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
 server.use(cors());
 server.use(express.urlencoded({ extended: true }));
 server.use(express.json());

// /book: View all books
server.get("/book", async (req, res) => { 
	const books = await Book.find();
	res.send(books);
});

// /book/1: View book 1 
// /book/:id 

server.get("/book/:id", async (req, res) => {
	const id = req.params.id; 
	const book = await Book.findById(id); 
	res.send(book); 
}); 

// /book : Post: Create book 
// title, author 
	server.post("/book", async (req, res) => {
	const { title, author } = req.body;  

const book = new Book({ title, author }); 
const response = await book.save(); 
res.send(response); 
}); 

// /book/:id/burrow: Burrow book 
// /book/1/burrow 
// burrowedMemberId, burrowedDate 
server.put ("/book/:id/burrow", async (req, res) => { 
	const id = req.params.id; 
	const { burrowedMemberId, burrowedDate } = req.body;
	const book = await Book.findByIdAndUpdate(id, {
		isAvailable: false,   
		burrowedMemberId,         
		burrowedDate, 
	}); 
	res.send(book); 
}); 

// /book/:id/return: Return book 
// /book/1/return 
server.put("/book/:id/return", async (req, res) => { 
	const id = req.params.id; 
	const book = await Book.findByIdAndUpdate(id, {
		isAvailable: true,   
		burrowedMemberId: "",         
		burrowedDate: "", 
	}); 
	res.send(book);
}); 


// /book/:id Put: Edit book
// title, author

server.put("/book/:id", async (req, res) => { 
	const id = req.params.id; 
	const { title, author } = req.body;

const book = await Book.findByIdAndUpdate(id, {
	title,
	author,
      });
      res.send(book);
});

// /book/:id: Delete: Delete book
// /book/1
server.delete("/book/:id", async (req, res) => {
	const id = req.params.id;
	const book = await Book.findByIdAndUpdate(id);
	res.send(book);
});
 
// /member: View all members
server.get("/member", async (req, res) => { 
	const members = await Member.find();
	res.send(members);
});

// /member/1: View member 1 
// /member/:id 

server.get("/member/:id", async (req, res) => {
	const id = req.params.id; 
	const member = await Member.findById(id); 
	res.send(member); 
}); 

// /member : Post: Create member 
// title, author 
	server.post("/member", async (req, res) => {
	const { title, author } = req.body;  

const member = new Member({ title, author }); 
const response = await member.save(); 
res.send(response); 
}); 
  
// /member/:id Put: Edit member
// title, author

server.put("/member/:id", async (req, res) => { 
	const id = req.params.id; 
	const { title, author } = req.body; 
const member = await Member.findByIdAndUpdate(id, {
	title,
	author,
      });
      res.send(member);
});

// /member/:id: Delete: Delete member
// /member/1
server.delete("/member/:id", async (req, res) => {
	const id = req.params.id;
	const member = await Member.findByIdAndUpdate(id);
	res.send(member);
}); 

