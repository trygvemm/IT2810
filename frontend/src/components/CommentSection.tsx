import Comment from "../components/types/Comment";

function CommentSection(props: { comments: Comment[] }) {
	const { comments } = props;
	if (comments.length !== 0) {
		return (
			<ul aria-label="commentsection" className="flex flex-col items-center w-full">
				{comments
					.slice(0)
					.reverse()
					.map((comment: Comment, index) => (
						<li
							className="p-4 m-1 bg-[#B3C5EF] rounded-xl text-black w-[95vw] sm:w-1/2"
							aria-label="comment"
							key={comment.id}
						>
							{comment.text}
						</li>
					))}
			</ul>
		);
	}
	return <p>no comments :(</p>;
}
export default CommentSection;
