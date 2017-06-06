/**
 * Created by frances.fearon on 11/05/2017.
 */

angular.module('secur')
    .controller('SessionController',SessionController);

function SessionController($route,$routeParams,sessionDataFactory, AuthFactory,jwtHelper,$window, $location) {
    var vm = this;
    console.log('start of session controller');
    var id = ($routeParams.id || null);
    vm.isSubmitted = false;
    vm.choices = ["","Yes", "No"];
    vm.assault = ["","No target hardening, Directing traffic flows, Removing means, Controlling disinhibitors or Screening/access control measures taken",
    "Either Directing traffic flows, Target removal or Removing means","More than one type of measure adequately"];
    vm.showObjectQuestions = false;
    vm.showPeopleQuestions = false;
    vm.showLocationQuestions = false;
    vm.showSurroundingsQuestions = false;
    vm.showMeasuresQuestions = false;
    vm.today = false;

//this is called when a particular session is selected from the list of Sessions returned (from sessions.html)
    if(id) {
        sessionDataFactory.sessionDisplay(id).then(function (response) {

            console.log(response);
            vm.session = response.data;

            //keep this its for loading the returned answers into an array for the algotithm
        //    var questionArray = [String];
        //    questionArray[0] = vm.session.objectQuestions.answer1;
        //    console.log("questionArray[0] " + questionArray[0]);


        })
    } else {
        vm.session = {};
        vm.session.objectQuestions  = {};
        vm.session.peopleQuestions = {};
        vm.session.locationQuestions = {};
        vm.session.surroundingsQuestions = {};
        vm.session.measuresQuestions = {};
        vm.timestamp = Date.now();
        vm.session.timestamp = vm.timestamp;
    };


//
    vm.objectButton = function() {
    console.log ("objbuttonpressed");
    vm.showObjectQuestions = true;
    vm.showPeopleQuestions = false;
    vm.showLocationQuestions = false;
    vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;

}

    vm.peopleButton = function() {

        console.log ("pplbuttonpressed");
        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = true;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;


    }

    vm.locationButton = function() {

        vm.showLocationQuestions = true;
        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = false;

    }

    vm.surroundingsButton = function() {

        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = true;
        vm.showMeasuresQuestions = false;

    }
    vm.measuresButton = function() {

        vm.showObjectQuestions = false;
        vm.showPeopleQuestions = false;
        vm.showLocationQuestions = false;
        vm.showSurroundingsQuestions = false;
        vm.showMeasuresQuestions = true;

    }

    // added to check user is logged in before adding a review
    // code is the same as in  the login-controller.js controller

    vm.isLoggedIn = function() {

        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    //this is called from the input form submit part of the session.html
    // where  ng-submit="vm.addReview()"
    //** note: vm.isSubmitted is in order to catch the fact that the form has been submitted
    //...from this point on, error messages will be shown on screen

   /* vm.addReview = function() {

        //capture the user name from the token (in session storage)

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        //var username = token.username;
        var username = token.email;

        var postData = {
            //use username from the token instead of entered field
            // name: vm.name,
            name: username,
            rating: vm.rating,
            review: vm.review
        };

        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id,postData).then(function(response) {
                console.log(response);
                // if(response.status === 200) {  //it is 201 for a successful posting not 200
                if (response.status === 201) {

                    $route.reload();

                }
            })
                .catch(function(error) {
                    console.log(error);
                });
        }else {
            vm.isSubmitted = true;
        }
    };

    */

    vm.updateSession = function() {

        console.log(vm.session.timestamp);
        console.log(vm.timestamp);
        if(vm.today) {
            vm.session.timestamp = Date.now();
        }
        if (!vm.session.objectQuestions)
        {
            vm.session.objectQuestions = {};
        };
        if (!vm.session.peopleQuestions)
        {
            vm.session.peopleQuestions = {};
        };
        if (!vm.session.locationQuestions)
        {
            vm.session.locationQuestions = {};
        };
        if (!vm.session.surroundingsQuestions)
        {
            vm.session.surroundingsQuestions = {};
        };
        if (!vm.session.measuresQuestions)
        {
            vm.session.measuresQuestions = {};
        };


        var postData = {

            name: vm.session.name,


            objectDescription : vm.session.objectDescription,
            informationDescription : vm.session.informationDescription,
            timestamp: vm.session.timestamp,

            objectQuestions: {
                answer1: vm.session.objectQuestions.answer1,

                comments1: vm.session.objectQuestions.comments1,
                answer2: vm.session.objectQuestions.answer2,
                comments2: vm.session.objectQuestions.comments2
            },
            peopleQuestions: {
                answer27: vm.session.peopleQuestions.answer27,
                comments27: vm.session.peopleQuestions.comments27,
                answer28: vm.session.peopleQuestions.answer28,
                comments28: vm.session.peopleQuestions.comments28
            },
            locationQuestions: {
                answer32: vm.session.locationQuestions.answer32,
                comments32: vm.session.locationQuestions.comments32,
                answer33: vm.session.locationQuestions.answer33,
                comments33: vm.session.locationQuestions.comments33
            },

            surroundingsQuestions: {
                answer39: vm.session.surroundingsQuestions.answer39,
                comments39: vm.session.surroundingsQuestions.comments39,
                answer40: vm.session.surroundingsQuestions.answer40,
                comments40: vm.session.surroundingsQuestions.comments40
            },
            measuresQuestions: {
                answer51: vm.session.measuresQuestions.answer51,
                comments51: vm.session.measuresQuestions.comments51,
                answer52: vm.session.measuresQuestions.answer52,
                comments52: vm.session.measuresQuestions.comments52,
                answer69: vm.session.measuresQuestions.answer69,
                comments69: vm.session.measuresQuestions.comments69,
                answer71: vm.session.measuresQuestions.answer71,
                comments71: vm.session.measuresQuestions.comments71
            }

        };


       // if(vm.addForm.$valid) {
            if(id) {

            sessionDataFactory.putSession(id,postData).then(function(response) {
                console.log(response);
                if (response.status === 204)
                {


                 //   $window.location.href = '#!/session/'+vm.session._id;
                      $route.reload();
                }
            })
                .catch(function(error) {
                    console.log(error);
                });

        }
        else {

                sessionDataFactory.postNewSession(postData).then(function(response) {
                    console.log(response);
                    console.log(response.data._id);
                    if (response.status === 201)
                    {

                       // this works, but the back arrow gets confused...
                   //     $window.location.href = '#!/session/'+response.data._id;
                   //     $route.reload();

                    // trying this to see if 'back' button will work by REPLACING the path in the history
                        $location.path( '/session/'+response.data._id).replace();
                    }
                })
                    .catch(function(error) {
                        console.log(error);
                    });

           // vm.isSubmitted = true;
           // console.log("invalid data");
        }

    };

    vm.deleteSession = function() {

        console.log("about to delete the session");
        console.log(id);

        sessionDataFactory.deleteSession(id).then(function(response) {
            console.log(response);
            if (response.status === 204)
            {
                //this works, but the back arrow gets confused .... trying replace() instead...seems better.
              //  $window.location.href = '#!/sessions';

              //   $route.reload();  // sessionid is no longer valid...load sessions list route instead
                $location.path( '/sessions').replace();
            }
        })
            .catch(function(error) {
                console.log(error);
            });



    };


}


