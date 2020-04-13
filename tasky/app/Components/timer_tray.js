const electron = require("electron");
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Timer App");
    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }

  onClick = (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition + 30,
        height,
        width,
      });
      this.mainWindow.show();
    }
  };

  onRightClick = (event) => {
    const menuConfig = Menu.buildFromTemplate([{ role: "quit" }]);

    this.popUpContextMenu(menuConfig);
  };
}

module.exports = TimerTray;
