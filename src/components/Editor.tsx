import { Divider, IconButton, Show, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { Page } from "../App";
import useEmoji from "../hooks/useEmoji";
import { TextAreaEvent } from "../hooks/useText";
import EmojiPickerEl from "./EmojiPickerEl";

interface Props {
	pageTitle: (pageId: number, title: string) => void;
	pageDescription: (pageId: number, description: string) => void;
	pageContent: (pageId: number, content: string) => void;
	pageEmoji: (pageId: number, emojiString: string) => void;
	pages: Page[];
	activePage: Page | null;
}

function Editor({
	pageTitle,
	pageDescription,
	pageContent,
	pageEmoji,
	pages,
	activePage,
}: Props) {
	const { showEmojiPicker, handleEmojiButton, setEmojiPicker } = useEmoji();

	const handleTitleChange = (e: TextAreaEvent, pageId: number) => {
		const newTitle = e.target.value;
		pageTitle(pageId, newTitle);
	};

	const handleDescriptionChange = (e: TextAreaEvent, pageId: number) => {
		const newDescription = e.target.value;
		pageDescription(pageId, newDescription);
	};

	const handleContentChange = (e: TextAreaEvent, pageId: number) => {
		const newContent = e.target.value;
		pageContent(pageId, newContent);
	};

	const handEmojiChange = (pageId: number, emojiString: string) => {
		pageEmoji(pageId, emojiString);
		setEmojiPicker(false);
	};

	const renderPage = (page: Page): React.JSX.Element | null => {
		if (!activePage || page.id !== activePage.id) {
			return null;
		}

		return (
			<>
				<Show above="lg" ssr={false}>
					<IconButton
						aria-label="emoji"
						size="lg"
						variant="unstyled"
						fontSize="45px"
						icon={<span>{page.emoji}</span>}
						onClick={handleEmojiButton}
						pos="absolute"
					/>
				</Show>
				{showEmojiPicker && (
					<EmojiPickerEl
						onEmojiClick={({ emoji }) => handEmojiChange(page.id, emoji)}
						top="10rem"
					/>
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
				{page.child?.map((subPage) => (
					<Editor
						key={subPage.id}
						pageTitle={pageTitle}
						pageDescription={pageDescription}
						pageContent={pageContent}
						pages={[subPage]}
						activePage={activePage}
						pageEmoji={pageEmoji}
					/>
				))}
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
