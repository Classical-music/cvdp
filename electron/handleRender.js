const { ipcMain } = require("electron")
const fs = require('fs')
const path = require("path")

export function listenRender() {
    ipcMain.handle('read-file', handleReadFile)
    ipcMain.handle('save-file', handleSaveFile)
    ipcMain.handle('del-file', handleDelFile)
    ipcMain.handle('read-dir', handleReadDir)
}

function handleReadFile(event, pname) {
    pname = path.join(__dirname, '..', pname)
    try {
        return fs.readFileSync(pname, { encoding: 'utf-8' })
    } catch(err) {
        console.warn(err)
        return "{}"
    }
}

function handleSaveFile(event, pname, data) {
    pname = path.join(__dirname, '..', pname)
    try {
        fs.writeFileSync(pname, data)
    } catch(err) {
        console.warn(err)
        return false
    }
    return true
}

function handleDelFile(event, pname) {
    pname = path.join(__dirname, '..', pname)
    try {
        fs.unlinkSync(pname)
    } catch(err) {
        console.warn(err)
        return false
    }
    return true
}

function handleReadDir(event, dname) {
    dname = path.join(__dirname, '..', dname)
    try {
        return fs.readdirSync(dname)
    } catch(err) {
        console.warn(err)
        return '[]'
    }
}