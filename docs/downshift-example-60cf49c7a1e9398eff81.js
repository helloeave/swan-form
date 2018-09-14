(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{353:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var downshift__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(395);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(354);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(385);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_tiny_virtual_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(390);\n/* harmony import */ var _fuzzy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(391);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_Downshift_scss__WEBPACK_IMPORTED_MODULE_9__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\n\n\n\nvar mfuzzy = lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default()(_fuzzy__WEBPACK_IMPORTED_MODULE_8__[/* default */ \"a\"]);\nvar items = [{\n  value: 'apple'\n}, {\n  value: 'pear'\n}, {\n  value: 'orange'\n}, {\n  value: 'grape'\n}, {\n  value: 'banana'\n}, 'kiwi'];\n\nvar Down = function Down() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    width: \"24\",\n    height: \"24\",\n    viewBox: \"0 0 24 24\",\n    fill: \"none\",\n    stroke: \"#000\",\n    strokeWidth: \"2\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"polyline\", {\n    points: \"6 9 12 15 18 9\"\n  }));\n};\n\nvar Clear = function Clear() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    viewBox: \"0 0 20 20\",\n    width: \"24\",\n    height: \"24\",\n    fill: \"none\",\n    stroke: \"black\",\n    strokeWidth: \"1\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n    d: \"M6,6 L13,13\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n    d: \"M13,6 L6,13\"\n  }));\n};\n\nvar normalizeOption = function normalizeOption(option) {\n  if (typeof option === 'string') {\n    return {\n      label: option,\n      value: option\n    };\n  }\n\n  if (typeof option === 'object') {\n    if (!Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* hasOwnProperty */ \"o\"])(option, 'label')) {\n      return _extends({}, option, {\n        label: option.value\n      });\n    }\n  }\n\n  return option;\n};\n\nvar normalizeOptions = function normalizeOptions(options) {\n  return options.map(normalizeOption);\n};\n\nvar getOptions = lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default()(normalizeOptions);\n\nvar getItem = function getItem(item, getItemProps, index, highlightedIndex, selectedItem) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", getItemProps({\n    key: item.original.value,\n    index: index,\n    item: item.original,\n    className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(highlightedIndex === index && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.highlighted, selectedItem === item && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.selected)\n  }), item.string);\n};\n\nvar mGetItem = lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default()(getItem);\n\nvar getButton = function getButton(_ref) {\n  var getToggleButtonProps = _ref.getToggleButtonProps,\n      isOpen = _ref.isOpen,\n      clearSelection = _ref.clearSelection,\n      selectedItem = _ref.selectedItem;\n  return selectedItem ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    type: \"button\",\n    onClick: clearSelection,\n    className: _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.toggleButton\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Clear, null)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", _extends({}, getToggleButtonProps(), {\n    className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(_Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.toggleButton, isOpen && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.isOpen)\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Down, null));\n};\n\nvar itemToString = function itemToString(item) {\n  return item && item.value ? item.value : '';\n};\n\nvar loftValue = function loftValue(fn) {\n  return function (item) {\n    return item && item.value ? fn(item.value) : fn(item);\n  };\n};\n\nvar states = ['AK', 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];\nvar fuzzyOpts = {\n  extract: function extract(item) {\n    return item.value;\n  }\n};\n\nfunction advancedFilter(theItems, value) {\n  return value ? Object(_fuzzy__WEBPACK_IMPORTED_MODULE_8__[/* default */ \"a\"])(value, theItems, fuzzyOpts) : theItems;\n}\n\nvar SelectDownshift =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inheritsLoose(SelectDownshift, _React$Component);\n\n  function SelectDownshift(props) {\n    var _this;\n\n    _this = _React$Component.call(this, props) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleStateChange\", function (changes) {\n      if (changes.hasOwnProperty('inputValue')) {\n        var inputValue = changes.inputValue;\n\n        var _items = advancedFilter(_this.props.options, inputValue);\n\n        _this.setState({\n          inputValue: inputValue,\n          items: _items\n        });\n      }\n    });\n\n    _this.state = {\n      items: props.options\n    };\n    return _this;\n  }\n\n  var _proto = SelectDownshift.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        label = _this$props.label,\n        errors = _this$props.errors,\n        setValue = _this$props.setValue,\n        value = _this$props.value,\n        icon = _this$props.icon,\n        filter = _this$props.filter,\n        _this$props$style = _this$props.style,\n        style = _this$props$style === void 0 ? {} : _this$props$style;\n    var items = this.state.items;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(downshift__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"], {\n      onChange: loftValue(setValue),\n      defaultInputValue: value,\n      defaultSelectedItem: value && {\n        value: value\n      },\n      itemToString: itemToString,\n      onStateChange: this.handleStateChange\n    }, function (_ref2) {\n      var getInputProps = _ref2.getInputProps,\n          getItemProps = _ref2.getItemProps,\n          getLabelProps = _ref2.getLabelProps,\n          getMenuProps = _ref2.getMenuProps,\n          isOpen = _ref2.isOpen,\n          inputValue = _ref2.inputValue,\n          highlightedIndex = _ref2.highlightedIndex,\n          selectedItem = _ref2.selectedItem,\n          getToggleButtonProps = _ref2.getToggleButtonProps,\n          clearSelection = _ref2.clearSelection;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.container,\n        style: style\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", getLabelProps(), label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", _extends({}, getInputProps(), {\n        style: {\n          width: '100%'\n        }\n      })), getButton({\n        selectedItem: selectedItem,\n        isOpen: isOpen,\n        getToggleButtonProps: getToggleButtonProps,\n        clearSelection: clearSelection\n      }), isOpen && items.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tiny_virtual_list__WEBPACK_IMPORTED_MODULE_7__[/* default */ \"a\"], {\n        width: \"calc(100% + 2rem)\",\n        scrollToIndex: highlightedIndex || 0,\n        scrollToAlignment: \"auto\",\n        height: 20 + lodash_clamp__WEBPACK_IMPORTED_MODULE_6___default()(items.length, 0, 4) * 40,\n        itemCount: items.length,\n        itemSize: 40,\n        className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(_Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.dropdown, isOpen && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.isOpen),\n        renderItem: function renderItem(_ref3) {\n          var index = _ref3.index,\n              style = _ref3.style;\n          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", _extends({\n            key: items[index].original ? items[index].original.value : items[index].value,\n            className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(_Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.item, highlightedIndex === index && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.highlighted, selectedItem === (items[index].original || items[index]) && _Downshift_scss__WEBPACK_IMPORTED_MODULE_9___default.a.selected)\n          }, getItemProps({\n            item: items[index].original || items[index],\n            index: index,\n            style: style\n          })), items[index].original ? items[index].string : items[index].label);\n        }\n      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"sf--errors\"\n      }, errors.map(function (error) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          key: error,\n          className: \"sf-error\"\n        }, error);\n      })));\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"pre\", null, \"Value: \", JSON.stringify(value, null, 2)));\n  };\n\n  return SelectDownshift;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar Select = Object(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* asField */ \"e\"])(SelectDownshift);\nvar random = ['grizzled heptad orchis', 'dickens fizgig corgi', 'laborer comedian esurient', 'clearing boatyard vim', 'mukluk champac cowbind', 'pear furlough knack', 'bedstead gasper sacker', 'tympany patch economy', 'masseter pruritus fluky', 'baa purify brad', 'embow invite monodic', 'herein wiener stricken', 'localism lens mordancy', 'attain maidenly it', 'dippy frown panda', 'micelle adenoma canikin', 'danseuse jot raddled', 'vinyl untruth guano', 'fathom leafage deer', 'violable earplug seeing', 'cud octuple hobnail', 'forth grained headship', 'pothole spur belong', 'sapless shove lens', 'spire nuptial razor', 'ulema dago kelly', 'lactate ham aglimmer', 'uncut abound composer', 'wards enervate outwards', 'amoretto flunk bluebird', 'tigerish sorn gumbotil', 'turbojet kermes tamarisk', 'gluteus touch scrub', 'kickoff deferral accuracy', 'sparker dilly casemate', 'cowl pewee apiary', 'gunlock bushman comrade', 'beatific hesitate scalade', 'wanting opossum squall', 'murphy pyknic venture', 'causeway netter camomile', 'willing bay ream', 'boxcar planking mudstone', 'disdain emirate boogie', 'keyboard velocity trestle', 'whorish fewer marish', 'monkey wrote jackeroo', 'custos valiancy dobby', 'thorns woollen yoghurt', 'joke wheezy reindeer', 'sanctity fount curiosa', 'plectrum viable violable', 'beggary ibex lode', 'easiness requital abducens', 'disagree vetiver hereto', 'incident ant lacteal', 'sybarite tombolo semen', 'wrinkly tushy immunity', 'poised blocking pentyl', 'jota atomizer ebon', 'shote denote gumbo', 'mean dermoid vivisect', 'shoon manners shiksa', 'dyestuff unhandy sanguine', 'sleety aye gauge', 'camber jotter hallmark', 'drill midmost knack', 'boomkin dogfight titty', 'defrost pled lecture', 'could swollen gunfire', 'tailwind shalloon unpaged', 'hunch academy calendar', 'yabber learned vas', 'salad drivel mote', 'currant hull suspend', 'siding renin warn', 'mustard liqueur white', 'leaf negatron epidote', 'confuse askew ovular', 'porter hassle decurion', 'kishke blotter messy', 'roofer mightily fee', 'misdo embower oilskin', 'ternate planula sanctum', 'peacock bullpen feather', 'rotator whiskers knowing', 'rustler cakewalk striate', 'postfix grain lochia', 'larch aspirant quality', 'praxis grew cry', 'aspen fusspot motel', 'starry dammar checkup', 'washing geode rococo', 'decided mood evolve', 'epos earache woofer', 'punnet dumpish embassy', 'illiquid aloe tittup', 'torture nurture inurbane', 'jarvey fallout varnish', 'oriel diner memento'];\n\nvar DownshiftExample =\n/*#__PURE__*/\nfunction (_PureComponent) {\n  _inheritsLoose(DownshiftExample, _PureComponent);\n\n  function DownshiftExample() {\n    return _PureComponent.apply(this, arguments) || this;\n  }\n\n  var _proto2 = DownshiftExample.prototype;\n\n  _proto2.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {\n      options: normalizeOptions(items),\n      label: \"Please enter a fruit\",\n      value: \"kiwi\"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {\n      options: normalizeOptions(states),\n      label: \"Please enter a state\",\n      value: \"NY\"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {\n      options: normalizeOptions(random),\n      label: \"Random things\",\n      style: {\n        width: '20rem'\n      }\n    }));\n  };\n\n  return DownshiftExample;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__[\"hot\"])(module)(DownshiftExample));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(35)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/Downshift.js?")},391:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* unused harmony export filter */\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Downshift_scss__WEBPACK_IMPORTED_MODULE_1__);\n// adapted from https://github.com/mattyork/fuzzy\n\n\n\nvar Span = function Span(_ref) {\n  var children = _ref.children;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: _Downshift_scss__WEBPACK_IMPORTED_MODULE_1___default.a.match\n  }, children);\n}; // If `pattern` matches `str`, wrap each matching character in `opts.pre` and `opts.post`. If no match, return null\n\n\nvar match = function match(_pattern, _str, opts) {\n  if (opts === void 0) {\n    opts = {};\n  }\n\n  var patternIdx = 0;\n  var result = [];\n  var len = _str.length;\n  var totalScore = 0;\n  var currScore = 0;\n\n  var str = _str.toLowerCase();\n\n  var pattern = _pattern.toLowerCase();\n\n  var ch; // For each character in the string, either add it to the result\n  // or wrap in template if it's the next string in the pattern\n\n  for (var idx = 0; idx < len; idx++) {\n    ch = _str[idx];\n\n    if (str[idx] === pattern[patternIdx]) {\n      // ch = '<span>' + ch + '</span>';\n      ch = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Span, {\n        key: idx\n      }, ch);\n      patternIdx += 1; // consecutive characters should increase the score more than linearly\n\n      currScore += 1 + currScore;\n    } else {\n      currScore = 0;\n    }\n\n    totalScore += currScore;\n    result[result.length] = ch;\n  } // return rendered string if we have a match for every char\n\n\n  if (patternIdx === pattern.length) {\n    // if the string is an exact match with pattern, totalScore should be maxed\n    // totalScore = str === pattern ? Infinity : totalScore;\n    if (str === pattern) {\n      return {\n        rendered: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Span, null, _str),\n        score: Infinity\n      };\n    }\n\n    return {\n      rendered: result,\n      score: totalScore\n    };\n  }\n\n  return null;\n}; // const test = (pattern, str) => match(pattern, str) !== null;\n// // Return all elements of `array` that have a fuzzy match against `pattern`.\n// const simpleFilter = (pattern, array) => array.filter(str => test(pattern, str));\n// The normal entry point. Filters `arr` for matches against `pattern`.\n// It returns an array with matching values of the type:\n//\n//     [{\n//         string:   '<b>lah' // The rendered string\n//       , index:    2        // The index of the element in `arr`\n//       , original: 'blah'   // The original element in `arr`\n//     }]\n//\n// `opts` is an optional argument bag. Details:\n//\n//    opts = {\n//        // string to put before a matching character\n//        pre:     '<b>'\n//\n//        // string to put after matching character\n//      , post:    '</b>'\n//\n//        // Optional function. Input is an entry in the given arr`,\n//        // output should be the string to test `pattern` against.\n//        // In this example, if `arr = [{crying: 'koala'}]` we would return\n//        // 'koala'.\n//      , extract: function(arg) { return arg.crying; }\n//    }\n\n\nvar filter = function filter(pattern, arr, opts) {\n  if (opts === void 0) {\n    opts = {};\n  }\n\n  if (!arr || arr.length === 0) {\n    return [];\n  }\n\n  if (typeof pattern !== 'string') {\n    return arr;\n  }\n  /* eslint-disable no-param-reassign */\n\n\n  return arr.reduce(function (prev, element, index) {\n    var str = opts.extract ? opts.extract(element) : element;\n    var rendered = match(pattern, str, opts);\n\n    if (rendered !== null) {\n      prev[prev.length] = {\n        string: rendered.rendered,\n        score: rendered.score,\n        index: index,\n        original: element\n      };\n    }\n\n    return prev;\n  }, []).sort(function (a, b) {\n    var compare = b.score - a.score;\n    return compare || a.index - b.index;\n  });\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (filter);\n\n//# sourceURL=webpack:///./src/components/pages/fuzzy.js?")}}]);