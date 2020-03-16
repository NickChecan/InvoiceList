sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
], function (UIComponent, JSONModel, HelloDialog, Device) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
		
		metadata: {
			manifest: "json"
		},
		
		init: function () {
			// Call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			// Set data model
			var oData = {
				recipient: {
					name: "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			// Disable batch grouping for v2 API of the northwind service
			this.getModel("invoice").setUseBatch(false);

			// Set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
			
			// Set dialog
			this._helloDialog = new HelloDialog(this.getRootControl());
			// Create the views based on the url/hash
			this.getRouter().initialize();
		},
		
		exit : function () {
			this._helloDialog.destroy();
			delete this._helloDialog;
		},
		
		openHelloDialog : function () {
			this._helloDialog.open();
		},
		
		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
		
	});

});