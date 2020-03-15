sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
   "use strict";
   return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
      
      onShowHello : function () {
         // Read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
         var sMsg = oBundle.getText("helloMsg", [sRecipient]);
         // Show message
         MessageToast.show(sMsg);
      },
      
      onOpenDialog : function () {
			var oView = this.getView();
			// Create dialog lazily
			if (!this.byId("helloDialog")) {
				// Load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "sap.ui.demo.walkthrough.view.HelloDialog"
				}).then(function (oDialog) {
					// Connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("helloDialog").open();
			}
		}
      
   });
});