import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useGetBooksQuery } from "../features/api/apiSlice";

export default function Home() {
  const { data: books, isLoading, isError, refetch } = useGetBooksQuery();
  const [searchedBook, setSearchedBook] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (selectedFilter !== "") {
      console.log("selectedFilter", selectedFilter);
    }
  }, [selectedFilter]);

  // decide what to render
  let content;

  if (isLoading) {
    content = "Books are loading";
  }

  if (!isLoading && isError) {
    content = "Some Error Happened";
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = "No video found!";
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books
      .filter((book) =>
        book.name.toLowerCase().includes(searchedBook.toLowerCase())
      )
      .filter((book) =>
          selectedFilter === "featured" ? book.featured : book
        ) 
      .map((book) => <Card key={book.id} book={book} refetch={refetch} />);
  }
  return (
    <div>
      <Navbar setSearchedBook={setSearchedBook} />

      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button
                className={`lws-filter-btn ${ selectedFilter === 'all'? "active-filter": ""}`}
                onClick={() => setSelectedFilter("all")}
              >
                All
              </button>
              <button
                className={`lws-filter-btn ${ selectedFilter === 'featured'? "active-filter": ""}`}
                onClick={() => setSelectedFilter("featured")}
              >
                Featured
              </button>
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content}
          </div>
        </div>
      </main>
    </div>
  );
}
