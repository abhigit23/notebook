import {
	Box,
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
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useRef } from "react";
import {
	FaCodeMerge,
	FaEllipsisVertical,
	FaPenToSquare,
} from "react-icons/fa6";
import { ImSphere } from "react-icons/im";
import { Emoji } from "../hooks/useHandler";
import useHeading from "../hooks/useHeading";
import useThemeKey from "../hooks/useThemeKey";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
	selectedEmoji: string;
	showEmojiPicker: boolean;
	readOnly: boolean;
	handleEmojiClick: (emojiObj: Emoji) => void;
	handleButtonClick: () => void;
	handleEditButton: () => void;
}

function Navbar({
	selectedEmoji,
	showEmojiPicker,
	readOnly,
	handleEmojiClick,
	handleButtonClick,
	handleEditButton,
}: Props) {
	const themeKey = useThemeKey();
	const inputRef = useRef<HTMLInputElement>(null);
	const { heading, handleHeadingInput } = useHeading(inputRef);

	return (
		<Flex padding={3} marginY={2}>
			<HStack flex={1}>
				<Show above="lg" ssr={false}>
					<IconButton
						aria-label="emoji"
						icon={<span>{selectedEmoji}</span>}
						onClick={() => handleButtonClick()}
					/>

					{showEmojiPicker && (
						<Box style={{ position: "absolute", top: "5rem", zIndex: "2" }}>
							<EmojiPicker
								theme={Theme[themeKey]}
								onEmojiClick={(emojiObj) => handleEmojiClick(emojiObj)}
								lazyLoadEmojis={true}
								autoFocusSearch={false}
							/>
						</Box>
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
