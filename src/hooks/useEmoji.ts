import { useState } from "react";
import { Emoji } from "../hooks/useHandler";

const useEmoji = () => {
	const [selectedEmoji, setSelectedEmoji] = useState<Emoji>({ emoji: "😆" });
	const [showEmojiPicker, setEmojiPicker] = useState(false);

	const handleEmojiButton = () => {
		setEmojiPicker((prev) => !prev);
	};

	const handleOpenEmoji = (emojiObj: Emoji) => {
		setSelectedEmoji(emojiObj);
		setEmojiPicker(false);
	};

	return { selectedEmoji, showEmojiPicker, handleEmojiButton, handleOpenEmoji };
};

export default useEmoji;
