export interface IDocument {
  id: string
  title: string
  content?: string
}

// Requests
export interface ISaveDocumentRequest extends IDocument {}

export interface IFindDocumentRequest {
  id: string
}

export interface IDeleteDocumentRequest {
  id: string
}

// Responses
export interface IFindAllDocumentsResponse {
  data: IDocument[]
}

export interface IFindDocumentResponse {
  data: IDocument
}

export interface ICreateDocumentResponse {
  data: IDocument
}
