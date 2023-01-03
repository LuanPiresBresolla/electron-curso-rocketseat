import { IPC } from '@shared/constants/ipc'
import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IDocument,
  IFindAllDocumentsResponse,
  IFindDocumentRequest,
  IFindDocumentResponse,
  ISaveDocumentRequest,
} from '@shared/types/ipc'
import { ipcMain } from 'electron'
import { randomUUID } from 'crypto'

import { store } from '@main/store'

ipcMain.handle(
  IPC.DOCUMENTS.FIND_ALL,
  async (): Promise<IFindAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FIND,
  async (_, { id }: IFindDocumentRequest): Promise<IFindDocumentResponse> => {
    const document: IDocument = store.get(`documents.${id}`)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<ICreateDocumentResponse> => {
    const id = randomUUID()

    const document: IDocument = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: ISaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: IDeleteDocumentRequest): Promise<void> => {
    // @ts-ignore
    store.delete(`documents.${id}`)
  },
)
