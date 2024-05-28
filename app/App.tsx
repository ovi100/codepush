import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { dependencies } from '../package.json';

const App = (): React.JSX.Element => {
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
          <Text className="text-lg text-gray-400 text-center font-bold capitalize">
            codepush example
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// export default CodePush(codePushOptions)(App);

export default App;

// export default App;
