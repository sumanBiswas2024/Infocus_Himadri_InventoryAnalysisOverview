sap.ui.define([
	"com/infocus/mtlGrp_stockDetails/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageBox",
	"sap/ui/core/ValueState",
	"sap/viz/ui5/api/env/Format",
	"sap/ui/core/Fragment"
], function(BaseController, Controller, Filter, FilterOperator, JSONModel, MessageBox, ValueState, Format, Fragment) {
	"use strict";

	return Controller.extend("com.infocus.mtlGrp_stockDetails.controller.View1", {
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel();
			// this.getMatGrpStckDetailsData();
			this._updateGlobalDataModel();
			this.getplantData();
			this.getStorageLoactionData();
			this.getGroupData();
			this.getMateralTypeData();
			// this.byId("oVizFrame").setVisible(true);
			// this.byId("pieChartStock").setVisible(false);
			// this.byId("pieChartValue").setVisible(false);
			this.byId("oVizFrame").setVisible(true);
			this.byId("columnChartsContainer").setVisible(true);
			this.byId("pieChartsContainer").setVisible(false);
			// this.byId("splitter").setVisible(true);
			// this.byId("splitter2").setVisible(false);
		},
		getplantData: function() {
			var that = this;
			var plantModel = this.getOwnerComponent().getModel("plantModel");
			var pUrl = "/ZPLANT_MASTER_VIEW";

			sap.ui.core.BusyIndicator.show();
			plantModel.read(pUrl, {
				urlParameters: {
					"sap-client": "300"
				},
				success: function(response) {
					var pData = response.results;
					console.log(pData);
					sap.ui.core.BusyIndicator.hide();

					var oPlantCodeDescriptionModel = that.getOwnerComponent().getModel("plantCodeDescription");
					oPlantCodeDescriptionModel.setData(pData);

				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					console.log(error);
					var errorObject = JSON.parse(error.responseText);
					sap.m.MessageBox.error(errorObject.error.message.value);
				}
			});

		},
		getStorageLoactionData: function() {
			var that = this;
			var ZSL_MASTER_CDS_Model = this.getOwnerComponent().getModel("ZSL_MASTER_CDS_Model");
			var pUrl = "/ZSL_MASTER";

			sap.ui.core.BusyIndicator.show();
			ZSL_MASTER_CDS_Model.read(pUrl, {
				// urlParameters: {
				// 	"sap-client": "300"
				// },
				success: function(response) {
					var pData = response.results;
					console.log(pData);
					sap.ui.core.BusyIndicator.hide();

					var oStorageLocationModel = that.getOwnerComponent().getModel("storageLocData");
					oStorageLocationModel.setData(pData);

				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					console.log(error);
					var errorObject = JSON.parse(error.responseText);
					sap.m.MessageBox.error(errorObject.error.message.value);
				}
			});

		},
		getGroupData: function() {
			var that = this;
			var Z_INF_MAT_GRP_MAST_CDS_Model = this.getOwnerComponent().getModel("Z_INF_MAT_GRP_MAST_CDS_Model");
			var pUrl = "/Z_INF_Mat_Grp_Mast";

			sap.ui.core.BusyIndicator.show();
			Z_INF_MAT_GRP_MAST_CDS_Model.read(pUrl, {
				// urlParameters: {
				// 	"sap-client": "300"
				// },
				success: function(response) {
					var pData = response.results;
					console.log(pData);
					sap.ui.core.BusyIndicator.hide();

					var ogroupDataModel = that.getOwnerComponent().getModel("groupData");
					ogroupDataModel.setData(pData);

				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					console.log(error);
					var errorObject = JSON.parse(error.responseText);
					sap.m.MessageBox.error(errorObject.error.message.value);
				}
			});

		},
		getMateralTypeData: function() {
			var that = this;
			var ZCDS_MATL_TYPE_MAST_CDS_Model = this.getOwnerComponent().getModel("ZCDS_MATL_TYPE_MAST_CDS_Model");
			var pUrl = "/ZCDS_Matl_Type_Mast";

			sap.ui.core.BusyIndicator.show();
			ZCDS_MATL_TYPE_MAST_CDS_Model.read(pUrl, {
				// urlParameters: {
				// 	"sap-client": "300"
				// },
				success: function(response) {
					var pData = response.results;
					console.log(pData);
					sap.ui.core.BusyIndicator.hide();

					var oTypeDataModel = that.getOwnerComponent().getModel("typeData");
					oTypeDataModel.setData(pData);

				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					console.log(error);
					var errorObject = JSON.parse(error.responseText);
					sap.m.MessageBox.error(errorObject.error.message.value);
				}
			});

		},

		_updateGlobalDataModel: function() {
			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			if (oGlobalDataModel) {
				oGlobalDataModel.setProperty("/togglePanelVisibility", "X");
				oGlobalDataModel.setProperty("/chartView", "");
				oGlobalDataModel.setProperty("/allPlantVisible", "X");
				oGlobalDataModel.setProperty("/pddppPlantVisible", "");
			} else {
				console.error("Global data model is not available.");
			}

		},
		onRadioButtonPDPP: function(oEvent) {
			// Get the selected radio button
			var selectedIndex = oEvent.getParameter("selectedIndex");
			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");

			// switch (selectedIndex) {
			// 	case 0:
			// 		chartType = "column";
			// 		break;
			// 	case 1:
			// 		chartType = "pie";
			// 		break;
			// 	case 2:
			// 		chartType = "line";
			// 		break;
			// 	case 3:
			// 		chartType = "donut";
			// 		break;
			// 	default:
			// 		chartType = "column";

			// }
			if (selectedIndex === 0) {
				oGlobalDataModel.setProperty("/allPlantVisible", "X");
				oGlobalDataModel.setProperty("/pddppPlantVisible", "");
				// this.byId("splitter").setVisible(true);
				// this.byId("splitter2").setVisible(false);
			} else {
				oGlobalDataModel.setProperty("/allPlantVisible", "");
				oGlobalDataModel.setProperty("/pddppPlantVisible", "X");
				// this.byId("splitter").setVisible(false);
				// this.byId("splitter2").setVisible(true);
			}
		},
		_validateInputFields: function() {

			var inputPlant = this.byId("inputPlant");
			var inputPlantValue = inputPlant.getValue();

			var inputStorage = this.byId("inputStorage");
			var inputStorageValue = inputStorage.getValue();

			var inputGroup = this.byId("inputGroup");
			var inputGroupValue = inputGroup.getValue();
			
			var inputType = this.byId("inputType");
			var inputTypeValue = inputType.getValue();

			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			var oPlantCodeDescriptionModel = this.getOwnerComponent().getModel("plantCodeDescription");
			var oPlantCodeDescriptionData = oPlantCodeDescriptionModel.getData();

			oPlantCodeDescriptionData.forEach(function(data) {
				if ((inputPlantValue.toUpperCase()) === data.Plant) {
					var oPlantCode = data.Plant;
					var oMaterialDespcription = data.Description;
					var oTableTitle = oMaterialDespcription + " (" + oPlantCode + ")";

					oGlobalDataModel.setProperty("/plantCode", oPlantCode);
					oGlobalDataModel.setProperty("/MaterialDescription", oMaterialDespcription);
					oGlobalDataModel.setProperty("/tableTitle", oTableTitle);
				}
			});

			var isValid = true;
			var message = '';

			if (oGlobalDataModel.getProperty("/allPlantVisible") === "X") {
				if (!inputPlant.getValue()) {
					inputPlant.setValueState(sap.ui.core.ValueState.Error);
					isValid = false;
					message += 'Plant Code, ';
				} else {
					inputPlant.setValueState(sap.ui.core.ValueState.None);
				}
				if (!inputType.getValue()) {
					inputType.setValueState(sap.ui.core.ValueState.Error);
					isValid = false;
					message += 'Material Type, ';
				} else {
					inputType.setValueState(sap.ui.core.ValueState.None);
				}
				if (!inputGroup.getValue()) {
					inputGroup.setValueState(sap.ui.core.ValueState.Error);
					isValid = false;
					message += 'Material Group, ';
				} else {
					inputGroup.setValueState(sap.ui.core.ValueState.None);
				}
				
			} else if (oGlobalDataModel.getProperty("/pddppPlantVisible") === "X") {
				if (!inputStorage.getValue()) {
					inputStorage.setValueState(sap.ui.core.ValueState.Error);
					isValid = false;
					message += 'Storage Location, ';
				} else {
					inputStorage.setValueState(sap.ui.core.ValueState.None);
				}
			}

			if (!isValid) {
				// Remove the last comma and space from the message
				message = message.slice(0, -2);
				sap.m.MessageBox.warning("Please fill up the following fields: " + message);
				return false;
			}

			return true;
		},
		onComboBoxChange: function(oEvent) {
			var selText = oEvent.getParameter("selectedItem").getText();
			var selKey = oEvent.getParameter("selectedItem").getKey();

			//Get selected value without using event parameter
			// var selectedText = this.byId("box0").getSelectedItem().getText();
			// var selectedKey = this.byId("box0").getSelectedItem().getKey();

			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			if (oGlobalDataModel) {

				var oPlantCode = selKey.toUpperCase();
				var oMaterialDespcription = selText;
				oGlobalDataModel.setProperty("/plantCode", oPlantCode);
				oGlobalDataModel.setProperty("/MaterialDescription", oMaterialDespcription);

			}
		},
		onLiveChange: function(oEvent) {
			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			var oInput = oEvent.getSource();
			var sInputId = oInput.getId();
			var sInputValue = oInput.getValue();
			var sProperty;

			if (sInputId.endsWith("--inputPlant")) {
				sProperty = "/plantCode";
			} else if (sInputId.endsWith("--inputStorage")) {
				sProperty = "/storageLocationId";
			}

			// Update the global data model property
			if (sProperty) {
				// var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {
					oGlobalDataModel.setProperty(sProperty, sInputValue.toUpperCase());
					oGlobalDataModel.setProperty(sProperty, sInputValue.toUpperCase());
				}
			}

			oInput.setValueState(ValueState.Error);
			oInput.setValueStateText("This field cannot be empty");

		},
		handleValuePlant: function(oEvent) {
			// var that = this;
			// this._deptInputId = oEvent.getSource().getId();
			// // open fragment
			// if (!this.oOpenDialogDept) {
			// 	// this.oOpenDialogDept = sap.ui.xmlfragment("com.infocus.mtlGrp_stockDetails.Fragment.PlantCodeDescription", this);
			// 	this.oOpenDialogDept = sap.ui.xmlfragment("com.infocus.mtlGrp_stockDetails.Fragment.PlantCodeDescription2", this);
			// 	this.getView().addDependent(this.oOpenDialogDept);
			// }
			// // // this._addSelectAllButton(); // For Select All Button
			// this.oOpenDialogDept.open();

			var oView = this.getView();
			if (!oView.byId("idPlantCodeDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "com.infocus.mtlGrp_stockDetails.Fragment.PlantCodeDescription2",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog)
					oDialog.open();
				})
			} else {
				oView.byId("idPlantCodeDialog").open();
			}
		},
		handleValueGroup: function(oEvent) {
			var oView = this.getView();
			if (!oView.byId("idMetarialGroupDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "com.infocus.mtlGrp_stockDetails.Fragment.MaterialGroup",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog)
					oDialog.open();
				})
			} else {
				oView.byId("idMetarialGroupDialog").open();
			}
		},
		handleValueType: function(oEvent) {
			var oView = this.getView();
			if (!oView.byId("idMaterialTypeDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "com.infocus.mtlGrp_stockDetails.Fragment.MaterialType",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog)
					oDialog.open();
				})
			} else {
				oView.byId("idMaterialTypeDialog").open();
			}
		},
		handleValueStorage: function(oEvent) {
			var oView = this.getView();
			if (!oView.byId("idStorageLocDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "com.infocus.mtlGrp_stockDetails.Fragment.StorageLocation",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog)
					oDialog.open();
				})
			} else {
				oView.byId("idStorageLocDialog").open();
			}
		},
		onCloseDialog: function() {
			this.byId("idPlantCodeDialog").close();
		},
		onCloseDialogStorageLoc: function() {
			this.byId("idStorageLocDialog").close();
		},
		onCloseDialogGroup: function() {
			this.byId("idMetarialGroupDialog").close();
		},
		onCloseDialogType: function() {
			this.byId("idMaterialTypeDialog").close();
		},
		onSelectAllChange: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"); // CheckBox state
			var oList = this.byId("idPlantCodeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var aItems = oList.getItems(); // Get all list items

			// Select or Deselect all list items based on CheckBox state
			aItems.forEach(function(oItem) {
				oItem.setSelected(bSelected);
			});
		},
		onSelectAllChangeStorageLoc: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"); // CheckBox state
			var oList = this.byId("idPlantCodeListStorageLoc");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var aItems = oList.getItems(); // Get all list items

			// Select or Deselect all list items based on CheckBox state
			aItems.forEach(function(oItem) {
				oItem.setSelected(bSelected);
			});
		},
		onSelectAllChangeGroup: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"); // CheckBox state
			var oList = this.byId("idGroupList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var aItems = oList.getItems(); // Get all list items

			// Select or Deselect all list items based on CheckBox state
			aItems.forEach(function(oItem) {
				oItem.setSelected(bSelected);
			});
		},
		onSelectAllChangeType: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"); // CheckBox state
			var oList = this.byId("idMaterialTypeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var aItems = oList.getItems(); // Get all list items

			// Select or Deselect all list items based on CheckBox state
			aItems.forEach(function(oItem) {
				oItem.setSelected(bSelected);
			});
		},

		onSelectPlantCode: function() {
			var oList = this.byId("idPlantCodeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oSelectedItems = oList.getSelectedItems();
			if (oSelectedItems.length > 0) {
				var aSelectedPlants = [];
				var aSelectedPlantsDescr = [];
				var oInput = this.getView().byId("inputPlant"); // Ensure correct input field

				oSelectedItems.forEach(function(oItem) {
					var sPlant = oItem.getTitle();
					var sPlantDesc = oItem.getDescription();
					aSelectedPlants.push(sPlant);
					aSelectedPlantsDescr.push(sPlantDesc);
				});

				// Update input field with selected values
				if (oInput) {
					oInput.setValue(aSelectedPlantsDescr.join(", "));
				}

				// Store in the global data model
				var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {
					oGlobalDataModel.setProperty("/plantCode", aSelectedPlants);
					oGlobalDataModel.setProperty("/MaterialDescription", aSelectedPlantsDescr);
				}
			}

			var oSearchField = this.byId("idSearchField"); // Remove Search Field
			oSearchField.setValue("");
			var oBinding = oList.getBinding("items");
			if (oBinding) {
				oBinding.filter([]); // Remove filters
			}

			oList.removeSelections(true); // Removes all List selections

			var oSelectAllCheckBox = this.byId("selectAllCheckBox");
			if (oSelectAllCheckBox) {
				oSelectAllCheckBox.setSelected(false);
			}

			// Close the dialog
			this.onCloseDialog();
		},
		onSelectPlantCodeStorageLoc: function() {
			var oList = this.byId("idPlantCodeListStorageLoc");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oSelectedItems = oList.getSelectedItems();
			if (oSelectedItems.length > 0) {
				var aSelectedStorageLocId = [];
				var aSelectedStorageLocDescr = [];
				var oInput = this.getView().byId("inputStorage"); // Ensure correct input field

				oSelectedItems.forEach(function(oItem) {
					var sStorageLocId = oItem.getTitle();
					var sStorageLocDescr = oItem.getDescription();
					aSelectedStorageLocId.push(sStorageLocId);
					aSelectedStorageLocDescr.push(sStorageLocDescr);
				});

				// Update input field with selected values
				if (oInput) {
					oInput.setValue(aSelectedStorageLocDescr.join(", "));
				}

				// Store in the global data model
				var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {
					oGlobalDataModel.setProperty("/storageLocationId", aSelectedStorageLocId);
					oGlobalDataModel.setProperty("/storageLocationDescription", aSelectedStorageLocDescr);
				}
			}

			var oSearchField = this.byId("idSearchFieldStorageLoc"); // Remove Search Field
			oSearchField.setValue("");
			var oBinding = oList.getBinding("items");
			if (oBinding) {
				oBinding.filter([]); // Remove filters
			}

			oList.removeSelections(true); // Removes all List selections

			var oSelectAllCheckBox = this.byId("selectAllCheckBoxStorageLoc");
			if (oSelectAllCheckBox) {
				oSelectAllCheckBox.setSelected(false);
			}

			// Close the dialog
			this.onCloseDialogStorageLoc();
		},
		onSelectGroup: function() {
			var oList = this.byId("idGroupList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oSelectedItems = oList.getSelectedItems();
			if (oSelectedItems.length > 0) {
				var aSelectedStorageLocId = [];
				var aSelectedStorageLocDescr = [];
				var oInput = this.getView().byId("inputGroup"); // Ensure correct input field

				oSelectedItems.forEach(function(oItem) {
					var sStorageLocId = oItem.getTitle();
					var sStorageLocDescr = oItem.getDescription();
					aSelectedStorageLocId.push(sStorageLocId);
					aSelectedStorageLocDescr.push(sStorageLocDescr);
				});

				// Update input field with selected values
				if (oInput) {
					oInput.setValue(aSelectedStorageLocDescr.join(", "));
				}

				// Store in the global data model
				var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {
					oGlobalDataModel.setProperty("/groupDataId", aSelectedStorageLocId);
					oGlobalDataModel.setProperty("/groupDataDescription", aSelectedStorageLocDescr);
				}
			}

			var oSearchField = this.byId("idSearchFieldGroup"); // Remove Search Field
			oSearchField.setValue("");
			var oBinding = oList.getBinding("items");
			if (oBinding) {
				oBinding.filter([]); // Remove filters
			}

			oList.removeSelections(true); // Removes all List selections

			var oSelectAllCheckBox = this.byId("selectAllCheckBoxGroup");
			if (oSelectAllCheckBox) {
				oSelectAllCheckBox.setSelected(false);
			}

			// Close the dialog
			this.onCloseDialogGroup();
		},
		onSelectType: function() {
			var oList = this.byId("idMaterialTypeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oSelectedItems = oList.getSelectedItems();
			if (oSelectedItems.length > 0) {
				var aSelectedStorageLocId = [];
				var aSelectedStorageLocDescr = [];
				var oInput = this.getView().byId("inputType"); // Ensure correct input field

				oSelectedItems.forEach(function(oItem) {
					var sStorageLocId = oItem.getTitle();
					var sStorageLocDescr = oItem.getDescription();
					aSelectedStorageLocId.push(sStorageLocId);
					aSelectedStorageLocDescr.push(sStorageLocDescr);
				});

				// Update input field with selected values
				if (oInput) {
					oInput.setValue(aSelectedStorageLocDescr.join(", "));
				}

				// Store in the global data model
				var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {
					oGlobalDataModel.setProperty("/typeDataId", aSelectedStorageLocId);
					oGlobalDataModel.setProperty("/typeDataDescription", aSelectedStorageLocDescr);
				}
			}

			var oSearchField = this.byId("idSearchFieldMaterialType"); // Remove Search Field
			oSearchField.setValue("");
			var oBinding = oList.getBinding("items");
			if (oBinding) {
				oBinding.filter([]); // Remove filters
			}

			oList.removeSelections(true); // Removes all List selections

			var oSelectAllCheckBox = this.byId("selectAllCheckBoxMaterialType");
			if (oSelectAllCheckBox) {
				oSelectAllCheckBox.setSelected(false);
			}

			// Close the dialog
			this.onCloseDialogType();
		},

		onSearchPlantCode: function(oEvent) {
			var sQuery = oEvent.getParameter("newValue"); // Get search input
			var oList = this.byId("idPlantCodeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oBinding = oList.getBinding("items"); // Get binding of the List
			if (!oBinding) {
				console.error("List binding not found!");
				return;
			}

			var aFilters = [];
			if (sQuery && sQuery.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilter2 = new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(new sap.ui.model.Filter({
					filters: [oFilter1, oFilter2],
					and: false // Match either Plant or Description
				}));
			}

			// Apply the filters to the list binding
			oBinding.filter(aFilters);
		},
		onSearchPlantCodeStorageLoc: function(oEvent) {
			var sQuery = oEvent.getParameter("newValue"); // Get search input
			var oList = this.byId("idPlantCodeListStorageLoc");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oBinding = oList.getBinding("items"); // Get binding of the List
			if (!oBinding) {
				console.error("List binding not found!");
				return;
			}

			var aFilters = [];
			if (sQuery && sQuery.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("lgort", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilter2 = new sap.ui.model.Filter("lgobe", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(new sap.ui.model.Filter({
					filters: [oFilter1, oFilter2],
					and: false // Match either Plant or Description
				}));
			}

			// Apply the filters to the list binding
			oBinding.filter(aFilters);
		},
		onSearchGroup: function(oEvent) {
			var sQuery = oEvent.getParameter("newValue"); // Get search input
			var oList = this.byId("idGroupList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oBinding = oList.getBinding("items"); // Get binding of the List
			if (!oBinding) {
				console.error("List binding not found!");
				return;
			}

			var aFilters = [];
			if (sQuery && sQuery.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("matkl", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilter2 = new sap.ui.model.Filter("wgbez", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(new sap.ui.model.Filter({
					filters: [oFilter1, oFilter2],
					and: false // Match either Plant or Description
				}));
			}

			// Apply the filters to the list binding
			oBinding.filter(aFilters);
		},
		onSearchType: function(oEvent) {
			var sQuery = oEvent.getParameter("newValue"); // Get search input
			var oList = this.byId("idMaterialTypeList");
			if (!oList) {
				console.error("List not found!");
				return;
			}

			var oBinding = oList.getBinding("items"); // Get binding of the List
			if (!oBinding) {
				console.error("List binding not found!");
				return;
			}

			var aFilters = [];
			if (sQuery && sQuery.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("mtart", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilter2 = new sap.ui.model.Filter("mtbez", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(new sap.ui.model.Filter({
					filters: [oFilter1, oFilter2],
					and: false // Match either Plant or Description
				}));
			}

			// Apply the filters to the list binding
			oBinding.filter(aFilters);
		},

		_handleValuePlantSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			// var oFilter = new Filter(
			// 	"Description",
			// 	FilterOperator.Contains, sValue
			// );
			// oEvent.getSource().getBinding("items").filter([oFilter]);

			// Create filters for both "Description" and "Plant"
			var oFilter1 = new Filter("Description", FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("Plant", FilterOperator.Contains, sValue);

			// Combine filters using OR
			var oCombinedFilter = new Filter({
				filters: [oFilter1, oFilter2],
				and: false // false = OR condition (either field can match)
			});

			oEvent.getSource().getBinding("items").filter([oCombinedFilter]);
		},
		_handleValuePlantClose: function(oEvent) {
			// var oSelectedItem = oEvent.getParameter("selectedItem");
			// if (oSelectedItem) {
			// 	var inputPlant = this.byId("inputPlant");
			// 	var newValue = oSelectedItem.getTitle();
			// 	var newDeptDescription = oSelectedItem.getDescription();
			// 	inputPlant.setValue(newDeptDescription);

			var oSelectedItems = oEvent.getParameter("selectedItems");
			if (oSelectedItems) {
				var aSelectedPlants = [];
				var aSelectedPlantsDescr = [],
					oInput = this.getView().byId("inputPlant"); // Ensure you fetch the correct input field

				if (oSelectedItems && oSelectedItems.length > 0) {
					oSelectedItems.forEach(function(oItem) {
						var sPlant = oItem.getTitle();
						var sPlantDesc = oItem.getDescription();
						aSelectedPlants.push(sPlant);
						aSelectedPlantsDescr.push(sPlantDesc);
					});

					// Join selected plant values and update input field
					oInput.setValue(aSelectedPlantsDescr.join(", "));
				}

				// chk the blank input box validation
				// var inputPlant = this.byId("inputPlant");
				// if (newValue && newValue.trim()) {
				// 	inputPlant.setValueState(sap.ui.core.ValueState.None);
				// } else {
				// 	inputPlant.setValueState(sap.ui.core.ValueState.Error);
				// }

				var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
				if (oGlobalDataModel) {

					// var oPlantCode = newValue.toUpperCase();
					// var oMaterialDespcription = newDeptDescription;
					// var oTableTitle = oMaterialDespcription + " (" + oPlantCode + ")";

					// oGlobalDataModel.setProperty("/plantCode", oPlantCode);
					// oGlobalDataModel.setProperty("/MaterialDescription", oMaterialDespcription);

					oGlobalDataModel.setProperty("/plantCode", aSelectedPlants);
					var inputValues = this.byId("inputPlant").getValue();
					var MaterialDescArray = inputValues.split(", ");
					oGlobalDataModel.setProperty("/MaterialDescription", MaterialDescArray);

				}
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onTabularToChartChanged: function(oEvent) {
			var oSwitch = oEvent.getSource();
			var sId = oSwitch.getId();
			var aSwitches = [
				/*this.byId("splitViewSwitch"),*/
				this.byId("tabularDataSwitch"),
				this.byId("chartDataSwitch")
			]; // Array of all switches

			// SplitterLayoutData elements
			var oSplitterLayoutData1 = this.byId("splitterLayoutData1");
			var oSplitterLayoutData2 = this.byId("splitterLayoutData2");
			var oSplitterLayoutData3 = this.byId("splitterLayoutData3");
			var oSplitterLayoutData4 = this.byId("splitterLayoutData4");

			var oSplitter = this.byId("splitter");

			// which switch was toggled and get the corresponding text
			var sText;
			/*if (sId === this.byId("splitViewSwitch").getId()) {
				sText = "Split View";
			} else */
			if (sId === this.byId("tabularDataSwitch").getId()) {
				sText = "Tabular Data";
			} else if (sId === this.byId("chartDataSwitch").getId()) {
				sText = "Chart Data";
			} else {
				sText = "";
			}

			// If a valid switch was toggled
			if (sText) {
				// Turn off other switches and update SplitterLayoutData sizes
				aSwitches.forEach(function(s) {
					if (s.getId() !== sId) {
						s.setState(false);
					}
				});

				// Perform actions based on the text value of the toggled switch
				switch (sText) {
					case "Split View":
						if (oSplitter.getVisible() === true) {
							oSplitterLayoutData1.setSize("50%");
							oSplitterLayoutData2.setSize("50%");
						} else {
							oSplitterLayoutData3.setSize("50%");
							oSplitterLayoutData4.setSize("50%");
						}

						break;
					case "Tabular Data":
						if (oSplitter.getVisible() === true) {
							oSplitterLayoutData1.setSize("100%");
							oSplitterLayoutData2.setSize("0%");
						} else {
							oSplitterLayoutData3.setSize("100%");
							oSplitterLayoutData4.setSize("0%");
						}

						// pdf btn
						// this.byId("downloadPdfBtn").setEnabled(true);
						break;
					case "Chart Data":
						if (oSplitter.getVisible() === true) {
							oSplitterLayoutData1.setSize("0%");
							oSplitterLayoutData2.setSize("100%");
						} else {
							oSplitterLayoutData3.setSize("0%");
							oSplitterLayoutData4.setSize("100%");
						}

						// pdf btn
						// this.byId("downloadPdfBtn").setEnabled(false);
						break;
					default:
						break;
				}
			}
		},
		toCroreOdata: function(oData) {
			var aData = oData.map(function(data) {
				return {
					plant: data.plant,
					materialGroup: data.materialGroup,
					materialGroupDesc: data.materialGroupDesc,
					materialTypeDesc: data.materialTypeDesc,
					totalStock: data.totalStock,
					totalValue: parseFloat((data.totalValue / 10000000).toFixed(2))
				};
			});
			return aData;
		},
		getListData: function() {
			if (!this._validateInputFields()) {
				// Validation failed, return without fetching data
				return;
			}
			var oGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			if (oGlobalData.allPlantVisible === "X") {
				this.getFetchedAllPlantOData();
			} else if (oGlobalData.pddppPlantVisible === "X") {
				this.getFtechedPDPPoData();
			}

		},
		getFetchedAllPlantOData: function() {
			this.byId("splitter").setVisible(true);
			this.byId("splitter2").setVisible(false);
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var oGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var pUrl = "/matlGrpStckSet";

			// var ipPlant = this.byId("inputPlant").getValue().toUpperCase();
			var PlantCode = new Filter('plant', FilterOperator.EQ, oGlobalData.plantCode);

			var aPlantID = oGlobalData.plantCode || [];
			var aGroupID = oGlobalData.groupDataId || [];
			var aTypeID = oGlobalData.typeDataId || [];

			// Convert Array to OData filter format
			// var sFilterQuery = "";
			// if (aPlantID.length > 0) {
			// 	sFilterQuery = aPlantID
			// 		.map(function(sLoc) {
			// 			return "plant eq '" + sLoc + "'";
			// 		})
			// 		.join(" or "); // Join conditions with 'or'
			// }
			// // var oFilterGroup = new Filter({
			// // 	filters: [profitCenFilter, cmpnyCode, fiscalYear, fromDate, toDate],
			// // 	and: true // AND condition
			// // });
			var aFilters = [];
			var aPlantFilters = aPlantID.map(function(plnt) {
				return new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, plnt)
			});

			aFilters.push(new sap.ui.model.Filter({
				filters: aPlantFilters,
				and: false
			}));

			var aGroupFilters = aGroupID.map(function(grp) {
				return new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, grp)
			})

			aFilters.push(new sap.ui.model.Filter({
				filters: aGroupFilters,
				and: false
			}));

			var aTypeFilters = aTypeID.map(function(type) {
				return new sap.ui.model.Filter("materialType", sap.ui.model.FilterOperator.EQ, type)
			})

			aFilters.push(new sap.ui.model.Filter({
				filters: aTypeFilters,
				and: false
			}));

			sap.ui.core.BusyIndicator.show();
			oModel.read(pUrl, {
				// urlParameters: {
				// 	// "sap-client": "300",
				// 	"$filter": sFilterQuery
				// },
				filters: aFilters,
				success: function(response) {
					var oData = response.results;
					console.log(oData);
					sap.ui.core.BusyIndicator.hide();

					var aStockCroreData = that.toCroreOdata(oData); // Convert value to in crore

					var modifiedStockData = aStockCroreData.map(function(item) {
						return {
							plant: item.plant,
							materialGroup: item.materialGroup,
							materialGroupDesc: item.materialGroupDesc,
							materialTypeDesc: item.materialTypeDesc,
							// totalStock: item.totalStock.replace(".", ","),
							totalStock: parseFloat(item.totalStock).toLocaleString("en-US", { // Add coma in Thousand Separators
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}),
							totalValue: item.totalValue
						};
					});

					var stockDataModel = that.getOwnerComponent().getModel("stockData");
					stockDataModel.setData(modifiedStockData);

					// that.byId("panelForm").setExpanded(false);
					// that.byId("chartDataSwitch").setState(true); // New Requirement To Load Chart View First
					// that.byId("tabularDataSwitch").setState(false);
					// For Chart Section
					// var aGraphData = aStockCroreData.map(function(item, index) {
					// 	return {
					// 		uniqueId: index, // Add unique identifier
					// 		plant: item.plant,
					// 		materialGroup: item.materialGroup,
					// 		// materialGroupDesc: item.materialGroupDesc,
					// 		materialGroupDescUnique: item.materialGroupDesc + " (" + index + ")",
					// 		totalStock: item.totalStock,
					// 		totalValue: item.totalValue
					// 	};
					// });
					// console.log(aGraphData);
					var chartDataModel = that.getOwnerComponent().getModel("chartData");
					chartDataModel.setData(aStockCroreData);

					var oGlobalData = that.getOwnerComponent().getModel("globalData").getData();
					// check in oData value is available or not 
					if (typeof oData !== 'undefined' && oData.length === 0) {

						// hide the busy indicator
						sap.ui.core.BusyIndicator.hide();
						sap.m.MessageBox.information('There are no data available!');

					}
					// Update global data model properties
					var oGlobalDataModel = that.getOwnerComponent().getModel("globalData");
					if (oGlobalDataModel) {

						var oPlantCode = oGlobalDataModel.getProperty("/plantCode");
						var oMaterialDespcription = oGlobalDataModel.getProperty("/MaterialDescription");
						// var oTableTitle = oMaterialDespcription + " (" + oPlantCode + ")";
						var oTableTitle = oMaterialDespcription;

						oGlobalDataModel.setProperty("/togglePanelVisibility", "X");
						oGlobalDataModel.setProperty("/tableTitle", oTableTitle);
					}
					that._toggleSwitches(true);
					that.loadGraph(aStockCroreData);
					that.byId("panelForm").setExpanded(false);
					/*this.byId("splitViewSwitch").setState(true);*/
					that.byId("chartDataSwitch").setState(true); // New Requirement To Load Chart View First
					that.byId("tabularDataSwitch").setState(false);

					// SplitterLayoutData elements
					var oSplitterLayoutData1 = that.byId("splitterLayoutData1");
					var oSplitterLayoutData2 = that.byId("splitterLayoutData2");
					// Update SplitterLayoutData sizes for split view
					oSplitterLayoutData1.setSize("0%");
					oSplitterLayoutData2.setSize("100%"); // New Requirement To Load Chart View First
					that.byId("clearData").setEnabled(true);
				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					that.byId("clearData").setEnabled(true);
					console.log(error);
					sap.m.MessageBox.warning("No Data Available!");

					var stockDataModel = that.getOwnerComponent().getModel("stockData");
					stockDataModel.setData({});
					// For Chart Section
					var chartDataModel = that.getOwnerComponent().getModel("chartData");
					chartDataModel.setData({});

					var oGlobalDataModel = that.getOwnerComponent().getModel("globalData");
					oGlobalDataModel.setProperty("/tableTitle", "");

					var errorObject = JSON.parse(error.responseText);
					// sap.m.MessageBox.warning(errorObject.error.message.value);
					console.log(errorObject.error.message.value);

				}
			});
		},
		getFtechedPDPPoData: function() {
			this.byId("splitter").setVisible(false);
			this.byId("splitter2").setVisible(true);
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			var oGlobalData = this.getOwnerComponent().getModel("globalData").getData();
			var pUrl = "/matlSlStckSet";

			// var ipPlant = this.byId("inputPlant").getValue().toUpperCase();
			var sStorageLocId = new Filter('storageLocation', FilterOperator.EQ, oGlobalData.storageLocationId);

			// Ensure Functional Locations exist
			var aStorageLocID = oGlobalData.storageLocationId || [];

			// Convert Array to OData filter format
			var sFilterQuery = "";
			if (aStorageLocID.length > 0) {
				sFilterQuery = aStorageLocID
					.map(function(sLoc) {
						return "storageLocation eq '" + sLoc + "'";
					})
					.join(" or "); // Join conditions with 'or'
			}

			sap.ui.core.BusyIndicator.show();
			oModel.read(pUrl, {
				urlParameters: {
					// "sap-client": "300",
					"$filter": sFilterQuery
				},
				// filters: [PlantCode],
				success: function(response) {
					var oData = response.results;
					console.log(oData);
					sap.ui.core.BusyIndicator.hide();

					var modifiedStockData = oData.map(function(item) {
						return {
							materialGroup: item.materialGroup,
							storageLocation: item.storageLocation,
							totalStock: parseFloat(item.totalStock).toLocaleString("en-US", { // Add coma in Thousand Separators
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						};
					});

					var storageLocFetchDataModel = that.getOwnerComponent().getModel("storageLocFetchData");
					storageLocFetchDataModel.setData(modifiedStockData);

					var modifiedStockData2 = oData.map(function(item) {
						return {
							materialGroup: item.materialGroup,
							storageLocation: item.storageLocation,
							totalStock: item.totalStock,
							storageLocIdMaterialGroup: (item.materialGroup + "(" + item.storageLocation + ")")
						};
					});
					var chartDataModel = that.getOwnerComponent().getModel("chartDataSL");
					chartDataModel.setData(modifiedStockData2);

					var oGlobalData = that.getOwnerComponent().getModel("globalData").getData();
					// check in oData value is available or not 
					if (typeof oData !== 'undefined' && oData.length === 0) {

						// hide the busy indicator
						sap.ui.core.BusyIndicator.hide();
						sap.m.MessageBox.information('There are no data available!');

					}
					// Update global data model properties
					var oGlobalDataModel = that.getOwnerComponent().getModel("globalData");
					if (oGlobalDataModel) {

						var oStorageLocationId = oGlobalDataModel.getProperty("/storageLocationId");
						var oStorageLocationDescription = oGlobalDataModel.getProperty("/storageLocationDescription");
						// var oTableTitle = oMaterialDespcription + " (" + oPlantCode + ")";
						var oTableTitle = oStorageLocationDescription;

						oGlobalDataModel.setProperty("/togglePanelVisibility", "X");
						oGlobalDataModel.setProperty("/tableTitle2", oTableTitle);
					}

					that.byId("panelForm").setExpanded(false);
					that._toggleSwitches(true);
					that.loadGraph2(modifiedStockData2);
					that.byId("panelForm").setExpanded(false);
					/*this.byId("splitViewSwitch").setState(true);*/
					that.byId("chartDataSwitch").setState(true); // New Requirement To Load Chart View First
					that.byId("tabularDataSwitch").setState(false);

					// SplitterLayoutData elements
					var oSplitterLayoutData3 = that.byId("splitterLayoutData3");
					var oSplitterLayoutData4 = that.byId("splitterLayoutData4");
					// Update SplitterLayoutData sizes for split view
					oSplitterLayoutData3.setSize("100%");
					oSplitterLayoutData4.setSize("0%");
					that.byId("clearData").setEnabled(true);
				},
				error: function(error) {
					sap.ui.core.BusyIndicator.hide();
					console.log(error);

					var errorObject = JSON.parse(error.responseText);
					sap.m.MessageBox.warning(errorObject.error.message.value);

				}
			});
		},
		_toggleSwitches: function(isEnabled) {
			/*var splitViewSwitch = this.byId("splitViewSwitch");*/
			var tabularDataSwitch = this.byId("tabularDataSwitch");
			var chartDataSwitch = this.byId("chartDataSwitch");

			/*splitViewSwitch.setEnabled(isEnabled);*/
			tabularDataSwitch.setEnabled(isEnabled);
			chartDataSwitch.setEnabled(isEnabled);
		},
		onSelectChartType: function(oEvent) {
			// // Get the selected radio button
			// var selectedIndex = oEvent.getParameter("selectedIndex");
			// var oVizFrame = this.byId("oVizFrame");
			// var oPieChartStock = this.byId("pieChartStock");
			// var oPieChartValue = this.byId("pieChartValue");

			// var chartType;

			// switch (selectedIndex) {
			// 	case 0:
			// 		chartType = "column";
			// 		break;
			// 	case 1:
			// 		chartType = "pie";
			// 		break;
			// 	case 2:
			// 		chartType = "line";
			// 		break;
			// 	case 3:
			// 		chartType = "donut";
			// 		break;
			// 	default:
			// 		chartType = "column";

			// }

			// // Update the vizType of the VizFrame
			// oVizFrame.setVizType(chartType);

			var selectedIndex = oEvent.getParameter("selectedIndex");
			var oVizFrame = this.byId("oVizFrame");
			var oColumnChartsContainer = this.byId("columnChartsContainer");
			var oPieChartsContainer = this.byId("pieChartsContainer");
			var oPieChartStock = this.byId("pieChartStock");
			var oPieChartValue = this.byId("pieChartValue");

			if (selectedIndex === 1) { // Pie Chart selected
				oVizFrame.setVisible(false);
				oColumnChartsContainer.setVisible(false);
				oPieChartsContainer.setVisible(true);
				oPieChartStock.setVisible(true);
				oPieChartValue.setVisible(true);
			} else {
				oVizFrame.setVisible(true);
				oVizFrame.setVizType("column");  // For two seperate column
				oColumnChartsContainer.setVisible(true);
				oPieChartsContainer.setVisible(false);
				oPieChartStock.setVisible(false);
				oPieChartValue.setVisible(false);
			}
		},
		onSelectChartTypeSL: function(oEvent) {
			var selectedIndex = oEvent.getParameter("selectedIndex");
			var oVizFrame = this.byId("oVizFrameSL");
			var oColumnChartsContainer = this.byId("columnChartsContainerSL");
			var oPieChartsContainer = this.byId("pieChartsContainerSL");
			var oPieChartStock = this.byId("pieChartStockSL");

			if (selectedIndex === 1) { // Pie Chart selected
				oVizFrame.setVisible(false);
				oColumnChartsContainer.setVisible(false);
				oPieChartsContainer.setVisible(true);
				oPieChartStock.setVisible(true);
			} else {
				oVizFrame.setVisible(true);
				oVizFrame.setVizType("column");
				oColumnChartsContainer.setVisible(true);
				oPieChartsContainer.setVisible(false);
				oPieChartStock.setVisible(false);
			}
		},
		generateBrightColors: function(numColors) {
			var colors = [];
			var usedColors = new Set();
			var goldenRatio = 0.618033988749895; // Golden ratio conjugate
			var hue = Math.random(); // Start with a random hue

			for (var i = 0; i < numColors; i++) {
				hue += goldenRatio; // Distribute hues evenly
				hue %= 1; // Keep within 0-1 range
				var color = `hsl(${Math.round(hue * 360)}, 80%, 50%)`; // Adjusted for vibrancy

				if (!usedColors.has(color)) {
					usedColors.add(color);
					colors.push(color);
				}
			}

			return colors;
		},
		generateRandomColors: function(data) {
			// let colors = [];
			// let goldenRatio = 0.618033988749895;
			// let hue = Math.random(); // Random starting hue

			// for (let i = 0; i < numColors; i++) {
			// 	hue += goldenRatio; // Space hues evenly
			// 	hue %= 1;
			// 	colors.push(`hsl(${Math.round(hue * 360)}, 75%, 50%)`); // More vibrant
			// }

			// return colors;

			// const colorMap = {};
			// let uniqueKeys = [];
			// // Choose key format based on selected tab
			// uniqueKeys = [...new Set(data.map(item => item.storageLocIdMaterialGroup))];
			// // Generate HSL colors based on index
			// uniqueKeys.forEach((key, i) => {
			// 	const color = `hsl(${(i * 43) % 360}, 70%, 50%)`;
			// 	colorMap[key] = color;
			// });
			// return {
			// 	colorMap
			// };
			const colorMap = {};
			data.forEach((item, index) => {
				const colorKey = "colorKey_" + index; // Unique per row
				item._colorKey = colorKey; // Add to item
				const hue = Math.floor(Math.random() * 360);
				colorMap[colorKey] = `hsl(${hue}, 70%, 50%)`;
			});
			return {
				colorMap
			};
		},
		generateBrightColors: function(count) {
			const colors = [];
			while (colors.length < count) {
				const hue = Math.floor(Math.random() * 360);

				// Skip green hues (typically between 80–160)
				if (hue >= 80 && hue <= 160) {
					continue;
				}

				// HSL with high saturation and lightness for brightness
				const h = hue;
				const s = 100;
				const l = 50;

				const color = `hsl(${h}, ${s}%, ${l}%)`;
				colors.push(color);
			}
			return colors;
		},
		loadGraph: function(oData) {
			var oVizFrame = this.byId("oVizFrame");  // For two seperate column
			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			var otableTitle = oGlobalDataModel.getProperty("/tableTitle");
			var oChartDataModel = this.getOwnerComponent().getModel("chartData");
			var oChartDataModelData = oChartDataModel.getData(); // Get chart data

			oVizFrame.setVizProperties({
				title: {
					visible: true,
					text: otableTitle
				},
				// legend: {
				// 	title: {
				// 		visible: true
				// 	}
				// },
				categoryAxis: {

					// title: { visible: true, text: "Type / Group" },
					label: {
						angle: 0, // Ensures text is not angled
						visible: true,
						style: {
							fontSize: "10px",
							fontWeight: "bold" // applies to all labels
						}
					},
				},
				valueAxis: {
					title: {
						visible: true
					},
					scale: {
						type: "log"
					}
				},
				plotArea: {
					dataLabel: {
						visible: true,
						showTotal: true
							// formatString: "#,##0"
							// formatString: "#,##0.##"
					},
					// dataPointStyle: {
					// 	rules: colorRules // Apply dynamically generated colors
					// }
					categoryGap: 100,
					colorPalette: ['#00e600', '#0000b3'] // Green for IncomingBalance, Orange for OutgoingBalance
				},
				interaction: {
					// behaviorType: null // enables tooltip by default
					selectability: {
						mode: "multiple"
					}
				}
			});

			// For two seperate column
			// var uniqueItemsCount = oChartDataModelData.length;

			// var randomColors = this.generateBrightColors(uniqueItemsCount);

			// // Set random colors for Stock chart
			// this.byId("stockChart").setVizProperties({
			// 	title: {
			// 		visible: true,
			// 		text: otableTitle+"(Stock Distribution)"
			// 	},
			// 	// legend: {
			// 	// 	title: {
			// 	// 		visible: true
			// 	// 	}
			// 	// },
			// 	categoryAxis: {

			// 		// title: { visible: true, text: "Type / Group" },
			// 		label: {
			// 			angle: 0, // Ensures text is not angled
			// 			visible: true,
			// 			style: {
			// 				fontSize: "10px",
			// 				fontWeight: "bold" // applies to all labels
			// 			}
			// 		},
			// 	},
			// 	valueAxis: {
			// 		title: {
			// 			visible: true
			// 		},
			// 		scale: {
			// 			type: "log"
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataLabel: {
			// 			visible: true,
			// 			showTotal: true
			// 				// formatString: "#,##0"
			// 				// formatString: "#,##0.##"
			// 		},
			// 		// dataPointStyle: {
			// 		// 	rules: colorRules // Apply dynamically generated colors
			// 		// }
			// 		categoryGap: 100,
			// 		colorPalette: randomColors // Green for IncomingBalance, Orange for OutgoingBalance
			// 	},
			// 	interaction: {
			// 		// behaviorType: null // enables tooltip by default
			// 		selectability: {
			// 			mode: "multiple"
			// 		}
			// 	}
			// });

			// // Generate a new set for Value chart
			// const randomColors2 = this.generateBrightColors(uniqueItemsCount);
			// this.byId("valueChart").setVizProperties({
			// 	title: {
			// 		visible: true,
			// 		text: otableTitle+"(Value Distribution)"
			// 	},
			// 	// legend: {
			// 	// 	title: {
			// 	// 		visible: true
			// 	// 	}
			// 	// },
			// 	categoryAxis: {

			// 		// title: { visible: true, text: "Type / Group" },
			// 		label: {
			// 			angle: 0, // Ensures text is not angled
			// 			visible: true,
			// 			style: {
			// 				fontSize: "10px",
			// 				fontWeight: "bold" // applies to all labels
			// 			}
			// 		},
			// 	},
			// 	valueAxis: {
			// 		title: {
			// 			visible: true
			// 		},
			// 		scale: {
			// 			type: "log"
			// 		}
			// 	},
			// 	plotArea: {
			// 		dataLabel: {
			// 			visible: true,
			// 			showTotal: true
			// 				// formatString: "#,##0"
			// 				// formatString: "#,##0.##"
			// 		},
			// 		// dataPointStyle: {
			// 		// 	rules: colorRules // Apply dynamically generated colors
			// 		// }
			// 		categoryGap: 100,
			// 		colorPalette: randomColors2 // Green for IncomingBalance, Orange for OutgoingBalance
			// 	},
			// 	interaction: {
			// 		// behaviorType: null // enables tooltip by default
			// 		selectability: {
			// 			mode: "multiple"
			// 		}
			// 	}
			// });

			var oPieChartStock = this.byId("pieChartStock");
			oPieChartStock.setVizProperties({
				title: {
					visible: true,
					text: otableTitle + " (Stock Distribution)"

				},
				legend: {
					visible: true, // Ensure legend is shown
					position: "right", // Move legend to right side
					title: {
						visible: true
					}
				},
				plotArea: {
					dataLabel: {
						// distance: 0.3,
						// hideWhenOverlap:true,
						visible: false,
						showTotal: true,
						// type: "valuePercentage", // Display values as percentage
						automaticInOutside: true, // Allows automatic positioning
						labelPosition: "outside", // Move labels outside the pie chart
						outsideLabelAlignment: "smart",
						style: {
							fontSize: "10px", // Reduce font size to prevent overlap
							color: "#000"
						},
						// type: "callout", // Moves labels outside with connecting lines
						// formatString: ["#,##0.00"],
					}
				}
			});
			var oPieChartValue = this.byId("pieChartValue");
			oPieChartValue.setVizProperties({
				title: {
					visible: true,
					text: otableTitle + " (Value Distribution)"
				},
				legend: {
					visible: true, // Ensure legend is shown
					position: "right", // Move legend to right side
					title: {
						visible: true
					}
				},
				plotArea: {
					sizeFactor: 1,
					dataLabel: {
						visible: false,
						// hideWhenOverlap:true,
						showTotal: true,
						// type: "valuePercentage",   // For display text with percentage
						automaticInOutside: true,
						labelPosition: "outside",
						outsideLabelAlignment: "smart",
						style: {
							fontSize: "10px",
							color: "#000" // Ensure labels are readable
						},
						// formatString: ["#,##0.00"],
					}
				}
			});
		},
		generateColorMapByFiscalYearWise: function(data) {
			const colorMap = {};
			let uniqueKeys = [];

			uniqueKeys = [...new Set(data.map(item => item.storageLocIdMaterialGroup))];

			// Generate HSL colors based on index
			uniqueKeys.forEach((key, i) => {
				const color = `hsl(${(i * 43) % 360}, 70%, 50%)`;
				colorMap[key] = color;
			});

			return {
				colorMap
			};
		},
		loadGraph2: function(oData) {
			var oVizFrame = this.byId("oVizFrameSL");
			var oGlobalDataModel = this.getOwnerComponent().getModel("globalData");
			var otableTitle = oGlobalDataModel.getProperty("/tableTitle2");

			// var aColorPalette = [
			// 	"#FF1A1A", // vivid red
			// 	"#B200FF", // electric purple
			// 	"#FFD700", // ultra bright gold yellow
			// 	"#0099FF", // neon blue
			// 	"#5C7C99", // strong grey-blue
			// 	"#8A2BE2", // strong royal purple
			// 	"#FF3333", // bold red
			// 	"#0066FF", // deep blue
			// 	"#FFA500" // bright orange
			// ];

			var {
				colorMap
			} = this.generateColorMapByFiscalYearWise(oData);

			var rules = [];

			// if (oSelectedTabText === "Quarterly Wise Turnover") {
			rules = oData.map(item => ({
				dataContext: {
					"Material Group Description": item.storageLocIdMaterialGroup
				},
				displayName: item.storageLocIdMaterialGroup,
				properties: {
					color: colorMap[item.storageLocIdMaterialGroup]
				}
			}));

			oVizFrame.setVizProperties({
				title: {
					visible: true,
					text: otableTitle
				},
				plotArea: {
					dataPointStyle: {
						rules
					},
					dataLabel: {
						visible: true
					},
					drawingEffect: "glossy"
				},
				tooltip: {
					visible: true
				},
				interaction: {
					selectability: {
						mode: "multiple"
					}
				},
				categoryAxis: {
					title: {
						visible: true
					},
					label: {
						angle: 0, // Ensures text is not angled
						visible: true,
						style: {
							fontSize: "9px"
						}
					}
				}
				// legend: {
				// 	title: {
				// 		visible: true
				// 	}
				// },
				// categoryAxis: {
				// 	title: {
				// 		visible: true
				// 	},
				// 	label: {
				// 		angle: 0, // Ensures text is not angled
				// 		visible: true,
				// 		style: {
				// 			fontSize: "9px"
				// 		}
				// 	}
				// },
				// valueAxis: {
				// 	title: {
				// 		visible: true
				// 	}
				// },
				// plotArea: {
				// 	dataLabel: {
				// 		visible: true,
				// 		showTotal: true
				// 	},
				// 	drawingEffect: "glossy",
				// 	colorPalette: aColorPalette,
				// 	gap: {
				// 		groupSpacing: 0.1, // space between category groups (lower value = less gap)
				// 		barSpacing: 0.05 // space between bars within a group
				// 	}
				// }
			});
			var oPieChartStock = this.byId("pieChartStockSL");
			oPieChartStock.setVizProperties({
				title: {
					visible: true,
					text: otableTitle

				},
				legend: {
					visible: true, // Ensure legend is shown
					position: "right", // Move legend to right side
					title: {
						text: "Material Group Description",
						visible: "true"
					}
				},
				plotArea: {
					dataLabel: {
						// distance: 0.3,
						// hideWhenOverlap:true,
						visible: false,
						showTotal: true,
						// type: "valuePercentage", // Display values as percentage
						automaticInOutside: true, // Allows automatic positioning
						labelPosition: "outside", // Move labels outside the pie chart
						outsideLabelAlignment: "smart",
						style: {
							fontSize: "10px", // Reduce font size to prevent overlap
							color: "#000"
						}
						// type: "callout", // Moves labels outside with connecting lines
						// formatString: ["#,##0.00"],
					},
					dataPointStyle: {
						rules: rules
					},
					drawingEffect: "glossy",
				},
				tooltip: {
					visible: true
				},
				interaction: {
					selectability: {
						mode: "multiple"
					}
				}
			});
		},
		clearListData: function() {
			var that = this;
			sap.m.MessageBox.confirm(
				"Are you sure you want to clear data?", {
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							var stockDataModel = that.getOwnerComponent().getModel("stockData");
							stockDataModel.setData({});
							var storageLocFetchDataModel = that.getOwnerComponent().getModel("storageLocFetchData");
							storageLocFetchDataModel.setData({});

							that.byId("inputPlant").setValue("");
							that.byId("inputStorage").setValue("");
							that.byId("inputType").setValue("");
							that.byId("inputGroup").setValue("");
							// that.byId("box0").setValue("");

							var oGlobalDataModel = that.getOwnerComponent().getModel("globalData");
							oGlobalDataModel.setProperty("/tableTitle", "");
							oGlobalDataModel.setProperty("/tableTitle2", "");
							that.byId("clearData").setEnabled(false);

							var oChartDataModel = that.getOwnerComponent().getModel("chartData");
							oChartDataModel.setData({});
							var chartDataSLModel2 = that.getOwnerComponent().getModel("chartDataSL");
							chartDataSLModel2.setData({});

							if (oGlobalDataModel) {
								oGlobalDataModel.setProperty("/togglePanelVisibility", "X");
								oGlobalDataModel.setProperty("/allPlantVisible", "X");
								oGlobalDataModel.setProperty("/pddppPlantVisible", "");
							}

							// disbaled the switches
							that._toggleSwitches(false);

							// change the state of switches 
							/*that.byId("splitViewSwitch").setState(false);*/
							that.byId("tabularDataSwitch").setState(false);
							that.byId("chartDataSwitch").setState(false);
							that.byId("allPlantRadio").setSelected(true);

							// SplitterLayoutData elements
							var oSplitterLayoutData1 = that.byId("splitterLayoutData1");
							var oSplitterLayoutData2 = that.byId("splitterLayoutData2");
							oSplitterLayoutData1.setSize("0%");
							oSplitterLayoutData2.setSize("100%"); // New Requirement To Load Chart View First

							// var oRadioButtonGroup = that.byId("onSelectChartType"); // ID of your radio button group
							// if (oRadioButtonGroup) {
							// 	oRadioButtonGroup.setSelectedIndex(0); // Select the first column option by default
							// }

						}
					}
				}
			);
		}
	});
});