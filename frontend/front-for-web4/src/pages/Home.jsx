import { Box, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar.jsx";

function Home() {
    return (
        <div>
            <Navbar />
            <Box p={6}>
                <Heading>You are logged in</Heading>
            </Box>
        </div>
    );
}

export default Home;
