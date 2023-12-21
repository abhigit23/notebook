import { Divider, IconButton, Show, Textarea, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import useDescription from "../hooks/useDescription";
import useEmoji from "../hooks/useEmoji";
import useText, { TextAreaEvent } from "../hooks/useText";
import EmojiPickerEl from "./EmojiPickerEl";

interface Props {
	title: string;
	readOnly: boolean;
	onTitleChange: (e: TextAreaEvent) => void;
}

function Editor({ title, onTitleChange, readOnly }: Props) {
	const textRef = useRef<HTMLTextAreaElement>(null);
	const { rows, handleText, text } = useText(textRef);
	const { description, handleDescription } = useDescription();
	const {
		selectedEmoji2,
		showEmojiPicker,
		handleEmojiButton,
		handleOpenEmoji2,
	} = useEmoji();

	return (
		<>
			<Show above="lg" ssr={false}>
				<IconButton
					aria-label="emoji"
					size="lg"
					variant="unstyled"
					fontSize="45px"
					icon={<span>{selectedEmoji2.emoji}</span>}
					onClick={handleEmojiButton}
					pos="absolute"
				/>
			</Show>
			{showEmojiPicker && (
				<EmojiPickerEl onEmojiClick={handleOpenEmoji2} top="10rem" />
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
