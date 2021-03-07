let storage = window.storage || chrome.storage; // Make sure we have a storage API.

function updateIcon(){
  storage.local.get(['isDisabled'],(result)=>{
  // Change the icon to match the state of the plugin.
      isPluginDisabled= result ? result.isDisabled : false;
      chrome.action.setIcon({ path: isPluginDisabled?"icon32_disabled.png":"icon32.png"  });
  });
}

storage.onChanged.addListener(
  function(changes, areaName) {
    // If isDisabled changed, update isPluginDisabled
    if(changes["isDisabled"]!==undefined && changes["isDisabled"].newValue!=changes["isDisabled"].oldValue) {
      console.log(`FL Wiki Redirector is now ${changes["isDisabled"].newValue?'disabled':'enabled'}`);
      if(changes["isDisabled"].newValue) {
        declarativeNetRequest.updateEnabledRulesets({"disableRulesetIds": ["fandom_rule"]});
      }
      else {
        declarativeNetRequest.updateEnabledRulesets({"enableRulesetIds": ["fandom_rule"]});
      }
      updateIcon();
    }
  }
);
