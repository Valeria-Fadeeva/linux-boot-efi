import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

import org.kde.plasma.plasmoid 2.0

Item {
  id: fullRep

  anchors.fill: parent

  Layout.fillWidth: true
  Layout.fillHeight: true

  ColumnLayout {
    anchors.fill: parent

    Layout.fillWidth: true
    Layout.fillHeight: true

    ScrollView {
      id: view
      anchors.fill: parent

      TextArea {
          text: root.listOfPackages
      }
    }

    Button {
        text: i18n("Проверить обновления")
        onClicked: updater.checkUpdates()
    }

    Button {
        text: i18n("Установить обновления")
        onClicked: updater.upgrade()
    }
  }
}
