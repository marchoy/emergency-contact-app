import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { createClient, debugExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { ContactNumbersDocument, CreatePhoneNumberMutation, MutationCreatePhoneNumberArgs } from '../generated/graphql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin-password") : "";
    return {
      headers: {
        authorization: token ? token : "",
      },
    };
  },
  exchanges: [
    debugExchange,
    (cacheExchange as any)({
      updates: {
        Mutation: {
          deleteContact: (result: any, args: any, cache: any, info: any) => {
            cache.invalidate({ __typename: "Contact", id: args.id as number });
          },
          createContact: (result: any, args: any, cache: any, info: any) => {
            cache.invalidate("Query", "contacts");
          },
          deletePhoneNumber: (result: any, args: any, cache: any, info: any) => {
            cache.invalidate({ __typename: "PhoneNumber", id: args.id as number });
          },
          createPhoneNumber: (result: any, args: any, cache: any, info: any) => {
            const { createPhoneNumber } = result as CreatePhoneNumberMutation;
            const { input: { contactId } } = args as MutationCreatePhoneNumberArgs;
            cache.updateQuery({ query: ContactNumbersDocument, variables: { contactId } }, (data: any) => {
              data?.contact?.contactNumbers?.push(createPhoneNumber);
              return data;
            });
          },
        },
      },
    }),
    fetchExchange
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider value={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;