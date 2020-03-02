737 Max Grounding Affects Holiday Travel
=========================

During Thanksgiving 2018, 10 million Americans traveled by air over the 5-day holiday period. Half of them traveled on a handful of the largest U.S. carriers: American Airlines, United Airlines, and Southwest Airlines. Due to worldwide grounding of the 737 Max aircraft in early 2019, however, these three major carriers experienced decreases in seat capacity that had negative impacts on popular travel holidays such as July 4. Specifically, to minimize the grounding’s impact on customers, these carriers have moved available seats from their less-traveled routes and regional airports to their major routes and airports. 

The impact could be potentially more significant during Thanksgiving since regional airports historically receive a large traffic increase during the Thanksgiving travel period. It may consequently be more difficult for passengers to find seats on routes involving regional airports and travelers may have to drive further to and from major hubs to reach their families during the holiday.

An [interactive dashboard](https://cchinchristopherj.github.io/Holiday-Travel/) was designed to display the potential impact of the 737 Max grounding on 2019 Thanksgiving travel. Specifically, the dashboard shows airline routes that experienced a decrease in seat capacity between July 4 2018 and 2019. Assuming the three major airlines perform the same reshuffling for Thanksgiving, projections are made for the impact on Thanksgiving 2019 seat capacity. 

Interactive Dashboard
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

1. **us-states.json:** GeoJSON data for the US states. A geoAlbersUSA projection and d3 path generator will be used to convert this GeoJSON data to SVG paths, and display a map of the US client-side. 
- Data publicly available from: https://gist.githubusercontent.com/michellechandra/0b2ce4923dc9b5809922/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json

2. **airports_lat_long.csv:** Latitude and longitude coordinate data for all regional and major airports. 
- Latitude and longitude data for airports was queried from the U.S. Department of Transportation's OAIL_AirportID database using SQL. See routes_data.sql for more details: the temporary table #airports_latlong_final is the relevant table that can be exported as a csv file to create airports_lat_long.csv

3. **routes_data.csv:** Data for all regional and major routes that experienced a decrease in seat capacity between July 4 2018 and July 4 2019.
- Data for routes was queried from the U.S. Department of Transportation's On-Time database (oairestricted.oair_ontimenew) using SQL. See routes_data.sql for more details: the temporary table #export_table_final is the relevant table that can be exported as a csv file to create routes_data.csv
