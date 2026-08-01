export const validationErrorMap = (error: any) => {
    const errors: { [key: string]: string } = {};
    const validationErrors = error?.graphQLErrors?.[0]?.extensions?.exception?.validationErrors;

    if (validationErrors && Array.isArray(validationErrors)) {
        validationErrors.forEach((valError: any) => {
            if (valError.constraints) {
                Object.values(valError.constraints).forEach((message: string) => {
                    errors[valError.property] = message;
                });
            }
        });
    } else if (error?.message) {
        const cleanMsg = error.message.replace("[GraphQL] ", "");
        errors["name"] = cleanMsg;
        errors["phoneNumber"] = cleanMsg;
    }

    return errors;
};