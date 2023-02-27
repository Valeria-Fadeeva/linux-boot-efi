import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

import org.kde.plasma.plasmoid 2.0

Item {
  id: fullRep

  anchors.fill: parent

  Layout.fillWidth: true
  Layout.fillHeight: true

  ScrollView {
    id: view
    width: parent.width
    height: (parent.width < parent.height ? parent.width : parent.height) * 0.9

    TextArea {
      width: parent.width
      height: (parent.width < parent.height ? parent.width : parent.height) * 0.9
      text: root.listOfPackages
    }
  }

  Item {
    Layout.fillHeight: true
    Layout.fillWidth: true
  }

  RowLayout {
    id: buttonRow

    anchors {
      bottom: parent.bottom
      horizontalCenter: parent.horizontalCenter
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
