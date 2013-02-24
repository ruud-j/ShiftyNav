[ShiftyNav jQuery plugin](http://shiftynav.rjansen.name/)
=========

ShiftyNav is a jQuery plugin. It provides a unique set of animations for navigation on websites, inspired by Android apps and widgets screen. ShiftyNav is really easy to implement, similar to using jQuery UI Tabs.

Demo
----

Check out the demo: http://shiftynav.rjansen.name/demo.html

Requirements
------------

The only dependency of ShiftyNav is jQuery 1.4.0 or higher.

Supported browsers:
- Google Chrome 4+
- Mozilla Firefox 3.5+
- Safari 3.1+
- Opera 10.5+
- Internet Explorer 9+

Usage
-----

The usage of ShiftyNav is similar to jQuery UI Tabs, the only difference is that you need to wrap the content divs in an extra div.

```html
<div id="nav">
    <ul>
        <li><a href="#text-1">Text 1</a></li>
        <li><a href="#text-2">Text 2</a></li>
        <li><a href="#text-3">Text 3</a></li>
    </ul>
    <div>
        <div id="text-1">
            Some text
        </div>
        <div id="text-2">
            Some text
        </div>
        <div id="text-3">
            Some text
        </div>
    </div>
</div>
```

You can call ShiftyNav on the outer div like this.

```javascript
$(function() {
    $('div#nav').shiftynav();
});
```

Options
-------

There are several options you can specify when calling ShiftyNav.

```javascript
$('div#nav').shiftynav({
    'active': 0,      // Active page on load
    'duration': 400,  // Duration of animations in milliseconds
    'scaling': 75     // Scaling percentage on fade out animations
});
```
