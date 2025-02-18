import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import axios from "axios";
import Loader from "./Loader";
import { axiosInstance } from "../lib/axios";
const AllBooks = () => {
  const [Books, setBooks] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axiosInstance.get('/get-all-books')
      setBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!Books && <Loader />}
      {Books &&(
        <div className="h-auto min-h-dvh px-12 py-8 bg-gradient-to-br from-gray-800 to-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Books.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
