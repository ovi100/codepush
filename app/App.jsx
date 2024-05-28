import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // const checkStatus = status => {
  //   switch (status) {
  //     case CodePush.SyncStatus.UPDATE_INSTALLED:
  //     case CodePush.SyncStatus.UP_TO_DATE:
  //     case CodePush.SyncStatus.UNKNOWN_ERROR:
  //       setModalVisible(false);
  //       break;
  //     case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
  //     case CodePush.SyncStatus.AWAITING_USER_ACTION:
  //     case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
  //     case CodePush.SyncStatus.INSTALLING_UPDATE:
  //       setModalVisible(true);
  //       break;
  //   }
  // };

  const onDownloadProgress = downloadProgress => {
    if (downloadProgress) {
      setModalVisible(true);
      const percentage =
        (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
      console.log(downloadProgress.receivedBytes);
      setProgress(percentage);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then(metadata => {
        if (metadata) {
          console.log(metadata);
        }
      })
      .catch(error => {
        console.error('Error fetching update metadata:', error);
      });
    let codePushOptions = {
      checkFrequency: CodePush.CheckFrequency.ON_APP_START,
      installMode: CodePush.InstallMode.IMMEDIATE,
      mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: {
        appendReleaseDescription: true,
        title: 'a new update is available!',
      },
    };
    CodePush.sync(codePushOptions, onDownloadProgress);
    // setModalVisible(false);
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
          <Text className="text-lg text-blue-500 text-center font-bold capitalize mb-5">
            codepush example {new Date().toDateString()}
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
              <Text className="text-black mt-2">
                Downloading update... {progress}%
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CodePush(App);
