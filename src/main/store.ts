import { IDocument } from '@shared/types/ipc'
import Store from 'electron-store'

interface IStoreType {
  documents: Record<string, IDocument>
}

export const store = new Store<IStoreType>({
  defaults: {
    documents: {},
  },
})

console.log(store.path)
