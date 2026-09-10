# The Meridian Aero Services sample data

Fifteen CSV files. Load them into Power BI with Get Data, Text/CSV, and follow the manual.

Every table is small on purpose. The largest has eight rows, so you can check any number the
manual states by adding it up yourself.

## The defects are deliberate

Do not clean these files before you load them. The manual works through each of these:

| Where | What is wrong |
| --- | --- |
| `LaborEntries.csv`, row L-505 | `TechnicianID` is `TECH-04 ` with a trailing space. It looks identical to `TECH-04` and will never join. |
| `LaborEntries.csv`, row L-506 | `TECH-07` is not in `Technicians.csv`. |
| `WorkOrders.csv`, WO-1006 | `N338WA` is not in `AircraftRegistry.csv`. |
| `WorkOrders.csv`, WO-1005 | `StationCode` is blank. |
| `WorkOrders.csv`, WO-1004 and WO-1008 | `ClosedDate` is blank because they are still open. |
| `PartsIssued.csv`, row P-9007 | `WO-1009` does not exist in `WorkOrders.csv`. |
| `ShopCapacity.csv` | Trades are column headers. It needs unpivoting. |
| `ShopCapacity.csv` | `PHX` appears here and nowhere else. |
| `Technicians.csv` | `Certifications` holds several values in one cell. |
| `HMCCSchedule.csv`, WO-1003 | `PlannedStart` is a day earlier than `OpenedDate` in `WorkOrders.csv`. |
| `HMCCSchedule.csv`, WO-1006 | `Customer` is blank. |
| `CrewAssignment.csv`, TECH-07 | `CRW-XX9` is missing from `CrewCodeMap.csv`. |
| `ManhourForecast.csv` | Each revision supersedes the one before, so this table must never be summed. |

## Two things to check when you load them

`LaborEntries.csv` should give 62.0 total hours. If it gives something else, your locale is
parsing the decimal point differently, so set the column type with a locale explicitly.

`Technicians.csv` contains an ampersand in `A&P`. If it arrives mangled, the file was opened
and re-saved by something that changed the encoding. These files are UTF-8.

## Answers

Total labor hours 62.0. Total labor cost 6,326.50. Total parts cost 28,245. Total quoted
38,100. Total planned capacity 176. Demand 75.0, attended 109.0, achievable 87.72,
submitted 63.0. Every other figure is in the manual.
