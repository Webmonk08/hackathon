const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendTextToType: (text) => ipcRenderer.send('send-text-to-type', text)
});