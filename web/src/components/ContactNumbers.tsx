import { Box, Heading, Link, Table } from "@chakra-ui/react";
import React from "react";
import { useContactNumbersQuery, useDeletePhoneNumberMutation } from "../generated/graphql";
import AddNumberForm from "./AddNumberForm";

interface contactNumbersProps {
    contactId: number;
}

const ContactNumbers: React.FC<contactNumbersProps> = ({ contactId }) => {
    const [{ data, fetching }] = useContactNumbersQuery({ variables: { contactId } });
    const [, deletePhoneNumber] = useDeletePhoneNumberMutation();

    if (!fetching && !data.contact.contactNumbers[0]) {
        return <AddNumberForm contactId={contactId} />;
    }

    return (
        <Box marginTop={8}>
            <Heading fontSize={"xl"} marginBottom={5}>Contact Numbers</Heading>
            {fetching ? (<div>Loading...</div>) : (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Contact Number</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.contact.contactNumbers.map(contactNumber => 
                            <Table.Row key={contactNumber.id}>
                                <Table.Cell>{contactNumber.phoneNumber}</Table.Cell>
                                <Table.Cell>{contactNumber.phoneNumberType}</Table.Cell>
                                <Table.Cell>
                                    <Link
                                        onClick={async () => {
                                            const result = await deletePhoneNumber({ deletePhoneNumberId: contactNumber.id });
                                            if (result.error) {
                                                alert(result.error.message.replace("[GraphQL] ", ""));
                                            }
                                        }}
                                    >
                                        delete
                                    </Link>
                                </Table.Cell>
                            </Table.Row>    
                        )}
                    </Table.Body>
                </Table.Root>
            )}
            <AddNumberForm contactId={contactId} />
        </Box>
    );
};

export default ContactNumbers;