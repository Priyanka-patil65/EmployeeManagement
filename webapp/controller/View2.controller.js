sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/demoempmanagement/model/formatter"
], (Controller,formatter) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View2", {
        f:formatter,
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatached,this)
        },
        onPatternMatached:function(oEvent){
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement("oModel>/EmployeeSet('"+ empId + "')");

        },

        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        }
    });
});