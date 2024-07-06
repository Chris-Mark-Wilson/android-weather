## ANDROID WEATHER
<img src="./assets/scr1.jpg" width="200"/><img src="./assets/scr2.jpg" width="200"/><img src="./assets/scr3.jpg" width="200"/><img src="./assets/scr4.jpg" width="200"/><img src="./assets/scr5.jpg" width="200"/><img src="./assets/scr6.jpg" width="200"/>

Uses met office radar data through a proxy server as the met office only use http (at time of writing)

Download apk

<img src="./assets/qrcode.jpg" width="200"/>


## google places api key needed
store in .env API_KEY='your_api_key'

Project written using [expo](https://docs.expo.dev/), [React Native](https://reactnative.dev/)

Built using [EAS Build](https://docs.expo.dev/build/introduction/)

[setup eas-cli](https://docs.expo.dev/build/setup/)

clone repo,
``````
git clone https://github.com/Chris-Mark-Wilson/android-weather.git
npm install
``````

run a build 
``````
eas build -p android --profile preview

warning issued on build for custom metro config - ignore, it will build and run

dont forget to add the .env api key to secrets in expo login

