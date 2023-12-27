import { Flex, Grid, GridItem, Show, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";

function App() {
	const { title, readOnly, onTitleChange, handleEditButton } = useHandler();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{loading && (
				<Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
					<Spinner size="xl" />
				</Flex>
			)}
			<Grid
				templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
				templateColumns={{ base: "1fr", lg: "250px 1fr" }}
				display={loading ? "none" : "grid"}
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
				<GridItem area="main" paddingX={5}>
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
