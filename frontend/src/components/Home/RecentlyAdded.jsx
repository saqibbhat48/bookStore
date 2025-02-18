import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import { axiosInstance } from "../../lib/axios";

const RecentlyAdded = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/get-recent-books");
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 sm:px-12 py-12">
      <h1 className="text-3xl font-bold text-yellow-100 mb-8">
        Recently Added Books
      </h1>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard
              key={index}
              bookid={book._id}
              image={book.url}
              title={book.title}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-center">No books available.</p>
      )}
    </div>
  );
};

export default RecentlyAdded;