import { IPC } from '@shared/constants/ipc'
import { IFindAllDocumentsResponse } from '@shared/types/ipc'
import { ipcMain } from 'electron'

ipcMain.handle(
  IPC.DOCUMENTS.FIND_ALL,
  async (): Promise<IFindAllDocumentsResponse> => {
    return {
      data: [
        { id: '1', title: 'ReactJS', content: '' },
        { id: '2', title: 'React Native', content: '' },
        { id: '3', title: 'AngularJS', content: '' },
        { id: '4', title: 'NodeJS', content: '' },
      ],
    }
  },
)
