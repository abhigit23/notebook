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
import { FaEllipsisVertical } from "react-icons/fa6";
import "../assets/css/Item.css";
import { Page } from "../App";

interface Props {
	id: string;
	title: string;
	child: Page[] | null;
	parent: Page | null;
	addSubPage: (parentId: string) => void;
}

function Item({ id, title, child, addSubPage }: Props) {
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
					{title ? title : "Untitled Page"}
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
						<MenuItem command="⌘N" onClick={() => addSubPage(id)}>
							Add Sub Page
						</MenuItem>
						<MenuItem command="⌘T">New Tab</MenuItem>
						<MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
						<MenuItem command="⌘O">Open File...</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<ul className="sidebar-list">
				{child?.map((item) => (
					<li key={item.id}>
						<Item
							id={item.id}
							title={item.title}
							child={item.child}
							parent={item.parent}
							addSubPage={addSubPage}
						/>
					</li>
				))}
			</ul>
		</VStack>
	);
}

export default Item;
