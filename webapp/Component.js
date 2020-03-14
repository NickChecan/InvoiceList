sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
   	
      metadata : {
         rootView: {
            "viewName": "sap.ui.demo.walkthrough.view.App",
            "type": "XML",
            "async": true,
            "id": "app"
         }
      },
      
      init : function () {
         // Call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         
         // Set data model
         var oData = {
            recipient : {
               name : "World"
            }
         };
         
         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         // Set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      }
      
   });
});