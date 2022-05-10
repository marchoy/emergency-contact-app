import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useCreatePhoneNumberMutation } from "../generated/graphql";
import { InputField } from "./InputField";

interface addNumberFormProps {
    contactId: number;
}

const AddNumberForm: React.FC<addNumberFormProps> = ({ contactId }) => {
    const [, addPhoneNumber] = useCreatePhoneNumberMutation();

    return (
        <Formik
            initialValues={{
                phoneNumber: "",
                phoneNumberType: "",
            }}
            onSubmit={async (values, { resetForm }) => {
                await addPhoneNumber({
                    input: {
                        contactId,
                        createdBy: "",
                        updatedBy: "",
                        ...values,
                    },
                });
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Flex marginTop={10}>
                    <InputField
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="phone number"
                    />
                    <Box width={20} />
                    <InputField
                        name="phoneNumberType"
                        label="Phone Number Type"
                        placeholder="phone number type"
                    />
                    </Flex>
                    <Box marginTop={4}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="green"
                        >
                            add contact number
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AddNumberForm;