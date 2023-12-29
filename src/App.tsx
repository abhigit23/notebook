import { Flex, Grid, GridItem, Show, Spinner } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Editor from "./components/Editor";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";
import APIClient from "./services/api-client";

export interface Page {
	id: number;
	title: string;
	description: string;
	content: string;
	parentId: number | null;
	child: Page[] | null;
	emoji: string;
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
	const { readOnly, handleEditButton } = useHandler();
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [pages, setPages] = useState<Page[]>([]);
	const [activePage, setActivePage] = useState<Page | null>(null);

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

	const pageTitle = (pageId: number, title: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, title };
				}
				return page;
			}),
		);
	};

	const pageDescription = (pageId: number, description: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, description };
				}
				return page;
			}),
		);
	};

	const pageContent = (pageId: number, content: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, content };
				}
				return page;
			}),
		);
	};

	const pageEmoji = (pageId: number, emoji: string) => {
		setPages((prevPages) =>
			prevPages.map((page) => {
				if (page.id === pageId) {
					return { ...page, emoji };
				}
				return page;
			}),
		);
	};

	const addPage = () => {
		const newPage: Page = {
			id: Date.now(),
			title: `New Page ${pages.length + 1}`,
			description: "",
			content: "",
			parentId: null,
			child: [],
			emoji: "😀",
		};

		setPages((prevPages) => [...prevPages, newPage]);
		setActivePage(newPage);
	};

	const addSubPage = (parentPage: Page) => {
		if (parentPage?.child) {
			const newSubPage: Page = {
				id: Date.now(),
				title: `Sub Page ${parentPage.child?.length + 1}`,
				description: "",
				content: "",
				parentId: parentPage.id,
				child: [],
				emoji: "😄",
			};
			const updatedPages = [...pages];
			parentPage?.child?.push(newSubPage);
			setPages(updatedPages);
			setActivePage(newSubPage);
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
					<Navbar readOnly={readOnly} handleEditButton={handleEditButton} />
				</GridItem>
				<Show above="lg" ssr={false}>
					<GridItem area="aside" padding={3}>
						<Sidebar
							addPage={addPage}
							pages={pages}
							addSubPage={addSubPage}
							setActivePage={setActivePage}
							activePage={activePage}
						/>
					</GridItem>
				</Show>
				<GridItem area="main" px={4} w="80%">
					<Editor
						pageTitle={pageTitle}
						pageDescription={pageDescription}
						pageContent={pageContent}
						pageEmoji={pageEmoji}
						pages={pages}
						activePage={activePage}
					/>
				</GridItem>
			</Grid>
		</>
	);
}

export default App;
