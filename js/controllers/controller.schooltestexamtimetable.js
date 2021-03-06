sivwebapp.controller('schoolTestExamTimeTableCtrl', function($scope, $http, hosturl, currentHost, constantService, Auth) {
    $scope.userdata = Auth.isLoggedIn();
    $scope.getTimeTableData = {};
    $scope.getTimeTableData.loginuser = $scope.userdata.username;
    $scope.getTimeTableData.instituteid = $scope.userdata.instituteid;


    $scope.getSubjectDetailsSubmit = function(){
    	$scope.getTimeTableData.eventid = $scope.eventid;
        $http({
                url: hosturl+"/api/v1/schooltestexamtimetable/getschooltestexamtimetable",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($scope.getTimeTableData)
            }).then(function(success) {
               
                if(success.data.returnmessage == "No Data"){
                    alert("No Data Found");
                }else{
                    $scope.subjectdetails = success.data.subjectdetails;
                }
            },function (error){
            	
   			});
    }

    $scope.submitTimeTable = function(){
        $scope.getTimeTableData.id = 1;
        $scope.getTimeTableData.evecirid = $scope.lastEventId.evecirid+1;
        var ttdata = JSON.stringify($scope.getTimeTableData)
        var subjectdetailstring = JSON.stringify($scope.subjectdetails);
        $scope.timetableentry = {
            "getTimeTableData": ttdata,
            "subjectdetails": subjectdetailstring
        }
        
        $http({
                url: hosturl+"/api/v1/schooltestexamtimetable/uploadTimeTable",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($scope.timetableentry)
            }).then(function(success) {
                
                if(success.data.returnmessage == "saved"){
                    alert("data saved!");
                }else if(success.data.returnmessage == "failed"){
                    alert("Something went wrong!");
                }
            },function (error){
                
            });
    }




    $scope.lastEventId = {};
    $scope.eventid = {};

    fetchlasteventid();

       function fetchlasteventid() {
            $scope.idNumber = {
                id: 1
            };

            $http({
                    url: hosturl+"/api/v1/playschooleventidgenerate/getPlaySchoolEventIdNo",
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $.param($scope.idNumber)
                    }).then(function(success) {
                       
                        $scope.lastEventId = success.data;
                        if($scope.lastEventId != null && $scope.lastEventId.evecirid != undefined )
                        {
                           $scope.eventid = 'EVECIR'+ $scope.lastEventId.evecirid;
                        }
                    },function (error){
                    alert(error);
                    
                
                    });        

       }
       $scope.open = function (index) {
           var indexVal = parseInt(index);
        $scope.popup[indexVal].opened = true;
       }
       $scope.popup = [
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false},
        {opened: false}
    ];
});