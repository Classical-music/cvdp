const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('request', {
    readFile: pname => {
        return ipcRenderer.invoke('read-file', pname)
    },
    saveFile: (pname, data) => {
        return ipcRenderer.invoke('save-file', pname, data)
    },
    delFile: pname => {
        return ipcRenderer.invoke('del-file', pname)
    },
    readDir: dname => {
        return ipcRenderer.invoke('read-dir', dname)
    }
})