"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var input_put = document.querySelector("#de_cri"),
    manipule_side_img = document.querySelector(".__result--no_msg"),
    manipule_side_form = document.querySelector(".__result--box-decrypy"),
    input_out = document.querySelector("#out"),
    save;
var dictAlura = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat'
};

var toggle_mode = function toggle_mode(element) {
  var show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (show) {
    element.classList.remove("_hidden");
    element.classList.add("_active");
  } else {
    element.classList.remove("_active");
    element.classList.add("_hidden");
  }
};

var reversePojo = function reversePojo(pojo) {
  return Object.keys(pojo).reduce(function (acum, key) {
    var value = pojo[key];
    acum[value] = key;
    return acum;
  }, {});
};

var rexifykeys = function rexifykeys(object) {
  var preRecified = Object.keys(object).join('|');
  return new RegExp(preRecified, "g");
};
/**
 * @param {string} text
 * @param {Record<string,string>} dict
 */


var replaceByDict = function replaceByDict(text, dict) {
  return text.replace(rexifykeys(dict), function (match) {
    return dict[match];
  });
};

function cipherLens() {
  var dict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dictAlura;
  var reversedDict = reversePojo(dict);
  return [function (text) {
    return replaceByDict(text, dict);
  }, function (text) {
    return replaceByDict(text, reversedDict);
  }];
}

var _cipherLens = cipherLens(),
    _cipherLens2 = _slicedToArray(_cipherLens, 2),
    cipher = _cipherLens2[0],
    decipher = _cipherLens2[1];

document.querySelectorAll(".btn-crypt").forEach(function (e) {
  e.onclick = function (u) {
    if (input_put.value !== "") {
      toggle_mode(manipule_side_img, false);
      toggle_mode(manipule_side_form); // input_out.value = input_put.value
    } else {
      toggle_mode(manipule_side_img);
      toggle_mode(manipule_side_form, false);
    }

    if (u.target.id === "crypt") {
      save = cipher(input_put.value);
    } else if (u.target.id === "decrypt") {
      save = decipher(input_put.value);
    } else if (u.target.id === "copy") {
      // input_out.select();
      // document.execCommand('copy');
      navigator.clipboard.writeText(input_out.value);
    }

    input_out.value = save;
  };
});