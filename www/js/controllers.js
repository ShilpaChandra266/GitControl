angular.module('app.controllers', [])  
      
.controller('repositoriesCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, GlobalService) {
    if(localStorage.getItem("token") == null && localStorage.getItem("token") == ""){
        $state.go('loginUsingGitHub');
    }
    // init Functionality. 
    $scope.response = "Say 'Get Repository' \n or 'create Repository' ";
    var reponame = '';
    var repoDescription = 'Created using Git Control App with your voice';
    var createFlag = false;
    // Record Functionality. 
    $scope.record = function(){
         GlobalService.record(function(decodedText){
             console.log("Response Recieved : " + decodedText);
             $scope.request = decodedText;
             // get repository gets recognized as git. 
             $scope.request = $scope.request.replace("git", "Get");
             $scope.$apply();
             startRecongition();
         });
    }
    // Get Date from ISO8601 date format to normal format
    $scope.getDate = function(isoDate){
        console.log(isoDate);
        date = new Date(isoDate);
        return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +':'+ date.getSeconds();
    } 
    // Get Repo Details. Make this as GIT PlayGround
    getRepos = function(){
        $http({
            method: 'GET',
            url: GlobalService.getGitURL()+'/user/repos',
            headers: {'Authorization':'token ' + localStorage.getItem("token")}
        }).success(function(result) {
            $scope.repos = result;
        }).error(function(error){
            var alertPopup = $ionicPopup.alert({
                title: 'Failed to get Repo details!',
                template: error
            });
        })
    }
    // 
    startRecongition = function(){
        var input =  $scope.request.toLowerCase();
        if(createFlag || input.includes("create repository") || input.includes("create repo")){
            console.log('createFlag : ' + createFlag );
            console.log('repoName : ' + reponame );
            console.log('repoDescription : ' + repoDescription);
            if(createFlag && reponame!=="" && (input.includes("yes")|| input.includes("correct"))){
                // Create Repository
                $http({
                    method: 'POST',
                    url: GlobalService.getGitURL()+'/user/repos',
                    headers: {'Authorization':'token ' + localStorage.getItem("token"), 'Content-Type':'application/json'},
                    data: {'name':reponame , 'description': repoDescription}
                }).success(function(result) {
                    $scope.response = "Successfully created new Repository in your GitHub Account"
                    GlobalService.speakText($scope.response);
                    getRepos();
                }).error(function(error){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Failed to Create Repository!',
                        template: JSON.stringify(error)
                    });
                })
                createFlag = false;
                reponame = "";
            }else if(createFlag && reponame===""){
                // Check Name.
                $scope.response = "Creating a Repository with name " + input + " is that correct ?";
                reponame = input;
                setTimeout(GlobalService.speakText($scope.response, function(status){
                    if(status!=="error"){
                        $scope.record();
                    }
                }), 100);
            }else{
                $scope.response = "Creating a Repository. What is the name of the repo ? ";
                createFlag = true;
                reponame = "";
                setTimeout(GlobalService.speakText($scope.response, function(status){
                    if(status!=="error"){
                        $scope.record();
                    }
                }), 100);
            }
        }else if(input.includes("git repository") || input.includes("get repository") || input.includes("show repositories")|| 
            input.includes("git repositories") || input.includes("get repositories") || input.includes("get repos") ){
            $scope.response = "Getting Repositories from your GitHub Account"
            GlobalService.speakText($scope.response);
            getRepos();
        }
        // Any new service can be added here. 
        // else if(input.includes("commit")){}
        else if(input.includes("hello") || input.includes("hi")){
            $scope.response = "Hello!! Try Speaking 'get Repository' or 'create Repository'";
            GlobalService.speakText($scope.response);
        }else if(input.includes("error")){
            GlobalService.speakText(input);
        }
        $scope.$apply();
    }
})
   
.controller('accountCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup,GlobalService) {
    if(localStorage.getItem("token") == null && localStorage.getItem("token") == ""){
        $state.go('loginUsingGitHub');
    }
    // Get User Account Details. 
    console.log(localStorage.getItem("token"));
    console.log(GlobalService.getGitURL());
    $http({
        method: 'GET',
        url: GlobalService.getGitURL()+'/user',
        headers: {'Authorization':'token ' + localStorage.getItem("token")}
    }).success(function(result) {
        $scope.imgsrc = result.avatar_url;
        $scope.user = result.login;
        $scope.htm = result.html_url;
        $scope.bio = result.bio;
        $scope.priRepos = result.total_private_repos;
        $scope.pubRepos = result.public_repos;
        $scope.gists = result.public_gists;
        $scope.followers = result.followers;
        $scope.following = result.following;
        console.log("Welcome " + $scope.user); 
        GlobalService.speakText("Welcome " + $scope.user+ "!");
   }).error(function(error){
        var alertPopup = $ionicPopup.alert({
            title: 'Failed to get User details!',
            template: error
        });
    })
    $scope.logOut = function(){
        localStorage.setItem("token", "");
        $state.go('loginUsingGitHub');
    }
})
   
.controller('loginUsingGitHubCtrl', function ($scope, $cordovaOauth, $state,$ionicPopup, $http) {
    //localStorage.setItem("token", "7d58ab72662287bed8127596b760a6d76bd61432");
    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
        $state.go('tabsController.repositories');
    }
    $scope.login = function() {
        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
            // If Already Logged in, lets Go without Login. 
            $state.go('tabsController.repositories');
        }
        $cordovaOauth.github("c9cfd584201b38c8eabd", "9d1176febf6f302c4c3332067d4dbe380a38cacf", ["repo", "user"]).then(function(result){
            // Success.. 
            console.log("Response Object -> " + JSON.stringify(result));
            localStorage.setItem("token", result.access_token);
            $state.go('tabsController.repositories');
        },function(error){
            // Login Failed. 
            localStorage.setItem("token", "");
            $state.go('loginUsingGitHub');
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: error
            });
        });
    }
})
 