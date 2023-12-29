import { Flex, Grid, GridItem, Show, Spinner } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Editor from "./components/Editor";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";
import APIClient from "./services/api-client";

export interface Page {
	id: string;
	title: string;
	description: string;
	content: string;
	parent: Page | null;
	child: Page[] | null;
}

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
	const { title, readOnly, handleEditButton } = useHandler();
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [pages, setPages] = useState<Page[]>([]);

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

	const pageTitle = (pageId: string, title: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, title };
				}
				return page;
			}),
		);
	};

	const pageDescription = (pageId: string, description: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, description };
				}
				return page;
			}),
		);
	};

	const pageContent = (pageId: string, content: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, content };
				}
				return page;
			}),
		);
	};

	const addPage = () => {
		const newPage: Page = {
			id: `page-${pages.length + 1}`,
			title: `New Page ${pages.length + 1}`,
			description: "",
			content: "",
			parent: null,
			child: [],
		};

		setPages((prevPages) => [...prevPages, newPage]);
	};

	const addSubPage = (parentId: string) => {
		const parentPage = pages.find((page) => page.id === parentId);

		if (parentPage?.child) {
			const newSubPage: Page = {
				id: `sub-page-${parentPage.child?.length + 1}`,
				title: `Sub Page ${parentPage.child?.length + 1}`,
				description: "",
				content: "",
				parent: parentPage,
				child: [],
			};
			const updatedPages = [...pages];
			const updatedParent = updatedPages.find((page) => page.id === parentId);
			updatedParent?.child?.push(newSubPage);
			setPages(updatedPages);
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
						<Sidebar addPage={addPage} pages={pages} addSubPage={addSubPage} />
					</GridItem>
				</Show>
				<GridItem area="main" px={4} w="80%">
					<Editor
						pageTitle={(pageId, title) => pageTitle(pageId, title)}
						pageDescription={(pageId, description) =>
							pageDescription(pageId, description)
						}
						pageContent={(pageId, content) => pageContent(pageId, content)}
						pages={pages}
					/>
				</GridItem>
			</Grid>
		</>
	);
}

export default App;
