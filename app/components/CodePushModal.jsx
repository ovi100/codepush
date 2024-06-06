import React from 'react';
import { Modal, Text, View } from 'react-native';

const CodePushModal = ({
  modalVisible,
  setModalVisible,
  header,
  subHeader,
  progress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View className="modal bg-zinc-900/40 flex-1 items-center justify-center p-3">
        <View className="modal-header">
          <Text className="flex-1 text-lg text-black text-center font-semibold">
            {header}
          </Text>
          <Text className="flex-1 text-base text-black text-center mt-3">
            {subHeader}
          </Text>
        </View>
        <View className="modal-content w-4/5 bg-white items-center rounded-lg p-5">
          <Text className="text-black text-center">{progress}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CodePushModal;
