import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useUpdateContactMutation } from "../../generated/graphql";
import { useGetContactFromUrl } from "../../utils/useGetContactIdFromUrl";

interface contactProps {}

const Contact: React.FC<contactProps> = ({}) => {
    const [{ data, fetching }] = useGetContactFromUrl();
    const [, updateContact] = useUpdateContactMutation();

    if (fetching) {
        return (
            <div>loading...</div>
        );
    }

    return (
        <Wrapper>
            <Heading fontSize={"xl"} marginBottom={4}>Contact Page</Heading>
            <Formik
                initialValues={{
                    name: data?.contact.name,
                    role: data?.contact.role,
                    updatedBy: data?.contact.updatedBy,
                }}
                onSubmit={async (values) => {
                    await updateContact({ updateContactId: data.contact.id, ...values });
                    // router.push("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            label="Name"
                            placeholder="name"
                        />
                        <Box marginTop={4}>
                            <InputField
                                name="role"
                                label="Role"
                                placeholder="role"
                            />
                        </Box>
                        <Box marginTop={4}>
                            <InputField
                                name="updatedBy"
                                label="Updated By"
                                placeholder="updated by"
                            />
                        </Box>
                        <Box marginTop={4}>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="green"
                            >
                                update
                            </Button>
                            <Button
                                marginLeft={4}
                                colorScheme="red"
                                // onClick={}
                            >
                                delete
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Contact;