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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  })

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

ipcMain.on("setup_network", (event, arg) => {
  exec("nmcli dev wifi hotspot ifname wlan0 ssid DashThing-8216SN password 12345678")
})

ipcMain.handle('check-users', async (event) => {
  return new Promise((resolve, reject) => {
    exec('iw dev wlan0 station dump', (error, stdout, stderr) => {
      if (error) {
        reject(`Error checking connected clients: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      event.sender.send('connected-users', stdout);
      resolve(undefined);
    });
  });
});
