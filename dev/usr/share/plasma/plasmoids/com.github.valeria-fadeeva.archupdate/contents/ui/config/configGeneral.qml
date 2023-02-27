import QtQml 2.0
import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

ColumnLayout {
  Layout.fillHeight: true
  Layout.fillWidth: true

  property alias cfg_updateInterval: updateIntervalSpin.value
  property alias cfg_commandForCheckingUpdates: commandForCheckingUpdates.text
  property alias cfg_commandForUpgrade: commandForUpgrade.text
  property alias cfg_showNotification: showNotification.checked

  RowLayout {
    Layout.fillWidth: true

    Label {
      text: i18nc("@title:label", "Update interval (minutes):")
    }

    SpinBox {
      id: updateIntervalSpin
      from: 1
      to: 1440 // 1 day
      editable: true
    }
  }

  RowLayout {
    Layout.fillWidth: true

    Label {
      text: i18nc("@title:label", "Notifications:")
    }

    CheckBox {
      id: showNotification
      text: i18nc("@option:check", "Show notification")
    }
  }

  RowLayout {
    Layout.fillWidth: true

    Label {
      text: i18nc("@title:label", "Command for cheching updates:")
    }

    TextField {
      id: commandForCheckingUpdates
      placeholderText: qsTr("Write command for cheching updates")
    }
  }

  RowLayout {
    Layout.fillWidth: true

    Label {
      text: i18nc("@title:label", "Command for upgrade:")
    }

    TextField {
      id: commandForUpgrade
      placeholderText: qsTr("Write command for upgrade")
    }
  }

  Item {
    Layout.fillHeight: true
    Layout.fillWidth: true
  }
}
