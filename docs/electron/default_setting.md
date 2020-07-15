# 프로젝트 기본 설정

## F5 새로고침 / F12 개발자 모드
electron에 globalshortcut이 있으나 f12를 감지하지 못하거나, 여러창일경우 안먹는 경우가 있어서 localshortcut을 이용하기로 했다.
```sh
yarn add electron-localshortcut
```

### background.js
```js
const electronLocalshortcut = require('electron-localshortcut');
...
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  electronLocalshortcut.register(win, 'F12', () => {
    console.log('F12 is pressed')
    win.webContents.toggleDevTools()
  });
  electronLocalshortcut.register(win, 'F5', () => {
    console.log('F5 is pressed')
    win.reload();
  });
  
  win.on('closed', () => {
    win = null
  })
}
```