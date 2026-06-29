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
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.read("/EmployeeSet('"+empId+"')/toCertification",{
                    success:function(data){
                        this.getOwnerComponent().getModel("certUpdateModel").setData(data)
                    }.bind(this)
            });
        },
        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1")
        },
        onAddPress:function(){
            this.getOwnerComponent().getModel("certUpdateModel").getData().results.push({
                Empid: this.byId("oIpEmpIdV4").getValue(),
                Certid:"",
                Certname:"",
                Description:"",
                Status:""
            })
            this.getOwnerComponent().getModel("certUpdateModel").refresh();

        },
        onRemovePress:function(oEvent){
            var index=oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.getOwnerComponent().getModel("certUpdateModel").getData().results.splice(index, 1);
            this.getOwnerComponent().getModel("certUpdateModel").refresh();
        },

        onSavePress: function(){
            
            var empId = this.byId("oIpEmpIdV4").getValue();
             var empName = this.byId("oIpEmpNameV4").getValue();
              var empDesig = this.byId("oIpEmpDesigV4").getValue();
                var empEmail = this.byId("oIpEmpEmailV4").getValue();
                 var empSalary = this.byId("oIpEmpSalaryV4").getValue();
                  var empStatus = this.byId("oIpEmpStatusV4").getValue();
                 var empRating = this.byId("oIpEmpRatingV4").getValue();

                 var payload = {
                    Empid : empId,
                    Name : empName,
                    Desig : empDesig ,
                    Email : empEmail,
                    Salary: empSalary,
                    Status : empStatus,
                    Rating : parseInt(empRating),
                    toCertification:this.getOwnerComponent().getModel("certUpdateModel").getData().results
                 }

            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet",payload,{
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