import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBackward, FaCartShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from "../store/cartActions";
import { FaRegEdit } from "react-icons/fa";
import { MdArrowBackIosNew, MdDelete } from "react-icons/md";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const ViewBookDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  const history = useNavigate();
  const [Book, setBook] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axiosInstance.get(`/get-book-by-id/${id}`)
      setBook(res.data.data);
    };
    fetch();
    
  }, []);
  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const addToFavourite = async () => {
    try {
      const response = await axiosInstance.put("/add-to-favourite",
        {},
        { headers })
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async () => {
    try {
      const response = await axiosInstance.put("/add-to-cart",
        {},
        { headers })
      dispatch(fetchCart())
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBook = async () => {
    try {
      const response = await axiosInstance.delete("/delete-book",
        { headers })
      toast.success(response.data.message)
      history("/all-books");
    } catch (error) {
      console.log(error);
    }
  };

 
  

  return (
    <>
      {!Book && <Loader />}
      {Book && (
        <>
        <div className="bg-zinc-900  px-12 py-8 flex flex-col lg:flex-row gap-8 h-auto">
          <div>
            <Link to={"/all-books"} >
          <div className="text-white bg-slate-600 p-2 inline-block rounded-md">
              <MdArrowBackIosNew/>
          </div>
            </Link>
          </div>
          <div className="w-full lg:w-3/6 ">
            <div className=" flex flex-col md:flex-row items-start justify-around  bg-zinc-800 rounded px-4 py-8 gap-4 ">
              <img
                src={Book.url}
                alt="book"
                className="h-[50vh] md:h-[70vh] rounded mx-auto md:mx-0"
              />
              {localStorage.getItem("id") && (
                <div className=" w-full md:w-auto flex flex-row md:flex-col justify-around md:justify-start items-center  mt-4 md:mt-0  ">
                  {role !== "admin" && (
                    <>
                      <button
                        className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                        onClick={addToFavourite}
                      >
                        <GoHeartFill />
                      </button>
                      <button
                        className="mt-0 md:mt-8 bg-blue-500 text-white p-3 rounded md:rounded-full text-2xl  font-semibold flex items-center hover:bg-blue-600 transition-all duration-300"
                        onClick={addToCart}
                      >
                        <FaCartShopping className="me-0" />{" "}
                        
                      </button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link
                        to={`/update-book/${id}`}
                        className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        className="mt-0 md:mt-8 bg-red-500 text-white p-3 rounded md:rounded-full text-2xl  font-semibold flex items-center hover:bg-red-600 transition-all duration-300"
                        onClick={deleteBook}
                      >
                        <MdDelete className="me-0" />{" "}
                        
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-3/6 my-8">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Book.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Book.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Book.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Book.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {Book.price}{" "}
            </p>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default ViewBookDetails;
