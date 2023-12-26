import { Button } from "@chakra-ui/react";
import Item from "./Item";
import { useState } from "react";

interface PageItem {
	id: string;
	title: string;
	child: PageItem[];
	parent: { title: string; child: PageItem[] } | null;
}

interface Props {
	title: string;
}

function Sidebar({ title }: Props) {
	const initialPage = { id: "1", title, child: [], parent: null };
	const [sideBarItems, setSideBarItems] = useState<PageItem[]>([]);

	const addNewPage = () => {
		const newPage: PageItem = {
			id: `page-${sideBarItems.length + 1}`,
			title: `New Page ${sideBarItems.length + 1}`,
			child: [],
			parent: null,
		};

		setSideBarItems((prevItems) => [...prevItems, newPage]);
	};

	return (
		<>
			<Item {...initialPage} />
			{sideBarItems.map((item) => (
				<Item
					title={item.title}
					id={item.id}
					child={item.child}
					parent={item.parent}
					key={item.id}
				/>
			))}
			<Button w={"100%"} onClick={addNewPage}>
				Add New Page
			</Button>
		</>
	);
}

export default Sidebar;
