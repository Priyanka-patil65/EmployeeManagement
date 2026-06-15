sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatached,this)
        },
        onPatternMatached:function(oEvent){
            var empId = oEvent.getParameter("arguments").key;
            this.byId("oSFEmpDetails").bindElement("oModel>/EmployeeSet('"+ empId + "')");

        }
    });
});