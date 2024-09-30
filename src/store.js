import { configureStore } from '@reduxjs/toolkit'

import { nodesApi } from './nodesAPI'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [nodesApi.reducerPath]: nodesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nodesApi.middleware),
})