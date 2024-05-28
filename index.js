import { AppRegistry } from 'react-native';
import CodePush from 'react-native-code-push';
import { name as appName } from './app.json';
import App from './app/App';

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'a new update is available!',
  },
};

AppRegistry.registerComponent(appName, () => CodePush(codePushOptions)(App));
