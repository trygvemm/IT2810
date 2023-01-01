import { gql, ReactiveVar, useQuery } from "@apollo/client";
import { GET_CURRENT_FILTERS, GET_HASMORE, GET_REFETCH } from "../App";
import BookFilters from "./types/BookFilters";
import LanguageArray from "./types/LanguageArray";
import refetchType from "./types/refetchType";
import setHasmoreType from "./types/setHasmore";

const GET_BOOKS_WITH_LANGUAGES = gql`
	query Query {
		booksWithDistinctLanguage {
			language
		}
	}
`;

export default function Select() {
	const { data: refetchResult } = useQuery<refetchType>(GET_REFETCH);
	const { data: hasMoreResult } = useQuery<setHasmoreType>(GET_HASMORE);
	const { data: currentFiltersResult } = useQuery<{
		currentFiltersFunction: ReactiveVar<BookFilters>;
	}>(GET_CURRENT_FILTERS);

	const { data } = useQuery<LanguageArray>(GET_BOOKS_WITH_LANGUAGES);

	function handleChange(lang: string | undefined) {
		if (lang === "Any") {
			lang = undefined;
		}
		if (currentFiltersResult && refetchResult && hasMoreResult) {
			//Updating the current filters by first retreiving the old filters then inserting the new filters in the function provided by apollo for updating reactive variables.
			const oldFilters = currentFiltersResult.currentFiltersFunction();
			currentFiltersResult.currentFiltersFunction({
				...oldFilters,
				language: lang,
			});
			refetchResult.refetchFunction({
				filters: currentFiltersResult.currentFiltersFunction(),
			});
			hasMoreResult.hasMoreFunction(true);
		}
	}

	return (
		<div className="form-control w-full max-w-xs">
			<label htmlFor="langSelect" className="label">
				<span className="text-white label-text">Pick language</span>
			</label>
			<form autoComplete="off" className="w-full flex justify-center">
				<select
					id="langSelect"
					tabIndex={5}
					aria-label="select language"
					title="select language"
					autoComplete="off"
					className="bg-white text-black select select-bordered w-full focus:outline-accent-focus"
					onChange={e => {
						handleChange(e.target.value);
					}}
				>
					<option key={0} value="Any">
						Any
					</option>
					{data?.booksWithDistinctLanguage.map((book, index) => (
						<option key={index + 1} value={book.language}>
							{book.language}
						</option>
					))}
				</select>
			</form>
		</div>
	);
}
