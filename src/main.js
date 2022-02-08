import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import "@/assets/main.less";

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    cache,
    uri: process.env.VUE_APP_API_ENDPOINT,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

createApp(App)
    .use(router)
    .use(apolloProvider)
    .mount('#app')
