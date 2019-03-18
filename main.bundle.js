/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var body = document.getElementById('the-body'); // This file is in the entry point in your webpack config.

	var forecastBox = document.getElementById('forecast-box');
	var locationInput = document.getElementById('location');
	var currentTemp = document.getElementById('current-temp');
	var currentCity = document.getElementById('current-city');
	var currentSummary = document.getElementById('current-summary');
	var currentWeather = document.getElementById('current');
	var currentHumidity = document.getElementById('detail-humidity');
	var currentLongSummary = document.getElementById('detail-description');
	var dailyWeather = document.getElementById('daily');
	var dailyTable = document.getElementById('daily-table');
	var dailyDate = document.getElementById('daily-date');
	var dailyHigh = document.getElementById('daily-high');
	var dailyLow = document.getElementById('daily-low');
	var dailyPrecip = document.getElementById('daily-precip');
	var apiKey = 'irXCIrdQUUSKmAzH93mfOw==';
	var signupBox = document.getElementById('signup-box');
	var email = document.getElementById('email');
	var password1 = document.getElementById('password1');
	var password2 = document.getElementById('password2');
	var gif = document.getElementById('gif');
	var gifHeader = document.getElementById('gif-header');

	function makePrecip(number) {
	  var string = JSON.stringify(number);
	  var precip = parseFloat(string);
	  var chance = Math.floor(precip * 100);
	  return chance;
	};

	function getGif(location) {
	  var gif_url = 'https://sweaterweatherapi.herokuapp.com/api/v1/gifs?location=' + location + '&api_key=' + apiKey;

	  $.getJSON(gif_url, function (response) {
	    var gifUrl = response["data"]["attributes"]["images"][0]["url"];
	    gif.style.backgroundImage = 'url(' + gifUrl + ')';
	    gif.style.backgroundSize = "cover";
	    gif.style.backgroundRepeat = "no-repeat";
	    gif.style.position = "50% 50%";
	  });
	  event.preventDefault();
	};

	function getBackground(place) {
	  var photo_url = 'https://sweaterweatherapi.herokuapp.com/api/v1/backgrounds?location=' + place;

	  $.getJSON(photo_url, function (response) {
	    var photo = response["data"]["attributes"]["url"];
	    body.style.backgroundImage = 'url(' + photo + ')';
	    body.style.backgroundSize = "cover";
	    body.style.backgroundRepeat = "no-repeat";
	    body.style.position = "50% 50%";
	  });
	  event.preventDefault();
	};

	function getForecast(city) {
	  // var gifString = JSON.stringify(gifData["data"]["attributes"]["images"][0]["url"]);
	  var api_url = 'https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=' + city;

	  $.getJSON(api_url, function (response) {
	    currentWeather.style.display = 'block';
	    dailyWeather.style.display = 'block';
	    gif.style.display = 'block';
	    gifHeader.style.display = 'block';
	    currentCity.textContent = response["data"]["attributes"]["timezone"];
	    currentTemp.textContent = 'Temperature: ' + response["data"]["attributes"]["currently"]["temperature"] + ' degrees';
	    currentSummary.textContent = "Currently: " + response["data"]["attributes"]["currently"]["summary"];
	    currentHumidity.textContent = 'Humidity: ' + response["data"]["attributes"]["currently"]["humidity"];
	    currentLongSummary.textContent = "Details: " + response["data"]["attributes"]["daily"]["summary"];
	    var dailies = response["data"]["attributes"]["daily"]["data"];
	    var i;
	    for (i = 0; i < dailies.length; i++) {
	      var newTd1 = document.getElementById('day' + i);
	      var newTd2 = document.getElementById('high' + i);
	      var newTd3 = document.getElementById('low' + i);
	      var newTd4 = document.getElementById('precip' + i);
	      var newDate = new Date(dailies[i]["time"] * 1000);
	      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	      var displayDay = days[newDate.getDay()];
	      newTd1.textContent = displayDay;
	      newTd2.textContent = dailies[i]["temperatureHigh"];
	      newTd3.textContent = dailies[i]["temperatureLow"];
	      newTd4.textContent = makePrecip(dailies[i]["precipProbability"]) + "%";
	    };
	  });
	};

	function getLocation() {
	  var location = locationInput.value;
	  getGif(location);
	  getBackground(location);
	  getForecast(location);
	  event.preventDefault();
	};

	// function getRegistered(userEmail, pass1, pass2) {
	//   var login_url = `https://sweaterweatherapi.herokuapp.com/api/v1/users?email=${userEmail}&password=${pass1}&password_confirmation=${pass2}`;
	//   alert("hi");
	//   $.getJSON(login_url, function(response) {
	//     alert("hello");
	//     console.log(response);
	//   });
	//   event.preventDefault();
	// };

	// function register() {
	//   var e = email.value;
	//   var p1 = password1.value;
	//   var p2 = password.value;
	//   getRegistered(e, p1, p2);
	//   event.preventDefault();
	// };

	function hideForecast() {
	  forecastBox.style.display = 'none';
	};

	function showSignup() {
	  hideForecast();
	  signupBox.style.display = 'block';
	};

	$('#submit-forecast').click(getLocation);
	$('#signup').click(showSignup);
	// $('#submit-signup').click(register);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  width: 100%;\n  height: 100%;\n  background: #FBFFF1;\n  font-family: verdana;\n  color: #3C3744;\n  text-align: center;\n  font-size: 1.25em; }\n\ninput {\n  margin: 10px; }\n\ntable {\n  width: 90%;\n  margin-left: 5%; }\n\ntd {\n  padding: 5px; }\n\nh3 {\n  margin-bottom: 10px; }\n\n.title {\n  margin: 20px; }\n\na:hover {\n  background: #090C9B;\n  color: #FBFFF1;\n  border-radius: 5px; }\n\n#login, #signup {\n  margin: 10px;\n  padding: 5px; }\n\n.forecast {\n  margin: 10px; }\n\n#current, #detail, #daily {\n  display: none;\n  width: 90%;\n  margin-left: 5%; }\n\n#current {\n  text-align: left;\n  border-radius: 10px;\n  background: #B4C5E4;\n  height: 300px;\n  margin-bottom: 15px;\n  margin-top: 15px;\n  padding: 10px;\n  font-size: 1.3em;\n  margin-left: 5%;\n  margin-right: 5%; }\n\n#gif-header {\n  border-radius: 10px;\n  background: #B4C5E4;\n  display: none;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  padding: 10px;\n  font-size: 1.3em;\n  margin-left: 5%;\n  margin-right: 5%; }\n\n#gif {\n  display: none;\n  width: 90%;\n  border-radius: 10px;\n  height: 300px;\n  margin-left: 5%;\n  margin-bottom: 15px; }\n\n#daily {\n  background: #B4C5E4;\n  color: #3C3744;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  padding: 5px; }\n\n#current:hover, #daily:hover {\n  border: 2px solid #3D52D5;\n  border-radius: 10px; }\n\n#location {\n  width: 150px;\n  height: 30px;\n  font-size: 1em;\n  border: 1px solid #3D52D5;\n  border-radius: 5px; }\n\n#submit-forecast, #submit-signup {\n  padding: 5px;\n  font-size: 1em;\n  background: #FBFFF1;\n  color: #3C3744;\n  border: none; }\n\n#submit-forecast:hover, #submit-signup:hover {\n  background: #090C9B;\n  color: #FBFFF1;\n  border-radius: 5px; }\n\n#signup-box {\n  display: none;\n  margin-top: 20px; }\n\n#email, #password1, #password2 {\n  width: 175px;\n  height: 30px;\n  font-size: 1em;\n  border: 1px solid #3D52D5;\n  border-radius: 5px; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);