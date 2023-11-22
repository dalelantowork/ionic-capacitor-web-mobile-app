## ionic
Install ionic
npm i -g @ionic/cli

Create project
ionic start myApp blank --type react

cd build
ionic build
ionic serve

brew install --cask cocoapods
sudo xcode-select --reset
install xcode -> https://www.youtube.com/watch?v=B_Dl6GyQYfU
npx ionic cap add ios
ionic cap add android

npx cap open ios
ionic cap open ios 
ionic cap open android

ionic cap sync

## serve both web and ios and apply changes
ionic cap run ios --livereload --external

ionic cap run android --livereload --external

ionic cap run ios --livereload --external --public-host=192.168.1.52
pick iphone 11

## for android
ionic cap run android --livereload --external

## install swiper
npm install swiper

## install capacitor preferences for small/local data storage
npm install @capacitor/preferences
npx cap sync

## install capacitor camera
npm install @capacitor/camera
npx cap sync

## in android do this (source: https://capacitorjs.com/docs/apis/camera)
- go to android -> app -> src -> AndroidManifest.xml
- scroll down to permissions
- add this
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

## in ios do this 
- go to ios -> App -> App -> Info.plist
- scroll down to just above </dict>
- add this

<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) uses the camera to scan barcodes</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>$(PRODUCT_NAME) uses the photo library to scan barcodes</string>
<key>NSPhotoLibraryAddUsageDescription</key>

## adding and using PWA(Progressive Web Apps) Elements 
- source: https://capacitorjs.com/docs/web/pwa-elements
- npm install @ionic/pwa-elements

- add this to index.html of myApp just above the header

<script
  type="module"
  src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"
></script>

## install capacitor assets
- npm install --save-dev @capacitor/assets
- create new folder in myApp assets where the icon and splashscreen will be placed

- Then, generate the assets and provide the background colors that will be used to generate background layers for icons:
npx @capacitor/assets generate --iconBackgroundColor '#eeeeee' --iconBackgroundColorDark '#222222' --splashBackgroundColor '#eeeeee' --splashBackgroundColorDark '#111111'

# building and deploying the app
ionic build
npx cap sync

ionic cap open ios
then build and deploy the app manually in xcode

## deploy in netlify
use the dist folder given and then deploy to netlify