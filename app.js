/*
  Version: 1.0.0
  Author: Homero Cavazos
  Github: https://github.com/homerocavazos
  Instructions:
    - Start from the bottom of the file in the "init" function

  Example:
----------------------------------------------------
  Add the following to your page or a JS file
----------------------------------------------------
  const example_app = new app();

  example_app.init({

    debug: false, // will display console logs
    lang: 'en',

  })

 */

"use strict"

const app = (() => {
  function app() {
    const _ = this;

  _.state = {
    mobile: false
  }
  _.settings = {
    debug: false,
    greet: '** App LOADED! **'
    // Add opt settings
  }

} //app function

return app;
})()

// This will update the settings of the app
app.prototype.setOpts = function (opts) {
  let _ = this;
  if (typeof opts == "object")
    for (let key in opts) {
      if (opts.hasOwnProperty(key)) {
        _.settings[key] = opts[key]
      }
    }
  else return;
}//setOpts


app.prototype.onLoad = function () {
  let _ = this;
  if (_.settings.debug === true) {
    console.log(_.settings.greet);
  }
}

app.prototype.debounce = function (fn, time) {
  let timeout;
  return function () {
    const functionCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

app.prototype.isMobile = function () {

  let _ = this;
  // ONLOAD
  if (_.settings.debug === true) {
      console.log('-- isMobile Called');
  }
  if (window.innerWidth < 992) {
    _.state.mobile = true;
    document.body.classList.add("mobile");
    if (_.settings.debug === true) {
      console.log('mobile');
    }
  } else {
    _.state.mobile = false;
    document.body.classList.remove("mobile");
    if (_.settings.debug === true) {
      console.log('desktop');
    }
  }
  return _.state.mobile;
}//isMobile

app.prototype.isIE = function () {
  let _ = this;
  if (_.settings.debug === true) {
      console.log('-- isIE Called');
  }
  // ADD IE CLASS
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  let trident = ua.indexOf("Trident/");
  let edge = ua.indexOf("Edge/");
  if (msie > 0) {
    // IE 10 or older
    return true;
  } else if (trident > 0) {
    // IE 11
    document.body.classList.add("ie11");
    return true;
  } else if (edge > 0) {
    // Edge
    document.body.classList.add("edge");
    return true;
  }
  // other browser
  else {
    return false;
  }

}//isIE



// START HERE!
app.prototype.init = function (opts) {
  let _ = this;

  // This overrides default options
  _.setOpts(opts);

  _.onLoad();
  // Adds class to Body if IE
  _.isIE();

  window.addEventListener('resize',

    _.debounce((e) => {
      // Check and update if browser is mobile
      _.isMobile();
    }, 200)
  )

}//init