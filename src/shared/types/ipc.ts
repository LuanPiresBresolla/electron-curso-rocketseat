export interface IDocument {
  id: string
  title: string
  content: string
}

// Requests

// Responses
export interface IFindAllDocumentsResponse {
  data: IDocument[]
}
