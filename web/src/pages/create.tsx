import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useCreateContactMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface createProps {}

const Create: React.FC<createProps> = ({}) => {
    const router = useRouter();
    const [, createContact] = useCreateContactMutation();

    return (
        <Wrapper variant="small">
            <Box marginBottom={4}>
                <Heading fontSize={"xl"}>Create Contact</Heading>
            </Box>
            <Formik
                initialValues={{
                    name: "",
                    role: "",
                    createdBy: "",
                    updatedBy: "",
                }}
                onSubmit={async (values) => {
                    const { error } = await createContact({ input: values });
                    if (!error) {
                        router.push("/");
                    }
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
                                name="createdBy"
                                label="Created By"
                                placeholder="created by"
                            />
                        </Box>
                        <Button
                            type="submit"
                            marginTop={4}
                            isLoading={isSubmitting}
                            colorScheme="green"
                        >
                            submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Create;