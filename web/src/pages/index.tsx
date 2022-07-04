import { Box, Button, Flex, Heading, Link, Stack, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import NextLink from "next/link";
import { useContactsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data, error, fetching }] = useContactsQuery();

  if (!data && !fetching) {
    return (
        <div>
            <div>something went wrong.</div>
            <div>{error?.message}</div>
        </div>
    );
  }

  return (
    <Wrapper>
      <Flex marginBottom={5}>
        <Box marginBottom={4}>
          <Heading fontSize={"xl"}>Emergency Contacts</Heading>
        </Box>
        <Box marginLeft={"auto"}>
          <NextLink href="/create">
            <Button as={Link} marginRight={4} colorScheme="green">create contact</Button>
          </NextLink>
        </Box>
      </Flex>
        {!data && fetching ? (
            <div>Loading...</div>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>Default Contact Number</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.contacts.map(contact =>
                    <Tr key={contact.id}>
                      <Th>{contact.name}</Th>
                      <Th>{contact.role}</Th>
                      <Th>
                        {!contact.contactNumbers[0] ? null : (
                          contact.contactNumbers[0].phoneNumber
                        )}
                      </Th>
                      <Th>
                        <NextLink href="/contact/[id]" as={`/contact/${contact.id}`}>
                          <Link>
                            <div>Edit</div>
                          </Link>
                        </NextLink>
                      </Th>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )
        }
    </Wrapper>
  );
}

export default Index;
