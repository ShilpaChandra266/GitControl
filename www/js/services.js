angular.module('app.services', [])

.service('GlobalService', [function(){
    var gitURL = 'https://api.github.com';
    recognizedText = '';

    return {
        getGitURL: function(){
            return gitURL;
        },
        record: function(callback){
            //var recognition = new webkitSpeechRecognition()
            var recognition = new SpeechRecognition();
            recognizedText = "Recording";
            recognition.onresult = function(event) {
                if (event.results.length > 0) {
                    recognizedText = event.results[0][0].transcript;
                    console.log("Recognition results are : " + recognizedText);
                    if(callback && typeof(callback)==="function"){
                        callback(recognizedText);
                    }
                }
            };
            recognition.onerror = function(error){
                console.log(JSON.stringify(error));
                if(callback && typeof(callback)==="function"){
                    recognizedText="Error recognizing speech. Please Speak again!";
                    callback(recognizedText);
                }
            }
            recognition.start();
        },
        speakText: function(speechText, callback){
            TTS.speak({
                text: speechText,
                locale : 'en-US',
                rate: 0.75
            }, function(){
                console.log("Speaking Success");
                if(callback && typeof(callback)==="function"){
                    callback('good');
                }
            }, function(reason){
                recognizedText = reason;
                if(callback && typeof(callback)==="function"){
                    callback('error');
                }
            });
        },
        getReText: function(){
            return recognizedText;
        }
    };
}]);