import {
	Flex,
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import "../assets/css/Item.css";

interface Props {
	id: string;
	title: string;
	child: Props[];
	parent: { title: string; child: Props[] } | null;
}

function Item({ id, title, child }: Props) {
	const [sideBarItems, setSideBarItems] = useState(child || []);
	const generateUniqueId = (parentId: string | undefined, index: number) => {
		if (parentId) {
			return `${parentId}${String.fromCharCode(97 + index)}`;
		}
		return `${index + 1}`;
	};

	const addSubPage = () => {
		const subPage = {
			id: generateUniqueId(id, sideBarItems.length),
			title: `Sub Page ${sideBarItems.length + 1}`,
			child: [],
			parent: { title, child } || null,
		};

		setSideBarItems([...sideBarItems, subPage]);
	};

	return (
		<VStack spacing={3} align="stretch">
			<Flex
				border="1px solid gray"
				borderRadius={10}
				justify="space-between"
				align="center"
				paddingLeft={5}
				paddingRight={1}
			>
				<Text w="80%" paddingY={2}>
					{title}
				</Text>
				<Menu size="sm">
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FaEllipsisVertical />}
						variant="unclosed"
						size="sm"
					/>
					<MenuList>
						<MenuItem command="⌘N" onClick={addSubPage}>
							Add Sub Page
						</MenuItem>
						<MenuItem command="⌘T">New Tab</MenuItem>
						<MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
						<MenuItem command="⌘O">Open File...</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<ul className="sidebar-list">
				{sideBarItems.map((sidebarItem, index) => (
					<li key={generateUniqueId(id, index)}>
						<Item
							id={sidebarItem.id || generateUniqueId(id, index)}
							title={sidebarItem.title}
							child={sidebarItem.child}
							parent={sidebarItem.parent || null}
						/>
					</li>
				))}
			</ul>
		</VStack>
	);
}

export default Item;
