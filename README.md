# pragmasoft-angular-test

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Dependencies

Run `npm install` and `bower install`

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Description

Angular directive to wrap two connected dc.js charts, visualising data from the attached csv file.
First chart is a pie chart, every pie displaying sum of selected parameter (one of: markdown, revenues, margin) per category, in a selected date range.
Second chart is a time serie line chart, displaying value of sum of the same parameter of all selected categories along the y axis, and time along the x axis. 
"Brush" selection  allow to select a date range on the second chart, which  recalculate and redraw automatically first chart. 
In a same way, selection of specific categories by clicking on pie chart, recalculate second chart to sum up only selected categories. 
Dropdown allow to select one of parameters (markdown, revenues or margin) to be summed up and displayed on both charts.
"Reset all" link allow reset selection and filters on data.


