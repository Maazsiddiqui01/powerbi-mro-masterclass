# Data Modelling for Power BI

A working manual on table design, relationship mechanics and filter context in Power BI, built
around one deliberately small aircraft maintenance dataset. Every number in it can be checked
by hand from tables of eight rows or fewer.

28 chapters, roughly 229,052 words, 19 hand built diagrams.

## Read it

**On a phone or tablet.** Open the published site, then use the browser menu and choose
Add to Home Screen. It installs as an app, remembers where you stopped, and works with no
network once the first visit has finished loading.

**On a desktop.** Open the published site in Chrome or Edge and use the install button in the
address bar, or the Install on this device button at the bottom of the contents page.

**On a locked down machine.** Download `power-bi-data-modelling-masterclass.html` from this repository and open it directly.
It is one self contained file with no build step and no server. Everything works except the
per chapter reading position, which needs the site version.

## What is in here

| Path | What it is |
| --- | --- |
| `index.html` | Contents, reading progress, continue where you stopped, chapter search |
| `ch/` | One page per chapter |
| `power-bi-data-modelling-masterclass.html` | The whole manual as a single downloadable file |
| `data/` | The fifteen sample tables as CSV, defects included |
| `assets/` | Stylesheet, script, self hosted fonts so it works offline |
| `sw.js` | Service worker that caches every page for offline reading |

## The example

The manual uses a fictional maintenance shop called Meridian Aero Services. It is deliberately
invented so that the sample data is unambiguously sample data. Chapter E maps its vocabulary
onto the terms a real shop uses.

## Reading order

Part 0 is the domain. Read A, B, C and D first if aviation maintenance is new to you.
Parts 1 to 4 are the curriculum and are meant to be read in order.
Parts 5 and 6, and the appendices, are reference.

## Progress and privacy

Your reading position is stored in your own browser using localStorage. It never leaves the
device and it is not sent anywhere. The Reset button on the contents page clears it.
