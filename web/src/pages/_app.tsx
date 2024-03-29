import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { ContactNumbersDocument, CreatePhoneNumberMutation, MutationCreatePhoneNumberArgs } from '../generated/graphql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteContact: (result, args, cache, info) => {
            cache.invalidate({ __typename: "Contact", id: args.id as number });
          },
          createContact: (result, args, cache, info) => {
            cache.invalidate("Query", "contacts");
          },
          deletePhoneNumber: (result, args, cache, info) => {
            cache.invalidate({ __typename: "PhoneNumber", id: args.id as number });
          },
          createPhoneNumber: (result, args, cache, info) => {
            const { createPhoneNumber } = result as CreatePhoneNumberMutation;
            const { input: { contactId } } = args as MutationCreatePhoneNumberArgs;
            cache.updateQuery({ query: ContactNumbersDocument, variables: { contactId } }, (data: any) => {
              data?.contact?.contactNumbers?.push(createPhoneNumber);
              return data;
            });
          },
        },
      },
    }) as any,
    fetchExchange
  ],
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