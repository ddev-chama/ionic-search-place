import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ku-navigator',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 10000,
      launchAutoHide: true,
      backgroundColor: "#2222222",
      androidScaleType: "FIT_CENTER",
    },
  }

};

export default config;
