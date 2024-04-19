export const devPlugin = function() {
    return {
        name: 'dev-plugin',
        configureServer(server) {
            let distEntry = './dist/mainEntry.js'
            require('esbuild').buildSync({
                entryPoints: ['./electron/entry.js'],
                bundle: true,
                platform: 'node',
                outfile: distEntry,
                external: ['electron']
            })
            server.httpServer.once("listening", (_) => {
                let { spawn } = require("child_process");
                let addrInfo = server.httpServer.address();
                let addrStr = `http://localhost:${addrInfo.port}`;
                let elecProcess = spawn(
                  require("electron").toString(),
                  [distEntry, addrStr],
                  {
                    cwd: process.cwd(),
                    stdio: "inherit",
                  }
                );
                elecProcess.on("close", (_) => {
                  server.close();
                  process.exit();
                })
            })
        }
    }
}