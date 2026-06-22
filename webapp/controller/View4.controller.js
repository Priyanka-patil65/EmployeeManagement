sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View3", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView4").attachPatternMatched(this.onPatternMatched,this)
        },
        onPatternMatched:function(oEvent){
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement("oModel>/EmployeeSet('"+empId+"')")
        },
        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1")
        },

        onSavePress: function(){
            
            var empId = this.byId("oIpEmpIdV4").getValue();
             var empName = this.byId("oIpEmpNameV4").getValue();
              var empDesig = this.byId("oIpEmpDesigV4").getValue();
               var empSkill = this.byId("oIpEmpSkillV4").getValue();
                var empEmail = this.byId("oIpEmpEmailV4").getValue();
                 var empSalary = this.byId("oIpEmpSalaryV4").getValue();
                  var empStatus = this.byId("oIpEmpStatusV4").getValue();
                 var empRating = this.byId("oIpEmpRatingV4").getValue();

                 var payload = {
                    Empid : empId,
                    Name : empName,
                    Desig : empDesig ,
                    Skill : empSkill,
                    Email : empEmail,
                    Salary: empSalary,
                    Status : empStatus,
                    Rating : parseInt(empRating),
                 }

            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.update("/EmployeeSet('"+empId+"')",payload,{
                success(req,res){
                    MessageBox.success("Data updated Successfully")
                },
                error(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value)
                }
            })
        }
    });
});