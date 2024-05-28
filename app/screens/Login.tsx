import React from 'react';
import {Text, View} from 'react-native';

export const Login = (): React.JSX.Element => {
  return (
    <View className="h-screen">
      <Text className="text-4xl text-gray-400 text-center capitalize my-5">
        hello,user
      </Text>
      <Text className="text-lg text-gray-400 text-center font-bold capitalize">
        welcome to login
      </Text>
    </View>
  );
};
