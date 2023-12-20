import {
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";

interface Props {
	title: string;
}

function Sidebar({ title }: Props) {
	return (
		<VStack spacing={4} align="stretch">
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
						<MenuItem command="⌘T">New Tab</MenuItem>
						<MenuItem command="⌘N">New Window</MenuItem>
						<MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
						<MenuItem command="⌘O">Open File...</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</VStack>
	);
}

export default Sidebar;
