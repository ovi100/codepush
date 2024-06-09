import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import CodePushModal from './components/CodePushModal';
import AppNavigation from './navigation/AppNavigation';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(null);
  // const [progress, setProgress] = useState({
  //   receivedBytes: 30000000,
  //   totalBytes: 50000000,
  // });

  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: false,
      },
      codePushStatusChange,
      codePushDownloadProgress,
    );
  }, []);

  const codePushStatusChange = status => {
    switch (status) {
      // case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      //   setMessage('Checking for update');
      //   break;
      // case CodePush.SyncStatus.AWAITING_USER_ACTION:
      //   setMessage('Awaiting user action');
      //   break;
      // case CodePush.SyncStatus.UP_TO_DATE:
      //   setMessage('The app is up to date');
      //   break;
      // case CodePush.SyncStatus.UPDATE_IGNORED:
      //   setMessage('Update canceled by user');
      //   break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setModalVisible(true);
        setMessage('Downloading update');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setModalVisible(true);
        setMessage('Installing update');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setMessage('Restarting application ');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setMessage('An error occurred during the update');
        break;
      default:
        setMessage(null);
        break;
    }
  };

  const codePushDownloadProgress = downloadProgress => {
    setProgress(downloadProgress);
  };

  return (
    <>
      <AppNavigation />
      <CodePushModal
        visible={modalVisible}
        header="Live update in progress"
        subHeader="Applying the live update ensures you will get the latest version of the application."
        progress={progress}
        message={message}
      />
    </>
  );
};

export default CodePush(codePushOptions)(App);
