import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.31.120:9000",
  }),

  tagTypes: ["Books"],

  endpoints: (builder) => ({

    //READ API 
    getBooks: builder.query({
      query: () => "/books",
      keepUnusedDataFor: 600,
      providesTags: ["Books"],
    }),

    //CREATE API
    addBook: builder.mutation({
        query: (formData) => ({
          url: `/books`,
          method: "POST",
          body: formData,
        }),
  
        invalidatesTags: ["Books"],
      }),



    //DELETE API
    deleteBooks: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: (result, error, arg) => [
        "Books",
        { type: "Books", id: arg.id },
      ],
    }),



  }),
});

export const { useGetBooksQuery, useAddBookMutation ,useDeleteBooksMutation } = apiSlice;
