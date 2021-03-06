import path from 'path';
import { searchDevtools } from 'electron-search-devtools';
import { BrowserWindow, app, ipcMain, session } from 'electron';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.resolve(
      __dirname,
      process.platform === 'win32'
        ? '../node_modules/electron/dist/electron.exe'
        : '../node_modules/.bin/electron'
    ),
  });
}
process.env.GOOGLE_API_KEY = 'AIzaSyC0XXNMSoLGYh6i0rX-5BwoeRn97EKoy68';
const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('update-title', (_e, arg) => {
    mainWindow.setTitle(`Coffee Finder ${arg}`);
  });

  if (isDev) {
    searchDevtools('REACT')
      .then((devtools) => {
        session.defaultSession?.loadExtension(devtools, {
          allowFileAccess: true,
        });
      })
      .catch((err) => console.log(err));

    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  await mainWindow.webContents.session.clearStorageData();
  mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(createWindow);
app.once('window-all-closed', () => app.quit());
process.on('exit', () => app.quit());