import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface createProps {}

const Create: React.FC<createProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{
                    name: "",
                    role: "",
                    createdBy: "",
                    updatedBy: "",
                }}
                onSubmit={() => console.log("SUBMIT")}
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
                        <Box marginTop={4}>
                            <InputField
                                name="updatedBy"
                                label="Updated By"
                                placeholder="updated by"
                            />
                        </Box>
                        <Flex marginTop={2}>
                            {/* <NextLink href="/forgot-password">
                                <Link marginLeft="auto">forgot password?</Link>
                            </NextLink> */}
                        </Flex>
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