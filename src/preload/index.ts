import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'
import { IPC } from '@shared/constants/ipc'
import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IFindAllDocumentsResponse,
  IFindDocumentRequest,
  IFindDocumentResponse,
  ISaveDocumentRequest,
} from '@shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {
  findDocuments(): Promise<IFindAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FIND_ALL)
  },
  findDocument(request: IFindDocumentRequest): Promise<IFindDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FIND, request)
  },
  createDocument(): Promise<ICreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },
  saveDocument(request: ISaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, request)
  },
  deleteDocument(request: IDeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, request)
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
