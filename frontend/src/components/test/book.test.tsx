/* eslint-disable no-restricted-globals */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import Book, { GET_BOOK } from "../../pages/Book";
import { screen, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { CREATE_COMMENT } from "../CommentInputSection";

const mocks = [
	{
		request: {
			query: GET_BOOK,
			variables: {
				id: null,
			},
		},
		result: {
			data: {
				bookId: [
					{
						id: "1",
						author: "J. K. Rowling",
						country: "England",
						imageLink:
							"https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone#/media/File:Harry_Potter_and_the_Philosopher's_Stone_Book_Cover.jpg",
						language: "english",
						link: "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone",
						pages: 250,
						title: "Harry Potter and the Philosopher's Stone",
						year: 1997,
						comments: [
							{
								text: "Veldig fin bok!",
								id: "1",
							},
						],
					},
				],
			},
		},
	},
	{
		request: {
			query: CREATE_COMMENT,
			variables: {
				text: "En sykt bra bok",
				bookId: null,
			},
		},
		result: {
			data: {
				createComment: [
					{
						text: "En sykt bra bok",
						bookId: null,
					},
				],
				text: "En sykt bra bok",
				bookId: null,
			},
		},
	},
];

describe("Book", () => {
	beforeEach(() => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Book id={null} />
			</MockedProvider>
		);
	}),
		test("render", async () => {
			expect(await screen.findByText("Loading...")).toBeInTheDocument();
			expect(screen.queryByText("Error:(")).not.toBeInTheDocument();
			expect(await screen.findByText("Author: J. K. Rowling")).toBeInTheDocument();
			expect(await screen.findByText("Veldig fin bok!")).toBeInTheDocument();
		});

	test("homeclick", async () => {
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});
		userEvent.click(screen.getByText("Home"));
		expect(location.pathname).toBe("/");
	});

	test("Snapshot", async () => {
		const tree = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Book id={null} />
			</MockedProvider>
		);
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});
		expect(tree).toMatchSnapshot();
	});

	test("Submit", async () => {
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});
		userEvent.type(
			screen.getByPlaceholderText("What do you think about this book?"),
			"En sykt bra bok"
		);
		expect(screen.getByPlaceholderText("What do you think about this book?")).toHaveValue(
			"En sykt bra bok"
		);
		userEvent.click(screen.getByText("Submit"));
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});
	});
});
