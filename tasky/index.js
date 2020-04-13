const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/Components/timer_tray");
const MainWindow = require("./app/Components/main_window");

const { app, ipcMain } = electron;

let tray;
let mainWindow;

app.dock.hide();

app.on("ready", () => {
  // INIT MAINWINDOW
  const rootPath = `file://${__dirname}/src/index.html`;
  mainWindow = new MainWindow(rootPath);

  // INIT TRAY
  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("timer:update", (event, remainingTime) => {
  tray.setTitle(remainingTime);
});
