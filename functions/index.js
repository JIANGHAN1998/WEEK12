const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
const db = admin.firestore();

// Count the total number of books in Firestore
exports.countBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksSnapshot = await db.collection("books").get();
      const count = booksSnapshot.size;
      res.status(200).json({count});
    } catch (error) {
      console.error("Error fetching books collection:", error);
      res.status(500).send("Error fetching books collection");
    }
  });
});

// Capitalize book data in Firestore upon new document creation
exports.capitalizeBookData = functions.firestore
    .document("books/{bookId}")
    .onCreate(async (snap, context) => {
      const newBook = snap.data();

      const capitalizedData = {
        isbn: newBook.isbn.toString().toUpperCase(),
        name: newBook.name.toUpperCase(),
      };

      return snap.ref.update(capitalizedData);
    });

// Get all books from Firestore
exports.getAllBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksSnapshot = await db.collection("books").get();
      const books = [];

      // Iterate over each document in the snapshot
      booksSnapshot.forEach((doc) => {
        books.push({id: doc.id, ...doc.data()});
      });

      res.status(200).json(books); // Return all books as JSON
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).send("Error fetching books");
    }
  });
});
