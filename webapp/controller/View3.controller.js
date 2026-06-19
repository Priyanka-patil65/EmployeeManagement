sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View3", {
        onInit() {
        },
        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1")
        },

        onSavePress: function(){
            var empId= this.byId("oIpEmpId").getValue();
            var empName= this.byId("oIpEmpName").getValue();
            var empDesig= this.byId("oIpEmpDesig").getValue();
            var empSkill= this.byId("oIpEmpSkill").getValue();
            var empEmail= this.byId("oIpEmpEmail").getValue();
            var empSalary= this.byId("oIpEmpSalary").getValue();
            var empStatus= this.byId("oIpEmpStatus").getValue();
            var empRating= this.byId("oIpEmpRating").getValue();

                var payload = {
                    Empid : empId,
                    Name : empName,
                    Desig : empDesig,
                    Skill : empSkill,
                    Email : empEmail,
                    Salary : empSalary,
                    Status : empStatus,
                    Rating : parseInt(empRating)
                }
            
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet",payload,{

                success: function(req,res){
                    MessageBox.success("Data added successfully");
                },
                error: function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            }) // this will trigger a POST call to the backend
        }
    });
});