import React, { useEffect, useState } from "react";
import {
  useAddBookMutation,
  useEditBookMutation,
  useGetBookQuery,
} from "../features/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
export default function Bookform() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id);

  const [editBook] = useEditBookMutation()

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: "",
    rating: "",
    featured: false,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setFormData({
        name: book.name,
        author: book.author,
        thumbnail: book.thumbnail,
        price: book.price,
        rating: book.rating, 
        featured: book.featured === true,
      });
    }
  }, [isLoading, isError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook({id,formData}) 
    navigate("/");

  };
  return (
    <>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="lws-bookName">Book Name</label>

          <input
            required
            className="text-input"
            type="text"
            id="lws-bookName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-author">Author</label>
          <input
            required
            className="text-input"
            type="text"
            id="lws-author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-thumbnail">Image Url</label>
          <input
            required
            className="text-input"
            type="text"
            id="lws-thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 pb-4">
          <div className="space-y-2">
            <label htmlFor="lws-price">Price</label>
            <input
              required
              className="text-input"
              type="number"
              id="lws-price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lws-rating">Rating</label>
            <input
              required
              className="text-input"
              type="number"
              id="lws-rating"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="lws-featured"
            type="checkbox"
            name="featured"
            className="w-4 h-4"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="lws-featured" className="ml-2 text-sm">
            {" "}
            This is a featured book{" "}
          </label>
        </div>  

        <button type="submit" className="submit" id="lws-submit">
          Edit Book
        </button>
      </form>
    </>
  );
}
