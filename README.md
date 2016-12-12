# GitControl
GitControl, is a cordova mobile application using ionic framework to control GitHub using Voice. The TTS and speech plugins built are utilized and integrated with GitHub API. This application can view Repositories and create Repositories. 

- Install ionic framework to run this code. 

## Accepted Voice Inputs: 
- **Create Repository** - Starts an Interactive session to create a repository. 
- **Get Repository** or **Get Repositories** - retrieves repository information and display's them. 
- **Hi** or **Hello** - Introduces the application and responds with accepted voice inputs. 

## Required Plugins for TTS and Speech Recongition Google Web API. 

    cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin
    cordova plugin add cordova-plugin-tts
    
## Required Plugins for GitHub Integration. 
Requires InApp Browser for Oauth authentication

    bower install ng-cordova-oauth -S
    
## Running the application. 

Add the Android platform and run the application or emulate if the device is not connected. Note that only Running the Applications will work. Emulation doesn't work with the plugins used in this application. 

    ionic platform add android
    ionic run android


## Resources: 

- https://github.com/nraboy/ng-cordova-oauth
- https://github.com/vilic/cordova-plugin-tts
- https://github.com/macdonst/SpeechRecognitionPlugin

