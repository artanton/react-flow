import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const defaultURL = 'https://668c2ba00b61b8d23b0ca4de.mockapi.io/api';
// Define a service using a base URL and expected endpoints
export const nodesApi = createApi({
    reducerPath: 'nodesApi',
    baseQuery: fetchBaseQuery({ baseUrl: defaultURL }),
    endpoints: (builder) => ({
      fetchNodes: builder.query({
        query: () => `/nodes`,
      }),
      fetchEdges: builder.query({
        query: () => `/edges`,
      }),
      saveNode: builder.mutation({
        query: (nodes) => ({
          url: `/nodes`,
          method: 'POST',
          body: nodes,
        }),
      }),
      saveEdge: builder.mutation({
        query: (edge) => ({
          url: `/edges`,
          method: 'POST',
          body: edge,
        }),
      }),
      deleteNode: builder.mutation({
        query: (nodeId) => ({
          url: `/nodes/${nodeId}`,
          method: 'DELETE',
        }),
      }),
      deleteEdge: builder.mutation({
        query: (id) => ({
          url: `/edges/${id}`,
          method: 'DELETE',
          
        }),
      }),
    }),
  });
  
  export const {
     useFetchNodesQuery,
     useFetchEdgesQuery,
     useSaveNodeMutation,
     useSaveEdgeMutation,
     useDeleteNodeMutation,
     useDeleteEdgeMutation

   } = nodesApi;