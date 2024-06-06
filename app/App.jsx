import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import CodePush from 'react-native-code-push';
import CodePushModal from './components/CodePushModal';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);
  const [percent, setPercent] = useState(null);

  const syncStatusChangedCallback = status => {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('Checking for update...');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('Downloading update...');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('User waiting...');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('Loading update...');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setSyncMessage('The app is up to date...');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('Update canceled by user...');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('Update installed, Application restarting...');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('An error occurred during the update...');
        break;
      default:
        setSyncMessage(undefined);
        break;
    }
  };

  const downloadProgressCallback = progress => {
    Alert.alert(JSON.stringify(progress));
    const currentProgress = Math.round(
      (progress.receivedBytes / progress.totalBytes) * 100,
    );
    setPercent(`${currentProgress} %`);
  };

  useEffect(() => {
    CodePush.notifyAppReady();
    CodePush.checkForUpdate().then(update => {
      if (update) {
        setModalVisible(true);
        let codePushOptions = {
          checkFrequency: CodePush.CheckFrequency.ON_APP_START,
          installMode: CodePush.InstallMode.IMMEDIATE,
          updateDialog: {
            updateTitle: 'New Version of App is available',
            optionalUpdateMessage: 'Do you want to update?',
            optionalIgnoreButtonLabel: 'Cancel',
            optionalInstallButtonLabel: 'Update',
          },
        };
        CodePush.sync(
          codePushOptions,
          syncStatusChangedCallback,
          downloadProgressCallback,
        );
        setModalVisible(false);
        // CodePush.restartApp();
      }
    });
  }, []);

  return percent || syncMessage ? (
    <CodePushModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      header="live update in progress"
      subHeader={syncMessage}
      progress={percent}
    />
  ) : (
    <AppNavigation />
  );
};

export default CodePush(App);
