import { DocumentNode } from "@apollo/client";

export default interface CommentInputProps {
	id: string | null;
	refetch: DocumentNode;
}
