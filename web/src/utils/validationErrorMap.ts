export const validationErrorMap = (error) => {
    // console.log("error:  ", (error.graphQLErrors[0].extensions as any).exception.validationErrors)
    const errors: { [key: string]: string } = {};
    (error.graphQLErrors[0].extensions as any).exception.validationErrors.forEach(valError => {
        Object.values(valError.constraints).forEach((message: string) => {
            errors[valError.property] = message;
        });
    });

    return errors;
};