import { Heading, Link, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useContactNumbersQuery, useDeletePhoneNumberMutation } from "../generated/graphql";
import AddNumberForm from "./AddNumberForm";
import { Wrapper } from "./Wrapper";

interface contactNumbersProps {
    contactId: number;
}

const ContactNumbers: React.FC<contactNumbersProps> = ({ contactId }) => {
    const router = useRouter();
    const [{ data, fetching }] = useContactNumbersQuery({ variables: { contactId } });
    const [, deletePhoneNumber] = useDeletePhoneNumberMutation();

    if (!fetching && !data.contact.contactNumbers[0]) {
        return <AddNumberForm contactId={contactId} />;
    }

    return (
        <Wrapper>
            <Heading fontSize={"xl"} marginBottom={5}>Contact Numbers</Heading>
            {fetching ? (<div>Loading...</div>) : (
                <TableContainer>
                    <Table variant={"simple"}>
                        <Thead>
                            <Tr>
                                <Th>Contact Number</Th>
                                <Th>Type</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.contact.contactNumbers.map(contactNumber => 
                                <Tr>
                                    <Th>{contactNumber.phoneNumber}</Th>
                                    <Th>{contactNumber.phoneNumberType}</Th>
                                    <Th>
                                        <Link
                                            onClick={async () => {
                                                await deletePhoneNumber({ deletePhoneNumberId: contactNumber.id });
                                                router.reload(); // not ideal, update cache instead
                                            }}
                                        >
                                            delete
                                        </Link>
                                    </Th>
                                </Tr>    
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <AddNumberForm contactId={contactId} />
        </Wrapper>
    );
};

export default ContactNumbers;