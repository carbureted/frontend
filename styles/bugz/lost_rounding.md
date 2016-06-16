I understand your reason for precaution but I personally really don't think we need a global override. Having set the value to `99.99%` gives the browser `0.01%` room for rounding numbers - eventually this will be a calculated `px` value.

This is fine if you don't work with scaled design. In this instance, we're using `rem` as unit and changing the `html font-size` to create a design that looks identical on tablets and desktops.
In the case of Edge and IE, `0.01%` is too little.

Let's say we have a 12 column grid. Each column is `99.99%` wide. There is potentially 12 places where the browser needs to calculate a `px` value for each width. We set the width to `99.99%` so that there is a `0.01%` stronger possibility for getting a total value at exactly 100% or below
.
We then have a gutter, lets say `20px`. It still doesn't change our rounding total because the gutter doesn't change the calculation.
But we're using a variable gutter, lets say `2rem`. There is now up to 12 + 11 calculations that together, within a window of `0.01%`, most be exactly `100%` or below.

By changing the value to `99.9%`, the browser has a `0.1%` window to get a `px` value that is actually below or equal to `100%`.

So you won't see the issue in simple cases. You need to have many units calculated by the browser, in a tight design, before you see an error.

Since we're changing all of `lost` widths to `99.9%`, everything will be harmonized to
the same `px` values. We're talking about a difference of ~`1px`.

Lets play with real numbers to illustrate. A `1200px` viewport, with a 12 column grid.
We insert 3 different blocks, `lost-column: 2/12`, `lost-column: 4/12` and `lost-offset: -2/12`, named 
`c2`, `c4` and `o2`. We set the gutter to `@lost gutter 3.4rem;`, which is 54.4px
(`1rem`== `16px`).

```html
<div class="c2"></div>
<div class="c4"></div>
<div class="c2"></div>
<div class="c2 o2"></div>
```

In Edge the numbers are:
```css
.c2 {
  width: 154.7px;
  margin-right: 54.4px;
}
.c4 {
  width: 363.8px;
  margin-right: 54.4px;
}
.o2 {
  width: 154.7px;
  margin-left: 209.14px; 
  margin-right: 0;
}
```

In total: `1200.24px`
**0.24px** too wide!

In Chrome the numbers are:
```css
.c2 {
  width: 154.641px;
  margin-right: 54.4px;
}
.c4 {
  width: 363.688px;
  margin-right: 54.4px;
}
.o2 {
  width: 154.641px;
  margin-left: 209.047px;
  margin-right: 0;
}
```

In total: `1199.858px`
**0.142px** below `100%`

If we then change `lost` to use `99.9%`, then Edge is fine.

In Edge the numbers are:
```css
.c2 {
  width: 154.52px;
  margin-right: 54.4px;
}
.c4 {
  width: 363.44px;
  margin-right: 54.4px;
}
.o2 {
  width: 154.52px;
  margin-left: 208.96px; 
  margin-right: 0;
}
```

In total: `1199.16px`
**0.84px** below `100%`. Yes!

In Chrome the numbers are:
```css
.c2 {
  width: 154.453px;
  margin-right: 54.4px;
}
.c4 {
  width: 363.328px;
  margin-right: 54.4px;
}
.o2 {
  width: 154.453px;
  margin-left: 208.859px;
  margin-right: 0;
}
```

In total: `1198.746px`
**1.254px** below `100%`



So lets add scaling to the mix and revert to `99.99%`. We set `html { font-size: 62.5%; }` which
change `1rem` to mean `10px` in a standard browser. We have set the font-size to be 62.5%
of `16px` and our gutter to be `3.4rem` of `62.5% * 16` == `3.4 * 10` == `34px`. 
The numbers from before is now a bit smaller.


In Edge the numbers are:
```css
.c2 {
  width: 171.68px;
  margin-right: 34px;
}
.c4 {
  width: 377.36px;
  margin-right: 34px;
}
.o2 {
  width: 171.68px;
  margin-left: 205.72px; 
  margin-right: 0;
}
```
In total: `1203.12px`
**3.12px** above `100%`!

In Chrome the numbers are:
```css
.c2 {
  width: 171.641px;
  margin-right: 34px;
}
.c4 {
  width: 377.281px;
  margin-right: 34px;
}
.o2 {
  width: 171.641px;
  margin-left: 205.641px;
  margin-right: 0;
}
```

In total: `1202.845px`
**2.845px** above `100%` - WAT! Turns out that chrome round to 13 decimal places,
so even though this should be way off - Chrome magically does the sensible thing and fit
child elements it their container.
> Ref: http://cruft.io/posts/percentage-calculations-in-ie/ 


Let's scale everything by changing the viewport to `700px` with `99.99%` as base width in
our calculations in `lost`. Now both gutter and widths will be re-calculated by the
browser when the viewport change size, because we set the `font-size`
on the `html` to `1vw` in a media query with `(max-width: 1000px)` so that
viewports bigger than `1000px` get `1rem` == `10px`, like before but viewports below will
get a scaled value where `1%` of the viewport in `1000px` == `10px`. In viewport width `700px`
== `7px` etc.
> Ref: https://www.w3.org/TR/css3-values/#viewport-relative-lengths

In Edge the numbers are:
```css
.c2 {
  width: 96.1px;
  margin-right: 24.7px;
}
.c4 {
  width: 216.89px;
  margin-right: 24.7px;
}
.o2 {
  width: 96.1x;
  margin-left: 120.82px; 
  margin-right: 0;
}
```

In total: `700.11px`
**0.11px** above `100%`.

In Chrome the numbers are:
```css
.c2 {
  width: 95.875px;
  margin-right: 24.922px;
}
.c4 {
  width: 216.688px;
  margin-right: 24.922px;
}
.o2 {
  width: 95.875px;
  margin-left: 120.797px;
  margin-right: 0;
}
```

In total: `699.876px`
**0.124px** below `100%`


If we apply this patch we'll get the following numbers:
```
Edge:			699.46px       0.54px below 100%
Chrome:		699.876px      0.124px below 100%
```

I think I have shown that:
1. The difference between `99.99%` and `99.9%` is less than `1px` in most cases.
2. You will notice the biggest change when dealing with huge sizes. Not small compact designs.
3. Chrome somehow gracefully handle sizes that breaks layout in Edge.
4. Since all grids made in `lost` will be harmonized
(e.i. all grids will proportional be the exact same as before this patch) there is little
to no risk of users noticing this. Sub-pixel rendering can affect thin lines but this patch
does not introduce such issue, as it is always the risk with a percentage design.
