import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const defaultURL = 'https://668c2ba00b61b8d23b0ca4de.mockapi.io/api';
const defaultURL = "http://localhost:4000/api";

// Define a service using a base URL and expected endpoints
export const nodesApi = createApi({
  reducerPath: "nodesApi",
  baseQuery: fetchBaseQuery({ baseUrl: defaultURL }),
  endpoints: (builder) => ({
    fetchNodes: builder.query({
      query: () => `/nodes`,
    }),
    fetchEdges: builder.query({
      query: () => `/edges`,
    }),

    saveNodes: builder.mutation({
      query: (nodes) => ({
        url: `/nodes`,
        method: "POST",
        body: nodes,
      }),
    }),
    saveEdge: builder.mutation({
      query: (edge) => ({
        url: `/edges`,
        method: "POST",
        body: edge,
      }),
    }),
    updateNodes: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/nodes/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    updateEdge: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/edges/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteNode: builder.mutation({
      query: (nodeId) => ({
        url: `/nodes/${nodeId}`,
        method: "DELETE",
      }),
    }),
    deleteEdge: builder.mutation({
      query: (id) => ({
        url: `/edges/${id}`,
        method: "DELETE",
      }),
    }),
    addPicture: builder.mutation({
      query: ({ id, bodyFormData }) => {
        return {
          url: `/nodes/${id}`,
          method: "PUT",
          // headers: {
          //   'Content-Type': 'multipart/form-data;'
          // },
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useFetchNodesQuery,
  useFetchEdgesQuery,
  useSaveNodesMutation,
  useSaveEdgeMutation,
  useUpdateNodesMutation,
  useUpdateEdgeMutation,
  useDeleteNodeMutation,
  useDeleteEdgeMutation,
  useAddPictureMutation,
} = nodesApi;
