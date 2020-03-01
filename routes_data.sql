-- Create Table of "major" airports, defined as Large Hub Primary Commercial Service Airports
create table #major_airports_pre
(Airport char (11)); 
INSERT INTO #major_airports_pre (Airport)
VALUES ('PHX'),('LAX'),('SFO'),('SAN'),('DEN'),('MCO'),('MIA'),('FLL'),('TPA'),('ATL'),('HNL'),('ORD'),('MDW'),('BOS'),('BWI'),('DTW'),('MSP'),('CLT'),('EWR'),('LAS'),('JFK'),('LGA'),('PDX'),('PHL'),('DFW'),('IAH'),
('SLC'),('IAD'),('DCA'),('SEA');

-- Create Table of "regional" airports, defined as Medium Hub and Small Hub Primary Commercial Service Airports
create table #regional_airports_pre
(Airport char (11)); 

INSERT INTO #regional_airports_pre (Airport)
VALUES ('ANC'),('FAI'),('JNU'),('BET'),('KTN'),('ENA'),('SIT'),('ADQ'),('OTZ'),('OME'),('HOM'),('BRW'),('AKN'),('SCC'),('DLG'),('DUT'),('PSG'),('CDV'),('UNK'),
('WRG'),('AKW'),('LHD'),('ANI'),('YAK'),('KSM'),('VDZ'),('BHM'),('HSV'),('MOB'),('MGM'),('DHN'),('LIT'),('XNA'),('FSM'),('TXK'),('PPG'),('TUS'),('IWA'),('IFP'),('GCN'),('NYL'),
('FLG'),('PGA'),('PRC'),('SJC'),('OAK'),('SMF'),('SNA'),('BUR'),('ONT'),('LGB'),('PSP'),('FAT'),('SBA'),('SBP'),('STS'),('MRY'),('BFL'),('SCK'),('ACV'),('RDD'),('MMH'),('SMX'),
('CCR'),('COS'),('ASE'),('GJT'),('DRO'),('EGE'),('MTJ'),('HDN'),('GUC'),('PUB'),('BDL'),('HVN'),('RSW'),('PBI'),('JAX'),('SFB'),('PIE'),('PNS'),('PGD'),('SRQ'),('VPS'),('ECP'),
('EYW'),('TLH'),('DAB'),('MLB'),('GNV'),('VRB'),('SAV'),('AGS'),('CSG'),('VLD'),('BQK'),('ABY'),('MCN'),('GUM'),('OGG'),('KOA'),('LIH'),('ITO'),('MKK'),('LNY'),('DSM'),('CID'),
('SUX'),('DBQ'),('ALO'),('BOI'),('IDA'),('SUN'),('LWS'),('TWF'),('PIH'),('MLI'),('PIA'),('BMI'),('BLV'),('CMI'),('RFD'),('SPI'),('UIN'),('MWA'),('IND'),('FWA'),('SBN'),('EVV'),
('ICT'),('MHK'),('GCK'),('SLN'),('HYS'),('CVG'),('SDF'),('LEX'),('PAH'),('OWB'),('MSY'),('BTR'),('SHV'),('LFT'),('AEX'),('MLU'),('LCH'),('ACK'),('ORH'),('MVY'),('HYA'),('BED'),
('PVC'),('SBY'),('HGR'),('PWM'),('BGR'),('RKD'),('PQI'),('GRR'),('FNT'),('TVC'),('LAN'),('AZO'),('MBS'),('SAW'),('PLN'),('CMX'),('CIU'),('IMT'),('MKG'),('ESC'),('APN'),('RST'),
('DLH'),('BJI'),('STC'),('BRD'),('INL'),('HIB'),('STL'),('MCI'),('SGF'),('COU'),('JLN'),('GSN'),('TNI'),('GRO'),('JAN'),('GPT'),('GTR'),('MEI'),('TUP'),('BZN'),('BIL'),('MSO'),
('GPI'),('GTF'),('HLN'),('BTM'),('WYS'),('RDU'),('GSO'),('AVL'),('ILM'),('FAY'),('OAJ'),('JQF'),('EWN'),('PGV'),('FAR'),('BIS'),('MOT'),('GFK'),('ISN'),('DIK'),('JMS'),('OMA'),
('LNK'),('GRI'),('LBF'),('BFF'),('MHT'),('PSM'),('LEB'),('ACY'),('TTN'),('ABQ'),('SAF'),('ROW'),('HOB'),('RNO'),('BVU'),('EKO'),('BUF'),('ALB'),('ROC'),('SYR'),('ISP'),('HPN'),
('SWF'),('ELM'),('PBG'),('IAG'),('ITH'),('BGM'),('ART'),('OGS'),('CLE'),('CMH'),('DAY'),('CAK'),('LCK'),('TOL'),('OKC'),('TUL'),('LAW'),('SWO'),('EUG'),('MFR'),('RDM'),('OTH'),
('PIT'),('MDT'),('ABE'),('AVP'),('UNV'),('LBE'),('ERI'),('IPT'),('SJU'),('BQN'),('PSE'),('VQS'),('RVR'),('CPX'),('SIG'),('PVD'),('WST'),('BID'),('CHS'),('MYR'),('GSP'),('CAE'),
('FLO'),('HXD'),('FSD'),('RAP'),('PIR'),('ABR'),('ATY'),('BNA'),('MEM'),('TYS'),('CHA'),('TRI'),('DAL'),('AUS'),('HOU'),('SAT'),('ELP'),('MAF'),('LBB'),('AMA'),('MFE'),('CRP'),
('HRL'),('GRK'),('BRO'),('LRD'),('CLL'),('ABI'),('ACT'),('SJT'),('TYR'),('SPS'),('BPT'),('GGG'),('SGU'),('PVU'),('OGD'),('CDC'),('CNY'),('VEL'),('RIC'),('ORF'),('CHO'),('ROA'),
('PHF'),('LYH'),('SHD'),('STT'),('STX'),('BTV'),('GEG'),('PSC'),('BLI'),('YKM'),('PUW'),('EAT'),('ALW'),('BFI'),('FHR'),('MKE'),('MSN'),('ATW'),('GRB'),('CWA'),('LSE'),('RHI'),
('EAU'),('CRW'),('HTS'),('CKB'),('LWB'),('JAC'),('CPR'),('COD'),('GCC'),('RKS'),('LAR'),('SHR'),('RIW');


-- Latitude and longitude information for airports
select Airport,Latitude as lat_num,Longitude as long_num
into #airports_latlong
from OAIL_AirportID
where AirportCountryName='United States' and AirportIsClosed=0;

-- Join the major airports table with latitude longitude information
select #major_airports_pre.Airport,#airports_latlong.lat_num,#airports_latlong.long_num
into #major_airports
from #major_airports_pre
inner join #airports_latlong on #major_airports_pre.Airport=#airports_latlong.Airport;

-- Join the regional airports table with latitude longitude information
select #regional_airports_pre.Airport,#airports_latlong.lat_num,#airports_latlong.long_num
into #regional_airports
from #regional_airports_pre
inner join #airports_latlong on #regional_airports_pre.Airport=#airports_latlong.Airport;

-- Table of information on airports and their corresponding cities
SELECT apt.airportid, apt.airport, apt.airportname, cty.citymarketid, cty.citymarketwac, 
cty.citymarketname||', '||case when cty.citymarketwac < 100 then cty.citymarketstatecode else 
cty.citymarketcountrycodeiso end as citymarketnme, cty.citymarketcountrycodeiso||cty.citymarketname||case 
when cty.citymarketwac < 100 then cty.citymarketstatecode else cty.citymarketcountrycodeiso end||apt.airport as citymarketnmesrt,
citymarketstatecode 
INTO #aptcty 
FROM oail_airportid as apt 
LEFT OUTER JOIN oail_citymarketid as cty on apt.citymarketid = cty.citymarketid; 

-- Table to convert carrier code into airline id and flag whether a carrier is domestic
SELECT min(cast (datepart(year, startdate)||datepart(quarter, startdate) as bigint)) as st_dte, 
max(cast (datepart(year, enddate)||datepart (quarter, enddate) as bigint)) as end_dte, airlineid, carrier as car_code, 
case when wac < 100 then 'Dom Flg Car' else 'Int Flg Car' end as car_flag, 
case when airlineid in (20368, 19393, 20436, 20409, 20416) then 1 else 0 end as lcc_Car 
INTO #car 
from oair_cardecode 
GROUP BY airlineid, car_code, car_flag, lcc_car; 

-- Table unique by airline id
SELECT #car.airlineid, car_code, car_flag, lcc_car 
INTO #car_airlineid 
FROM #car 
INNER JOIN (
                select airlineid, max(end_dte) as end_dte 
                from #car group by airlineid) as a 
on #car.airlineid = a.airlineid and #car.end_dte = a.end_dte; 

-- Table containing a subset of the OnTime database of domestic flights in 2017, 2018, and 2019
select *,airport_1+'-'+airport_2 as route,cityname_1+'-'+cityname_2 as city_route
into #oair_ontime
from
(select oairestricted.oair_ontimenew.year, oairestricted.oair_ontimenew.quarter, oairestricted.oair_ontimenew.month, oairestricted.oair_ontimenew.DayofMonth, oairestricted.oair_ontimenew.DayOfWeek, oairestricted.oair_ontimenew.FlightDate, oairestricted.oair_ontimenew.DepTime, oairestricted.oair_ontimenew.OpUniqueCarrier, oairestricted.oair_ontimenew.TailNum, oairestricted.oair_ontimenew.Cancelled, #car_airlineid.car_flag,#car_airlineid.airlineid,
case when t1.citymarketnmesrt < t2.citymarketnmesrt then oairestricted.oair_ontimenew.Origin else oairestricted.oair_ontimenew.Dest end as airport_1,
case when t1.citymarketnmesrt < t2.citymarketnmesrt then oairestricted.oair_ontimenew.Dest else oairestricted.oair_ontimenew.Origin end as airport_2,
case when t1.citymarketnmesrt < t2.citymarketnmesrt then OriginCityName else DestCityName end as cityname_1,
case when t1.citymarketnmesrt < t2.citymarketnmesrt then DestCityName else OriginCityName end as cityname_2
from oairestricted.oair_ontimenew
LEFT OUTER JOIN #aptcty  as t1 on oairestricted.oair_ontimenew.OriginAirportID=t1.airportid
LEFT OUTER JOIN #aptcty  as t2 on oairestricted.oair_ontimenew.DestAirportID=t2.airportid
LEFT OUTER JOIN  #car_airlineid on oairestricted.oair_ontimenew.OpAirlineID=#car_airlineid.airlineid
where oairestricted.oair_ontimenew.year in (2017,2018,2019) and OriginState not in ('TT','PR','VI','AS','FM','GU','MH','MP','PW','UM') and DestState not in ('TT','PR','VI','AS','FM','GU','MH','MP','PW','UM') and (#car_airlineid.car_flag='Dom Flg Car' or #car_airlineid.airlineid is null)) as new_table;

-- Tail number will be used to calculate the number of seats on each flight using the B43 database.
-- For all tail numbers that do not appear in the B43 database or have a null value, the process to estimate a value is as follows:
-- Group the B43 database by carrier. Then examine all tail numbers corresponding to each carrier. Calculate the average number of seats corresponding to all tail numbers associated with every carrier.
-- For tail numbers that do not appear in the B43 database or have a null value, the estimated value will be the average value calculated using this procedure for the carrier associated with the flight
select UNIQUE_CARRIER,round(avg(SEAT_CONFIG),0) as avg_Seat_CONFIG
into #carrier_avg_seats
from OAIR_F41ScheduleB43 
group by UNIQUE_CARRIER; 

-- For some tail numbers that do not appear in the B43 database or have a null value, the carrier associated with the flight does not appear in the B43 database.
-- Therefore, it is not possible to use the estimated value from the previous table.
-- In these cases, the process to estimate a value is as follows:
-- Calculate the average number of seats corresponding to all tail numbers and use that average value as the estimated value.
-- The average number of seats corresponding to all tail numbers is 94. 
select avg(SEAT_CONFIG) as overall_avg_SEAT_CONFIG
from OAIR_F41ScheduleB43;

-- Table of seats on each flight for Thanksgiving 2018 routes. Thanksgiving 2018 is defined as the five-day travel period starting the Wednesday before and ending the Sunday after.
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #tg_allcarriers
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2018-11-21','2018-11-22','2018-11-23','2018-11-24','2018-11-25') and Cancelled=0;

-- Table of flights from #tg_allcarriers where the number of seats associated with a tail number is not null
select *
into #tg_allcarriers_not_null
from #tg_allcarriers
where SEAT_CONFIG is not null;

-- For all flights in #tg_allcarriers where the number of seats associated with a tail number is null and the carrier appears in B43, replace the null value with an estimated value (as described for table #carrier_avgseats).
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #tg_allcarriers_avg
from #tg_allcarriers
left join #carrier_avg_seats on #tg_allcarriers.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #tg_allcarriers.SEAT_CONFIG is null;

-- For all flights in #tg_allcarriers where the number of seats associated with a tail number is null and the carrier does not appear in B43, replace the null value with the average number of seats for all tail numbers in B43
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #tg_allcarriers_overall_avg
from #tg_allcarriers_avg;

-- Join the results of #tg_allcarriers_not_null and #tg_allcarriers_overall_avg
select *
into #tg_allcarriers_final
from #tg_allcarriers_not_null
union all select *
from #tg_allcarriers_overall_avg;

-- Group the flights in #tg_allcarriers_final by route and calculate the seats per day for each route
select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/5 as Seats
into #tg_allcarriers_grouped
from #tg_allcarriers_final
group by airport_1,airport_2,cityname_1,cityname_2;




-- Calculate the total number of seats per day offered on Thanksgiving 2018 routes
select sum(Seats) from #tg_allcarriers_grouped;

-- All subsequent analysis focuses solely on flights by carriers AA (American Airlines), UA (United Airlines), and WN (Southwest Airlines). 
-- These are the airlines affected by the 737 Max Grounding. 

-- Table of seats on each flight for Thanksgiving 2018 routes offered by AA, UA, WN. Thanksgiving 2018 is defind as the five-day travel period starting the Wednesday before and ending the Sunday after.
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #tg
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2018-11-21','2018-11-22','2018-11-23','2018-11-24','2018-11-25') and Cancelled=0 and OpUniqueCarrier in ('AA','UA','WN');

-- Table of flights from #tg where the number of seats associated with a tail number is not null
select *
into #tg_not_null
from #tg
where SEAT_CONFIG is not null;

-- For all flights in #tg where the number of seats associated with a tail number is null and the carrier appears in B43, replace the null value with an estimated value (as described for table #carrier_avgseats).
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #tg_avg
from #tg
left join #carrier_avg_seats on #tg.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #tg.SEAT_CONFIG is null;

-- For all flights in #tg where the number of seats associated with a tail number is null and the carrier does not appear in B43, replace the null value with the average number of seats for all tail numbers in B43
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #tg_overall_avg
from #tg_avg;

-- Join the results of #tg_not_null and #tg_overall_avg
select *
into #tg_final
from #tg_not_null
union all select *
from #tg_overall_avg;

-- Group the flights in #tg_final by route and calculate the seats per day for each route
select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/5 as Seats
into #tg_grouped
from #tg_final
group by airport_1,airport_2,cityname_1,cityname_2;

-- Calculate the total number of seats per day offered on Thanksgiving 2018 routes by AA, UA, WN
select sum(Seats) from #tg_grouped;

-- To reiterate, all subsequent analysis focuses solely on AA, UA, and WN and this detail will not be repeated in the comments. 

-- Table of Thanksgiving 2018 routes where the Origin and/or Destination airport is a "regional" airport
select distinct #tg_grouped.airport_1,#tg_grouped.airport_2,#tg_grouped.cityname_1,#tg_grouped.cityname_2,#tg_grouped.Seats
into #tg_regional
from #tg_grouped
inner join #regional_airports on ((#tg_grouped.airport_1 = #regional_airports.Airport) or (#tg_grouped.airport_2 = #regional_airports.Airport));

-- Table of Thanksgiving 2018 routes where the Origin and Destination airport are "major" airports
select distinct #tg_grouped.airport_1,#tg_grouped.airport_2,#tg_grouped.cityname_1,#tg_grouped.cityname_2,#tg_grouped.Seats
into #tg_major_pre
from #tg_grouped
inner join #major_airports on (#tg_grouped.airport_1 = #major_airports.Airport); 

select distinct #tg_major_pre.airport_1,#tg_major_pre.airport_2,#tg_major_pre.cityname_1,#tg_major_pre.cityname_2,#tg_major_pre.Seats
into #tg_major
from #tg_major_pre
inner join #major_airports on (#tg_major_pre.airport_2 = #major_airports.Airport); 

-- In order to compare "non-Thanksgiving" travel to "Thanksgiving" travel, a similar five-day travel period in November is selected for comparison. 
-- This five-day travel period was chosen to be the first Wednesday through Sunday period in November starting November 7 and ending November 11. 
-- Table of seats on each flight for "non-Thanksgiving" 2018
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #not_tg
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2018-11-07','2018-11-08','2018-11-09','2018-11-10','2018-11-11') and Cancelled=0 and OpUniqueCarrier in ('AA','UA','WN');

-- Table of flights from #not_tg where the number of seats associated with a tail number is not null
select *
into #not_tg_not_null
from #not_tg
where SEAT_CONFIG is not null;

-- For all flights in #not_tg where the number of seats associated with a tail number is null and the carrier appears in B43, replace the null value with an estimated value (as described for table #carrier_avgseats).
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #not_tg_avg
from #not_tg
left join #carrier_avg_seats on #not_tg.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #not_tg.SEAT_CONFIG is null;

-- For all flights in #not_tg where the number of seats associated with a tail number is null and the carrier does not appear in B43, replace the null value with the average number of seats for all tail numbers in B43
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #not_tg_overall_avg
from #not_tg_avg;

-- Join the results of #not_tg_not_null and #not_tg_overall_avg
select *
into #not_tg_final
from #not_tg_not_null
union all select *
from #not_tg_overall_avg;

-- Group the flights in #not_tg_final by route and calculate the seats per day for each route
select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/5 as Seats
into #not_tg_grouped
from #not_tg_final
group by airport_1,airport_2,cityname_1,cityname_2;

-- Table of "not-Thanksgiving" 2018 routes where the Origin and/or Destination airport is a "regional" airport
select distinct #not_tg_grouped.airport_1,#not_tg_grouped.airport_2,#not_tg_grouped.cityname_1,#not_tg_grouped.cityname_2,#not_tg_grouped.Seats
into #not_tg_regional
from #not_tg_grouped
inner join #regional_airports on ((#not_tg_grouped.airport_1 = #regional_airports.Airport) or (#not_tg_grouped.airport_2 = #regional_airports.Airport));

-- Table of "not-Thanksgiving" 2018 routes where the Origin and Destination airport are "major" airports
select distinct #not_tg_grouped.airport_1,#not_tg_grouped.airport_2,#not_tg_grouped.cityname_1,#not_tg_grouped.cityname_2,#not_tg_grouped.Seats
into #not_tg_major_pre
from #not_tg_grouped
inner join #major_airports on (#not_tg_grouped.airport_1 = #major_airports.Airport);

select distinct #not_tg_major_pre.airport_1,#not_tg_major_pre.airport_2,#not_tg_major_pre.cityname_1,#not_tg_major_pre.cityname_2,#not_tg_major_pre.Seats
into #not_tg_major
from #not_tg_major_pre
inner join #major_airports on (#not_tg_major_pre.airport_2 = #major_airports.Airport);

-- Regional routes are defined as those where either the Origin or Destination airport is a "regional" airport
-- Major routes are defined as those where both the Origin and Destination airport are "major" airports

-- For regional routes in common between Thanksgiving 2018 and "not-Thanksgiving" 2018, this table lists the difference in number of seats offered during these two travel periods
select #tg_regional.airport_1,#tg_regional.airport_2,#tg_regional.cityname_1,#tg_regional.cityname_2,#not_tg_regional.Seats as Seats_nottg,(#tg_regional.Seats - #not_tg_regional.Seats) as diff_Seats,((#tg_regional.Seats - #not_tg_regional.Seats)*100)/#not_tg_regional.Seats as percent_change
into #tg_not_regional
from #tg_regional
inner join #not_tg_regional on #tg_regional.airport_1=#not_tg_regional.airport_1 and #tg_regional.airport_2=#not_tg_regional.airport_2 and #tg_regional.cityname_1=#not_tg_regional.cityname_1 and #tg_regional.cityname_2=#not_tg_regional.cityname_2
order by (#tg_regional.Seats - #not_tg_regional.Seats) desc;

-- For major routes in common between Thanksgiving 2018 and "not-Thanksgiving" 2018, this table lists the difference in number of seats offered during these two travel periods
select #tg_major.airport_1,#tg_major.airport_2,#tg_major.cityname_1,#tg_major.cityname_2,#not_tg_major.Seats as Seats_nottg,(#tg_major.Seats - #not_tg_major.Seats) as diff_Seats,((#tg_major.Seats - #not_tg_major.Seats)*100)/#not_tg_major.Seats as percent_change
into #tg_not_major
from #tg_major
inner join #not_tg_major on #tg_major.airport_1=#not_tg_major.airport_1 and #tg_major.airport_2=#not_tg_major.airport_2 and #tg_major.cityname_1=#not_tg_major.cityname_1 and #tg_major.cityname_2=#not_tg_major.cityname_2
order by (#tg_major.Seats - #not_tg_major.Seats) DESC; 

-- For all routes in common between Thanksgiving 2018 and "not-Thanksgiving" 2018, this table lists the difference in number of seats offered during these two travel periods
select #tg_grouped.airport_1,#tg_grouped.airport_2,#tg_grouped.cityname_1,#tg_grouped.cityname_2,#not_tg_grouped.Seats as Seats_nottg,(#tg_grouped.Seats - #not_tg_grouped.Seats) as diff_Seats,((#tg_grouped.Seats - #not_tg_grouped.Seats)*100)/#not_tg_grouped.Seats as percent_change
into #tg_not_all
from #tg_grouped
inner join #not_tg_grouped on #tg_grouped.airport_1=#not_tg_grouped.airport_1 and #tg_grouped.airport_2=#not_tg_grouped.airport_2 and #tg_grouped.cityname_1=#not_tg_grouped.cityname_1 and #tg_grouped.cityname_2=#not_tg_grouped.cityname_2
order by (#tg_grouped.Seats - #not_tg_grouped.Seats) desc;

-- For all major routes in common between Thanksgiving 2018 and "not-Thanksgiving" 2018, calculate the total number of additional seats offered during Thanksgiving 2018 compared to "not-Thanksgiving" 2018
select sum(diff_seats) from #tg_not_major
where diff_seats>0;

-- For all regional routes in common between Thanksgiving 2018 and "not-Thanksgiving" 2018, calculate the total number of additional seats offered during Thanksgiving 2018 compared to "not-Thanksgiving" 2018
select sum(diff_seats) from #tg_not_regional
where diff_seats>0;

-- Analysis from this point on examines travel during the July 4 holiday period. To predict the impact of the 737 Max Grounding on Thanksgiving 2019 travel, the grounding's impact on a similar holiday travel period (July 4 2019) is examined.
-- This impact is examined by comparing July 4 2019 holiday travel (post grounding) to July 4 2018 holiday travel (pre grounding). July 4 2017 boliday travel is also included in the analysis to provide a comparison between July 4 2018 holiday travel and the year before.

-- Table of seats on each flight for July 4 2017 travel (defined as the six day period around July 4 2017)
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #july4_2017
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2017-06-30','2017-07-01','2017-07-02','2017-07-02','2017-07-03','2017-07-04') and Cancelled=0 and OpUniqueCarrier in ('AA','UA','WN');

-- Table of flights from #july4_2017 where the number of seats associated with a tail number is not null
select *
into #july4_2017_not_null
from #july4_2017
where SEAT_CONFIG is not null;

-- For all flights in #july4_2017 where the number of seats associated with a tail number is null and the carrier appears in B43, replace the null value with an estimated value (as described for table #carrier_avgseats).
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #july4_2017_avg
from #july4_2017
left join #carrier_avg_seats on #july4_2017.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #july4_2017.SEAT_CONFIG is null;

-- For all flights in #july4_2017 where the number of seats associated with a tail number is null and the carrier does not appear in B43, replace the null value with the average number of seats for all tail numbers in B43
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #july4_2017_overall_avg
from #july4_2017_avg;

-- Join the results of #july4_2017_not_null and #july4_2017_overall_avg
select *
into #july4_2017_final
from #july4_2017_not_null
union all select *
from #july4_2017_overall_avg;

-- Group the flights in #july4_2017_final by route and calculate the seats per day for each route
select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/6 as Seats
into #july4_2017_grouped
from #july4_2017_final
group by airport_1,airport_2,cityname_1,cityname_2;

-- Table of July 4 2017 routes where the Origin and/or Destination airport is a "regional" airport
select distinct #july4_2017_grouped.airport_1,#july4_2017_grouped.airport_2,#july4_2017_grouped.cityname_1,#july4_2017_grouped.cityname_2,#july4_2017_grouped.Seats
into #july4_2017_regional
from #july4_2017_grouped
inner join #regional_airports on ((#july4_2017_grouped.airport_1 = #regional_airports.Airport) or (#july4_2017_grouped.airport_2 = #regional_airports.Airport));

-- Table of July 4 2017 routes where the Origin and Destination airport are "major" airports
select distinct #july4_2017_grouped.airport_1,#july4_2017_grouped.airport_2,#july4_2017_grouped.cityname_1,#july4_2017_grouped.cityname_2,#july4_2017_grouped.Seats
into #july4_2017_major_pre
from #july4_2017_grouped
inner join #major_airports on (#july4_2017_grouped.airport_1 = #major_airports.Airport);

select distinct #july4_2017_major_pre.airport_1,#july4_2017_major_pre.airport_2,#july4_2017_major_pre.cityname_1,#july4_2017_major_pre.cityname_2,#july4_2017_major_pre.Seats
into #july4_2017_major
from #july4_2017_major_pre
inner join #major_airports on (#july4_2017_major_pre.airport_2 = #major_airports.Airport);

-- Repeat procedure above analyzing July 4 2017 travel for July 4 2018 travel
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #july4_2018
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2018-07-03','2018-07-04','2018-07-05','2018-07-06','2018-07-07','2018-07-08') and Cancelled=0 and OpUniqueCarrier in ('AA','UA','WN');

select *
into #july4_2018_not_null
from #july4_2018
where SEAT_CONFIG is not null;

select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #july4_2018_avg
from #july4_2018
left join #carrier_avg_seats on #july4_2018.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #july4_2018.SEAT_CONFIG is null;

select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #july4_2018_overall_avg
from #july4_2018_avg;

select *
into #july4_2018_final
from #july4_2018_not_null
union all select *
from #july4_2018_overall_avg;

select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/6 as Seats
into #july4_2018_grouped
from #july4_2018_final
group by airport_1,airport_2,cityname_1,cityname_2;

select distinct #july4_2018_grouped.airport_1,#july4_2018_grouped.airport_2,#july4_2018_grouped.cityname_1,#july4_2018_grouped.cityname_2,#july4_2018_grouped.Seats
into #july4_2018_regional
from #july4_2018_grouped
inner join #regional_airports on ((#july4_2018_grouped.airport_1 = #regional_airports.Airport) or (#july4_2018_grouped.airport_2 = #regional_airports.Airport));

select distinct #july4_2018_grouped.airport_1,#july4_2018_grouped.airport_2,#july4_2018_grouped.cityname_1,#july4_2018_grouped.cityname_2,#july4_2018_grouped.Seats
into #july4_2018_major_pre
from #july4_2018_grouped
inner join #major_airports on (#july4_2018_grouped.airport_1 = #major_airports.Airport);

select distinct #july4_2018_major_pre.airport_1,#july4_2018_major_pre.airport_2,#july4_2018_major_pre.cityname_1,#july4_2018_major_pre.cityname_2,#july4_2018_major_pre.Seats
into #july4_2018_major
from #july4_2018_major_pre
inner join #major_airports on (#july4_2018_major_pre.airport_2 = #major_airports.Airport);

-- Repeat procedure above analyzing July 4 2017 and July 4 2018 travel for July 4 2019 travel
select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,SEAT_CONFIG
into #july4_2019
from #oair_ontime
left join OAIR_F41ScheduleB43 on OAIR_F41ScheduleB43.LICENSE_NUMBER=#oair_ontime.TailNum and OAIR_F41ScheduleB43.UNIQUE_CARRIER=#oair_ontime.OpUniqueCarrier and OAIR_F41ScheduleB43.year=#oair_ontime.year
where FlightDate in ('2019-07-03','2019-07-04','2019-07-05','2019-07-06','2019-07-07') and Cancelled=0 and OpUniqueCarrier in ('AA','UA','WN');

select *
into #july4_2019_not_null
from #july4_2019
where SEAT_CONFIG is not null;

select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,#carrier_avg_seats.avg_SEAT_CONFIG as SEAT_CONFIG
into #july4_2019_avg
from #july4_2019
left join #carrier_avg_seats on #july4_2019.OpUniqueCarrier=#carrier_avg_Seats.UNIQUE_CARRIER
where #july4_2019.SEAT_CONFIG is null;

select airport_1,airport_2,cityname_1,cityname_2,OpUniqueCarrier,TailNum,ISNULL(SEAT_CONFIG,94) as SEAT_CONFIG
into #july4_2019_overall_avg
from #july4_2019_avg;

select *
into #july4_2019_final
from #july4_2019_not_null
union all select *
from #july4_2019_overall_avg;

select airport_1,airport_2,cityname_1,cityname_2,sum(SEAT_CONFIG)/5 as Seats
into #july4_2019_grouped
from #july4_2019_final
group by airport_1,airport_2,cityname_1,cityname_2;

select distinct #july4_2019_grouped.airport_1,#july4_2019_grouped.airport_2,#july4_2019_grouped.cityname_1,#july4_2019_grouped.cityname_2,#july4_2019_grouped.Seats
into #july4_2019_regional
from #july4_2019_grouped
inner join #regional_airports on ((#july4_2019_grouped.airport_1 = #regional_airports.Airport) or (#july4_2019_grouped.airport_2 = #regional_airports.Airport));

select distinct #july4_2019_grouped.airport_1,#july4_2019_grouped.airport_2,#july4_2019_grouped.cityname_1,#july4_2019_grouped.cityname_2,#july4_2019_grouped.Seats
into #july4_2019_major_pre
from #july4_2019_grouped
inner join #major_airports on (#july4_2019_grouped.airport_1 = #major_airports.Airport);

select distinct #july4_2019_major_pre.airport_1,#july4_2019_major_pre.airport_2,#july4_2019_major_pre.cityname_1,#july4_2019_major_pre.cityname_2,#july4_2019_major_pre.Seats
into #july4_2019_major
from #july4_2019_major_pre
inner join #major_airports on (#july4_2019_major_pre.airport_2 = #major_airports.Airport);

-- For regional routes in common between July 4 2018 travel and July 4 2019 travel, this table lists the difference in number of seats offered during these two travel periods
select #july4_2018_regional.airport_1,#july4_2018_regional.airport_2,#july4_2018_regional.cityname_1,#july4_2018_regional.cityname_2,#july4_2018_regional.Seats as Seats_2018,#july4_2019_regional.Seats as Seats_2019,(#july4_2019_regional.Seats - #july4_2018_regional.Seats) as diff_Seats,((#july4_2019_regional.Seats - #july4_2018_regional.Seats)*100)/#july4_2018_regional.Seats as percent_change
into #july4_2018_2019_regional
from #july4_2018_regional
inner join #july4_2019_regional on #july4_2018_regional.airport_1=#july4_2019_regional.airport_1 and #july4_2018_regional.airport_2=#july4_2019_regional.airport_2 and #july4_2018_regional.cityname_1=#july4_2019_regional.cityname_1 and #july4_2018_regional.cityname_2=#july4_2019_regional.cityname_2
order by (#july4_2019_regional.Seats - #july4_2018_regional.Seats) desc;

-- For regional routes in common between July 4 2017 travel and July 4 2018 travel, this table lists the difference in number of seats offered during these two travel periods
select #july4_2017_regional.airport_1,#july4_2017_regional.airport_2,#july4_2017_regional.cityname_1,#july4_2017_regional.cityname_2,#july4_2017_regional.Seats as Seats_2017,#july4_2018_regional.Seats as Seats_2018,(#july4_2018_regional.Seats - #july4_2017_regional.Seats) as diff_Seats,((#july4_2018_regional.Seats - #july4_2017_regional.Seats)*100)/#july4_2017_regional.Seats as percent_change
into #july4_2017_2018_regional
from #july4_2017_regional
inner join #july4_2018_regional on #july4_2017_regional.airport_1=#july4_2018_regional.airport_1 and #july4_2017_regional.airport_2=#july4_2018_regional.airport_2 and #july4_2017_regional.cityname_1=#july4_2018_regional.cityname_1 and #july4_2017_regional.cityname_2=#july4_2018_regional.cityname_2
order by (#july4_2018_regional.Seats - #july4_2017_regional.Seats) desc;

-- For major routes in common between July 4 2018 travel and July 4 2019 travel, this table lists the difference in number of seats offered during these two travel periods
select #july4_2018_major.airport_1,#july4_2018_major.airport_2,#july4_2018_major.cityname_1,#july4_2018_major.cityname_2,#july4_2018_major.Seats as Seats_2018,#july4_2019_major.Seats as Seats_2019,(#july4_2019_major.Seats - #july4_2018_major.Seats) as diff_Seats,((#july4_2019_major.Seats - #july4_2018_major.Seats)*100)/#july4_2018_major.Seats as percent_change
into #july4_2018_2019_major
from #july4_2018_major
inner join #july4_2019_major on #july4_2018_major.airport_1=#july4_2019_major.airport_1 and #july4_2018_major.airport_2=#july4_2019_major.airport_2 and #july4_2018_major.cityname_1=#july4_2019_major.cityname_1 and #july4_2018_major.cityname_2=#july4_2019_major.cityname_2
order by (#july4_2019_major.Seats - #july4_2018_major.Seats) desc;

-- For major routes in common between July 4 2017 travel and July 4 2018 travel, this table lists the difference in number of seats offered during these two travel periods
select #july4_2017_major.airport_1,#july4_2017_major.airport_2,#july4_2017_major.cityname_1,#july4_2017_major.cityname_2,#july4_2017_major.Seats as Seats_2017,#july4_2018_major.Seats as Seats_2018,(#july4_2018_major.Seats - #july4_2017_major.Seats) as diff_Seats,((#july4_2018_major.Seats - #july4_2017_major.Seats)*100)/#july4_2017_major.Seats as percent_change
into #july4_2017_2018_major
from #july4_2017_major
inner join #july4_2018_major on #july4_2017_major.airport_1=#july4_2018_major.airport_1 and #july4_2017_major.airport_2=#july4_2018_major.airport_2 and #july4_2017_major.cityname_1=#july4_2018_major.cityname_1 and #july4_2017_major.cityname_2=#july4_2018_major.cityname_2
order by (#july4_2018_major.Seats - #july4_2017_major.Seats) desc;

-- The 737 Max Grounding's impact is examined by calculating the percent change between July 4 2018 travel (pre grounding) and July 4 2019 travel (post grounding) for all routes in common between those two travel periods.
-- The grounding's impact on Thanksgiving 2019 travel is then calculated by assuming the same percent change will occur between Thanksgiving 2018 travel (pre grounding) and Thanksgiving 2019 travel (post grounding).
-- To achieve this, tables containing information on July 4 travel will be joined with tables containing information on Thanksgiving travel.

-- All Thanksgiving 2018 regional routes are ordered by the total number of seats offered to determine their popularity or "rank" during the travel period. This information will be included when joining Thanksgiving travel tables with July 4 travel tables.
select airport_1,airport_2,cityname_1,cityname_2,Seats,rn=ROW_NUMBER() OVER
    (
        ORDER BY Seats desc
    )
into #tg_regional_rank
from #tg_regional;

-- All Thanksgiving 2018 major routes are ordered by the total number of seats offered to determine their popularity or "rank" during the travel period. This information will be included when joining Thanksgiving travel tables with July 4 travel tables.
select airport_1,airport_2,cityname_1,cityname_2,Seats,rn=ROW_NUMBER() OVER
    (
        ORDER BY Seats desc
    )
into #tg_major_rank
from #tg_major;

-- All Thanksgiving 2018 routes are ordered by the total number of seats offered to determine their popularity or "rank" during the travel period. This information will be included when joining Thanksgiving travel tables with July 4 travel tables.
select airport_1,airport_2,cityname_1,cityname_2,Seats,rn=ROW_NUMBER() OVER
    (
        ORDER BY Seats desc
    )
into #tg_grouped_rank
from #tg_grouped;

-- For regional routes in common between July 4 2018 and July 4 2019, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_regional_rank.airport_1,#tg_regional_rank.airport_2,#tg_regional_rank.cityname_1,#tg_regional_rank.cityname_2,#tg_regional_rank.rn as rank, #tg_regional_rank.Seats as tg_seats,#july4_2018_2019_regional.Seats_2018,#july4_2018_2019_regional.Seats_2019,#july4_2018_2019_regional.diff_Seats,#july4_2018_2019_regional.percent_change
into #diff_July4_2018_2019_regional
from #tg_regional_rank
inner join #july4_2018_2019_regional on #tg_regional_rank.airport_1 = #july4_2018_2019_regional.airport_1 and #tg_regional_rank.airport_2 = #july4_2018_2019_regional.airport_2 and #tg_regional_rank.cityname_1 = #july4_2018_2019_regional.cityname_1 and #tg_regional_rank.cityname_2 = #july4_2018_2019_regional.cityname_2
order by #july4_2018_2019_regional.diff_Seats desc;

-- For regional routes in common between July 4 2017 and July 4 2018, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_regional_rank.airport_1,#tg_regional_rank.airport_2,#tg_regional_rank.cityname_1,#tg_regional_rank.cityname_2,#tg_regional_rank.rn as rank, #tg_regional_rank.Seats as tg_seats,#july4_2017_2018_regional.Seats_2017,#july4_2017_2018_regional.Seats_2018,#july4_2017_2018_regional.diff_Seats,#july4_2017_2018_regional.percent_change
into #diff_July4_2017_2018_regional
from #tg_regional_rank
inner join #july4_2017_2018_regional on #tg_regional_rank.airport_1 = #july4_2017_2018_regional.airport_1 and #tg_regional_rank.airport_2 = #july4_2017_2018_regional.airport_2 and #tg_regional_rank.cityname_1 = #july4_2017_2018_regional.cityname_1 and #tg_regional_rank.cityname_2 = #july4_2017_2018_regional.cityname_2
order by #july4_2017_2018_regional.diff_Seats desc;

-- For regional routes in common between July 4 2017, July 4 2018, and July 4 2019, this table lists the year-over-year difference in number of seats offered during these three travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #diff_July4_2018_2019_regional.airport_1,#diff_July4_2018_2019_regional.airport_2,#diff_July4_2018_2019_regional.cityname_1,#diff_July4_2018_2019_regional.cityname_2,#diff_July4_2018_2019_regional.rank, #diff_July4_2018_2019_regional.tg_seats,#diff_July4_2017_2018_regional.Seats_2017,#diff_July4_2018_2019_regional.Seats_2018,#diff_July4_2018_2019_regional.Seats_2019,#diff_July4_2017_2018_regional.diff_Seats as diff_Seats_2017_2018,#diff_July4_2018_2019_regional.diff_Seats as diff_Seats_2018_2019,#diff_July4_2017_2018_regional.percent_change as percent_change_2017_2018,#diff_July4_2018_2019_regional.percent_change as percent_change_2018_2019
into #diff_July4_2017_2018_2019_regional
from #diff_July4_2017_2018_regional
inner join #diff_july4_2018_2019_regional on #diff_July4_2017_2018_regional.airport_1 = #diff_July4_2018_2019_regional.airport_1 and #diff_July4_2017_2018_regional.airport_2 = #diff_July4_2018_2019_regional.airport_2 and #diff_July4_2017_2018_regional.cityname_1 = #diff_July4_2018_2019_regional.cityname_1 and #diff_July4_2017_2018_regional.cityname_2 = #diff_July4_2018_2019_regional.cityname_2
order by #diff_july4_2018_2019_regional.diff_Seats desc;

-- For major routes in common between July 4 2018 and July 4 2019, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_major_rank.airport_1,#tg_major_rank.airport_2,#tg_major_rank.cityname_1,#tg_major_rank.cityname_2,#tg_major_rank.rn as rank, #tg_major_rank.Seats as tg_seats,#july4_2018_2019_major.Seats_2018,#july4_2018_2019_major.Seats_2019,#july4_2018_2019_major.diff_Seats,#july4_2018_2019_major.percent_change
into #diff_July4_2018_2019_major
from #tg_major_rank
inner join #july4_2018_2019_major on #tg_major_rank.airport_1 = #july4_2018_2019_major.airport_1 and #tg_major_rank.airport_2 = #july4_2018_2019_major.airport_2 and #tg_major_rank.cityname_1 = #july4_2018_2019_major.cityname_1 and #tg_major_rank.cityname_2 = #july4_2018_2019_major.cityname_2
order by #july4_2018_2019_major.diff_Seats desc;

-- For major routes in common between July 4 2017 and July 4 2018, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_major_rank.airport_1,#tg_major_rank.airport_2,#tg_major_rank.cityname_1,#tg_major_rank.cityname_2,#tg_major_rank.rn as rank, #tg_major_rank.Seats as tg_seats,#july4_2017_2018_major.Seats_2017,#july4_2017_2018_major.Seats_2018,#july4_2017_2018_major.diff_Seats,#july4_2017_2018_major.percent_change
into #diff_July4_2017_2018_major
from #tg_major_rank
inner join #july4_2017_2018_major on #tg_major_rank.airport_1 = #july4_2017_2018_major.airport_1 and #tg_major_rank.airport_2 = #july4_2017_2018_major.airport_2 and #tg_major_rank.cityname_1 = #july4_2017_2018_major.cityname_1 and #tg_major_rank.cityname_2 = #july4_2017_2018_major.cityname_2
order by #july4_2017_2018_major.diff_Seats desc;

-- For major routes in common between July 4 2017, July 4 2018, and July 4 2019, this table lists the year-over-year difference in number of seats offered during these three travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #diff_July4_2018_2019_major.airport_1,#diff_July4_2018_2019_major.airport_2,#diff_July4_2018_2019_major.cityname_1,#diff_July4_2018_2019_major.cityname_2,#diff_July4_2018_2019_major.rank, #diff_July4_2018_2019_major.tg_seats,#diff_July4_2017_2018_major.Seats_2017,#diff_July4_2018_2019_major.Seats_2018,#diff_July4_2018_2019_major.Seats_2019,#diff_July4_2017_2018_major.diff_Seats as diff_Seats_2017_2018,#diff_July4_2018_2019_major.diff_Seats as diff_Seats_2018_2019,#diff_July4_2017_2018_major.percent_change as percent_change_2017_2018,#diff_July4_2018_2019_major.percent_change as percent_change_2018_2019
into #diff_July4_2017_2018_2019_major
from #diff_July4_2017_2018_major
inner join #diff_july4_2018_2019_major on #diff_July4_2017_2018_major.airport_1 = #diff_July4_2018_2019_major.airport_1 and #diff_July4_2017_2018_major.airport_2 = #diff_July4_2018_2019_major.airport_2 and #diff_July4_2017_2018_major.cityname_1 = #diff_July4_2018_2019_major.cityname_1 and #diff_July4_2017_2018_major.cityname_2 = #diff_July4_2018_2019_major.cityname_2
order by #diff_july4_2018_2019_major.diff_Seats desc;

-- For all routes in common between July 4 2018 and July 4 2019, this table lists the difference in number of seats offered during these two travel periods.
select #july4_2018_grouped.airport_1,#july4_2018_grouped.airport_2,#july4_2018_grouped.cityname_1,#july4_2018_grouped.cityname_2,#july4_2018_grouped.Seats as Seats_2018,#july4_2018_grouped.Seats as Seats_2019,(#july4_2019_grouped.Seats - #july4_2018_grouped.Seats) as diff_Seats,((#july4_2019_grouped.Seats - #july4_2018_grouped.Seats)*100)/#july4_2018_grouped.Seats as percent_change
into #july4_2018_2019_grouped
from #july4_2018_grouped
inner join #july4_2019_grouped on #july4_2018_grouped.airport_1=#july4_2019_grouped.airport_1 and #july4_2018_grouped.airport_2=#july4_2019_grouped.airport_2 and #july4_2018_grouped.cityname_1=#july4_2019_grouped.cityname_1 and #july4_2018_grouped.cityname_2=#july4_2019_grouped.cityname_2
order by (#july4_2019_grouped.Seats - #july4_2018_grouped.Seats) desc;

-- For all routes in common between July 4 2017 and July 4 2018, this table lists the difference in number of seats offered during these two travel periods.
select #july4_2017_grouped.airport_1,#july4_2017_grouped.airport_2,#july4_2017_grouped.cityname_1,#july4_2017_grouped.cityname_2,#july4_2017_grouped.Seats as Seats_2017,#july4_2017_grouped.Seats as Seats_2018,(#july4_2018_grouped.Seats - #july4_2017_grouped.Seats) as diff_Seats,((#july4_2018_grouped.Seats - #july4_2017_grouped.Seats)*100)/#july4_2017_grouped.Seats as percent_change
into #july4_2017_2018_grouped
from #july4_2017_grouped
inner join #july4_2018_grouped on #july4_2017_grouped.airport_1=#july4_2018_grouped.airport_1 and #july4_2017_grouped.airport_2=#july4_2018_grouped.airport_2 and #july4_2017_grouped.cityname_1=#july4_2018_grouped.cityname_1 and #july4_2017_grouped.cityname_2=#july4_2018_grouped.cityname_2
order by (#july4_2018_grouped.Seats - #july4_2017_grouped.Seats) desc;

-- For all routes in common between July 4 2018 and July 4 2019, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_grouped_rank.airport_1,#tg_grouped_rank.airport_2,#tg_grouped_rank.cityname_1,#tg_grouped_rank.cityname_2,#tg_grouped_rank.rn as rank, #tg_grouped_rank.Seats as tg_seats,#july4_2018_2019_grouped.Seats_2018,#july4_2018_2019_grouped.Seats_2019,#july4_2018_2019_grouped.diff_Seats,#july4_2018_2019_grouped.percent_change
into #diff_July4_2018_2019_all
from #tg_grouped_rank
inner join #july4_2018_2019_grouped on #tg_grouped_rank.airport_1 = #july4_2018_2019_grouped.airport_1 and #tg_grouped_rank.airport_2 = #july4_2018_2019_grouped.airport_2 and #tg_grouped_rank.cityname_1 = #july4_2018_2019_grouped.cityname_1 and #tg_grouped_rank.cityname_2 = #july4_2018_2019_grouped.cityname_2
order by #july4_2018_2019_grouped.diff_Seats desc;

-- For all routes in common between July 4 2017 and July 4 2018, this table lists the difference in number of seats offered during these two travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #tg_grouped_rank.airport_1,#tg_grouped_rank.airport_2,#tg_grouped_rank.cityname_1,#tg_grouped_rank.cityname_2,#tg_grouped_rank.rn as rank, #tg_grouped_rank.Seats as tg_seats,#july4_2017_2018_grouped.Seats_2017,#july4_2017_2018_grouped.Seats_2018,#july4_2017_2018_grouped.diff_Seats,#july4_2017_2018_grouped.percent_change
into #diff_July4_2017_2018_all
from #tg_grouped_rank
inner join #july4_2017_2018_grouped on #tg_grouped_rank.airport_1 = #july4_2017_2018_grouped.airport_1 and #tg_grouped_rank.airport_2 = #july4_2017_2018_grouped.airport_2 and #tg_grouped_rank.cityname_1 = #july4_2017_2018_grouped.cityname_1 and #tg_grouped_rank.cityname_2 = #july4_2017_2018_grouped.cityname_2
order by #july4_2017_2018_grouped.diff_Seats desc;

-- For all routes in common between July 4 2017, July 4 2018, and July 4 2019, this table lists the year-over-year difference in number of seats offered during these three travel periods. The rank of the corresponding routes during Thanksgiving 2018 is also provided.
select #diff_July4_2018_2019_all.airport_1,#diff_July4_2018_2019_all.airport_2,#diff_July4_2018_2019_all.cityname_1,#diff_July4_2018_2019_all.cityname_2,#diff_July4_2018_2019_all.rank, #diff_July4_2018_2019_all.tg_seats,#diff_July4_2017_2018_all.Seats_2017,#diff_July4_2018_2019_all.Seats_2018,#diff_July4_2018_2019_all.Seats_2019,#diff_July4_2017_2018_all.diff_Seats as diff_Seats_2017_2018,#diff_July4_2018_2019_all.diff_Seats as diff_Seats_2018_2019,#diff_July4_2017_2018_all.percent_change as percent_change_2017_2018,#diff_July4_2018_2019_all.percent_change as percent_change_2018_2019
into #diff_July4_2017_2018_2019_all
from #diff_July4_2017_2018_all
inner join #diff_july4_2018_2019_all on #diff_July4_2017_2018_all.airport_1 = #diff_July4_2018_2019_all.airport_1 and #diff_July4_2017_2018_all.airport_2 = #diff_July4_2018_2019_all.airport_2 and #diff_July4_2017_2018_all.cityname_1 = #diff_July4_2018_2019_all.cityname_1 and #diff_July4_2017_2018_all.cityname_2 = #diff_July4_2018_2019_all.cityname_2
order by #diff_july4_2018_2019_all.diff_Seats desc;

-- The 737 Max Grounding's impact on Thanksgiving 2019 travel is calculated by assuming the same percent change will occur between Thanksgiving 2018 travel (pre grounding) and Thanksgiving 2019 travel (post grounding) as it did between July 4 2018 travel (pre grounding and July 4 2019 travel (post grounding).
-- Using this procedure, estimate the projected decrease in seat capacity for every Thanksgiving 2019 regional route compared to the corresponding routes during Thanksgiving 2018.
select airport_1,airport_2,tg_seats,(tg_seats*percent_change_2018_2019/100) as diff_seats,percent_change_2018_2019
into #tg_2019_diffseats
from #diff_July4_2017_2018_2019_regional
where percent_change_2018_2019 < 0
order by percent_change_2018_2019;

-- Calculate the total number of seats lost during Thanksgiving 2019 compared to Thanksgiving 2018 (for regional travel)
select sum(diff_seats)
into #tg_2019_totalaffected
from #tg_2019_diffseats
where diff_seats < 0;

-- Create table for d3 visualization containing relevant data on regional and major routes that experienced a percent decrease in seat capacity between July 4 2018 and 2019 
SELECT airport_1,airport_2, cityname_1, substring(cityname_1, 1,charindex(',', cityname_1)-1) as statename_1, cityname_2, substring(cityname_2, charindex(',', cityname_2)+1, len(cityname_2)) as statename_2, round(tg_seats,0) as tg_seats ,round(Seats_2018,0) as Seats_2018,round(Seats_2019,0) as Seats_2019, round(percent_change_2018_2019,0) as percent_change_2018_2019, 'Regional' as label
into #export_table_final
FROM #diff_July4_2017_2018_2019_regional
where percent_change_2018_2019 < 0
UNION ALL
SELECT airport_1,airport_2, cityname_1, substring(cityname_1, 1,charindex(',', cityname_1)-1) as statename_1, cityname_2, substring(cityname_2, charindex(',', cityname_2)+1, len(cityname_2)) as statename_2, round(tg_seats,0) as tg_seats,round(Seats_2018,0) as Seats_2018,round(Seats_2019,0) as Seats_2019,round(percent_change_2018_2019,0) as percent_change_2018_2019, 'Major' as label
FROM #diff_July4_2017_2018_2019_major
where percent_change_2018_2019 < 0

-- Table of routes data for d3 visualization can then be exported as a csv file
select * from #export_table_final

-- Table of routes data with latitude and longitude information for origin airports
select airport_1,airport_2,cityname_1,cityname_2,tg_seats,Seats_2018,Seats_2019,percent_change_2018_2019,label,#airports_latlong.lat_num as airport_1_lat,#airports_latlong.long_num as airport_1_long
into #airport1_latlong
from #export_table_final
inner join #airports_latlong on #export_table_final.airport_1=#airports_latlong.Airport

-- Table of routes data with latitude and longitude information for origin and destination airports
select airport_1,airport_2,cityname_1,cityname_2,tg_seats,Seats_2018,Seats_2019,percent_change_2018_2019,label,airport_1_lat,airport_1_long,#airports_latlong.lat_num as airport_2_lat,#airports_latlong.long_num as airport_2_long
into #airport2_latlong
from #airport1_latlong
inner join #airports_latlong on #airport1_latlong.airport_2=#airports_latlong.Airport

-- Create table for d3 visualization containing relevant data on regional and major airports’ latitude and longitude coordinates
select distinct airport_1 as Airport,airport_1_long as long_num,airport_1_lat as lat_num
into #airports_latlong_final
from
(select distinct airport_1,airport_1_lat,airport_1_long from #airport2_latlong
union all
select distinct airport_2,airport_2_lat,airport_2_long from #airport2_latlong) as new_table

-- Table of latitude longitude data for d3 visualization can then be exported as a csv file
select * from #airports_latlong_final
