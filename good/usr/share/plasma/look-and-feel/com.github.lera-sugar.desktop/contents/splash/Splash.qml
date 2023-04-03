/*
 *   Copyright 2014 Marco Martin <mart@kde.org>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License version 2,
 *   or (at your option) any later version, as published by the Free
 *   Software Foundation
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details
 *
 *   You should have received a copy of the GNU General Public
 *   License along with this program; if not, write to the
 *   Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import QtQuick 2.5
import QtGraphicalEffects 1.0

Image {
    id: root
    source: "images/background.jpg"
    fillMode: Image.PreserveAspectCrop

    property int stage

    onStageChanged: {
        if (stage == 1) {
            introAnimation.running = true
            preOpacityAnimation.from = 0;
            preOpacityAnimation.to = 1;
            preOpacityAnimation.running = true;
        }
        if (stage == 4) {
            preOpacityAnimation.from = 1;
            preOpacityAnimation.to = 0;
            preOpacityAnimation.running = true;
            pausa.start();
        }
    }

    Item {
        id: content
        anchors.rightMargin: 0
        anchors.bottomMargin: 0
        anchors.leftMargin: 0
        anchors.topMargin: 0
        anchors.fill: parent
        opacity: 1
        TextMetrics {
            id: units
            text: "M"
            property int gridUnit: boundingRect.height
            property int largeSpacing: units.gridUnit
            property int smallSpacing: Math.max(2, gridUnit/4)
        }

        Image {
            id: logo
            property real size: units.gridUnit * 12
            anchors.centerIn: parent
            source: "images/Manjaro logo.png"
            sourceSize.width: size
            sourceSize.height: size
        }
    }

        Text {
            id: date
            text:Qt.formatDateTime(new Date(),"")
            font.pointSize: 26
            color: "#020304"
            opacity:0.85
            font { family: "OpenSans Light"; weight: Font.Light ;capitalization: Font.Capitalize}
            anchors.horizontalCenter: parent.horizontalCenter
            y: (parent.height - height) / 2.7
        }

        Image {
            id: busyIndicator1
            //in the middle of the remaining space
            //y: (parent.height - height) / 1.7
            y: root.height - (root.height - logo.y) / 2.8 - height/2
            anchors.horizontalCenter: parent.horizontalCenter
            source: "images/start.svg"
            opacity: 0.9
            sourceSize.height: units.gridUnit * 6.0
            sourceSize.width: units.gridUnit * 6.0
            RotationAnimator on rotation {
                id: rotationAnimator1
                from: 0
                to: 0
                duration: 1100
                loops: Animation.Infinite
            }
        }

    Image {
        id: topRect
        anchors.horizontalCenter: parent.horizontalCenter
        y: root.height
        source: "images/rectangle.svg"

        Rectangle {
            radius: 3
            color: "#1d212f"
            height: 6
            width: height*40
            anchors
            {
                bottom: parent.bottom
                bottomMargin:0
                horizontalCenter: parent.horizontalCenter
            }

            Rectangle
            {
                radius: 3
                color: "#FFFFFF"
                width: (parent.width / 6) * (stage - 0.00)
                anchors
                {
                    left: parent.left
                    top: parent.top
                    bottom: parent.bottom
                }
                Behavior on width {
                    PropertyAnimation {
                        duration: 200
                        easing.type: Easing.InOutQuad
                    }
                }
            }
        }
    }

    SequentialAnimation {
        id: introAnimation
        running: false

        ParallelAnimation {
            PropertyAnimation {
                property: "y"
                target: topRect
                to: ((root.height / 3) * 2) - 170
                duration: 1500
                easing.type: Easing.InOutBack
                easing.overshoot: 1.0
            }
        }
    }

    Text {
        visible: true
        height: 1550
        width: 1920

        Text {
            id: text
            font.pointSize: 64
            anchors.centerIn: parent
            text: "Welcome!"
            visible: true
            color: "#e92222"
        }

        // LinearGradient  {
        // anchors.fill: text
        // source: text
        // gradient: Gradient {
        //         GradientStop { position: 0; color: "#e1c5de" }
        //         GradientStop { position: 0.4; color: "#d5b9d0" }
        //         GradientStop { position: 0.6; color: "#ccaec8" }
        //         GradientStop { position: 1; color: "#c5abc4" }
        //     }
        // }

        // OR

        // LinearGradient  {
        // anchors.fill: text
        // source: text
        // gradient: Gradient {
        //         GradientStop { position: 0; color: "#E03D3D" }
        //         GradientStop { position: 0.4; color: "#E03D3D" }
        //         GradientStop { position: 0.6; color: "#E03D3D" }
        //         GradientStop { position: 1; color: "#A03d40" }
        //     }
        // }
    }

    OpacityAnimator {
        id: preOpacityAnimation
        running: false
        target: preLoadingText
        from: 0
        to: 1
        duration: 2000
        easing.type: Easing.InOutQuad
    }

    Text {
        id: loadingText
        height: 30
        anchors.bottomMargin: 0
        anchors.topMargin: 0
        text: ""
        color: "#FFFFFF"
        font.family: webFont.name
        font.weight: Font.ExtraLight

        font.pointSize: 20
        opacity: 0
        textFormat: Text.StyledText
        x: (root.width - width) / 2
        y: (root.height / 3) * 2
    }

    OpacityAnimator {
        id: opacityAnimation
        running: false
        target: loadingText
        from: 0
        to: 1
        duration: 000
        easing.type: Easing.InOutQuad
        paused: true
    }

    Timer {
        id: pausa
        interval: 1500; running: false; repeat: false;
        onTriggered: root.viewLoadingText();
    }

    function viewLoadingText() {
        opacityAnimation.from = 0;
        opacityAnimation.to = 1;
        opacityAnimation.running = true;
    }
}
