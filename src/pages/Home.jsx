import React from "react";
import Navbar from "../components/Navbar"; 
import Card from "../components/Card";
import {useGetBooksQuery} from "../features/api/apiSlice";
 
export default function Home() {
  
  const {data: books, isLoading, isError, refetch} = useGetBooksQuery();
 
  // decide what to render
  let content;

  if (isLoading) {
    content = "Books are loading";
  }

  if (!isLoading && isError) {
    content = "Some Error Happened";
  }

  if (!isLoading && !isError && books?.length === 0) {
    content =  "No video found!" ;
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books.map(book => <Card key={book.id} book={book} refetch={refetch}/>);
  }
  return (
    <div>
      <Navbar />

      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button className="lws-filter-btn active-filter">All</button>
              <button className="lws-filter-btn">Featured</button>
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {
            content
          }
         

            
          </div>
        </div>
      </main>
    </div>
  );
}
