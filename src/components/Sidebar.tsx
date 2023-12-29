import { Button } from "@chakra-ui/react";
import { Page } from "../App";
import Item from "./Item";
import React from "react";

interface Props {
	addPage: () => void;
	addSubPage: (parentId: string) => void;
	pages: Page[];
}

function Sidebar({ addPage, pages, addSubPage }: Props) {
	return (
		<>
			{pages.map((page) => (
				<React.Fragment key={page.id}>
					<Item
						title={page.title}
						id={page.id}
						parent={page.parent}
						child={page.child}
						addSubPage={addSubPage}
					/>
				</React.Fragment>
			))}
			<Button w={"100%"} onClick={addPage}>
				Add New Page
			</Button>
		</>
	);
}

export default Sidebar;
