import React from 'react';
import { Text, View } from 'react-native';
import { dependencies, version } from '../../../package.json';

const Home = () => {
  return (
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
        {new Date().toDateString()} | {new Date().toLocaleTimeString()}
      </Text>
      <Text className="text-lg text-gray-400 text-center font-bold capitalize mt-2">
        app version {version}
      </Text>
    </View>
  );
};

export default Home;
