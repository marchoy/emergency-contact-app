import { Box, Button, Flex, Heading, Link, Table } from "@chakra-ui/react";
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
          <NextLink href="/create" passHref legacyBehavior>
            <Button marginRight={4} colorPalette="green">create contact</Button>
          </NextLink>
        </Box>
      </Flex>
        {!data && fetching ? (
            <div>Loading...</div>
          ) : (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Role</Table.ColumnHeader>
                  <Table.ColumnHeader>Default Contact Number</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.contacts.map(contact =>
                  <Table.Row key={contact.id}>
                    <Table.Cell>{contact.name}</Table.Cell>
                    <Table.Cell>{contact.role}</Table.Cell>
                    <Table.Cell>
                      {!contact.contactNumbers[0] ? null : (
                        contact.contactNumbers[0].phoneNumber
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <NextLink href="/contact/[id]" as={`/contact/${contact.id}`} passHref legacyBehavior>
                        <Link>
                          Edit
                        </Link>
                      </NextLink>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          )
        }
    </Wrapper>
  );
}

export default Index;
