
var Dialog = require("./modules/Dialog").dialog;
var ui = require("./modules/Dialog").ui;

var Settings = require('sketch/settings')

export function getApiToken() {
  return Settings.settingForKey('ApiToken')
}

export function setApiToken() {

  var dialog = new Dialog(
    'Enter API Key',
    'You will need to get one from https://app.goabstract.com/account/tokens',
    300
  )

  var defaultUserInputString = Settings.settingForKey("APIKey") || "";
  var userInputStringView = ui.textField(defaultUserInputString);
  dialog.addView(userInputStringView, 300);

  var responseCode = dialog.run()
  if (responseCode == "1000") {
    //Save API token
    Settings.setSettingForKey("ApiToken", userInputStringView.stringValue());
  }
}

export function getCopyPrefix() {
  return Settings.settingForKey('copyPrefix')
}

export function setCopyPrefix() {
  var dialog = new Dialog(
    'Enter Copy Prefix',
    'This is the word writers put before there copy so we know which words to grab',
    300
  )
  var defaultUserInputString = Settings.settingForKey("copyPrefix") || "<COPYCHANGE>";
  var userInputStringView = ui.textField(defaultUserInputString);
  dialog.addView(userInputStringView, 300);

  var responseCode = dialog.run()
  if (responseCode == "1000") {
    //Save Copy Prefix
    Settings.setSettingForKey("copyPrefix", userInputStringView.stringValue());
  }
}
