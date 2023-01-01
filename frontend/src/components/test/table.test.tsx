/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/render-result-naming-convention */
import Table, { GET_ALL_BOOKS } from "../Table";
import { screen, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Footer from "../Footer";

const tablemocks = [
	{
		request: {
			query: GET_ALL_BOOKS,
			variables: {
				offset: 0,
				limit: 20,
				filters: {
					title: undefined,
					author: undefined,
					language: undefined,
					minYear: undefined,
					maxYear: undefined,
				},
			},
		},
		result: {
			data: {
				books: [
					{
						id: "1",
						author: "J. K. Rowling",
						language: "english",
						title: "Harry Potter and the Philosopher's Stone",
						year: 1997,
					},
				],
			},
		},
	},
];

describe("Table", () => {
	beforeEach(() => {
		render(
			<MockedProvider mocks={tablemocks}>
				<Table idHook={null} />
			</MockedProvider>
		);
	}),
		test("render", async () => {
			expect(await screen.findByText("Loading...")).toBeInTheDocument();
			await Promise.resolve();
			expect(await screen.findByText("J. K. Rowling")).toBeInTheDocument();
		});

	test("Snapshot", async () => {
		const tree = render(
			<MockedProvider mocks={tablemocks} addTypename={false}>
				<Table idHook={null} />
			</MockedProvider>
		);
		await Promise.resolve();
		expect(tree).toMatchSnapshot();
	});
});

describe("footer", () => {
	beforeEach(() => {
		render(<Footer />);
	}),
		test("render", async () => {
			expect(await screen.findByText("Laget med ❤️ av gruppe 57")).toBeInTheDocument();
		});
});
