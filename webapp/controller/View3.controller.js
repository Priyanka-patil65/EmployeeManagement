sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/unified/FileUploaderParameter",
], (Controller,MessageBox,MessageToast,FileUploaderParameter) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View3", {
        onInit() {
            this.certModel = this.getOwnerComponent().getModel("certModel");
            this.certModel.setData({
                aCertifications : [
                    // {
                    //     Empid:"E1001",
                    //     Certid:"C1001",
                    //     Certname:"AWS",
                    //     Description:"AWS Cloud Practitioner",
                    //     Status:"Active"
                    // }
                ]
        })
        },
        onAddPress:function(){
            this.certModel.getData().aCertifications.push({
                Empid: this.byId("oIpEmpId").getValue(),
                Certid:"",
                Certname:"",
                Description:"",
                Status:""
            })
            this.certModel.refresh();

        },
        onRemovePress:function(oEvent){
            var index=oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.certModel.getData().aCertifications.splice(index, 1);
            this.certModel.refresh();
        },
        onBackPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView1")
        },

        uploadPhoto:function(){
            var fileUploader = this.byId("oFileUpoaderPhoto");
            var Empid=this.byId("oIpEmpId").getValue();
            var slug = Empid + ","+ this.fileName;

            fileUploader.addHeaderParameter(new FileUploaderParameter({
                name:"slug",
                value:slug

            }));

            fileUploader.addHeaderParameter(new FileUploaderParameter({
                name:"fileType",
                value:this.fileType
            }));

            this.getOwnerComponent().getModel("oModel").refreshSecurityToken();
                fileUploader.addHeaderParameter(new FileUploaderParameter({
                    name: "x-csrf-token",
                    value: this.getOwnerComponent().getModel("oModel").getHeaders()["x-csrf-token"]
                }));
                fileUploader.upload();

        },
        OnFileUpload: function(oEvent){
            var status = oEvent.getParameter("status");
            if(status===201){
                MessageToast.show("File uploaded successfully");
            }
            else{
                MessageToast.show("Photo upload failed with status: " + status)
            }
        },

        onSavePress: function(){
            var empId= this.byId("oIpEmpId").getValue();
            var empName= this.byId("oIpEmpName").getValue();
            var empDesig= this.byId("oIpEmpDesig").getValue();
            var empEmail= this.byId("oIpEmpEmail").getValue();
            var empSalary= this.byId("oIpEmpSalary").getValue();
            var empStatus= this.byId("oIpEmpStatus").getValue();
            var empRating= this.byId("oIpEmpRating").getValue();

                var payload = {
                    Empid : empId,
                    Name : empName,
                    Desig : empDesig,
                    Email : empEmail,
                    Salary : empSalary,
                    Status : empStatus,
                    Rating : parseInt(empRating),
                    toCertification: this.certModel.getData().aCertifications
                }
            
            var oModel = this.getOwnerComponent().getModel("oModel");
            oModel.create("/EmployeeSet",payload,{

                success: function(req,res){
                    MessageBox.success("Data added successfully");
                    this.uploadPhoto();
                }.bind(this),
                error: function(oError){
                    // MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                }
            }) // this will trigger a POST call to the backend
        },

        onSelcFile:function(oEvent){
            this.fileName = oEvent.getParameter("files")[0].name;
            this.fileType = oEvent.getParameter("files")[0].type;
        }
    });
});