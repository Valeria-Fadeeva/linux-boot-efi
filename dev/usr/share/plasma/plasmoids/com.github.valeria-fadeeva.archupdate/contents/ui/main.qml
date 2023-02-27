import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15

import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.1 as PlasmaCore

import "../_toolbox" as Tb
import "../service" as Sv

// Корневой элемент
Item {
  id: root

  property string appTitle: Plasmoid.configuration.title

  property string iconDefault: "../assets/default.svg"
  property string iconRefresh: "../assets/refresh.svg"
  property string iconReadyToUpgrade: "../assets/ready.svg"
  property string iconError: "../assets/error.svg"

  property string mainIcon: iconDefault

  property string total: "0"

  property bool showNotification: Plasmoid.configuration.showNotification

  property string notifyText: ""
  property string errorText: ""

  property int defaultStatus: -1
  property int normalStatus: 0
  property int checkingUpdatesStatus: 1
  property int readyStatus: 2
  property int errorStatus: 3

  property int upgradeStatus: defaultStatus

  property string listOfPackages: ""

  Plasmoid.preferredRepresentation: Plasmoid.compactRepresentation
  Plasmoid.compactRepresentation: Compact {}
  Plasmoid.fullRepresentation: Full {}
  // load one instance of each needed service
  Sv.Updater{ id: updater }
  Tb.Cmd { id: cmd }

  PlasmaCore.DataSource {
    id: notificationSource
    engine: "notifications"
    connectedSources: "org.freedesktop.Notifications"
  }

  function strip(text) {
    return text.replace(/[^a-zA-Z0-9 \(\)\[\]:;\.,\_\-><\n\t]/g, "")
    //return text.replace(/[^a-zA-Z0-9 \n\t]/g, "")
  }

  function createNotification(text) {

    var service = notificationSource.serviceForSource("notification");
    var operation = service.operationDescription("createNotification");

    operation.appName = i18n(appTitle);
    operation["appIcon"] = iconDefault;
    operation.summary = text || i18n("Some text")
    operation["body"] = "";
    operation["timeout"] = 10000;

    service.startOperationCall(operation);
  }

  // updates the icon according to the refresh status
  function updateUi() {

    switch (upgradeStatus) {
      case normalStatus:
        mainIcon = iconDefault
        break
      case checkingUpdatesStatus:
        mainIcon = iconRefresh
        //total = 0
        total = "↻"
        break
      case readyStatus:
        mainIcon = iconReadyToUpgrade
        break
      case errorStatus:
        mainIcon=iconError
        total = 0
        break
      default:
        mainIcon = iconDefault
        total = 0
    }
  }

  // map the cmd signal with the widget
  Connections {
    target: cmd

    function onExited(cmd, exitCode, exitStatus, stdout, stderr) {

      // Если запущена проверка обновлений
      if (cmd == Plasmoid.configuration.commandForCheckingUpdates) {

        // Если ошибок при проверке обновлений нет
        if (exitCode == 0) {

          var stdoutText = strip(stdout)
          var lines = parseInt(stdoutText.trim().split('\n').length, 10)

          // Если стандарный вывод можно подсчитать по строкам
          if (lines) {
            total = lines

            listOfPackages = stdoutText

            if (showNotification) {
              notifyText = "Найдено " + total + " пакетов для обновления"
              createNotification(notifyText)
            }

            upgradeStatus = readyStatus
            updateUi()
          }

          // Иначе
          else {
            total = 0

            upgradeStatus = normalStatus
            updateUi()

            upgradeStatus = defaultStatus
          }
        }

        // Если есть ошибки при проверке обновлений
        else if (exitCode == 1) {
          if (stderr.length > 0) {
            errorText = strip(stderr).trim()

            if (showNotification) {
              notifyText = "Ошибка обновления: \n" + errorText
              createNotification(notifyText)
            }
          }

          upgradeStatus = errorStatus
          updateUi()

          upgradeStatus = defaultStatus
        }

        // Если нет пакетов для обновлений
        else if (exitCode == 2) {
          upgradeStatus = defaultStatus
          updateUi()
        }

        // Неправильно указана программа в настройках
        else if (exitCode == 127) {

          if (showNotification) {
            notifyText = "Возможно программа, указанная в настройках, не существует на этом компьютере"
            createNotification(notifyText)
          }

          upgradeStatus = defaultStatus
          updateUi()
        }

        // Иначе
        else {
          upgradeStatus = defaultStatus
          updateUi()
        }
      }

      // Если запущено обновление пакетов
      else if (cmd == Plasmoid.configuration.commandForUpgrade) {

        // Если обновление было успешно
        if (exitCode == 0) {
          total = 0

          listOfPackages = ""

          if (showNotification) {
            notifyText = "Обновление успешно завершено"
            createNotification(notifyText)
          }

          upgradeStatus = normalStatus
          updateUi()

          upgradeStatus = defaultStatus
        }

        // Неправильно указана программа в настройках
        else if (exitCode == 127) {
          if (showNotification) {
            notifyText = "Возможно программа, указанная в настройках, не существует на этом компьютере"
            createNotification(notifyText)
          }

          upgradeStatus = defaultStatus
          updateUi()
        }

        // Если есть ошибки при обновлении пакетов
        else {
          if (showNotification) {
            notifyText = "Обновление завершено с ошибками"
            createNotification(notifyText)
          }

          upgradeStatus = errorStatus
          updateUi()

          upgradeStatus = defaultStatus
        }
      }
    }

    function onConnected(source) {
      upgradeStatus = checkingUpdatesStatus
      updateUi()
    }
  }
}
