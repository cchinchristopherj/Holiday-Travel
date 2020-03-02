// Global Variables
// Mode of the visualization ("july4" or "thanksgiving") determines which holiday to display data for
var mode = "july4";
// Raw data from airports_lat_long.csv
var data_coords;
// Reformatted data from routes_data.csv
var data_routes;
// Filtered version of data_routes, containing only data based on the filters the user has selected in the control panel
var data_routes_filt;
// Regional routes data used for d3 data binding and visualization in the map
var data_routes_filt_regional;
// Major routes data used for d3 data binding and visualization in the map
var data_routes_filt_major;
// Regional routes data used for d3 data binding and visualization in the chart
var data_routes_bar_regional;
// Major routes data used for d3 data binding and visualization in the chart
var data_routes_bar_major;
// Width and height for svg containing the map
var width1=1210;
var height1=450;
// Width and height for svg containing the chart
var width2=1210;
var height2=450;
// Padding between downward arrows in the chart
var bar_width = 0.2;
// Height of the triangles (arrowheads) of downward arrows in the chart
var triangle_height = 50;
// Radius of circles in the chart
var circle_rad = 17;
// y offset for the circle surrounding the origin airport name
var circle_airport1_offset = 85;
// y offset for the circles surrounding the destination airport names
var circle_airport2_offset = 40;
// y offset for the summary flags
var flag_offset = circle_airport1_offset+5;
// Extra vertical offset for summary flags
var flag_extra_ver_offset = 3;
// x offset for regional flag text
var regional_flag_text_offset = 265;
// x offset for major flag text
var major_flag_text_offset = 257;
// Extra offset for summary flags
var flag_extra_length = 10;
// y offset for text describing origin airport name
var text_airport1_offset = circle_airport1_offset + 7;
// y offset for text describing destination airport names
var text_airport2_offset = circle_airport2_offset + 5;
// y offset for text describing data for 2018
var text_2018_offset = 15;
// y offset for text describing data for 2019
var text_2019_offset = 5;
// y offset for text describing which holiday the data displayed corresponds to
var text_holiday_offset = text_2018_offset + 18;
// y offset for text "(Projected)" in the legend
var text_projected_offset = text_2019_offset + 15;
// y offset for text "Percent" in the legend
var text_percent_offset = 5;
// Inner radius of the top and bottom of the oval surrounding the legend
var oval_inner_rad = 57;
// Outer radius of the top and bottom of the oval surrounding the legend
var oval_outer_rad = 59;
// Width of the lines on the left and right hand side of the oval surrounding the legend
var oval_line_width = oval_outer_rad-oval_inner_rad;
// y offset for the top of the oval surrounding the legend
var oval_top_offset = circle_airport1_offset;
// Length of the oval surrounding the legend
var oval_length = 100 + oval_top_offset;
// Additional spacing between the legend and closest downward arrow in the chart.
var line_x_loc = (oval_inner_rad+oval_outer_rad)/2;
// Arc defining the top and bottom of the oval surrounding the legend
var arc = d3.svg.arc()
    .innerRadius(oval_inner_rad)
    .outerRadius(oval_outer_rad)
    .startAngle(-Math.PI*0.5)
    .endAngle(Math.PI*0.5);
// Data defining the points to draw a line between for the left side of the oval surrounding the legend 
var line_left_data = [  
    {'x': -line_x_loc, 'y': -oval_top_offset}, 
    {'x': -line_x_loc, 'y': oval_length},  
];
// Data defining the points to draw a line between for the right side of the oval surrounding the legend
var line_right_data = [  
    {'x': line_x_loc, 'y': -oval_top_offset}, 
    {'x': line_x_loc, 'y': oval_length},  
];
// d3 line generator using x and y properties of data
var line = d3.svg.line()
    .x(function(d){return d['x'];})
    .y(function(d){return d['y'];});
// x offset for the text within the legend
var bar_body_x_offset = -40;
// x value for translating the legend of the chart
var bar_x_loc = (width2/2);
// y value for translating the legend of the chart
var bar_y_loc = (height2/2)-50;
// Set domain and spacing for x axis of chart for regional and major routes
var bar_x_regional;
var bar_y_regional;
// Set domain and spacing for y axis of chart for regional and major routes
var bar_x_major;
var bar_y_major;
// The d3 force edge bundling algorithm transforms and groups paths on a node-link graph so that readability is improved and overlap
// reduced. It requires an input "node_data" dictionary defining the location of every node on the graph. Every field is an index 
// mapping to the x and y coordinate for a node.
// It also requires an input "edge_data" array defining the links between nodes on the graph. 
// Every element is an object containing source and target information for drawing a link between. The values of the source and target 
// fields are the indexes used in node_data to identify x and y locations for a node. 
// airports_dict is a dictionary mapping airports to indexes. 
var node_data = {};
var edge_data = [];
// Limited set of the attribute data from data_routes_filt for every element of "edge_data" 
var attr_data = [];
// Set of all the indexes corresponding to nodes used in "edge_data" for sources and targets 
var edge_data_set;
// Dictionary mapping an airport name to an index
var airports_dict = {};
// Dictionary mapping an index to an airport name
var airports_dict_rev = {};
// Output of the d3 force edge bundling algorithm
var results;
// Nodes in the node-link graph of the chart
var nodes;
// Edges in the node-link graph of the chart
var edges;
// d3 projection for drawing map of the United States
var projection;
// Path generator that will convert GeoJSON data to SVG paths
var path;
// SVG element for appending the map to
var svg1;
// SVG element for appending the chart to
var svg2;
// Group in svg1 for the node-link graph of airline routes
var network;
// Group in svg2 for the chart
var bar;
// Group in "bar" for the chart
var bar_graph;
// Scale for the y axis of the chart
var bar_y = d3.scale.linear().range([bar_y_loc, 0]);
// Circle in legend for the name of the origin airport
var bar_circle_airport1;
// Groups to draw the oval surrounding the legend
var bar_oval_top;
var bar_oval_bottom;
var bar_oval_left;
var bar_oval_right;
// Groups for the summary flags for regional and major routes on either side of the legend
var regional_flag;
var major_flag;
// Boolean if "All" radio button is selected. Default is true
var all_checked = true;
// Boolean if "Regional" radio button is selected
var regional_checked;
// Boolean if "Major" radio button is selected
var major_checked;
// Group for the text in the legend for the origin airport name
var bar_text_airport1;
// Groups for the different components inside the legend
var bar_graph_summary;
var bar_rect_summary;
var bar_triangle_summary;
var bar_text_2018_summary_desc;
var bar_text_2019_summary_desc;
var bar_text_holiday;
var bar_text_projected;
// Total seats offered on regional routes for July 4 2018
var july4_2018_regional;
// Total seats offered on regional routes for July 4 2019
var july4_2019_regional;
// Total seats offered on major routes for July 4 2018
var july4_2018_major;
// Total seats offered on major routes for July 4 2019
var july4_2019_major;
// Percent decrease in seats between July 4 2018 and 2019 for regional routes
var july4_percent_change_regional;
// Percent decrease in seats between July 4 2018 and 2019 for major routes
var july4_percent_change_major;
// Total seats offered on regional routes for Thanksgiving 2018
var tg_2018_regional;
// Total seats offered on regional routes for Thanksgiving 2019
var tg_2019_regional;
// Total seats offered on major routes for Thanksgiving 2018
var tg_2018_major;
// Total seats offered on major routes for Thanksgiving 2019
var tg_2019_major;
// Percent decrease in seats between Thanksgiving 2018 and 2019 for regional routes
var tg_percent_change_regional;
// Percent decrease in seats between Thanksgiving 2018 and 2019 for major routes
var tg_percent_change_major;
// Selection of radio buttons on the page
var buttons;
// Group in svg1 for the map
var map;
// The label_filter variable is set by the user and has three values: "Regional", "Major", and "None". The value of the 
// variable determines what data is displayed in the visualization. If it is set to "Regional", for example, only data
// for regional routes will be displayed. If it is set to "None", data for all routes will be displayed. 
var label_filter = "None";
// Upper value slider is set to (maximum percent decrease to display)
var percent_filter_max = 100;
// Lower value slider is set to (minimum percent decrease to display)
var percent_filter_min = 0;
// The top_num_filt variable (set by the user or containing the default value) specifies how many routes should be displayed 
// in the visualization (and therefore how many data elements should be used for data binding). 
var top_num_filt = 15;
// Maximum number of regional routes to display on the chart (without cluttering the visualization)
var top_num_bar_regional = 10;
// Maximum number of major routes to display on the chart (without cluttering the visualization)
var top_num_bar_major = 10; 
// "Large" radius value for nodes in the map
var node_rad_extra = 20;
// "Small" radius value for nodes in the map
var node_rad_normal = 2;
// Current origin airport
var airport_origin = "BWI";
// Current destination airport
var airport_dest = null;
// Width and height of the rectangle of the downward arrow in the legend
var graph_width = 80;
var graph_height = 120;
// Default zoom parameters
var scale0 = 950;
var map_x_offset = 170;
// Zoom behavior for the map 
var zoom = d3.behavior.zoom()
    // Default zoom parameters 
    .translate([(width1 / 2)+map_x_offset, height1 / 2])
    .scale(scale0)
    .scaleExtent([scale0, 8 * scale0])
    .on("zoom", zoomed);

// Global Functions
/**
 * Event handler for onSubmit event of Origin airport form
 *  @param event event
 */
function handleOrigin(event){
    // The user can enter an airport name into the Origin airport form. 
    // If the entered name is in airports_dict, set the airport_origin global variable to that name and change the corresponding
    // text in the visualization 
    if(Object.keys(airports_dict).includes(document.getElementById("originVal").value)){
        airport_origin = document.getElementById("originVal").value;
        document.getElementById("origin").innerHTML = "Origin: "+airport_origin;
        drawRefresh();
    }
    return false;
}

/**
 * Event handler for onSubmit event of Destination airport form
 *  @param event event
 */
function handleDest(event){
    // The user can enter an airport name into the Destination airport form. 
    // If the entered name is in airports_dict, set the airport_dest global variable to that name.
    // Also, add the classes "disabled" and "no_click" to the radio buttons and other interactive elements in the control panel, 
    // which makes them greyed out and unclickable. These elements cannot be used once a specific destination airport is selected. 
    if(Object.keys(airports_dict).includes(document.getElementById("destVal").value)){
        airport_dest = document.getElementById("destVal").value;
        document.getElementById("radio_all").classList += " disabled no_click";
        document.getElementById("radio_regional").classList += " disabled no_click";
        document.getElementById("radio_major").classList += " disabled no_click";
        document.getElementById("top_num").classList += " disabled no_click";
        document.getElementsByClassName("ui-corner-all")[1].style.backgroundColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[2].style.backgroundColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[3].style.backgroundColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[0].style.borderColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[1].style.borderColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[2].style.borderColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[3].style.borderColor="#6c757d";
        document.getElementsByClassName("ui-corner-all")[0].classList += " no_click";
        document.getElementById("dest1").classList += " reduced_opacity";
        drawRefresh();
        // If the entered destination airport is not in airports_dict, display an error message. 
        if(data_routes_filt.length==0){
            document.getElementById("dest_select").innerHTML = "Not Available. Please Choose a Different Destination:"
        } else{
            document.getElementById("dest_select").innerHTML = "Or Select One Destination:"
        }
    }
    return false;
}

/**
 * Create airports_dict, which maps an airport name to an index, and airports_dict_rev, which contains the reverse mapping
 *  @param input raw data array from airports_lat_long.csv, where each element is an object containing an airport name and the 
 *               corresponding latitude and longitude coordinate values
 */
function initialize_coords(input){
    for(var i=0;i<input.length;i++){
        airports_dict[input[i].Airport] = i.toString();
        airports_dict_rev[i.toString()] = input[i].Airport;
    }
}

/**
 * Change the value of the "percent_change_2018_2019" field in each element of the input array to its absolute value
 *  @param input reformatted data array from routes_data.csv
 */
function scale_percent_change(input){
    for(var i=0;i<input.length;i++){
        input[i].percent_change_2018_2019 = Math.abs(input[i].percent_change_2018_2019);
    }
}

/**
 * Callback function when a line on the map or downward arrow element in the chart is moused over
 *  @param this_temp Element currently being moused over
 *  @param d d3 data associated with element currently being moused over
 */
function onMouseOver(this_temp,d){
    // Lines on the map and downward arrow elements in the chart that represent the same route are related by a common id
    // Select the line on the map associated with the current id and increase its stroke width and opacity 
    d3.select("#edge_"+d3.select(this_temp).attr("id").split("_")[1])
        .transition()
        .duration(0)
        .style("stroke-width",stroke_extra(d))
        .style("stroke-opacity",1)
    // The visualization depicts all routes from a specified Origin airport to all available destinations. The node associated
    // with the Origin airport on the map is always enlarged with text for the airport's abbreviation. 
    // Every line on the map or downward arrow element in the chart is associated with d3 data that contains a field
    // "airport_2" which identifies the destination airport for the current route.  
    // Select the node associated with the destination airport and increase its size
    d3.select("#node_"+airports_dict[d["airport_2"]])
        .attr("class","graph_over")
        .transition()
        .duration(0)
        .style("r",node_rad_extra);
    // Select the text inside the node associated with the destination airport and make it visible
    d3.select("#nodeText_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(0)
        .style("visibility","visible");
    // Select the downward arrow element in the chart associated with the destination airport and increase its opacity
    d3.select("#bargroup_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr('opacity', 1)
    // Select the rectangle component, circle component, and polygon component (arrowhead) of the downward element in the chart 
    // associated with the destination airport and add the class "graph_over" which makes the stroke color white and increases 
    // the stroke width
    d3.select("#barrect_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_over")
    d3.select("#barcircle_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_over")
    d3.select("#barpolygon_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_over")
}

/**
 * Callback function when the user mouses out of a line on the map or downward arrow element in the chart
 *  @param this_temp Element currently being moused out of
 *  @param d d3 data associated with element being moused out of 
 */
function onMouseOut(this_temp,d){
    // Lines on the map and downward arrow elements in the chart that represent the same route are related by a common id
    // Select the line on the map associated with the current id and decrease its stroke width and opacity 
    d3.select("#edge_"+d3.select(this_temp).attr("id").split("_")[1])
        .transition()
        .duration(0)
        .style("stroke-width",stroke_normal(d))
        .style("stroke-opacity",0.5)
    // The visualization depicts all routes from a specified Origin airport to all available destinations. The node associated
    // with the Origin airport on the map is always enlarged with text for the airport's abbreviation. 
    // Every line on the map or downward arrow element in the chart is associated with d3 data that contains a field
    // "airport_2" which identifies the destination airport for the current route. 
    // Select the node associated with the destination airport and decrease its size
    d3.select("#node_"+airports_dict[d["airport_2"]])
        .attr("class","graph_out")
        .transition()
        .duration(0)
        .style("r",node_rad_normal);
    // Select the text inside the node associated with the destination airport and make it hidden
    d3.select("#nodeText_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(0)
        .style("visibility","hidden");
    // Select the downward arrow element in the chart associated with the destination airport and decrease its opacity
    d3.select("#bargroup_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
    // Select the rectangle component, circle component, and polygon component (arrowhead) of the downward element in the chart 
    // associated with the destination airport and add the class "graph_out" which makes the stroke color black and decreases
    // the stroke width
    d3.select("#barrect_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_out")
    d3.select("#barcircle_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_out")
    d3.select("#barpolygon_"+airports_dict[d["airport_2"]])
        .transition()
        .duration(300)
        .attr("class","graph_out")
}

/**
 * When a line on the map is moused over, increase its stroke weight according to the value of the associated
 * d3 data element's "percent_change_2018_2019" field
 *  @param d d3 data element
 */
function stroke_extra(d){
    return (d["percent_change_2018_2019"]/20)*3;
}

/**
 * When a line on the map is moused out of, decrease its stroke weight according to the value of the associated
 * d3 data element's "percent_change_2018_2019" field
 *  @param d d3 data element
 */
function stroke_normal(d){
    return (d["percent_change_2018_2019"]/20);
}

/**
 * Create array edge_data for d3 force edge bundling algorithm and array attr_data which contains a limited set of the attribute information 
 * for every element of data_routes_filt
 */
function transform_routes(){
    // The d3 force edge bundling algorithm transforms and groups paths on a node-link graph so that readability is improved and overlap
    // reduced. It requires an input "node_data" dictionary defining the location of every node on the graph. Every field is an index 
    // mapping to the x and y coordinate for a node.
    // It also requires an input "edge_data" array defining the links between nodes on the graph. 
    // Every element is an object containing source and target information for drawing a link between. The values of the source and target 
    // fields are the indexes used in node_data to identify x and y locations for a node. 
    // airports_dict is a dictionary mapping airports to indexes. 
    edge_data = [];
    attr_data = [];
    for(var i=0;i<data_routes_filt.length;i++){
        // Add elements to "edge_data" 
        // Every element of data_routes_filt corresponds to a route between the airports specified in the "airport_1" and "airport_2"
        // fields (source and target respectively for "edge_data" array)
        // Identify the index in node_data for the source and the index in node_data for the target using airports_dict
        edge_data.push({"source":airports_dict[data_routes_filt[i].airport_1],"target":airports_dict[data_routes_filt[i].airport_2]});
        // Add elements to "attr_data"
        // "attr_data" contains a limited set of the attribute data from data_routes_filt for every element of "edge_data" 
        attr_data.push({"airport_1":data_routes_filt[i].airport_1,"airport_2":data_routes_filt[i].airport_2,"label":data_routes_filt[i].label,"percent_change_2018_2019":data_routes_filt[i].percent_change_2018_2019});
    }
    // Set of all the indexes corresponding to nodes used in "edge_data" for sources and targets 
    edge_data_set = new Set(edge_data.map(Object.values).flat())
}

/**
 * Create array node_data for d3 force edge bundling algorithm
 */
function transform_coords(){
    // The d3 force edge bundling algorithm transforms and groups paths on a node-link graph so that readability is improved and overlap
    // reduced. It requires an input "node_data" dictionary defining the location of every node on the graph. Every field is an index 
    // mapping to the x and y coordinate for a node.
    // It also requires an input "edge_data" array defining the links between nodes on the graph. 
    // Every element is an object containing source and target information for drawing a link between. The values of the source and target 
    // fields are the indexes used in node_data to identify x and y locations for a node. 
    // airports_dict is a dictionary mapping airports to indexes. 
    // edge_data_set is a set of all the indexes corresponding to nodes to be drawn on the map 
    // data_coords is the raw data from the airports_lat_long.csv where each element is an object containing an airport name and the 
    // corresponding latitude and longitude coordinate values
    node_data = {};
    var coords;
    // An array of all the indexes corresponding to nodes to be displayed in the map
    var edge_data_arr = Array.from(edge_data_set);
    // For every element of data_coords, use airports_dict to map the airport name to the corresponding index. Add elements to node_data 
    // if the index corresponding to a node belongs to edge_data_arr
    for(var i=0;i<data_coords.length;i++){
        if(edge_data_arr.includes(airports_dict[data_coords[i].Airport])){
            // Project the latitude/longitude coordinates of the airport to x and y coordinates
            coords = projection([+data_coords[i].long_num, +data_coords[i].lat_num]);
            // Add a field to node_data equal to the index correpsonding to the airport, and map it to the x and y coordinates 
            node_data[airports_dict[data_coords[i].Airport]] = {"x":coords[0],"y":coords[1]}
        }
    }
}

/**
 * Calculate the overall percent decreases for regional and major routes based on the data in data_routes_filt_regional and
 * data_routes_filt_major respectively
 */
function data_routes_filt_summary(){
    // Total difference in seats between July 4 2018 and 2019 for regional routes
    july4_regional_lost = 0;
    // Total difference in seats between July 4 2018 and 2019 for major routes
    july4_major_lost = 0;
    // Total seats offered on regional routes for July 4 2018
    july4_2018_regional = 0;
    // Total seats offered on regional routes for July 4 2019
    july4_2019_regional = 0;
    // Iterate through data_routes_filt_regional and update the july4_regional_lost, july4_2018_regional, and july4_2019_regional variables
    // with the corresponding values for each regional route
    for(var i=0;i<data_routes_filt_regional.length;i++){
        // Update with the difference in seats between 2018 and 2019 for the route corresponding to the current element of
        // data_routes_filt_regional 
        july4_regional_lost += (+data_routes_filt_regional[i].Seats_2019)-(+data_routes_filt_regional[i].Seats_2018);
        july4_2018_regional += +data_routes_filt_regional[i].Seats_2018;
        july4_2019_regional += +data_routes_filt_regional[i].Seats_2019;
    }
    // Percent decrease in seats between July 4 2018 and 2019 for regional routes
    july4_percent_change_regional = Math.round(Math.abs(((july4_2019_regional-july4_2018_regional)/(july4_2018_regional))*100));
    // Total seats offered on major routes for July 4 2018
    july4_2018_major = 0;
    // Total seats offered on major routes for July 4 2019 
    july4_2019_major = 0;
    // Iterate through data_routes_filt_major and update the july4_major_lost, july4_2018_major, and july4_2019_major variables
    // with the corresponding values for each major route 
    for(var i=0;i<data_routes_filt_major.length;i++){
        // Update with the difference in seats between 2018 and 2019 for the route corresponding to the current element of
        // data_routes_filt_major
        july4_major_lost += (+data_routes_filt_major[i].Seats_2019)-(+data_routes_filt_major[i].Seats_2018);
        july4_2018_major += +data_routes_filt_major[i].Seats_2018;
        july4_2019_major += +data_routes_filt_major[i].Seats_2019;
    }
    // Percent decrease in seats between July 4 2018 and 2019 for major routes
    july4_percent_change_major = Math.round(Math.abs(((july4_2019_major-july4_2018_major)/(july4_2018_major))*100));
    // Total difference in seats between Thanksgiving 2018 and 2019 for regional routes
    tg_regional_lost = 0;
    // Total difference in seats between Thanksgiving 2019 and 2019 for major routes
    tg_major_lost = 0;
    // Total seats offered on regional routes for Thanksgiving 2018
    tg_2018_regional = 0;
    // Total seats offered on major routes for Thanksgiving 2019 
    tg_2019_regional = 0;
    // Iterate through data_routes_filt_regional and update variables with the corresponding values for each regional route
    for(var i=0;i<data_routes_filt_regional.length;i++){
        tg_regional_lost += (+data_routes_filt_regional[i].tg_2019)-(+data_routes_filt_regional[i].tg_2018);
        tg_2018_regional += +data_routes_filt_regional[i].tg_2018;
        tg_2019_regional += +data_routes_filt_regional[i].tg_2019;
    }
    // Percent decrease in seats between Thanksgiving 2018 and 2019 for regional routes
    tg_percent_change_regional = Math.round(Math.abs(((tg_2019_regional-tg_2018_regional)/(tg_2018_regional))*100));
    // Total seats offered on major routes for Thanksgiving 2018
    tg_2018_major = 0;
    // Total seats offered on major routes for Thanksgiving 2019
    tg_2019_major = 0;
    // Iterate through data_routes_filt_major and update variables with the corresponding values for each major route
    for(var i=0;i<data_routes_filt_major.length;i++){
        tg_major_lost += (+data_routes_filt_major[i].tg_2019)-(+data_routes_filt_major[i].tg_2018);
        tg_2018_major += +data_routes_filt_major[i].tg_2018;
        tg_2019_major += +data_routes_filt_major[i].tg_2019;
    }
    // Percent decrease in seats between Thanksgiving 2018 and 2019 for regional routes
    tg_percent_change_major = Math.round(Math.abs(((tg_2019_major-tg_2018_major)/(tg_2018_major))*100));
}

/**
 * Filter data according to user's selections and create new arrays of filtered data for d3 data binding and visualization in the map
 */
function filter_routes_map(){
    // Array of filtered data
    data_routes_filt = [];
    // Array of only regional routes from data_routes_filt
    data_routes_filt_regional = [];
    // Array of only major routes from data_routes_filt
    data_routes_filt_major = [];
    // Sorted version of full dataset
    var data_routes_sort;
    data_routes_sort = data_routes.sort(sortDescending);
    // Iterate through full dataset and add elements selectively to data_routes_filt, data_routes_filt_regional, and data_routes_filt_major.
    var counter = 0;
    // Execute the following block if the user has entered a specific destination airport they are interested in. The code ensures that 
    // only data for the route corresponding to the current origin airport and specified destination airport is added to the arrays
    // for d3 data binding and visualization
    if(airport_dest!=null){
        while((counter < data_routes_sort.length)){
            // Add element to data_routes_filt_regional if the value of the "airport_1" or "airport_2" field is equal to the value of the
            // "airport_origin" global variable, and if the value of the "label" field is equal to "Regional"
            if(((data_routes_sort[counter].airport_1==airport_origin) || (data_routes_sort[counter].airport_2==airport_origin))){
                if((data_routes_sort[counter].label == "Regional")){
                    // If the correct conditions apply, swap values of the "airport_1" and "airport_2" fields if necessary using 
                    // the reassign_airports function to ensure that the value of the "airport_1" field is equal to the value of the 
                    // "airport_origin" variable. Then add the (corrected) d3 data element to data_routes_filt_regional and 
                    // data_routes_filt only if the value of the "airport_2" field is equal to the "airport_dest" variable (set when the 
                    // user specifies a destination airport)
                    temp = reassign_airports(data_routes_sort[counter]);
                    if(temp.airport_2==airport_dest){
                        data_routes_filt_regional.push(temp);
                        data_routes_filt.push(temp);
                    }
                // If the value of the "label" field is equal to "Major", swap values of the "airport_1" and "airport_2" fields if 
                // necessary using the reassign_airports function. Then add the (corrected) d3 data element to data_routes_filt_major
                // and data_routes_filt only if the value of the "airport_2" field is equal to the "airport_dest" variable
                } else if((data_routes_sort[counter].label == "Major")){
                    temp = reassign_airports(data_routes_sort[counter]);
                    if(temp.airport_2==airport_dest){
                        data_routes_filt_major.push(temp);
                        data_routes_filt.push(temp);
                    }
                }

            }
            counter += 1;
        }
    }
    // Execute the following block of code if the user has not specified a destination airport. The code ensures that only data for all
    // routes corresponding to the current origin airport are added to the arrays for d3 data binding and visualization
    else{
        // data_routes_sort contains a sorted version of the full dataset in descending order. The top_num_filt variable (set by the
        // user or containing the default value) specifies how many routes should be displayed in the visualization (and therefore 
        // how many data elements should be used for data binding). Continue to add elements to data_routes_filt until the length of 
        // the data_routes_filt array is equal to the value of top_num_filt. Since data_routes_sort is in descending order, the 
        // "top_num_filt" elements in data_routes_filt represent the top "top_num_filt" routes (for ex. the top 15 routes). 
        while((counter < data_routes_sort.length) && (data_routes_filt.length < top_num_filt)){
            // The label_filter variable is set by the user and has three values: "Regional", "Major", and "None". The value of the 
            // variable determines what data is displayed in the visualization. If it is set to "Regional", for example, only data
            // for regional routes will be displayed. If it is set to "None", data for all routes will be displayed. 
            // Add elements to data_routes_filt only if the value of the "label" field corresponds to the value of the label_filter
            // variable or if the value of the label_filter variable is "None". 
            // Also, only add elements to data_routes_filt if the value of the "percent_change_2018_2019" field is within the 
            // range of percent decrease values specified by the user, and if the value of the "airport_1" field or "airport_2" field
            // is equal to the value of the airport_origin variable.
            if(((data_routes_sort[counter].label==label_filter) || (label_filter=="None")) && (data_routes_sort[counter].percent_change_2018_2019<=percent_filter_max) && (data_routes_sort[counter].percent_change_2018_2019>=percent_filter_min) && ((data_routes_sort[counter].airport_1==airport_origin) || (data_routes_sort[counter].airport_2==airport_origin))){
                // Add element to data_routes_regional if the value of the "label" variable is "Regional" and after swapping the values 
                // of the "airport_1" and "airport_2" fields if necessary using the reassign_airports function. 
                if((data_routes_sort[counter].label == "Regional")){
                    temp = reassign_airports(data_routes_sort[counter]);
                    data_routes_filt_regional.push(temp);
                // Add element to data_routes_major if the value of the "label" variable is "Major" and after swapping the values
                // of the "airport_1" and "airport_2" fields if necessary using the reassign_airports function. 
                } else if((data_routes_sort[counter].label == "Major")){
                    temp = reassign_airports(data_routes_sort[counter]);
                    data_routes_filt_major.push(temp);
                }
                // Add the element to data_routes_filt
                data_routes_filt.push(temp);
            }
            counter += 1;
        }
    }
    // Calculate overall percent decreases for July 4 2018 vs 2019 and Thanksgiving 2018 vs 2019 regional and major routes
    data_routes_filt_summary();
    // Set the highest value of the domain of the y axis of the chart to the highest value of the "percent_change_2018_2019" field
    // in data_routes_filt
    bar_y.domain([0, d3.max(data_routes_filt, function(d) { return d.percent_change_2018_2019; })]);
}

/**
 * Filter data according to user's selections and create new arrays of filtered data for d3 data binding and visualization in the chart
 */
function filter_routes_bar(){
    // Array of data for regional routes
    data_routes_bar_regional = [];
    // Array of data for major routes
    data_routes_bar_major = [];
    // Sorted version of full dataset
    var data_routes_sort;
    data_routes_sort = data_routes.sort(sortDescending);
    // Number of regional routes added to data_routes_bar_regional
    var num_regional = 0;
    // Number of major routes added to data_routes_bar_major
    var num_major = 0;
    // Indicates if number of regional routes is no greater than top_num_bar_regional (maximum number of regional routes to display
    // without cluttering the visualization) and the number of major routes is no greater than top_num_bar_major (maximum number of
    // major routes to display). 
    var flag = 0;
    // Counter for while llop
    var counter = 0;
    // Variable to hold results of reassign_airports function, which swaps values of the "airport_1" and "airport_2" fields in the current
    // d3 data element if the value of the "airport_1" field is not equal to the value of the airport_origin variable. The corrected
    // data element is then added to the appropriate array 
    var temp;
    while((counter < data_routes_sort.length) && (flag==0)){
        if(((data_routes_sort[counter].airport_1==airport_origin) || (data_routes_sort[counter].airport_2==airport_origin))){
            // If the value of the label field is "Regional" and the number of elements in data_routes_bar_regional is less than 
            // top_num_bar_regional, add the (corrected) data element to data_routes_bar_regional
            if((data_routes_sort[counter].label == "Regional") && (num_regional <= top_num_bar_regional)){
                temp = reassign_airports(data_routes_sort[counter]);
                data_routes_bar_regional.push(temp);
                num_regional += 1;
            // If the value of the label field is "Major" and the number of elements in data_routes_bar_major is less than 
            // top_num_bar_major, add the (corrected) data element to data_routes_bar_major
            } else if((data_routes_sort[counter].label == "Major") && (num_major <= top_num_bar_major)){
                temp = reassign_airports(data_routes_sort[counter]);
                data_routes_bar_major.push(temp);
                num_major += 1;
            }
        }
        // Break out of the while loop if the number of elements in data_routes_bar_regional is equal to top_num_bar_regional and if
        // the number of elements in data_routes_bar_major is equal to top_num_bar_major
        if((num_regional == top_num_bar_regional) && (num_major == top_num_bar_major)){
            flag = 1;
        }
        counter += 1;
    }
}

/**
 * Ensure that the value of the "airport_1" field of the input d3 data element corresponds to the value of the
 * "airport_origin" global variable by swapping values of the "airport_1" and "airport_2" fields if necessary
 *  @param temp d3 data element
 */
function reassign_airports(temp){
    // The input d3 data element contains fields "airport_1" and "airport_2". Store these values
    // in the temp_airport_1 and temp_airport_2 variables 
    var temp_airport_1;
    var temp_airport_2;
    temp_airport_1 = temp.airport_1;
    temp_airport_2 = temp_airport_2;
    // If the value of the "airport_1" field does not correspond to the value of the "airport_origin" 
    // global variable, swap the values of the "airport_1" and airport_2" fields so that the value of
    // the "airport_1" field correctly corresponds to the value of "airport_origin"
    if(temp_airport_1 != airport_origin){
        temp.airport_1 = airport_origin;
        temp.airport_2 = temp_airport_1;  
    }
    return temp; 
}

/**
 * Change input array from force edge bundling algorithm into an array of objects with specified properties
 *  @param input array output by force edge bundling algorithm
 */
function transform_results(input){
    for(var i=0;i<input.length;i++){
        input[i] = {"airport_1":attr_data[i]["airport_1"],"airport_2":attr_data[i]["airport_2"],"segments":input[i],"label":attr_data[i]["label"],"percent_change_2018_2019":attr_data[i]["percent_change_2018_2019"]};
    }
}

/**
 * Remove all elements in the chart
 */
function refreshBar(){
    d3.selectAll("#bar g.regional").remove();
    d3.selectAll("#bar g.major").remove();
    d3.selectAll("#bar circle").remove();
    d3.selectAll("#bar rect").remove();
    d3.selectAll("#bar polygon").remove();
    d3.selectAll("#bar text").remove();
    d3.selectAll("#bar path").remove();
}

/**
 * Draw the legend
 */
function drawBody(){
    // Remove all (pre-existing) elements of the legend 
    d3.select("#bar_oval_body").remove();
    d3.select("#bar_graph_summary").remove();
    // Add a group for the body of the legend
    bar_oval_body = bar.append("g")
        .attr('transform','translate('+[bar_x_loc,bar_y_loc]+')')
        .attr("id","bar_oval_body");
    // Add groups for the different components of the legend
    bar_oval_top = bar_oval_body.append("g");
    bar_oval_bottom = bar_oval_body.append("g");
    bar_oval_left = bar_oval_body.append("g");
    bar_oval_right = bar_oval_body.append("g");
    bar_oval_lefttail = bar_oval_body.append("g");
    bar_oval_righttail = bar_oval_body.append("g");
    bar_circle_airport1 = bar_oval_body.append("g");
    bar_text_airport1 = bar_oval_body.append("g");
    regional_flag = bar_oval_body.append("g"); 
    major_flag = bar_oval_body.append("g");
    // Add groups for the different components inside the legend
    bar_graph_summary = bar_oval_body.append("g")
        .attr('transform','translate('+[bar_body_x_offset,0]+')')
        .attr("id","bar_graph_summary");
    bar_rect_summary = bar_graph_summary.append("g");
    bar_triangle_summary = bar_graph_summary.append("g");
    bar_text_2018_summary_desc = bar_graph_summary.append("g");
    bar_text_2019_summary_desc = bar_graph_summary.append("g");
    bar_text_percent_summary_desc1 = bar_graph_summary.append("g");
    bar_text_percent_summary_desc2 = bar_graph_summary.append("g");
    bar_text_holiday = bar_graph_summary.append("g");
    bar_text_projected = bar_graph_summary.append("g");
    /**
     * Calculate height and width of the summary flag, which contains summary information about the change from 2018 to 2019
     */
    function flag_size(flag){
        // Calculate the summary flag size using the height and width of the bounding box surrounding the text inside the flag
        if(flag=="regional"){
            return [document.getElementById("regional_flag_text_pre").getBBox().height,document.getElementById("regional_flag_text_pre").getBBox().width];
        } else if(flag=="major"){
            return [document.getElementById("major_flag_text_pre").getBBox().height,document.getElementById("major_flag_text_pre").getBBox().width];
        }
    }
    /**
     * Add summary flags containing summary information about regional routes' change from 2018 to 2019
     */
    function add_regional_flag(){
        // Add summary flag text first, which helps determine the size of the rectangle to surround the text 
        regional_flag
            .append("text")
            // Add class "text_over" which sets default font weight and "white_text" which sets default text color to white
            .attr("class","text_over white_text")
            .attr("id","regional_flag_text_pre")
            .attr("x",-regional_flag_text_offset)
            .attr("y",-flag_offset)
            .attr("dy", ".75em")
            .text(function(){
                var temp1;
                var temp2;
                if(mode=="july4"){
                    temp1 = july4_percent_change_regional; 
                    temp2 = july4_regional_lost;
                } else if(mode=="thanksgiving"){
                    temp1 = tg_percent_change_regional;
                    temp2 = tg_regional_lost;
                }
                return "Regional Routes Displayed: ⟱ "+Math.abs(temp1).toString()+"% or " + Math.abs(temp2).toString()+" Seats/Day Overall";
            });   
        // flag_size returns an array where the first element is the height of the summary flag and the second element is the width
        var flag_dimensions = flag_size("regional");
        // Add the rectangle to surround the text
        regional_flag
            .append("rect")
            .style("fill", "#ea6a47")
            .attr("x",-regional_flag_text_offset-(flag_dimensions[1]/2)-flag_extra_length)
            .attr("y",-flag_offset-flag_extra_ver_offset-flag_extra_length)
            .attr("width",flag_dimensions[1]+(flag_extra_length*2))
            .attr("height", flag_dimensions[0]+(flag_extra_length*2))
            .attr("opacity",0.8)
            .attr("class","graph_out")
        // Since the rectangle now covers the text, add the summary flag text again
        regional_flag
            .append("text")
            .attr("class","text_over white_text")
            .attr("id","regional_flag_text")
            .attr("x",-regional_flag_text_offset)
            .attr("y",-flag_offset)
            .attr("dy", ".75em")
            .attr("opacity",0.8)
            .text(function(){
                var temp1;
                var temp2;
                if(mode=="july4"){
                    temp1 = july4_percent_change_regional; 
                    temp2 = july4_regional_lost;
                } else if(mode=="thanksgiving"){
                    temp1 = tg_percent_change_regional;
                    temp2 = tg_regional_lost;
                }
                return "Regional Routes Displayed: ⟱ "+Math.abs(temp1).toString()+"% or " + Math.abs(temp2).toString()+" Seats/Day Overall";
            });   
    }
    /**
     * Add summary flags containing summary information about major routes' change from 2018 to 2019
     */
    function add_major_flag(){
        // Add summary flag text first, which helps determine the size of the rectangle to surround the text 
        major_flag
            .append("text")
            // Add class "text_over" which sets default font weight and "white_text" which sets default text color to white
            .attr("class","text_over white_text")
            .attr("id","major_flag_text_pre")
            .attr("x",major_flag_text_offset)
            .attr("y",-flag_offset)
            .attr("dy", ".75em")
            .text(function(){
                var temp1;
                var temp2;
                if(mode=="july4"){
                    temp1 = july4_percent_change_major; 
                    temp2 = july4_major_lost;
                } else if(mode=="thanksgiving"){
                    temp1 = tg_percent_change_major;
                    temp2 = tg_major_lost;
                }
                return "Major Routes Displayed: ⟱ "+Math.abs(temp1).toString()+"% or " + Math.abs(temp2).toString()+" Seats/Day Overall";
            });  
        // flag_size returns an array where the first element is the height of the summary flag and the second element is the width
        var flag_dimensions = flag_size("major"); 
        // Add the rectangle to surround the text
        major_flag
            .append("rect")
            .style("fill", "#0091d5")
            .attr("x",major_flag_text_offset-(flag_dimensions[1]/2)-flag_extra_length)
            .attr("y",-flag_offset-flag_extra_ver_offset-flag_extra_length)
            .attr("width",flag_dimensions[1]+(flag_extra_length*2))
            .attr("height", flag_dimensions[0]+(flag_extra_length*2))
            .attr("opacity",0.8)
            .attr("class","graph_out")
        // Since the rectangle now covers the text, add the summary flag text again
        major_flag
            .append("text")
            .attr("class","text_over white_text")
            .attr("id","major_flag_text_pre")
            .attr("x",major_flag_text_offset)
            .attr("y",-flag_offset)
            .attr("dy", ".75em")
            .attr("opacity",0.8)
            .text(function(){
                var temp1;
                var temp2;
                if(mode=="july4"){
                    temp1 = july4_percent_change_major; 
                    temp2 = july4_major_lost;
                } else if(mode=="thanksgiving"){
                    temp1 = tg_percent_change_major;
                    temp2 = tg_major_lost;
                }
                return "Major Routes Displayed: ⟱ "+Math.abs(temp1).toString()+"% or " + Math.abs(temp2).toString()+" Seats/Day Overall";
            });  
    }
    // Add the summary flag for regional routes and major routes if the "All" radio button is selected
    if(all_checked==true){
        if(data_routes_filt_regional.length>0){
            add_regional_flag();
        }
        if(data_routes_filt_major.length>0){
            add_major_flag();
        }
    // Add only the summary flag for regional routes if the "Regional" radio button is selected
    } else if(regional_checked==true){
        add_regional_flag();
    // Add only the summary flag for major routes if the "Major" radio button is selected
    } else if(major_checked==true){
        add_major_flag();
    }
    // Add circle to surround origin airport name 
    bar_circle_airport1
        .append('circle')
        .attr({'r': node_rad_extra, 'fill':'#ffc107'})
        .attr('cx',0)
        .attr('cy',-circle_airport1_offset)
        .attr("class","graph_over")
    // Add text for origin airport 
    bar_text_airport1
        .append("text")
        .attr("class","text_airport1 black_text")
        .attr("y",-text_airport1_offset)
        .attr("dy", ".75em")
        .text(function(d) { return airport_origin; })
    // Add rectangle (body of downward arrow) in legend 
    bar_rect_summary
        .append("rect")
        .style("fill", "black")
        .attr("width", graph_width)
        .attr("height", graph_height)
        .attr("class","graph_over")
    // Add triangle (arrowhead of downward arrow) in legend
    bar_triangle_summary
        .append("polygon")
        .attr("points",function(d,i) {
            var overlap = 10;
            var left = 0 - overlap;
            var top = graph_height +triangle_height;
            var bottom = graph_height;
            return left + ',' + bottom + ' '
               + (left + (graph_width/2) + overlap) + ',' + top + ' '
               + (left + graph_width + (2 * overlap)) + ',' + bottom;
        })
        .style("opacity",".5")
        .attr("fill","#35353b")
        .attr("class","graph_over");
    // Add text indicating which holiday the data represents (July 4 or Thanksgiving)
    bar_text_holiday 
    .append("text")
        .attr("class","text_over white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return 0-(text_holiday_offset); })
        .attr("dy", ".75em")
        .text(function(d){
            if(mode=="july4"){
                return "July 4";
            } else if(mode=="thanksgiving"){
                return "Thanksgiving";
            }
        });   
    // Add text "Seats/Day (2018)" to the legend
    bar_text_2018_summary_desc
        .append("text")
        .attr("class","text_out white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return 0-(text_2018_offset); })
        .attr("dy", ".75em")
        .text("Seats/Day (2018)");   
    // Add text "Seats/Day (2019)" to the legend
    bar_text_2019_summary_desc
        .append("text")
        .attr("class","text_out white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return graph_height + triangle_height + text_2019_offset; })
        .attr("dy", ".75em")
        .text("Seats/Day (2019)");  
    // Add text "Percent" to the legend 	
    bar_text_percent_summary_desc1
        .append("text")
        .attr("class","text_out white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return graph_height + text_percent_offset; })
        .attr("dy", ".75em")
        .text("Percent");   
    // Add text "Decrease" to the legend
    bar_text_percent_summary_desc2
        .append("text")
        .attr("class","text_out white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return graph_height + text_percent_offset + 15; })
        .attr("dy", ".75em")
        .text("Decrease");  
    // Add text "(Projected)" to the legend if the mode is "thanksgiving"  
    bar_text_projected
        .append("text")
        .attr("class","text_over white_text")
        .attr("x", (function(d,i) { return graph_width / 2 ; }  ))
        .attr("y", function(d) { return graph_height + triangle_height + text_projected_offset; })
        .attr("dy", ".75em")
        .text(function(d){
            if(mode=="july4"){
                return "";
            } else if(mode=="thanksgiving"){
                return "(Projected)";
            }
        });   
    // Add the top of the oval surrounding the legend
    bar_oval_top.attr('transform', 'translate('+[0,-oval_top_offset]+')')
        .append('path')
            .attr('d', arc)
            .attr("fill","white");
    // Add the bottom of the oval surrounding the legend
    bar_oval_bottom.attr('transform', 'translate('+[0,oval_length]+')'+"rotate(180)")
        .append('path')
            .attr('d', arc)
            .attr("fill","white");
    // Add the left side of the oval surrounding the legend
    bar_oval_left
          .append("path")
        .attr("d",line(line_left_data))
        .attr("fill","white")
        .attr("stroke","white")
        .attr("stroke-width", oval_line_width)
    // Add the right side of the oval surrounding the legend
    bar_oval_right
        .append("path")
      .attr("d",line(line_right_data))
      .attr("fill","white")
      .attr("stroke","white")
      .attr("stroke-width", oval_line_width)
}

/**
 * Calculate size of the text based on the number of elements in the array used for d3 data binding and visualization
 *  @param input array of elements for d3 data binding and visualization in chart
 */
function text_resize(input){
    return (-input.length+20).toString()+"px";
}

/**
 * Calculate upper value of the range the bars on the chart will cover 
 *  @param input array of elements for d3 data binding and visualization in chart
 */
function reduce_x_space(input){
    // Upper value of range if number of elements in input is greater than or equal to 5
    var temp_extra = 0;
    // Number of elements in input
    var num_el = d3.max(input.map(function(d,i) { return i; }));
    // Upper value of range if number of elements is less than 5
    if(num_el<5){
        // Upper value of range if all routes displayed
        if(all_checked==true){
            temp_extra = (6-num_el)*40;
        }
        // Upper value of range if only regional routes displayed
        else if(regional_checked==true){
            temp_extra = (6-num_el)*110;
        } 
        // Upper value of range if only major routes displayed
        else if(major_checked==true){
            temp_extra = (6-num_el)*110;
        }
    } 
    return temp_extra;
}

/**
 * Set domain and spacing for x axis of chart for regional and major routes
 */
function set_bar_x(){
    // bar_x_loc is the x value for translating the legend of the chart. line_x_loc is the additional spacing between the 
    // legend and closest downward arrow in the chart.
    // The reduce_x_space function calculates the upper value of the range the bars on the chart will cover based on the number of 
    // elements in the data to be used for d3 data binding and visualization
    bar_x_regional = d3.scale.ordinal().rangeRoundBands([bar_x_loc-line_x_loc, reduce_x_space(data_routes_filt_regional)], bar_width);
    bar_x_regional.domain(data_routes_filt_regional.map(function(d,i) { return i; }));
    bar_x_major = d3.scale.ordinal().rangeRoundBands([bar_x_loc+line_x_loc, width2-reduce_x_space(data_routes_filt_major)], bar_width);
    bar_x_major.domain(data_routes_filt_major.map(function(d,i) { return i; }));
}

/**
 * Draw downward arrows in chart for regional routes
 */
function drawBarRegional(){
    // Data for d3 data binding and visualization
    var input;
    // Selection of all groups in the chart
    var bar_graph_groups;
    input = data_routes_filt_regional;
    // Font size of text based on number of elements in input
    var font_size = text_resize(input);
    // Add a group for each destination airport
    bar_graph_groups = bar_graph.selectAll("g.regional")
        .data(input)
        .enter()
        .append("g")
        .classed("regional",true)
        // Unique id for group based on airports_dict dictionary mapping from airport name to index
        .attr("id",function(d,i){
            return "bargroup_"+airports_dict[d["airport_2"]];
        })
        .attr("opacity",0.6)
        // Mouse over event handler
        .on("mouseover",function(d){
            var this_temp = this;
            onMouseOver(this_temp,d);}
        )
        // Mouse out event handler
        .on("mouseout",function(d){
            var this_temp = this;
            onMouseOut(this_temp,d);}
        );
    // Add text describing data for 2018 
    bar_graph_groups
        .append("text")
        // Unique id for text based on airports_dict dictionary mapping from airport name to index
        .attr("id",function(d,i){
          return "bartext2018_"+airports_dict[d["airport_2"]];
          })
        // Add class "text_out" which sets the default font weight and class "white_text" which makes the default text color white
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        // x and y location for each downward arrow in the chart
        .attr("x", (function(d,i) { return bar_x_regional(i) + bar_x_regional.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return bar_y(0) - text_2018_offset; })
        .attr("dy", ".75em")
        // Value of text depends on value of mode, which indicates if July 4 or Thanksgiving data is displayed
        .text(function(d) {
            if(mode=="july4"){
                return d.Seats_2018; 
            } else if(mode=="thanksgiving"){
                return d.tg_2018;
            }
        });   	 
    // Add text describing data for 2019
    bar_graph_groups
        .append("text")
        .attr("id",function(d,i){
            return "bartext2019_"+airports_dict[d["airport_2"]];
        })
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        .attr("x", (function(d,i) { return bar_x_regional(i) + bar_x_regional.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) + triangle_height + text_2019_offset; })
        .attr("dy", ".75em")
        .text(function(d) { 
            if(mode=="july4"){
                return d.Seats_2019; 
            } else if(mode=="thanksgiving"){
                return d.tg_2019;
            }
        });   	 
    // Add text describing the percent change from 2018 to 2019  
    bar_graph_groups
        .append("text")
        .attr("id",function(d,i){
            return "bartextpercent_"+airports_dict[d["airport_2"]];
        })
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        .attr("x", (function(d,i) { return bar_x_regional(i) + bar_x_regional.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) + text_percent_offset; })
        .attr("dy", ".75em")
        .text(function(d) { return d.percent_change_2018_2019 + "%"; });       
    // Append a circle to surround the destination airport name 
    bar_graph_groups
        .append('circle')
        .attr("id",function(d,i){
            return "barcircle_"+airports_dict[d["airport_2"]];
        })
        .attr("r", function(d){
            return circle_rad;
        })
        .attr("fill","#ffc107")
        // x and y location of the center of the circle
        .attr('cx', function(d,i){ return bar_x_regional(i) + (bar_x_regional.rangeBand()/2);})
        .attr('cy', function(d){ return bar_y(0) - circle_airport2_offset;})
        // Add class "graph_out" which sets the default stroke width and color
        .attr("class","graph_out")
    // Append a rectangle (body of the downward arrow) 
    bar_graph_groups
        .append("rect")
        .attr("id",function(d,i){
            return "barrect_"+airports_dict[d["airport_2"]];
        })
        // Fill color for regional routes
        .style("fill", function(d){
            return "#ea6a47";
        })
        .attr("x", function(d,i) { return bar_x_regional(i); })
        .attr("width", bar_x_regional.rangeBand())
        .attr("y", function(d) { return bar_y(0); })
        .attr("height", function(d) { return bar_y_loc - bar_y(d.percent_change_2018_2019); })
        .attr("class","graph_out")
    // Append a triangle (arrowhead of the downward arrow)
    bar_graph_groups
          .append("polygon")
          .attr("id",function(d,i){
            return "barpolygon_"+airports_dict[d["airport_2"]];
        })
          // Define the points of the triangle
          .attr("points",function(d,i) {
              var overlap = 10;
              var left = bar_x_regional(i) - overlap;
              var top = (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) +triangle_height;
              var bottom = (bar_y_loc*2) - bar_y(d.percent_change_2018_2019);
              return left + ',' + bottom + ' '
                 + (left + (bar_x_regional.rangeBand()/2) + overlap) + ',' + top + ' '
                 + (left + bar_x_regional.rangeBand() + (2 * overlap)) + ',' + bottom;
          })
          .style("opacity",".5")
          .attr("fill", function(d){
                return "#fd7e14";
          })
          .attr("class","graph_out")
    // Append text for the destination airport name
    bar_graph_groups
          .append("text")
          .attr("id",function(d,i){
              return "bartextairport2_"+airports_dict[d["airport_2"]];
          })
          .attr("class","text_out black_text")
          .attr("font-size",font_size)
          .attr("x", (function(d,i) { return bar_x_regional(i) + bar_x_regional.rangeBand() / 2 ; }  ))
          .attr("y", function(d) { return bar_y(0) - text_airport2_offset; })
          .attr("dy", ".75em")
          .text(function(d) { return d.airport_2; });   
}

/**
 * Draw downward arrows in chart for major routes
 */
function drawBarMajor(){
    // Data for d3 data binding and visualization
    var input;
    // Selection of all groups in the chart
    var bar_graph_groups;
    input = data_routes_filt_major;
    // Font size of text based on number of elements in input
    var font_size = text_resize(input);
    // Add a group for each destination airport
    bar_graph_groups = bar_graph.selectAll("g.major")
        .data(input)
        .enter()
        .append("g")
        .classed("major",true)
        // Unique id for group based on airports_dict dictionary mapping from airport name to index
        .attr("id",function(d,i){
            return "bargroup_"+airports_dict[d["airport_2"]];
        })
        .attr("opacity",0.6)
        // Mouse over event handler
        .on("mouseover",function(d){
            var this_temp = this;
            onMouseOver(this_temp,d);}
        )
        // Mouse out event handler
        .on("mouseout",function(d){
            var this_temp = this;
            onMouseOut(this_temp,d);}
        );
    // Append text describing data for 2018
    bar_graph_groups
        .append("text")
        // Unique id for text based on airports_dict dictionary mapping from airport name to index
        .attr("id",function(d,i){
          return "bartext2018_"+airports_dict[d["airport_2"]];
          })
        // Add class "text_out" which sets the default font weight and class "white_text" which makes the default text color white
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        // x and y location for each downward arrow in the chart
        .attr("x", (function(d,i) { return bar_x_major(i) + bar_x_major.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return bar_y(0) - text_2018_offset; })
        .attr("dy", ".75em")
        // Value of text depends on value of mode, which indicates if July 4 or Thanksgiving data is displayed
        .text(function(d) { 
            if(mode=="july4"){
                return d.Seats_2018; 
            } else if(mode=="thanksgiving"){
                return d.tg_2018;
            }
        });   	 
    // Append text describing data for 2019
    bar_graph_groups
        .append("text")
        .attr("id",function(d,i){
            return "bartext2019_"+airports_dict[d["airport_2"]];
        })
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        .attr("x", (function(d,i) { return bar_x_major(i) + bar_x_major.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) + triangle_height + text_2019_offset; })
        .attr("dy", ".75em")
        .text(function(d) { 
            if(mode=="july4"){
                return d.Seats_2019; 
            } else if(mode=="thanksgiving"){
                return d.tg_2019;
            }
        }); 
    // Append text describing percent change from 2018 to 2019  	   
    bar_graph_groups
        .append("text")
        .attr("id",function(d,i){
            return "bartextpercent_"+airports_dict[d["airport_2"]];
        })
        .attr("class","text_out white_text")
        .attr("font-size",font_size)
        .attr("x", (function(d,i) { return bar_x_major(i) + bar_x_major.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) + text_percent_offset; })
        .attr("dy", ".75em")
        .text(function(d) { return d.percent_change_2018_2019 + "%"; });   
    // Append a circle to surround the destination airport name 
    bar_graph_groups
        .append('circle')
        .attr("id",function(d,i){
            return "barcircle_"+airports_dict[d["airport_2"]];
        })
        .attr("r", function(d){
            return circle_rad;
        })
        .attr("fill","#ffc107")
        // x and y location of the center of the circle
        .attr('cx', function(d,i){ return bar_x_major(i) + (bar_x_major.rangeBand()/2);})
        .attr('cy', function(d){ return bar_y(0) - circle_airport2_offset;})
        // Add class "graph_out" which sets the default stroke width and color
        .attr("class","graph_out")
    // Append a rectangle (body of the downward arrow) 
    bar_graph_groups
        .append("rect")
        .attr("id",function(d,i){
            return "barrect_"+airports_dict[d["airport_2"]];
        })
        .style("fill", function(d){
            return "#0091D5";
        })
        .attr("x", function(d,i) { return bar_x_major(i); })
        .attr("width", bar_x_major.rangeBand())
        .attr("y", function(d) { return bar_y(0); })
        .attr("height", function(d) { return bar_y_loc - bar_y(d.percent_change_2018_2019); })
        .attr("class","graph_out")
    // Append a triangle (arrowhead of the downward arrow)
    bar_graph_groups
        .append("polygon")
        .attr("id",function(d,i){
        return "barpolygon_"+airports_dict[d["airport_2"]];
    })
        // Define the points of the triangle
        .attr("points",function(d,i) {
            var overlap = 10;
            var left = bar_x_major(i) - overlap;
            var top = (bar_y_loc*2) - bar_y(d.percent_change_2018_2019) +triangle_height;
            var bottom = (bar_y_loc*2) - bar_y(d.percent_change_2018_2019);
            return left + ',' + bottom + ' '
                + (left + (bar_x_major.rangeBand()/2) + overlap) + ',' + top + ' '
                + (left + bar_x_major.rangeBand() + (2 * overlap)) + ',' + bottom;
        })
        .style("opacity",".5")
        .attr("fill", function(d){
            return "#007bff";
        })
        .attr("class","graph_out")
    // Append text describing the destination airport name
    bar_graph_groups
          .append("text")
          .attr("id",function(d,i){
              return "bartextairport2_"+airports_dict[d["airport_2"]];
          })
          .attr("class","text_out black_text")
          .attr("font-size",font_size)
          .attr("x", (function(d,i) { return bar_x_major(i) + bar_x_major.rangeBand() / 2 ; }  ))
          .attr("y", function(d) { return bar_y(0) - text_airport2_offset; })
          .attr("dy", ".75em")
          .text(function(d) { return d.airport_2; });   
}

/**
 * Redraw the map and chart in the visualization in response to an event
 */
function drawRefresh(){
    // Filter data according to user's selections and create new arrays of filtered data for d3 data binding and visualization 
    // in the map
    filter_routes_map();
    // Create arrays for d3 force edge bundling algorithm
    transform_routes();
    transform_coords();
    // Hide the links and nodes in the map
    edges.transition()
        .duration(0)
        .style("opacity",0);
    // Draw the nodes and links in the map 
    drawData();
    // Remove all elements in the chart
    refreshBar();
    // Set domain and spacing for x axis of chart for regional and major routes
    set_bar_x();
    // Draw downward arrows in chart for regional and major routes
    drawBarRegional();
    drawBarMajor();
    // Draw the legend
    drawBody();
    edges.transition()
        .duration(0)
        .style("opacity",1);
}

/**
 * Return color based on value of input label
 *  @param label string indicating if data is of regional or major routes
 */
function label_color(label){
    if(label=='Regional'){
        return "#ea6a47";
    } else if(label=='Major'){
        return "#0091d5";
    }
}

/**
 * Function defining sorting behavior for objects in data_routes array
 *  @param a First object to compare
 *  @param b Second object to compare
 */
function sortDescending( a, b ) {
    // Define an object as being "greater" than another if it has a smaller value for the field "percent_change_2018_2019"
    if ( a.percent_change_2018_2019 < b.percent_change_2018_2019 ){
      return 1;
    }
    if ( a.percent_change_2018_2019 > b.percent_change_2018_2019 ){
      return -1;
    }
    return 0;
}

/**
 * Draw the map
 */
function drawMap(){
    // D3 Projection
    projection = d3.geo.albersUsa()
    // Translate to center of screen
        .translate([(width1/2)+map_x_offset, height1/2])    
    // Scale down so the entire US is visible
        .scale([1000]);          
            
    // Define path generator
    // Path generator that will convert GeoJSON to SVG paths
    path = d3.geo.path()          
        // Tell path generator to use albersUsa projection     
        .projection(projection);  
}

/**
 * Draw the nodes and links in the map
 */
function drawData(){
    // Remove nodes and links in the node-link graph within the map
    d3.selectAll("#edges path").remove();
    d3.selectAll("#nodes g").remove();
    // Call d3 force edge bundling algorithm on the current node_data and edge_data arrays (contain data depending on user's current
    // selection of filters)
    var fbundling = d3.ForceEdgeBundling()
            .step_size(0.1)
            .compatibility_threshold(0.6)
            .nodes(node_data)
            .edges(edge_data);
    results  = fbundling();	
    // Change output from d3 force edge bundling algorithm into an array of objects with specified properties from attr_data, which
    // contains a limited selection of the properties from routes_data.csv 
    transform_results(results);
    // d3 line generator using x and y properties of data
    var d3line = d3.svg.line()
            .x(function(d){ return d.x; })
            .y(function(d){ return d.y; })
            .interpolate("linear");
    // Add lines to the map
    edges.selectAll("path")
            .data(results)
            .enter()
            .append("path")
            .attr("d", function(d) {return d3line(d["segments"])})
            // Stroke width depends on the value of the "percent_change_2018_2019" field
            .style("stroke-width",function(d){
                return (d["percent_change_2018_2019"]/20);
            })
            // Color of line depends on if the route being represented is a regional or major route
            .style("stroke", function(d){
                if(d["label"]=='Regional'){
                    return "#EA6A47";
                } else if(d["label"]=='Major'){
                    return "#0091D5";
                }
            })
            .style("fill", "none")
            .style('stroke-opacity',0.5)
            .attr("id",function(d,i){
                return "edge_"+airports_dict[d["airport_2"]];
            })
            // Mouseover event handler
            .on("mouseover",function(d){
                var this_temp = this;
                onMouseOver(this_temp,d);}
              )
            // Mouseout event handler
            .on("mouseout",function(d){
                var this_temp = this;
                onMouseOut(this_temp,d);}
            );
    // Add groups to draw the nodes on the map
    var nodes_g = nodes.selectAll('g')
                .data(d3.entries(node_data))
                .enter()
                .append("g")
                .attr("id",function(d){
                    return "nodeg_"+d.key;
                })
    // Add circles for the nodes on the map
    nodes_g.append('circle')
                // If the node is the current origin airport or destination airport, the radius will be large (node_rad_extra)
                // Otherwise, the node radius will be small (node_rad_normal)
                .attr('r', function(d){
                    if((airports_dict[airport_origin]==d.key) || (airports_dict[airport_dest]==d.key)){
                        return node_rad_extra;
                    } else{
                        return node_rad_normal;
                    }
                })
                .attr("class",function(d){
                    if((airports_dict[airport_origin]==d.key) || (airports_dict[airport_dest]==d.key)){
                        return "graph_over";
                    } 
                })
                .attr('fill','#ffc107')
                .attr('cx', function(d){ return d.value.x;})
                .attr('cy', function(d){ return d.value.y;})
                .attr("id",function(d){
                    return "node_"+d.key;
                })
    // Add a text label for each node
    nodes_g.append("text")
                .attr("id",function(d){
                return "nodeText_"+d.key;
                })
                .attr("text-anchor","middle")
                .text(function(d){
                    return airports_dict_rev[d.key];
                })
                .attr("x",function(d){return d.value.x;})
                .attr("y",function(d){return d.value.y+5;})
                // The text will be visible if the node is the current origin airport or destination airport
                // Otherwise, the text will be hidden
                .style("visibility",function(d){
                    if((airports_dict[airport_origin]==d.key) || (airports_dict[airport_dest]==d.key)){
                        return "visible";
                    } else{
                        return "hidden";
                    }
                });
    
}

// Event handler when "July 4" button is clicked
$('#july4_button').click(function () {
    // The "July 4" button is part of a dropdown menu, with which the user can select between "July 4"
    // and "Thanksgiving." The currently selected holiday is displayed as the button's text
    // Change the global variable mode to "july4" so that July 4 data is displayed. Also, change the
    // button text to "July 4"
    mode = "july4";
    if(!document.getElementById("july4_button").classList.toString().includes("active")){
        document.getElementById("july4_button").classList+= " active";
    }
    document.getElementById("thanksgiving_button").classList.remove("active");
    document.getElementById("dropdown_label").innerHTML = "July 4";
    drawRefresh();
});

// Event handler when "Thanksgiving" button is clicked
$('#thanksgiving_button').click(function () {
    // The "Thanksgiving" button is part of a dropdown menu, with which the user can select between "July 4"
    // and "Thanksgiving." The currently selected holiday is displayed as the button's text
    // Change the global variable mode to "thanksgiving" so that Thanksgiving data is displayed. Also, change the
    // button text to "Thanksgiving"
    mode = "thanksgiving";
    if(!document.getElementById("thanksgiving_button").classList.toString().includes("active")){
        document.getElementById("thanksgiving_button").classList+= " active";
    }
    document.getElementById("july4_button").classList.remove("active");
    document.getElementById("dropdown_label").innerHTML = "Thanksgiving";
    drawRefresh();
});

// Event handler when "Clear" button is clicked
$('#clear_button').on('click', function() {
    // Set the global variable airport_dest to null so that data for all destination airports (for the current 
    // origin airport) is displayed
    airport_dest = null;
    // Remove the "disabled" and "no_click" classes from greyed-out items in the control panel so that they
    // can be clicked and their display settings are returned to the default. (These items were greyed out 
    // when the user entered a destination airport in the form, as they are no longer relevant once a 
    // specific destination airport is selected). 
    document.getElementById("radio_all").classList.remove("disabled");
    document.getElementById("radio_all").classList.remove("no_click");
    document.getElementById("radio_regional").classList.remove("disabled");
    document.getElementById("radio_regional").classList.remove("no_click");
    document.getElementById("radio_major").classList.remove("disabled");
    document.getElementById("radio_major").classList.remove("no_click");
    document.getElementById("top_num").classList.remove("disabled");
    document.getElementById("top_num").classList.remove("no_click");
    document.getElementsByClassName("ui-corner-all")[1].style.backgroundColor="";
    document.getElementsByClassName("ui-corner-all")[2].style.backgroundColor="";
    document.getElementsByClassName("ui-corner-all")[3].style.backgroundColor="";
    document.getElementsByClassName("ui-corner-all")[0].style.borderColor="";
        document.getElementsByClassName("ui-corner-all")[1].style.borderColor="";
        document.getElementsByClassName("ui-corner-all")[2].style.borderColor="";
        document.getElementsByClassName("ui-corner-all")[3].style.borderColor="";
    document.getElementsByClassName("ui-corner-all")[0].classList.remove("no_click");
    document.getElementById("dest1").classList.remove("reduced_opacity");
    document.getElementById("destVal").value = '';
    drawRefresh();
});

/**
 * Callback function for zoom event
 */
function zoomed() {
    projection
        .translate(zoom.translate())
        .scale(zoom.scale());
    
    map.selectAll("path")
        .attr("d", path);
    drawRefresh();
}

/**
 * Reformat raw data from routes_data.csv
 */
function transformData(data){
    return data.map(function(row) {
        return {
            Seats_2018: +row.Seats_2018,
            Seats_2019: +row.Seats_2019,
            airport_1: row.airport_1,
            airport_2: row.airport_2,
            cityname_1: row.cityname_1,
            cityname_2: row.cityname_2,
            label: row.label,
            // The percent change in seats offered for July 4 2018 vs July 4 2019
            percent_change_2018_2019: row.percent_change_2018_2019,
            statename_1: row.statename_1,
            statename_2: row.statename_2,
            tg_2018: +row.tg_seats,
            // Add field tg_2019 representing the projected number of seats offered for Thanksgiving 2019 
            // Since this is a projection, estimate the number of seats using the number of seats offered during Thanksgiving 2018
            // and the value of percent_change_2018_2019 
            tg_2019: Math.round((+row.tg_seats) + ((+row.tg_seats)*(row.percent_change_2018_2019/100))),
        }
    })
}

// If the user enters a value in the top_num number input and it is less than 20, set the top_num_filt global variable to that number
d3.select("#top_num").on("input", function(){
    if(+d3.select("#top_num").property("value")<=20){
        top_num_filt = +d3.select("#top_num").property("value");
        drawRefresh();
    }
})

// Event handler for the radio buttons on change event
$("#Radio").change(function(){
    // Once the user selects a radio button, execute the following block of code if no destination airport is selected. 
    // If a destination airport is selected, the radio buttons will be greyed out and unclickable
    if(airport_dest==null){
        // Boolean if "All" radio button is selected
        all_checked = document.getElementsByName("myRadio")[0].checked
        // Boolean if "Regional" radio button is selected
        regional_checked = document.getElementsByName("myRadio")[1].checked
        // Boolean if "Major" radio button is selected
        major_checked = document.getElementsByName("myRadio")[2].checked
        if(all_checked==true){
            // Set the label_filter to "None" indicating that the data_routes_filt array containing data for d3 data binding and 
            // visualization should contain data for both regional and major routes
            label_filter = "None";
            // Set the x offset of the chart so that the legend is centered in the visualization
            bar_x_loc = width2/2;
        } else if(regional_checked==true){
            // Set the label_filter to "Regional" indicating that the data_routes_filt array containing data for d3 data binding and 
            // visualization should contain data for only regional routes
            label_filter = "Regional";
            // Set the x offset of the chart so that the legend is on the right hand side of the visualization
            bar_x_loc = width2 - 100;
    
        } else if(major_checked==true){
            // Set the label_filter to "Major" indicating that the data_routes_filt array containing data for d3 data binding and 
            // visualization should contain data for only major routes
            label_filter = "Major";
            // Set the x offset of the chart so that the legend is on the left hand side of the visualization
            bar_x_loc = 100;
        } 
        drawRefresh();
    }
})

// Load data and draw the map and chart of the visualization
// Load geographical data of US states
d3.json("https://raw.githubusercontent.com/cchinchristopherj/Holiday-Travel/master/us-states.json", function(json) {
    $( function() {
        // Set parameters for jQuery slider
        $( "#slider-range" ).slider({
          range: true,
          // Visualization depicts airline routes that experienced a specified range of percent decreases in seat capacity
          // "values" is the full range of percent decrease values that can be displayed
          values: [1,100],
          slide: function( event, ui ) {
            // Upper value slider is set to (maximum percent decrease to display)
            percent_filter_max = ui.values[1];
            // Lower value slider is set to (minimum percent decrease to display)
            percent_filter_min = ui.values[0];
            // Change text of header element to reflect range of percent decrease values to display
            $( "#amount" ).text("Percent Decrease: " + ui.values[0] + "% to " + ui.values[1] +"%");
            drawRefresh();
          }
        });
    });
    svg1 = d3.select("#svg1")
        .append("svg")
        .attr("width", width1)
        .attr("height", height1);
    svg2 = d3.select("#svg2")
        .append("svg")
        .attr("width",width2)
        .attr("height",height2)
    // Append a group to svg1 for the map
    map = svg1.append("g")
     .attr("id","map");
    // Append a group to svg2 for the chart
    bar = svg2.append("g")
        .attr("id","bar")
    // Append a group to svg1 for the node-link graph of airline routes
    network = svg1.append("g");
    // Append a group to bar for the chart elements
    bar_graph = bar.append("g");
    // Selection of radio buttons on the page
    buttons = d3.select("#buttons");
    // Append a group to network for the edges of the node-link graph
    edges = network.append("g")
        .attr("id","edges");
    // Append a group to network for the nodes of the node-link graph
    nodes = network.append("g")
        .attr("id","nodes");
    // Draw the map
    drawMap();
    // Bind the data in us-states.json to the svg and create one path per GeoJSON feature to draw the map of the U.S. 
    map.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1");
    // Load latitude longitude information for airports
    d3.csv("https://raw.githubusercontent.com/cchinchristopherj/Holiday-Travel/master/airports_lat_long.csv",function(rawData_coords){
        // Use initialize_coords function to create airports_dict, which maps an airport name to an index
        // Also create airports_dict_rev, which contains the reverse mapping
        data_coords = rawData_coords;
        initialize_coords(rawData_coords);
        // Load data on airline routes and corresponding percent change in seats for July 4 and Thanksgiving holidays
        d3.csv("https://raw.githubusercontent.com/cchinchristopherj/Holiday-Travel/master/routes_data.csv",function(rawData_routes){
            // Reformat raw data
            data_routes = transformData(rawData_routes);
            data_routes_filt = data_routes;
            // Change the value of the "percent_change_2018_2019" field in each element of data_routes to its absolute value
            scale_percent_change(data_routes);
            // Filter data according to user's selections and create new arrays of filtered data for d3 data binding and visualization 
            // in the map and chart
            filter_routes_map();
            filter_routes_bar();
            // Create arrays for d3 force edge bundling algorithm
            transform_routes();
            transform_coords();
            // Draw the nodes and links in the map
            drawData();
            // Set domain and spacing for x axis of chart for regional and major routes
            set_bar_x();
            // Draw downward arrows in chart for regional routes and major routes
            drawBarRegional();
            drawBarMajor();
            // Draw the legend
            drawBody();
            // Set zoom for the map
            map.call(zoom)
                .call(zoom.event);
        });
    }) 
});
