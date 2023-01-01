import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import CommentInput from "./types/CommentInput";
import CommentInputProps from "./types/CommentInputProps";

export const CREATE_COMMENT = gql`
	mutation createComment($text: String, $bookId: String) {
		createComment(input: { text: $text, bookId: $bookId }) {
			text
		}
	}
`;

export default function CommentInputSection(props: CommentInputProps) {
	const [commentText, setCommentText] = useState<string>("");
	const [show, setShow] = useState(false);

	// On componentDidMount set the timer
	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			setShow(false);
		}, 5000);

		return () => {
			clearTimeout(timeId);
		};
	}, [show]);

	const [createComment, { loading, error }] = useMutation<CommentInput>(CREATE_COMMENT, {
		refetchQueries: () => [
			{
				query: props.refetch,
				variables: {
					id: props.id,
				},
			},
		],
	});

	const postComment = () => {
		setShow(true);
		createComment({
			variables: { text: commentText, bookId: props.id },
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>Error x(</p>;
	}

	return (
		<>
			<textarea
				id="commentTextArea"
				aria-label="Text box to write your comment about the book"
				onChange={e => setCommentText(e.target.value)}
				className="bg-white text-black placeholder-black textarea textarea-bordered w-[95vw] sm:w-1/2 h-30 focus:outline-accent-focus"
				placeholder="What do you think about this book?"
			></textarea>
			<button
				id="commentSubmitButton"
				onClick={() => {
					commentText.length > 0 ? postComment() : alert("Cannot post empty comment!");
				}}
				className="mt-5 btn btn-accent"
			>
				Submit
			</button>
			{show ? (
				<div
					id="feedbackPopup"
					className="alert alert-success shadow-lg fixed top-3 right-3 w-auto"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Your comment has been submitted!
					</div>
				</div>
			) : null}
		</>
	);
}
