export enum SortOrder {
	asc = "asc",
	desc = "desc",
}

export default interface booksOrderByInput {
	author?: SortOrder;
	title?: SortOrder;
	year?: SortOrder;
	language?: SortOrder;
}
