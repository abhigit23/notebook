import { Grid, GridItem, Show } from "@chakra-ui/react";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";

function App() {
	const { title, readOnly, onTitleChange, handleEditButton } = useHandler();

	return (
		<Grid
			templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
			templateColumns={{ base: "1fr", lg: "250px 1fr" }}
		>
			<GridItem area="nav">
				<Navbar readOnly={readOnly} handleEditButton={handleEditButton} />
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
	);
}

export default App;
