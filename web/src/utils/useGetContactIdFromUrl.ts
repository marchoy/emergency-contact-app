import { useRouter } from "next/router";
import { useContactQuery } from "../generated/graphql";

export const useGetContactFromUrl = () => {
    const router = useRouter();
    const id = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    return useContactQuery({
        pause: id === -1,
        variables: {
            contactId: id,
        },
    });
};