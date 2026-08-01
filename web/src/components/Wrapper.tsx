import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
    children: React.ReactNode;
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "regular",
}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const verifyAuth = async (token: string): Promise<boolean> => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
                },
                body: JSON.stringify({ query: "{ checkAuth }" }),
            });
            const data = await res.json();
            return data.data?.checkAuth === true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("admin-password");
        if (token) {
            verifyAuth(token).then((isValid) => {
                if (isValid) {
                    setIsAdmin(true);
                } else {
                    localStorage.removeItem("admin-password");
                    setIsAdmin(false);
                }
            });
        } else {
            setIsAdmin(false);
        }
    }, []);

    const toggleAdmin = async () => {
        if (isAdmin) {
            localStorage.removeItem("admin-password");
            setIsAdmin(false);
            window.location.reload();
        } else {
            const pw = prompt("Enter admin password:");
            if (pw) {
                const isValid = await verifyAuth(pw);
                if (isValid) {
                    localStorage.setItem("admin-password", pw);
                    setIsAdmin(true);
                    window.location.reload();
                } else {
                    alert("Invalid admin password.");
                    localStorage.removeItem("admin-password");
                    setIsAdmin(false);
                }
            }
        }
    };

    return (
        <Box
            marginTop={8}
            maxWidth={variant === "regular" ? "800px" : "400px"}
            width="100%"
            marginX="auto"
            marginBottom={8}
            paddingX={4}
        >
            <Flex justifyContent="space-between" alignItems="center" marginBottom={8} borderBottom="1px solid" borderColor="gray.200" paddingBottom={4}>
                <Button size="sm" onClick={toggleAdmin} colorPalette={isAdmin ? "green" : "red"}>
                    {isAdmin ? "Admin: Unlocked" : "Admin: Locked"}
                </Button>
            </Flex>
            {children}
        </Box>
    );
};