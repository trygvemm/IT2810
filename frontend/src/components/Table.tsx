import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { gql, useQuery } from "@apollo/client";
import BookFilters from "./types/BookFilters";
import { hasMoreVar, refetchVar } from "../App";
import BookArrayData from "./types/BookArrayData";
import Book from "./types/Book";
import { SortOrder } from "./types/booksOrderByInput";
import booksOrderByInput from "./types/booksOrderByInput";

const filters: BookFilters = {
	title: undefined,
	author: undefined,
	language: undefined,
	minYear: undefined,
	maxYear: undefined,
};

export const GET_ALL_BOOKS = gql`
	query Query(
		$offset: Int = 0
		$limit: Int = 20
		$filters: BookFilters
		$orderBy: booksOrderByInput
	) {
		books(offset: $offset, limit: $limit, filters: $filters, orderBy: $orderBy) {
			id
			author
			title
			year
			language
		}
	}
`;

function Table(props: { idHook: any }) {
	const { data, fetchMore, refetch } = useQuery<BookArrayData>(GET_ALL_BOOKS, {
		variables: { filters: filters },
	});
	const [hasmore, setHasmore] = useState(true);

	refetchVar(refetch);
	hasMoreVar(setHasmore);

	const [authorSort, setAuthorSort] = useState<SortOrder>(SortOrder.asc);
	const [titleSort, setTitleSort] = useState<SortOrder>(SortOrder.asc);
	const [yearSort, setYearSort] = useState<SortOrder>(SortOrder.asc);
	const [languageSort, setLanguageSort] = useState<SortOrder>(SortOrder.asc);
	const [lastClicked, setLastClicked] = useState<string>();

	const routeChange = (id: String) => {
		props.idHook(id);
		window.location.href = "#/Book";
	};

	return (
		<div role={"main"} id="table" className="justify-center flex w-full">
			<InfiniteScroll
				dataLength={data?.books ? data!.books.length : 0}
				next={async () => {
					await fetchMore({
						variables: {
							offset: data?.books.length,
						},
					}).then(result => {
						if (result.data.books.length === 0) {
							setHasmore(false);
						}
					});
				}}
				hasMore={hasmore}
				loader={
					data && data!.books.length < 20 ? (
						<p className="text-center">
							<b>Yay! You have seen it all</b>
						</p>
					) : (
						<p>Loading...</p>
					)
				}
				scrollThreshold={0.9}
				endMessage={
					<p className="text-center">
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				<table className="table table-fixed">
					<thead>
						<tr>
							<th
								tabIndex={6}
								className="cursor-pointer bg-slate-500 hover:bg-slate-600 w-64 focus:outline-accent-focus"
								onClick={() => {
									setLastClicked("Author");
									setLanguageSort(SortOrder.asc);
									setYearSort(SortOrder.asc);
									setTitleSort(SortOrder.asc);
									if (authorSort === SortOrder.asc) {
										setAuthorSort(SortOrder.desc);
									} else {
										setAuthorSort(SortOrder.asc);
									}
									const sort: booksOrderByInput = { author: authorSort };
									refetch({ orderBy: sort });
									setHasmore(true);
								}}
								onKeyDown={e => {
									if (e.key === "Enter") {
										setLastClicked("Author");
										setLanguageSort(SortOrder.asc);
										setYearSort(SortOrder.asc);
										setTitleSort(SortOrder.asc);
										if (authorSort === SortOrder.asc) {
											setAuthorSort(SortOrder.desc);
										} else {
											setAuthorSort(SortOrder.asc);
										}
										const sort: booksOrderByInput = { author: authorSort };
										refetch({ orderBy: sort });
										setHasmore(true);
									}
								}}
							>
								Author
								<div className="float-right">
									{""}
									{lastClicked === "Author" ? (authorSort === SortOrder.desc ? "⬆️" : "⬇️") : "↕️"}
								</div>
							</th>
							<th
								tabIndex={7}
								className="cursor-pointer bg-slate-500 hover:bg-slate-600 w-96 focus:outline-accent-focus"
								onClick={() => {
									setLastClicked("Title");
									setLanguageSort(SortOrder.asc);
									setYearSort(SortOrder.asc);
									setAuthorSort(SortOrder.asc);
									if (titleSort === SortOrder.asc) {
										setTitleSort(SortOrder.desc);
									} else {
										setTitleSort(SortOrder.asc);
									}
									const sort: booksOrderByInput = { title: titleSort };
									refetch({ orderBy: sort });
									setHasmore(true);
								}}
								onKeyDown={e => {
									if (e.key === "Enter") {
										setLastClicked("Title");
										setLanguageSort(SortOrder.asc);
										setYearSort(SortOrder.asc);
										setAuthorSort(SortOrder.asc);
										if (titleSort === SortOrder.asc) {
											setTitleSort(SortOrder.desc);
										} else {
											setTitleSort(SortOrder.asc);
										}
										const sort: booksOrderByInput = { title: titleSort };
										refetch({ orderBy: sort });
										setHasmore(true);
									}
								}}
							>
								Title
								<div className="float-right">
									{lastClicked === "Title" ? (titleSort === SortOrder.desc ? "⬆️" : "⬇️") : "↕️"}
								</div>
							</th>
							<th
								tabIndex={8}
								className="cursor-pointer bg-slate-500 hover:bg-slate-600 w-36 focus:outline-accent-focus"
								onClick={() => {
									setLastClicked("Year");
									setLanguageSort(SortOrder.asc);
									setAuthorSort(SortOrder.asc);
									setTitleSort(SortOrder.asc);
									if (yearSort === SortOrder.asc) {
										setYearSort(SortOrder.desc);
									} else {
										setYearSort(SortOrder.asc);
									}
									const sort: booksOrderByInput = { year: yearSort };
									refetch({ orderBy: sort });
									setHasmore(true);
								}}
								onKeyDown={e => {
									if (e.key === "Enter") {
										setLastClicked("Year");
										setLanguageSort(SortOrder.asc);
										setAuthorSort(SortOrder.asc);
										setTitleSort(SortOrder.asc);
										if (yearSort === SortOrder.asc) {
											setYearSort(SortOrder.desc);
										} else {
											setYearSort(SortOrder.asc);
										}
										const sort: booksOrderByInput = { year: yearSort };
										refetch({ orderBy: sort });
										setHasmore(true);
									}
								}}
							>
								Year
								<div className="float-right">
									{lastClicked === "Year" ? (yearSort === SortOrder.desc ? "⬆️" : "⬇️") : "↕️"}
								</div>
							</th>
							<th
								tabIndex={9}
								className="cursor-pointer bg-slate-500 hover:bg-slate-600 w-36 focus:outline-accent-focus"
								onClick={() => {
									setLastClicked("Language");
									setAuthorSort(SortOrder.asc);
									setYearSort(SortOrder.asc);
									setTitleSort(SortOrder.asc);
									if (languageSort === SortOrder.asc) {
										setLanguageSort(SortOrder.desc);
									} else {
										setLanguageSort(SortOrder.asc);
									}
									const sort: booksOrderByInput = { language: languageSort };
									refetch({ orderBy: sort });
									setHasmore(true);
								}}
								onKeyDown={e => {
									if (e.key === "Enter") {
										setLastClicked("Language");
										setAuthorSort(SortOrder.asc);
										setYearSort(SortOrder.asc);
										setTitleSort(SortOrder.asc);
										if (languageSort === SortOrder.asc) {
											setLanguageSort(SortOrder.desc);
										} else {
											setLanguageSort(SortOrder.asc);
										}
										const sort: booksOrderByInput = { language: languageSort };
										refetch({ orderBy: sort });
										setHasmore(true);
									}
								}}
							>
								Language
								<div className="float-right">
									{lastClicked === "Language"
										? languageSort === SortOrder.desc
											? "⬆️"
											: "⬇️"
										: "↕️"}
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.books.map((book: Book, index) => {
							return (
								<tr
									tabIndex={index + 10}
									className="hover cursor-pointer hover:bg-slate-500 focus:outline-accent-focus"
									key={book.id}
									onClick={() => routeChange(book.id)}
									onKeyDown={e => {
										if (e.key === "Enter") {
											routeChange(book.id);
										}
									}}
								>
									<td className="bg-slate-700">{book.author}</td>
									<td className="bg-slate-700">{book.title}</td>
									<td className="bg-slate-700">{book.year}</td>
									<td className="bg-slate-700">{book.language}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</InfiniteScroll>
		</div>
	);
}
export default Table;
