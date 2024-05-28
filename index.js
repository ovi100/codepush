import { AppRegistry } from 'react-native';
// import CodePush from 'react-native-code-push';
import { name as appName } from './app.json';
import App from './app/App';

// let codePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//   updateDialog: {
//     appendReleaseDescription: true,
//     title: 'a new update is available!',
//   },
// };

// const onError = error => {
//   Alert.alert(error);
// };

// const onDownloadProgress = downloadProgress => {
//   if (downloadProgress) {
//     Alert.alert(
//       'Downloading ' +
//         downloadProgress.receivedBytes +
//         ' of ' +
//         downloadProgress.totalBytes,
//     );
//   }
// };
// CodePush.sync(codePushOptions, onDownloadProgress, onError);

AppRegistry.registerComponent(
  appName,
  () => App,
  // CodePush(codePushOptions, onDownloadProgress, onError)(App),
);
