
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var brandEvent = {};	// @dataSource
	var deleteBrandButton = {};	// @button
	var saveBrandButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock
var brandEmptyStatus = true;
function deleteBrand(){
	sources.brand.removeCurrent();
}
function newBrand(){
	sources.brand.addNewElement();
	$$('brandNameInput').focus();
}
function saveBrand(){
	var binding = $(":focus").attr("data-binding");
	if(binding !== undefined){
		//pull the information out of an active input widget for the save
		var binding = binding.split(".");
		sources[binding[0]][binding[1]] = $$(document.activeElement.id).getValue();
	}
	sources.brand.save();
}
function duplicateBrand(){
	var newEntity = ds.Brand.newEntity();
	newEntity.name.setValue(sources.brand.name);
	newEntity.url.setValue(sources.brand.url);
	sources.brand.addEntity(newEntity);
}
function checkBrandEmpty(){
	if(sources.brand.length == 0 && brandEmptyStatus == false){
		$$("brandContainer").disable();
	} else if(sources.brand.length > 0 && brandEmptyStatus == true) {
		$$("brandContainer").enable();
	}
}
// eventHandlers// @lock

	brandEvent.onCollectionChange = function brandEvent_onCollectionChange (event)// @startlock
	{// @endlock
		checkBrandEmpty();
	};// @lock

	deleteBrandButton.click = function deleteBrandButton_click (event)// @startlock
	{// @endlock
		deleteBrand();
	};// @lock

	saveBrandButton.click = function saveBrandButton_click (event)// @startlock
	{// @endlock
		saveBrand();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		Mousetrap.bind("ctrl+n", newBrand, "keyup");
		Mousetrap.bind("ctrl+s", saveBrand);
		Mousetrap.bind("ctrl+c", duplicateBrand);
		Mousetrap.bind("ctrl+d", deleteBrand);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("brand", "onCollectionChange", brandEvent.onCollectionChange, "WAF");
	WAF.addListener("deleteBrandButton", "click", deleteBrandButton.click, "WAF");
	WAF.addListener("saveBrandButton", "click", saveBrandButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
