import React from 'react';
import { Text, View } from 'react-native';

const CodePushLoading = ({ header, subHeader, progress }) => {
  return (
    <View className="h-screen flex-1 justify-center">
      <Text className="text-xl text-gray-400 text-center capitalize">
        {header}
      </Text>
      <Text className="text-lg text-gray-400 text-center font-bold capitalize my-5">
        {subHeader}
      </Text>
      <Text className="text-base text-gray-400 text-center font-bold capitalize">
        {progress}
      </Text>
    </View>
  );
};

export default CodePushLoading;
