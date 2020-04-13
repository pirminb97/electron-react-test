const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  // pass options if not static config
  constructor(url) {
    super({
      height: 500,
      width: 300,
      // minHeight: 400,
      // minWidth: 250,
      frame: false,
      show: false,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false,
      },
    });
    this.loadURL(url);
    this.on("blur", this.onBlur);
    // mainWindow.maximize();
    // mainWindow.setFullScreen(true);
  }

  onBlur = () => {
    this.hide();
  };
}
module.exports = MainWindow;
