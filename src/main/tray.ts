import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

export function createTrayMenu(window: BrowserWindow) {
  const isWin = process.platform === 'win32'
  const iconPath = path.resolve(
    __dirname,
    isWin ? 'rotionWinTemplate.png' : 'rotionTemplate.png',
  )

  const tray = new Tray(iconPath)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Novo documento',
      click: () => window.webContents.send('new-document'),
    },
    { type: 'separator' },
    { label: 'Documentos Recentes', enabled: false },
    {
      label: 'React Native',
      accelerator: 'commandOrControl+1',
    },
    {
      label: 'ReactJS',
      accelerator: 'commandOrControl+2',
    },
    {
      label: 'NodeJS',
      accelerator: 'commandOrControl+3',
    },
    { type: 'separator' },
    { label: 'Sair do Rotion', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
