import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';

const Login = ({ navigation }) => {
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    CodePush.getUpdateMetadata().then(info => {
      setAppInfo(info);
    });
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="h-screen flex-1 items-center justify-center mt-5">
          <Text className="text-4xl text-gray-400 text-center font-bold capitalize">
            welcome to
          </Text>
          <Text className="text-2xl text-gray-400 text-center capitalize mt-5">
            code push
          </Text>
          <Text className="text-xl text-gray-400 text-center capitalize my-5">
            {appInfo?.label}
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
