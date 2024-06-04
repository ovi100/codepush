import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import { dependencies, version } from '../package.json';

const App = () => {
  // const [progress, setProgress] = useState(0);
  // const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // const onSyncStatusChange = SyncStatus => {
  //   switch (SyncStatus) {
  //     case SyncStatus.CHECKING_FOR_UPDATE:
  //       // Show "Checking for update" notification
  //       setText('Checking for update');
  //       break;
  //     case SyncStatus.AWAITING_USER_ACTION:
  //       // Show "Checking for update" notification
  //       setText('Checking for update');
  //       break;
  //     case SyncStatus.DOWNLOADING_PACKAGE:
  //       // Show "downloading" notification
  //       setText('Downloading update');
  //       break;
  //     case SyncStatus.INSTALLING_UPDATE:
  //       // Show "installing" notification
  //       setText('Installing update');
  //       break;
  //   }
  // };

  // const onError = error => {
  //   setText(error.message);
  // };

  // const onDownloadProgress = downloadProgress => {
  //   if (downloadProgress) {
  //     setModalVisible(true);
  //     const percentage =
  //       (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
  //     console.log(downloadProgress.receivedBytes);
  //     setProgress(percentage);
  //     setModalVisible(false);
  //   }
  // };

  useEffect(() => {
    // CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
    //   .then(metadata => {
    //     if (metadata) {
    //       console.log(metadata);
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching update metadata:', error);
    //   });
    const updateDialogOptions = {
      updateTitle: 'A new update is available!',
      optionalUpdateMessage: 'Do you want to install?',
      optionalIgnoreButtonLabel: 'Cancel',
      optionalInstallButtonLabel: 'Update',
    };
    let codePushOptions = {
      checkFrequency: CodePush.CheckFrequency.ON_APP_START,
      installMode: CodePush.InstallMode.IMMEDIATE,
      mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: updateDialogOptions,
    };

    const onError = function (error) {
      Alert.alert(error.message);
    };

    const onDownloadProgress = function (downloadProgress) {
      if (downloadProgress) {
        Alert.alert(
          `Downloading ${downloadProgress.receivedBytes} of '${downloadProgress.totalBytes}`,
        );
      }
    };

    CodePush.sync(codePushOptions, onDownloadProgress, onError);
  }, []);

  return (
    <SafeAreaView className="h-full">
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="h-screen flex-1 items-center justify-center">
          <Text className="text-lg text-gray-400 text-center font-bold capitalize">
            welcome to
          </Text>
          <Text className="text-4xl text-gray-400 text-center capitalize my-5">
            react native {dependencies['react-native']}
          </Text>
          <Text className="text-lg text-gray-600 text-center font-bold capitalize mb-5">
            code push date {new Date().toDateString()}
          </Text>
          <Text className="text-lg text-gray-400 text-center font-bold capitalize mt-2">
            app version {version}
          </Text>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View className="modal-container bg-black/50 flex-1 items-center justify-center">
          <View className="modal-content w-4/5 bg-white items-center rounded-lg p-5">
            <View>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-black mt-2">Downloading update...</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CodePush(App);
