import { Divider, IconButton, Show, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { Page } from "../App";
import useEmoji from "../hooks/useEmoji";
import { TextAreaEvent } from "../hooks/useText";
import EmojiPickerEl from "./EmojiPickerEl";

interface Props {
	pageTitle: (pageId: string, title: string) => void;
	pageDescription: (pageId: string, description: string) => void;
	pageContent: (pageId: string, contentS: string) => void;
	pages: Page[];
}

function Editor({ pageTitle, pageDescription, pageContent, pages }: Props) {
	const {
		selectedEmoji2,
		showEmojiPicker,
		handleEmojiButton,
		handleOpenEmoji2,
	} = useEmoji();

	const handleTitleChange = (e: TextAreaEvent, pageId: string) => {
		const newTitle = e.target.value;
		pageTitle(pageId, newTitle);
	};

	const handleDescriptionChange = (e: TextAreaEvent, pageId: string) => {
		const newDescription = e.target.value;
		pageDescription(pageId, newDescription);
	};

	const handleContentChange = (e: TextAreaEvent, pageId: string) => {
		const newContent = e.target.value;
		pageContent(pageId, newContent);
	};

	const renderPage = (page: Page): JSX.Element => {
		return (
			<>
				<React.Fragment>
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
							value={page.title}
							placeholder="Untitled Page"
							fontSize="4xl"
							_focusVisible={{ outline: "none" }}
							variant="unstyled"
							fontWeight="bold"
							resize="none"
							onChange={(e) => handleTitleChange(e, page.id)}
							rows={3}
						/>
						<Textarea
							value={page.description}
							placeholder="Page Description (Optional)"
							_focusVisible={{ outline: "none" }}
							color="gray.300"
							variant="unstyled"
							resize="none"
							onChange={(e) => handleDescriptionChange(e, page.id)}
						/>
						<Textarea
							placeholder="Enter your content here..."
							_placeholder={{ color: "gray.300" }}
							_focusVisible={{ outline: "none" }}
							variant="unstyled"
							onChange={(e) => handleContentChange(e, page.id)}
							value={page.content}
							resize="none"
						/>
						<Divider />
					</VStack>
					{page.child?.map((subPage) => renderPage(subPage))}
				</React.Fragment>
			</>
		);
	};
	return (
		<>
			{pages.map((page) => (
				<React.Fragment key={page.id}>{renderPage(page)}</React.Fragment>
			))}
		</>
	);
}

export default Editor;
