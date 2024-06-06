import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="h-screen flex-1 items-center justify-center mt-5">
          <Text className="text-4xl text-gray-400 text-center font-bold capitalize">
            welcome to
          </Text>
          <Text className="text-2xl text-gray-400 text-center capitalize my-5">
            login page
          </Text>
          <TouchableOpacity onPress={() => navigation.push('Home')}>
            <Text className="text-lg bg-blue-600 text-white text-center font-bold rounded px-5 py-2 capitalize">
              login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
