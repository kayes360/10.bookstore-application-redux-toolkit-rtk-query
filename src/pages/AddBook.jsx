import React from "react";
import Navbar from "../components/Navbar";
import Bookform from "../components/Bookform";

export default function AddBook() {
  return (
    <>
      <Navbar />

      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>

            <Bookform formName="Add"/> 

          </div>
        </div>
      </main>
    </>
  );
}
