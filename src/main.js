const { app, BrowserWindow, Menu } = require('electron') 
// include the Node.js 'path' module at the top of your file 
const path = require('path') 
// modify your existing createWindow() function 
function createWindow () { 
  const win = new BrowserWindow({ 
    width: 1200, 
    height: 1080, 
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js') 
    } 
  }) 
  win.loadURL("https://notify-1.netlify.app/")
} 
const tempelte = [];
const menu = Menu.buildFromTemplate(tempelte);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => { 
  createWindow() 
}) 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})