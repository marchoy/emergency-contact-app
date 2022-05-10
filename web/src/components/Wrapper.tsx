import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "regular",
}) => {
    return (
        <Box
            marginTop={8}
            maxWidth={variant === "regular" ? "800px" : "400px"}
            width="100%"
            marginX="auto"
        >
            {children}
        </Box>
    );
};