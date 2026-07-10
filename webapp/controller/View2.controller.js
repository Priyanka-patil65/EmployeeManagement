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
            this.empId = oEvent.getParameter("arguments").key;
                this.getView().bindElement("oModel>/EmployeeSet('"+ this.empId + "')");
        },

        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        onIconPress:function(){
            var url = "/sap/opu/odata/sap/ZEMP_DEMO_SRV/PhotoSet('" + this.empId + "')/$value"
            sap.m.URLHelper.redirect(url,false);
        }
    });
});