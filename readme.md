# Knockout infiniteScroll

It is a module for [Knockout](http://knockoutjs.com/) which allow you to attach an event handler to the element when this element
has been scrolled almost to its bottom, top or both. In most of the cases it will be used for infinite scrolling.

Based on https://github.com/jbaez/lrInfiniteScroll

## Attach an event handler

simply set as attribute a function accessible in the ViewModel

```html
<ul data-bind="infiniteScroll: myEventHandler">
</ul>
```

## Set inverse scroll direction

Set if scrolling from bottom to top so the event handler will be called when scrolled almost to the top.

```html
<ul data-bind="infiniteScroll: {handlerBottom: myEventHandler}">
</ul>
```

## Set scroll both directions

Set if scrolling from bottom to top so the event handler will be called when scrolled almost to the top.

```html
<ul data-bind="infiniteScroll: {handlerBottom: myBottomEventHandler, handlerTop: myTopEventHandler}">
</ul>
```

## Change the scroll threshold

By default the handler will be called when the user is scrolling *down* and only *50* pixels are remaining before reaching the end
of the element. You can overwrite the 50px by setting the attribute *scroll-threshold*

```html
<ul data-bind="infiniteScroll: myEventHandler, scroll-threshold: 200">
</ul>
```
## Change the time threshold

To reduce the amount of $digest loop, instead of calling the handler whenever a scroll down event is detected in the end zone. A time is started and if
no other event is detected within 400ms, then the handler is called. You can overwrite the time value by setting the *time-threshold* attribute.

```html
<ul data-bind="infiniteScroll: myEventHandler, scroll-threshold: 200, time-threshold: 600">
</ul>
```

## License

knockout infiniteScroll module is under MIT license:

> Copyright (C) 2016 Jaime Baez.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.