import {
	Box,
	Divider,
	IconButton,
	Show,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useRef } from "react";
import useDescription from "../hooks/useDescription";
import useEmoji from "../hooks/useEmoji";
import useText, { TextAreaEvent } from "../hooks/useText";
import useThemeKey from "../hooks/useThemeKey";

interface Props {
	title: string;
	readOnly: boolean;
	onTitleChange: (e: TextAreaEvent) => void;
}

function Editor({ title, onTitleChange, readOnly }: Props) {
	const themeKey = useThemeKey();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const { rows, handleText, text } = useText(textRef);
	const { description, handleDescription } = useDescription();
	const { selectedEmoji, showEmojiPicker, handleEmojiButton, handleOpenEmoji } =
		useEmoji();

	return (
		<>
			<Show above="lg" ssr={false}>
				<IconButton
					aria-label="emoji"
					size="lg"
					variant="unstyled"
					fontSize="45px"
					icon={<span>{selectedEmoji.emoji}</span>}
					onClick={handleEmojiButton}
					pos="absolute"
				/>
			</Show>
			{showEmojiPicker && (
				<Box
					style={{
						position: "absolute",
						top: "10rem",
						zIndex: "2",
						width: "200px",
					}}
				>
					<EmojiPicker
						theme={Theme[themeKey]}
						onEmojiClick={handleOpenEmoji}
						lazyLoadEmojis={true}
						autoFocusSearch={false}
					/>
				</Box>
			)}
			<VStack marginX={{ base: 0, lg: "65px" }}>
				<Textarea
					value={title}
					placeholder="Untitled Page"
					fontSize="4xl"
					_focusVisible={{ outline: "none" }}
					variant="unstyled"
					fontWeight="bold"
					resize="none"
					onChange={(e) => onTitleChange(e)}
					isReadOnly={readOnly}
				/>
				<Textarea
					value={description}
					placeholder="Page Description (Optional)"
					_focusVisible={{ outline: "none" }}
					color="gray.300"
					variant="unstyled"
					resize="none"
					onChange={handleDescription}
					isReadOnly={readOnly}
				/>
				<Textarea
					placeholder="Enter your content here..."
					_placeholder={{ color: "gray.300" }}
					_focusVisible={{ outline: "none" }}
					variant="unstyled"
					rows={rows as number}
					onChange={handleText}
					value={text}
					ref={textRef}
					resize="none"
					isReadOnly={readOnly}
				/>
				<Divider />
			</VStack>
		</>
	);
}

export default Editor;
