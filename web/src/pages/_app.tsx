import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        deleteContact: (result, args, cache, info) => {
          cache.invalidate({ __typename: "Contact", id: args.id as number });
        },
        createContact: (result, args, cache, info) => {
          // invalidate the cache and re-fetch
          cache.invalidate("Query", "contacts");
        },
        deletePhoneNumber: (result, args, cache, info) => {
          cache.invalidate({ __typename: "PhoneNumber", id: args.id as number });
        },
      },
    },
  }) as any, fetchExchange],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
