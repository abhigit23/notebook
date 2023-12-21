import {
	Button,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Show,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
	FaCodeMerge,
	FaEllipsisVertical,
	FaPenToSquare,
} from "react-icons/fa6";
import { ImSphere } from "react-icons/im";
import useEmoji from "../hooks/useEmoji";
import useHeading from "../hooks/useHeading";
import ColorModeSwitch from "./ColorModeSwitch";
import EmojiPickerEl from "./EmojiPickerEl";

interface Props {
	readOnly: boolean;
	handleEditButton: () => void;
}

function Navbar({ readOnly, handleEditButton }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { heading, handleHeadingInput } = useHeading(inputRef);
	const {
		selectedEmoji1,
		showEmojiPicker,
		handleEmojiButton,
		handleOpenEmoji1,
	} = useEmoji();

	return (
		<Flex padding={3} marginY={2}>
			<HStack flex={1}>
				<Show above="lg" ssr={false}>
					<IconButton
						aria-label="emoji"
						icon={<span>{selectedEmoji1.emoji}</span>}
						onClick={handleEmojiButton}
					/>

					{showEmojiPicker && (
						<EmojiPickerEl onEmojiClick={handleOpenEmoji1} top="5rem" />
					)}
				</Show>

				<Editable
					defaultValue={heading}
					placeholder="Heading"
					fontSize="2xl"
					paddingX={2}
				>
					<EditablePreview />
					<EditableInput
						ref={inputRef}
						onChange={handleHeadingInput}
						_focusVisible={{ outline: "none" }}
					/>
				</Editable>
			</HStack>
			<HStack h="fit-content" py={2}>
				<Show above="lg" ssr={false}>
					<Button leftIcon={<ImSphere />}>Share</Button>
					<Button
						onClick={handleEditButton}
						leftIcon={readOnly ? <FaPenToSquare /> : <FaCodeMerge />}
						colorScheme="blue"
					>
						{readOnly ? "Edit" : "Merge"}
					</Button>
				</Show>
				<Show below="lg" ssr={false}>
					<IconButton aria-label="share" icon={<ImSphere />} />
					<IconButton
						aria-label="edit"
						icon={readOnly ? <FaPenToSquare /> : <FaCodeMerge />}
						colorScheme="blue"
						onClick={handleEditButton}
					/>
				</Show>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FaEllipsisVertical />}
					/>
					<MenuList>
						<MenuItem command="⌘T">New Tab</MenuItem>
						<MenuItem command="⌘N">New Window</MenuItem>
						<MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
						<MenuItem command="⌘O">Open File...</MenuItem>
					</MenuList>
				</Menu>
				<ColorModeSwitch />
			</HStack>
		</Flex>
	);
}

export default Navbar;
