/***************************************************************************
 *   Copyright (C) 2015 by Eike Hein <hein@kde.org>                        *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/

import QtQuick 2.0

import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents
import QtQuick.Layouts 1.0

import "code/tools.js" as Tools

Item {
    id: item

    width:  GridView.view.cellWidth
    height: GridView.view.cellHeight


    property bool showLabel: true
    property int numColumns: 1

    property int itemIndex: model.index
    property string favoriteId: model.favoriteId !== undefined ? model.favoriteId : ""
    property url url: model.url !== undefined ? model.url : ""
    property variant icon: model.decoration !== undefined ? model.decoration : ""
    property var m: model
    property bool hasActionList: ((model.favoriteId !== null)
                                  || (("hasActionList" in model) && (model.hasActionList === true)))

    Accessible.role: Accessible.MenuItem
    Accessible.name: model.display

    function openActionMenu(x, y) {
        var actionList = hasActionList ? model.actionList : [];
        Tools.fillActionMenu(i18n, actionMenu, actionList, GridView.view.model.favoritesModel, model.favoriteId);
        actionMenu.visualParent = item;
        actionMenu.open(x, y);
    }

    function colorWithAlpha(color, alpha) {
        return Qt.rgba(color.r, color.g, color.b, alpha)
    }


    function actionTriggered(actionId, actionArgument) {
        var close = (Tools.triggerAction(GridView.view.model, model.index, actionId, actionArgument) === true);
        if (close) root.toggle();
    }


    PlasmaCore.IconItem {
        id: icon
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        anchors.leftMargin: units.smallSpacing
        width:  units.iconSizes.medium
        height: width
        colorGroup: PlasmaCore.Theme.ComplementaryColorGroup
        animated: false
        usesPlasmaTheme: item.GridView.view.usesPlasmaTheme
        source: model.decoration
    }

    GridLayout {
        columns: numColumns
        anchors.left: icon.right
        anchors.right: parent.right
        anchors.leftMargin: units.largeSpacing
        anchors.rightMargin: units.largeSpacing
        anchors.verticalCenter: parent.verticalCenter
        columnSpacing: 1
        rowSpacing: 1

        PlasmaComponents.Label {
            id: label
            Layout.fillWidth: true
            visible: showLabel
            maximumLineCount: 1
            elide: Text.ElideRight
            wrapMode: Text.Wrap
            color: theme.textColor
            text: ("name" in model ? model.name : model.display)
            width: parent.width * 0.4
        }

        PlasmaComponents.Label {
            visible: showLabel
            Layout.fillWidth: true
            horizontalAlignment: numColumns > 1 ? Text.AlignRight : Text.AlignLeft
            maximumLineCount: 1
            width: 10
            elide: Text.ElideRight
            wrapMode: Text.Wrap
            color: colorWithAlpha(theme.textColor,0.6)
            text: model.description
            font.pixelSize: label.font.pixelSize - 2
        }
    }

    PlasmaCore.ToolTipArea {
        id: toolTip
        property string text: model.display
        anchors.fill: parent
        active: root.visible && label.truncated
        mainItem: toolTipDelegate
        onContainsMouseChanged: item.GridView.view.itemContainsMouseChanged(containsMouse)
    }

    Keys.onPressed: {
        if (event.key === Qt.Key_Menu && hasActionList) {
            event.accepted = true;
            openActionMenu(item);
        } else if ((event.key === Qt.Key_Enter || event.key === Qt.Key_Return)) {
            event.accepted = true;
            if ("trigger" in GridView.view.model) {
                GridView.view.model.trigger(index, "", null);
                root.toggle();
            }

            itemGrid.itemActivated(index, "", null);
        }
    }
}
