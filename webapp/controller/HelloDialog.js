sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/core/syncStyleClass"
], function (ManagedObject, Fragment, syncStyleClass) {
	"use strict";
	return ManagedObject.extend("sap.ui.demo.walkthrough.controller.HelloDialog", {
		
		constructor : function (oView) {
			this._oView = oView;
		},
		
		exit : function () {
			delete this._oView;
		},
		
		open : function () {
			var oView = this._oView;
			
			// Create dialog lazily
			if (!oView.byId("helloDialog")) {
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("helloDialog").close();
					}
				};
				
				// Load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "sap.ui.demo.walkthrough.view.HelloDialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// Connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					// Forward compact/cozy style into dialog
					syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog);
					oDialog.open();
				});
				
			} else {
				oView.byId("helloDialog").open();
			}
		}
		
	});
});