import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { exec } from 'node:child_process';

import Store from 'electron-store'
const store = new Store();

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  })
  mainWindow.setKiosk(true)
  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.handle('store_get', async (event, key) => {
  const value = store.get(key)
  return value;
})

ipcMain.on("store_set", (event, key, value) => {
  store.set(key, value)
})

ipcMain.on("setup_setup-network", (event, arg) => {
  exec("nmcli dev wifi hotspot ifname wlan0 ssid DashThing-V1 password 12345678")
})

ipcMain.on('setup_check_user_connected', (event) => {
    exec('iw dev wlan0 station dump', (error, stdout, stderr) => {
      if (stdout.length > 0) {
        event.sender.send('setup_sys_network_connected-user', true);
      } else {
        event.sender.send('setup_sys_network_connected-user', false);
      }
    });
});
