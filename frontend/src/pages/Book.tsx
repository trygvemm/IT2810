import { gql, useQuery } from "@apollo/client";
import BookInfoDisplay from "../components/BookInfoDisplay";
import CommentInputSection from "../components/CommentInputSection";
import CommentSection from "../components/CommentSection";
import { bookInfo, bookSiteInfo } from "../components/types/bookInfo";

export const GET_BOOK = gql`
	query Query($id: String!) {
		bookId(id: $id) {
			id
			author
			title
			year
			language
			imageLink
			link
			pages
			country
			comments {
				text
				id
			}
		}
	}
`;

const Book = (props: { id: string | null }) => {
	let id = props.id;
	if (id != null) {
		window.sessionStorage.setItem("sessionId", id);
	} else {
		id = window.sessionStorage.getItem("sessionId");
	}
	const { loading, error, data } = useQuery<bookSiteInfo>(GET_BOOK, {
		variables: { id: id },
	});

	if (loading) return <p>Loading...</p>;

	if (error) {
		return <p>Error:(</p>;
	}

	const routeChange = () => {
		window.location.href = "/";
	};

	return (
		<>
			{data?.bookId.map((book: bookInfo) => (
				<div key={book.id}>
					<header role={"banner"}>
						<button
							id="homeButton"
							onClick={() => routeChange()}
							className="btn btn-outline btn-accent sm:absolute left-5 top-5"
						>
							Home
						</button>
						<h1 id="title" aria-label="Book-Title" className="text-center text-6xl p-5 text-accent">
							{book.title}
						</h1>
						<p className="text-lg text-center">Author: {book.author}</p>
					</header>
					<div role={"main"} className="flex flex-col mt-32 items-center">
						<BookInfoDisplay
							year={book.year}
							pages={book.pages}
							country={book.country}
							language={book.language}
						></BookInfoDisplay>
						<a
							id="wikipedia"
							className="text-lg hover:underline text-primary mt-11 focus:outline-accent-focus"
							href={book.link}
						>
							Read more at Wikipedia
						</a>
						<div className="flex flex-col items-center w-full mt-20 mb-20">
							<CommentInputSection id={id} refetch={GET_BOOK} />

							<h2 className="mt-14 text-2xl mb-5">Comment Section</h2>
							<CommentSection comments={book.comments}></CommentSection>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Book;
