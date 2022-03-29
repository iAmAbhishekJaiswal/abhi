function startApplication(){
    	    var user;
            allPointCalculation();
        /* if (localStorage.getItem("username") === null) {
    	      user=prompt("Hey! May I know your name ? ");
              localStorage.setItem("username", user);
              document.getElementById("user").innerHTML="Welcome "+localStorage.getItem("username");
              getCurrentTimes();
          }
          else{
              document.getElementById("user").innerHTML="Welcome "+localStorage.getItem("username");
              getCurrentTimes();
              
              } */
              
              
    	}
    
         function getCurrentDate(){
         	var today = new Date();
             var dd = String(today.getDate()).padStart(2, '0');
             var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
             var yyyy = today.getFullYear();
             var currentDate = yyyy+ '-' + mm + '-' + dd;
             return currentDate;
         }
         
         function getCurrentTimes(){
             var today = new Date();
             var dd = String(today.getDate()).padStart(2, '0');
             var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
             var yyyy = today.getFullYear();
             var todayDate = dd + '/' + mm + '/' + yyyy;
             var h = doubleDigit( today.getHours() );
             var m=doubleDigit( today.getMinutes() );
             var s=doubleDigit(today.getSeconds()) ;             
             document.getElementById("date").innerHTML=todayDate;
             document.getElementById("time").innerHTML=h+":"+m+":"+s;
    
             setTimeout(function(){ getCurrentTimes()},1000);
    }
    
 
    
    function doubleDigit( i ){
    	if(i<10){
         i='0'+i;
         }
         return i;
    
    }
    
     function pendingTask(){
     	
     	var pending=0;
         
     	var tasks=JSON.parse(localStorage.getItem('task'));
         
         for(var i=0;i<tasks.length;i++)
         {
         	if(tasks[i].status==="pending")
             pending++;      
         }
       return pending;
     }


   function calculateDay(taskItem){
               	
               	var todayDay=getCurrentDate().split('-');
                   var deadline=taskItem.taskDeadline.split('-');
                   var totalDayDifference=(deadline[0]-todayDay[0])*365 + (deadline[1]-todayDay[1])*30 + (deadline[2]-todayDay[2]);
                   return totalDayDifference;
                   
        }
        
     function updateJson(){
     	if(localStorage.getItem("task") !== null){
               
               var task=JSON.parse(localStorage.getItem("task") );
               for(var i=0;i<task.length;i++)
               {
               	task[i].dayleft=calculateDay(task[i]); 
               }
               localStorage.setItem("task",JSON.stringify(task));
            }
     }
     
     function updateStatus(){
     var statusRadio = document.getElementsByName('status'); 
         for(var j=0 ;j<otherTask.length;i++){
         	if(otherTask[j].tasknum==tasknumTrack){
               for(var i = 0; i < statusRadio.length; i++) { 
                if(statusRadio[i].checked) 
               otherTask[j].status=statusRadio[i].value;
               
               } 
            }
          }
            localStorage.setItem("task",JSON.stringify(otherTask));
       }
        
        
       function allPointCalculation(){
       	var completePoint=0;
            var addPoint=0;
         	if (localStorage.getItem("pointCalculation") === null) {
               var pointCalculation={};
               pointCalculation.pendingCount=0;
               pointCalculation.workingCount=0;
               pointCalculation.activeness=0;
               pointCalculation.laziness=0;            
               pointCalculation.completedCount=0;
               pointCalculation.totalCount= 0;
               }
               else
               var pointCalculation=JSON.parse(localStorage.getItem('pointCalculation'));
               
             
              if (localStorage.getItem("task") !== null) {
              	pointCalculation.pendingCount=0;
                 pointCalculation.workingCount=0;
              
                var task=JSON.parse(localStorage.getItem("task") );
             	for(var j=0;j<task.length;j++){
                 if(task[j].status=="pending")
                 pointCalculation.pendingCount++;
                 else
                 pointCalculation.workingCount++;
               }
              }
              
              if(JSON.parse(localStorage.getItem('pointOnAdd')) !== null){
                 pointCalculation.totalCount=parseInt(JSON.parse(localStorage.getItem('pointOnAdd')).numberOfTask);
                 addPoint = Math.round(JSON.parse(localStorage.getItem('pointOnAdd')).addPointPercentage);
              }
             if(JSON.parse(localStorage.getItem('pointOnView')) !== null){
                 pointCalculation.completedCount=parseInt(JSON.parse(localStorage.getItem('pointOnView')).completedTask);
                 completePoint =  Math.round(JSON.parse(localStorage.getItem('pointOnView')).viewPointPercentage);
              }
              
              if(completePoint !=0 && addPoint !=0)
              pointCalculation.activeness= Math.round((addPoint+completePoint)/2);
              else
              pointCalculation.activeness= (completePoint==0)?addPoint:completePoint;
              
              
              pointCalculation.laziness= 100-pointCalculation.activeness;
              
              document.getElementById("totalcount").innerHTML=pointCalculation.totalCount;
              document.getElementById("completedcount").innerHTML=pointCalculation.completedCount;
              document.getElementById("pendingcount").innerHTML=pointCalculation.pendingCount;
              document.getElementById("workingcount").innerHTML=pointCalculation.workingCount;
              localStorage.setItem("pointCalculation",JSON.stringify(pointCalculation));
              
              $(document).ready(function(){
    $('.counter-value').each(function(){
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        },{
            duration: 1000,
            easing: 'swing',
            step: function (now){
                $(this).text(Math.ceil(now));
            }
        });
    });
});

    var fm = new FluidMeter();
    fm.init({
      targetContainer: document.getElementById("active-meter"),
      fillPercentage: pointCalculation.activeness,
      options: {
        fontFamily: "Raleway",
        drawPercentageSign: false,
        drawBubbles: true,
        size: 200,
        borderWidth: 10,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
          fillStyle: "#2ab7ca",
          angularSpeed: 100,
          maxAmplitude: 12,
          frequency: 30,
          horizontalSpeed: -150
        },
        backgroundFluidLayer: {
          fillStyle: "skyblue",
          angularSpeed: 100,
          maxAmplitude: 9,
          frequency: 30,
          horizontalSpeed: 150
        }
      }
    });

var fm1 = new FluidMeter();
    fm1.init({
      targetContainer: document.getElementById("lazy-meter"),
      fillPercentage: pointCalculation.laziness,
      options: {
        fontFamily: "Raleway",
        drawPercentageSign: false,
        drawBubbles: true,
        size: 200,
        borderWidth: 10,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
          fillStyle: "purple",
          angularSpeed: 60,
          maxAmplitude: 8,
          frequency: 50,
          horizontalSpeed: -120
        },
        backgroundFluidLayer: {
          fillStyle: "pink",
          angularSpeed: 60,
          maxAmplitude: 5,
          frequency: 40,
          horizontalSpeed: 120
        }
      }
    });


              
          }
          
          
         
      
        
     