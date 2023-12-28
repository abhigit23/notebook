import { Flex, Grid, GridItem, Show, Spinner } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Editor from "./components/Editor";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";
import APIClient from "./services/api-client";

interface Credentials {
	email: string;
	password: string;
}

interface User extends Credentials {
	id: string;
	firstName: string;
	lastName: string;
	token: string;
}

function App() {
	const { title, readOnly, onTitleChange, handleEditButton } = useHandler();
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const apiClient = new APIClient<User, Credentials>("/login");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();
		try {
			await apiClient.post({ email, password: pass });
			setLoggedIn(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<>
			{loading && (
				<Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
					<Spinner size="xl" />
				</Flex>
			)}
			{!isLoggedIn && (
				<Flex
					p={4}
					w={{ base: "100%", lg: "25%" }}
					h="100vh"
					m="0px auto"
					align="center"
					justify="center"
				>
					<Form
						setEmail={setEmail}
						setPass={setPass}
						email={email}
						pass={pass}
						handleSubmit={(e) => handleSubmit(e)}
					/>
				</Flex>
			)}
			<Grid
				templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
				templateColumns={{ base: "1fr", lg: "250px 1fr" }}
				display={!isLoggedIn ? "none" : "grid"}
				gap={{ base: "unset", lg: "0 150px" }}
			>
				<GridItem area="nav">
					<Navbar
						readOnly={readOnly}
						handleEditButton={handleEditButton}
						title={title}
					/>
				</GridItem>
				<Show above="lg" ssr={false}>
					<GridItem area="aside" padding={3}>
						<Sidebar title={title} />
					</GridItem>
				</Show>
				<GridItem area="main" px={4} w="80%">
					<Editor
						title={title}
						onTitleChange={(e) => onTitleChange(e)}
						readOnly={readOnly}
					/>
				</GridItem>
			</Grid>
		</>
	);
}

export default App;
