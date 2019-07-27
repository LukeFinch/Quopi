var globalThis = this;
function __skpm_run (key, context) {
  globalThis.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Settings.js":
/*!*************************!*\
  !*** ./src/Settings.js ***!
  \*************************/
/*! exports provided: getApiToken, setApiToken, getCopyPrefix, setCopyPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApiToken", function() { return getApiToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setApiToken", function() { return setApiToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCopyPrefix", function() { return getCopyPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCopyPrefix", function() { return setCopyPrefix; });
var Dialog = __webpack_require__(/*! ./modules/Dialog */ "./src/modules/Dialog.js").dialog;

var ui = __webpack_require__(/*! ./modules/Dialog */ "./src/modules/Dialog.js").ui;

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

function getApiToken() {
  return Settings.settingForKey('ApiToken');
}
function setApiToken() {
  var dialog = new Dialog('Enter API Key', 'You will need to get one from https://app.goabstract.com/account/tokens', 300);
  var defaultUserInputString = Settings.settingForKey("APIKey") || "";
  var userInputStringView = ui.textField(defaultUserInputString);
  dialog.addView(userInputStringView, 300);
  var responseCode = dialog.run();

  if (responseCode == "1000") {
    //Save API token
    Settings.setSettingForKey("ApiToken", userInputStringView.stringValue());
  }
}
function getCopyPrefix() {
  return Settings.settingForKey('copyPrefix');
}
function setCopyPrefix() {
  var dialog = new Dialog('Enter Copy Prefix', 'This is the word writers put before there copy so we know which words to grab', 300);
  var defaultUserInputString = Settings.settingForKey("copyPrefix") || "<COPYCHANGE>";
  var userInputStringView = ui.textField(defaultUserInputString);
  dialog.addView(userInputStringView, 300);
  var responseCode = dialog.run();

  if (responseCode == "1000") {
    //Save Copy Prefix
    Settings.setSettingForKey("copyPrefix", userInputStringView.stringValue());
  }
}

/***/ }),

/***/ "./src/modules/Dialog.js":
/*!*******************************!*\
  !*** ./src/modules/Dialog.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Forked from https://github.com/Ashung/Automate-Sketch
var ui = {};
ui.width = 300;
/**
 * @param  {Array|Number} size Array [w], [w, h], [y, w, h], [x, y, w, h]
 * @return  {NSRect}
 */

ui.rect = function (size) {
  if (Array.isArray(size)) {
    if (size.length < 2) {
      return NSMakeRect(0, 0, size[0], 24);
    }

    if (size.length == 2) {
      return NSMakeRect(0, 0, size[0], size[1]);
    }

    if (size.length == 3) {
      return NSMakeRect(0, size[0], size[1], size[2]);
    }

    if (size.length > 3) {
      return NSMakeRect(size[0], size[1], size[2], size[3]);
    }
  } else if (parseInt(size)) {
    return NSMakeRect(0, 0, size, 24);
  } else {
    return NSMakeRect(0, 0, ui.width, 24);
  }
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.groupLabel = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 16]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text.toUpperCase());
  view.setFont(NSFont.boldSystemFontOfSize(12));
  view.setTextColor(NSColor.blackColor());
  view.setBezeled(false);
  view.setDrawsBackground(false);
  view.setEditable(false);
  view.setSelectable(false);
  return view;
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.textLabel = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 16]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text);
  view.setBezeled(false);
  view.setDrawsBackground(false);
  view.setEditable(false);
  view.setSelectable(false);
  return view;
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.textField = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text);
  return view;
};
/**
 * @param  {Number} defaultNumber
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.numberField = function (defaultNumber, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  var formatter = NSNumberFormatter.alloc().init().autorelease();
  view.setFormatter(formatter);
  view.setStringValue(defaultNumber);
  return view;
};
/**
 * @param  {Number} defaultNumber
 * @param  {Number} min Optional default is 0.
 * @param  {Number} max Optional default is 100.
 * @param  {Array|Number} size Optional
 * @return  {Object} { view: NSTextField, value: Number}
 */


ui.numberStepper = function (defaultNumber, min, max, size) {
  min = min || 0;
  max = max || 100;
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  var input = NSTextField.alloc().initWithFrame(this.rect([0, 0, 50, 24]));
  var formatter = NSNumberFormatter.alloc().init().autorelease();
  input.setStringValue(String(defaultNumber));
  input.setFormatter(formatter);
  var stepper = NSStepper.alloc().initWithFrame(NSMakeRect(52, 0, 16, 24));
  stepper.setMaxValue(max);
  stepper.setMinValue(min);
  stepper.setValueWraps(false);
  stepper.setAutorepeat(true);
  stepper.setIntegerValue(defaultNumber);
  stepper.setCOSJSTargetFunction(function (sender) {
    var value = sender.integerValue();
    input.setStringValue(String(value));
  });
  view.addSubview(input);
  view.addSubview(stepper);
  return {
    view: view,
    value: stepper.integerValue()
  };
};
/**
 * @param  {NSTextField} view
 * @param  {Boolean} bool
 */


ui.disableTextField = function (view, bool) {
  if (bool == false) {
    view.setEditable(true);
    view.setTextColor(NSColor.blackColor());
  } else {
    view.setEditable(false);
    view.setTextColor(NSColor.grayColor());
  }
};
/**
 * @param  {Boolean} status
 * @param  {String} title
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.checkBox = function (status, title, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setButtonType(NSSwitchButton);
  view.setTitle(title);

  if (status == true) {
    view.setState(NSOnState);
  } else {
    view.setState(NSOffState);
  }

  return view;
},
/**
 * @param  {Array} items [String]
 * @param  {Array|Number} size Optional
 * @return  {NSPopUpButton}
 */
ui.popupButton = function (items, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSPopUpButton.alloc().initWithFrame(frame);
  items.forEach(function (item) {
    view.addItemWithTitle("");
    view.lastItem().setTitle(item);
  });
  return view;
};
/**
 * @param  {Array} items [String]
 * @param  {NSView} view NSPopUpButton
 */

ui.setItems_forPopupButton = function (items, view) {
  view.removeAllItems();
  items.forEach(function (item) {
    view.addItemWithTitle("");
    view.lastItem().setTitle(item);
  });
};
/**
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.divider = function (size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 1]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setWantsLayer(true);
  view.layer().setBackgroundColor(CGColorCreateGenericRGB(0, 0, 0, 0.1));
  return view;
};
/**
 * @param  {Number} length Optional
 * @return  {NSView}
 */


ui.gap = function (length) {
  length = length || 1;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, ui.width, length * 8));
  return view;
};
/**
 * @param  {Array} subviews [NSView]
 * @param  {Array|Number} size Optional
 * @return  {NSScrollView}
 */


ui.scrollView = function (subviews, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, ui.width, size]);
  }

  var view = NSScrollView.alloc().initWithFrame(frame);
  view.setHasVerticalScroller(true);
  view.setBorderType(NSBezelBorder);
  var contentView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, frame.size.width, 100));
  contentView.setFlipped(true);
  var height = 0;
  subviews.forEach(function (subview) {
    subview.setFlipped(true);
    var currentFrame = subview.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 1;
    subview.setFrame(currentFrame);
    var divider = ui.divider([0, currentFrame.size.height - 1, frame.size.width, 1]);
    subview.addSubview(divider);
    contentView.setFrame(NSMakeRect(0, 0, frame.size.width, height));
    contentView.addSubview(subview);
  });
  view.setDocumentView(contentView);
  return view;
};
/**
 * @param  {NSScrollView} scrollView
 * @param  {Array} subviews [NSView]
 */


ui.scrollViewSetContent = function (scrollView, subviews) {
  var width = scrollView.bounds().size.width;
  var contentView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 100));
  contentView.setFlipped(true);
  var height = 0;
  subviews.forEach(function (subview) {
    var currentFrame = subview.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 1;
    subview.setFrame(currentFrame);
    contentView.setFrame(NSMakeRect(0, 0, width, height));
    contentView.addSubview(subview);
    var divider = ui.divider([0, height - 1, width, 1]);
    contentView.addSubview(divider);
  });
  scrollView.setDocumentView(contentView);
};
/**
 * @param  {Array|Number} size Optional
 * @param  {String} hexColor Optional default is #000000.
 * @return  {NSColorWell}
 */


ui.colorPicker = function (size, hexColor) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 40, 24]);
  }

  var view = NSColorWell.alloc().initWithFrame(frame);

  if (hexColor) {
    var r = parseInt(hexColor.substr(1, 2), 16) / 255;
    var g = parseInt(hexColor.substr(3, 2), 16) / 255;
    var b = parseInt(hexColor.substr(5, 2), 16) / 255;
    var color = NSColor.colorWithRed_green_blue_alpha(r, g, b, 1);
  } else {
    var color = NSColor.blackColor();
  }

  view.setColor(color);
  return view;
};
/**
 * @param  {NSImage} nsImage
 * @param  {Array|Number} size Optional
 * @return  {NSImageView}
 */


ui.image = function (nsImage, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 100, size || 100]);
  }

  var view = NSImageView.alloc().initWithFrame(frame);
  view.setImage(nsImage);
  view.setImageAlignment(NSImageAlignLeft);
  return view;
};
/**
 * @param  {NSImage} nsImage
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.imageButton = function (nsImage, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 100, size || 100]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setTitle("");
  view.setImage(nsImage);
  view.setAlternateImage(nsImage);
  view.setBordered(false);
  view.setButtonType(NSMomentaryChangeButton);
  view.setBezelStyle(nil);
  view.setImagePosition(NSImageLeft);
  view.setImageScaling(NSImageScaleProportionallyDown);
  return view;
};
/**
 * @param  {NSImage} text
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.button = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size, 24]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setBezelStyle(NSRoundedBezelStyle);
  view.setTitle(text);
  return view;
};
/**
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.view = function (size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, this.width, size || 100]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setFlipped(true);
  return view;
};
/**
 * @param  {String} color #[0-9A-F]{3,8}
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.circle = function (color, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 10, size || 10]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setWantsLayer(true);
  var nsColor = color ? MSImmutableColor.colorWithSVGString(color).NSColorWithColorSpace(nil) : NSColor.blackColor();
  view.setBackgroundColor(nsColor);
  view.layer().setCornerRadius(Math.min(frame.size.width, frame.size.height) / 2);
  return view;
};
/**
 * @param  {String} message
 * @param  {String} info
 * @param  {Number} width Optional default is 300.
 * @param  {Array} buttons Optional, array with 1..3 strings, default is ["OK", "Cancel"].
 */


function dialog(message, info, width, buttons) {
  this.views = [];
  this.message = message || "Message Text";
  this.info = info;
  this.width = width || 300;

  if (buttons instanceof Array && buttons.length > 0) {
    this.buttons = buttons;
  } else {
    this.buttons = ["OK", "Cancel"];
  }

  var alert = NSAlert.alloc().init();
  alert.setMessageText(this.message);

  if (this.info) {
    alert.setInformativeText(this.info);
  } // Icon


  var icon = NSImage.imageNamed("plugins");

  if (__command.pluginBundle() && __command.pluginBundle().alertIcon()) {
    icon = __command.pluginBundle().alertIcon();
  }

  alert.setIcon(icon);
  this.buttons.forEach(function (button) {
    alert.addButtonWithTitle(button);
  });
  this.self = alert;
}
/**
 * @param  {NSView} view
 */


dialog.prototype.addView = function (view) {
  this.views.push(view);
};
/**
 * @param  {String} text
 */


dialog.prototype.addLabel = function (text) {
  var view = ui.textLabel(text, this.width);
  this.views.push(view);
};
/**
 * @return  {Object} { responseCode: 1000 | 1001 | 1002, self: NSAlert }
 */


dialog.prototype.run = function () {
  var height = 0;
  var supView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, this.width, 1));
  supView.setFlipped(true);
  this.views.forEach(function (view) {
    var currentFrame = view.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 8;
    view.setFrame(currentFrame);
    supView.addSubview(view);
  });
  var viewFrame = supView.frame();
  viewFrame.size.height = height;
  supView.setFrame(viewFrame);
  this.self.setAccessoryView(supView);
  return this.self.runModal();
};

dialog.prototype.close = function () {
  NSApp.stopModal();
};

module.exports.dialog = dialog;
module.exports.ui = ui;

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else if (typeof exports[key] !== 'function') {
    throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
  } else {
    exports[key](context);
  }
}
globalThis['setApiToken'] = __skpm_run.bind(this, 'setApiToken');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['setCopyPrefix'] = __skpm_run.bind(this, 'setCopyPrefix')

//# sourceMappingURL=Settings.js.map