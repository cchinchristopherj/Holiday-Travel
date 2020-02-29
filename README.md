737 Max Grounding Affects Holiday Travel
=========================

The grounding of the 737 Max 

Click [here](https://cchinchristopherj.github.io/Candidates-2020/) to access the final scroller
=========================

Visualization
-------------------------

The screenshot below is of the interactive dashboard developed to visualize the year-over-year decrease in seat capacity for July 4 2019 and projected decrease in seat capacity for Thanksgiving 2019 due to the 737 Max Grounding.

The dashboard has three main components: 
1. A **control panel** allowing the user to filter the data displayed
2. A **map** displaying routes that experienced a decrease in seat capacity from 2018 to 2019
3. A **chart** visualizing the percent decreases in seat capacity for routes in the map. (The chart's legend is located in the center).

![main](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/main.png)

In the default setting, the dashboard displays routes from Baltimore Washington International (BWI) airport. The origin airport name is displayed at the top of the legend in a highlighted yellow circle, while each destination airport name is displayed in a smaller yellow circle above the bar in the chart that it corresponds to. Regional routes are color coded as orange and displayed on the left side of the chart, while major routes are color coded as blue and displayed on the right side of the chart.

![main_annotated](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/main_annotated.png)

Each bar shows data for one route in the map, specifically the route's seats/day in 2018, seats/day in 2019, and the percent decrease between those two values. Hovering over a bar highlights the corresponding route in the map and vice-versa. 

![hover](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/hover.png)

The dashboard defaults to displaying data comparing July 4 2018 to July 4 2019. The dropdown menu in the control panel allows the user to switch modes.

![dropdown](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/dropdown.png)

By clicking the "Thanksgiving" button in the dropdown, data is instead displayed comparing Thanksgiving 2018 to Thanksgiving 2019 (projection). 

![thanksgiving](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/thanksgiving.png)

The user can change the origin airport by typing a different airport name into the text box. After entering "LAX", for example, the dashboard displays all routes from LAX that experienced a decrease in seat capacity from 2018 to 2019. 

![origin_airport](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/origin_airport.png)

By default, the top 15 routes (by percent decrease in seat capacity) are visualized in the map and chart, but this number can be adjusted by the user using the number input.

![top_routes](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/top_routes.png)

Radio buttons are available for filtering what routes are displayed, with "All" routes as the default. The "Regional" button can be selected to display only regional routes.

![regional_routes](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/regional_routes.png)

Or the "Major" button can be selected to display only major routes.

![major_routes](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/major_routes.png)

![slider](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/slider.png)

If the user is interested in a specific destination airport, they can enter the airport's name into the text box at the bottom of the control panel. This alters the map and chart so that only data for that one route is displayed. Note that the control panel becomes greyed out upon entering a destination airport name, as the controls are not relevant when only one route is shown. 

![destination_airport](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/destination_airport.png)

Pressing the "Clear" button clears the destination airport selection and allows all routes to be displayed. The control panel's interactivity is also restored. 

![clear_button](https://github.com/cchinchristopherj/Holiday-Travel-737-Max/blob/master/screenshots/clear_button.png)

Data
=========================

1. state_bounding_boxes.csv: Bounding box data for each of the fifty US states. Each tweet obtained via the Twitter API contains the latitude/longitude coordinates from which it was sent. This coordinate data is used in conjunction with the bounding box data from the state_bounding_boxes.csv file to determine the exact state the tweet originated from. 
- Due to there not being a publicly available .csv file of bounding boxes for all 50 US states, raw bounding box data was scraped from the Map & Geospatial Information Round Table [page](http://www.ala.org/rt/magirt/publicationsab/usa) on the American Library Association website and converted into a .csv file. Web scraping was achieved using the [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) Python library, with code available in statebb_scraper.py.

2. us-states.json: GeoJSON data for the US states. A geoAlbersUSA projection and d3 path generator will be used to convert this GeoJSON data to SVG paths, and display a map of the US client-side. 
