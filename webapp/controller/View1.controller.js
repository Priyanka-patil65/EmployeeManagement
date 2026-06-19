sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/demo/demoempmanagement/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
], (Controller,MessageBox,formatter,Filter,Sorter) => {
    "use strict";

    return Controller.extend("com.demo.demoempmanagement.controller.View1", {
        f:formatter,
        onInit() {
            //  this.welcomeMsg= this.byId("welcomeTxt").getText();
           var oModel = this.getOwnerComponent().getModel("oModel");
           var empModel = this.getOwnerComponent().getModel("empModel")

           oModel.read("/EmployeeSet",{
                success:function(data){
                    var ratingDesc = "";
                    for(let i=0;i<data.results.length;i++){
                        if(data.results[i].Rating === '5'){
                            ratingDesc = "(Outstanding)";
                        }else if(data.results[i].Rating === '4'){
                            ratingDesc = "(Commendable)";
                        }else if(data.results[i].Rating === '3'){
                            ratingDesc = "(Meets Expectations)";
                        }else if(data.results[i].Rating === '2'){
                            ratingDesc = "(Needs Imporovement)";
                        }else if(data.results[i].Rating === '1'){
                            ratingDesc = "(PIP)";
                        }

                        data.results[i].Rating = data.results[i].Rating + ratingDesc;
                    }
                    empModel.setData(data);
                },
                error:function(oError){

                }
           });
        },
        onNavToView2:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView2")
        },
        onSubmitPress: function(){
           var name = this.byId("nameIpt").getValue();
           this.byId("welcomeTxt").setText(name + " "+ this.welcomeMsg);

           var alignment = this.byId("alignIpt").getValue();
           this.byId("welcomeTxt").setTextAlign(alignment);

           this.byId("nameIpt").setEnabled(false);
           this.byId("alignIpt").setEnabled(false);
           this.byId("submitBtn").setEnabled(false);


        },
        onSignalChange: function(){
            var signalColor = this.byId("colorIpt").getValue();
            this.byId("signalBtn").setText("Signal");
                    this.byId("signalBtn").setType("Default");
            if(signalColor === "Red"){
                    this.byId("signalBtn").setText("Red");
                    this.byId("signalBtn").setType("Reject");


            }else if(signalColor === "Green"){
                    this.byId("signalBtn").setText("Green");
                    this.byId("signalBtn").setType("Accept");
            }
        else if(signalColor === "Blue"){
            this.byId("signalBtn").setText("Blue");
                    this.byId("signalBtn").setType("Emphasized");

        }
        },
        onSubmit: function(){

            var empId = this.byId("idIpt").getValue();
            var name = this.byId("nameIpt").getValue();
            var email= this.byId("emailIpt").getValue();
            var isFilled = true;

            this.byId("idIpt").setValueState("None");
            this.byId("nameIpt").setValueState("None")

            if(empId == ""){
                this.byId("idIpt").setValueState("Error")
                this.byId("idIpt").setValueStateText("Please enter the employee id")
                isFilled = false;
            }
            else{
                var empIdRegExp =  /^\d{6}$/;
                if(!empId.match(empIdRegExp)){
                    isFilled = false;
                    this.byId("idIpt").setValueState("Error");
                    this.byId("idIpt").setValueStateText("Enter Valid employee id");
                }
            }

            if(name == ""){
                this.byId("nameIpt").setValueState("Error")
                this.byId("nameIpt").setValueStateText("Please enter the name")
                isFilled = false;  
            }

            if(email === ""){
                this.byId("emailIpt").setValueState("Error");
                this.byId("emailIpt").setValueStateText("Enter email id")
                isFilled = false;
            }
            else{
                var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;                
                if(!email.match(emailRegex)){
                    this.byId("emailIpt").setValueState("Error");
                    this.byId("emailIpt").setValueStateText("Enter vaid email id")
                    isFilled = false;
                }
            }

            if(isFilled === true){
                MessageBox.success("You are good to go");
            }
            else{
                MessageBox.error("Please fill the mandatory fields")
            }
        },

        onMultiValueSubmit: function(){
            var valueSel = this.byId("oSelName").getSelectedKey();
            var valCom = this.byId("oCBName").getSelectedKey();
            var valMcom = this.byId("oMCBName").getSelectedKeys();
            var valRad = this.byId("oRadName").getSelectedIndex();
        },
        onSelectChange:function(){
            var valueSel = this.byId("oSelName").getSelectedKey();

        },
        onComboSelect:function(){
            var valCom = this.byId("oCBName").getSelectedKey();

        },
        onMultiSelect:function(){
            var valMcom = this.byId("oMCBName").getSelectedKeys();

        },
        onRadioSelect:function(){
            var valRad = this.byId("oRadName").getSelectedIndex();
        },

        onRowSelect: function(oEvent){
            var empId = oEvent.getSource().getBindingContext("oModel").getProperty("Empid");
            this.getOwnerComponent().getRouter().navTo("RouteView2",{
                key: empId
            })
        },
        onButtonPress:function(){
            //single row selection
            var aSelRow = this.byId("empTab").getSelectedItem().getBindingContext("oModel").getProperty("Empid"); 
             //multi row selection
            var aRows = this.byId("empTab").getSelectedItems();
            for(let i=0;i<aRows.length;i++){
                MessageBox.success(aRows[i].getBindingContext("oModel").getProperty("Empid"));
            }
        },
        onF4helpPress: function(){

            if(this.dialog === undefined){
                this.dialog = sap.ui.xmlfragment("com.demo.demoempmanagement.fragment.empIdF4help",this);
                this.getView().addDependent(this.dialog);
            }
            this.dialog.open();
        },
        onF4RowSelect:function(oEvent){
            var empId = oEvent.getSource().getBindingContext("oModel").getProperty("Empid");
            this.byId("f4HelpIpt").setValue(empId);
            this.dialog.close();
        },
        onClose:function(){
            this.dialog.close();
        },

        onGoPress: function(){
            var empId = this.byId("f4HelpIpt").getValue();
            var name = this.byId("nameIpt").getValue();
            var skill = this.byId("skillIpt").getValue();
            var desig = this.byId("desigIpt").getValue();
            var sortField = this.byId("sortCmb").getSelectedKey();
            var sortOrder = this.byId("orderRBG").getSelectedIndex();
            var groupField = this.byId("groupCmb").getSelectedKey();
            var groupOrder = this.byId("groupRBG").getSelectedIndex();
            var aFilter = [];
            var aSorter = [];
            if(empId !== ""){
                aFilter.push(new Filter("Empid","EQ",empId));
            }
            if(name){
                aFilter.push(new Filter("Name","Contains",name))
            }
            if(skill){
                aFilter.push(new Filter("Skill", "Contains",skill))
            }
            if(desig){
                aFilter.push(new Filter("Desig","Contains",desig))
            }
            this.byId("empTab").getBinding("items").filter(aFilter);

             if(groupField !== "" && groupOrder !== -1){
                aSorter.push(new Sorter(groupField,(groupOrder===0)?false:true,function(oBindingContext){
                      if(groupField === "Skill"){
                        var skill = oBindingContext.getObject().Skill;
                        return{
                            key:skill,
                            text:skill
                        }
                      }
                      else if(groupField === "Desig"){
                        var desig = oBindingContext.getObject().Desig;
                        return{
                            key:desig,
                            text:desig
                        }
                      }

                }));
            }


            if(sortField !== "" && sortOrder !== -1){
                aSorter.push(new Sorter(sortField,(sortOrder===0)?false:true));
            }
            this.byId("empTab").getBinding("items").sort(aSorter); //this will form ?$orderby=FieldName sortOrder
        },

        onResetPress:function(){
            this.byId("f4HelpIpt").setValue("");
            this.byId("nameIpt").setValue("");
            this.byId("skillIpt").setValue("");
            this.byId("desigIpt").setValue("");
            this.byId("sortCmb").setSelectedKey("");
            this.byId("orderRBG").setSelectedIndex(-1);
            this.byId("groupCmb").setSelectedKey("");
            this.byId("groupRBG").setSelectedIndex(-1);

            this.byId("empTab").getBinding("items").filter([]);
            this.byId("empTab").getBinding("items").sort([]);

        },
        onAddEmpPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView3")
        }


    });
});