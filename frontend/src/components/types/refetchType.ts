import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import BookArrayData from "./BookArrayData";

export default interface refetchType {
	refetchFunction: (
		variables?: Partial<OperationVariables> | undefined
	) => Promise<ApolloQueryResult<BookArrayData>>;
}
