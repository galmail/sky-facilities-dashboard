# Sky Facilities Dashboard
Sky would like to upgrade their internal systems for managing the onsite facilities, and you have been tasked with part of this upgrade.

## The Problem
Each day, a member of staff is dispatched once per hour to walk around the office building and take a temperature reading. Currently, the staff write this down on a piece of paper, and if they need to visualise this data, they create an ad hoc graph based on the timescales required. This is incredibly inefficient and time consuming.

## The Solution
The business would like to begin automating this process, and have obtained the following requirements from the business staff:
* The facilities staff would like to provide a JSON file whose temperature data can be exposed through an API.
* A dashboard should be created where a member of staff can choose to view temperature data between two specific times.
* The dashboard should plot a graph with the retrieved temperature data.
* Next to the graph should be a separate widget which will display the *maximum*, *minimum*, and *average* values from the currently displayed dataset.
* Hovering over the maximum or minimum values should highlight on the graph where that value is plotted.

## Technical Information
We don't expect you to spend more than a few hours on this exercise. If you run out of time, the below should be prioritised over having a complete feature set.
* Your code should be well architected and follow good design principles.
* Your code should be well tested, and you should be prepared to answer questions about how you would expand test coverage and/or test other parts of the stack.
* The frontend should be written in React and TypeScript.
* You do not need to worry about a database implementation, the JSON file `temperatures.json` is sufficient. However, you should be prepared to answer questions about how you would go about implementing a database solution.
* Don't worry too much about design.
