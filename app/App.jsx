import React, { useEffect, useState } from 'react';
import {
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
import CodePushLoading from './components/CodepushLoading';
import useCodePush from './hooks/useCodePush';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { percent, syncMessage } = useCodePush();

  useEffect(() => {
    if (percent || syncMessage) {
      setModalVisible(true);
      Alert.alert(percent);
      console.log('progress:', percent);
      Alert.alert(syncMessage);
      console.log('sync message:', syncMessage);
    }
  }, [percent, syncMessage]);

  return (
    <SafeAreaView className="h-full">
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {percent || syncMessage ? (
          <CodePushLoading
            header="A new version is available"
            subHeader={syncMessage}
            progress={percent}
          />
        ) : (
          <View className="h-screen flex-1 items-center justify-center mt-5">
            <Text className="text-lg text-gray-400 text-center font-bold capitalize">
              welcome to
            </Text>
            <Text className="text-4xl text-gray-400 text-center capitalize my-5">
              react native {dependencies['react-native']}
            </Text>
            <Text className="text-lg text-green-600 text-center font-bold capitalize mb-5">
              code push
            </Text>
            <Text className="text-lg text-gray-400 text-center font-bold capitalize mb-5">
              {new Date().toDateString()}
            </Text>
            <Text className="text-lg text-gray-500 text-center font-bold mb-5">
              {new Date().toLocaleTimeString()}
            </Text>
            <Text className="text-lg text-gray-400 text-center font-bold capitalize mt-2">
              app version {version}
            </Text>
          </View>
        )}
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
            <CodePushLoading
              header="A new version is available"
              subHeader={syncMessage}
              progress={percent}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CodePush(App);
