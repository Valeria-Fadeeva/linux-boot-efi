import QtQuick 2.15
import QtQuick.Layouts 1.15


import org.kde.plasma.plasmoid 2.0

Item {
  id: compactRep

  anchors.fill: parent

  Layout.fillWidth: true
  Layout.fillHeight: true

  Image {
    id: mainIcon
    fillMode: Image.PreserveAspectFit
    anchors.fill: parent
    Layout.fillWidth: true
    Layout.fillHeight: true
    source: root.mainIcon
    sourceSize: Qt.size(height, height)
    smooth: true
  }

  Rectangle {
    id: circle
    width: 15
    height: width
    radius: Math.round(width / 2)
    color: "Black"
    opacity: 0.7
    visible: true
    anchors {
        right: parent.right
        top: parent.top
    }
  }

  Text {
    text: (root.total < 99 || isNaN(root.total)) ? root.total : "99+"
    font.pointSize: 6
    color: "White"
    anchors.centerIn: circle
    visible: circle.visible
  }

  MouseArea {
    property bool wasExpanded: false
    anchors.fill: parent
    onClicked: {
      if (mouse.button == Qt.LeftButton) {
        plasmoid.expanded = !plasmoid.expanded
      }
    }
  }
}
