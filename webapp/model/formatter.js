sap.ui.define([
    
], () => {
    "use strict";

    return {
        formatRating: function(Rating){
            var desc = "";
            if(Rating=== 5){
                desc = "(Outstanding)";
            }else if(Rating=== 4){
                desc = "(Commendable)";
            }else if(Rating=== 3){
                desc = "(Met Expectation)";
            }else if(Rating=== 2){
                desc = "(Needs Improvement)";
            }else if(Rating=== 1){
                desc = "(PIP)";
            }
            return Rating + desc;
        },
        formatStatus: function(status){
            if(status === "PERMANENT"){
                return "Success"
            }else{
                return "Error"
            }
        },
        formatDesig:function(desig){
            var desigDesc = "";
            if(desig === "DEVELOPER"){
                desigDesc = "(SDE-1)";
            }else if(desig === "TEAM LEAD"){
                desigDesc = "(TL)";
            }else if(desig === "MANAGER"){
                desigDesc = "(MGR)"
            }

            return desig + desigDesc
        }
    }
});