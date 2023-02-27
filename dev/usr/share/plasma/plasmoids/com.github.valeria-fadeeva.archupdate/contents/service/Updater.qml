import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

import org.kde.plasma.core 2.1 as PlasmaCore
import org.kde.plasma.plasmoid 2.0

Item {
  function checkUpdates() {
    cmd.exec(Plasmoid.configuration.commandForCheckingUpdates)
  }

  function upgrade() {
    if (root.total == 0 || isNaN(root.total)){
      root.createNotification("Обновлений нет")
      return
    }
    else {
      cmd.exec(Plasmoid.configuration.commandForUpgrade)
    }
  }

  // execute function count each 30 minutes
  Timer {
    id: timer
    interval: Plasmoid.configuration.updateInterval * 60000 // minute to milisecond
    running: true
    repeat: true
    triggeredOnStart: false
    onTriggered: checkUpdates()
  }

  Timer {
    id: startUpTimer
    interval: 10000 // 10 seconds
    running: true
    repeat: false
    triggeredOnStart: false
    onTriggered: checkUpdates()
  }

}
