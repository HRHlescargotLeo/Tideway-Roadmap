/* data.js: sample data for the Tideway prototypes.
   Site names and boroughs follow tideway.london (Locations, 13 Oct 2026).
   Coordinates are approximate, for placing pins and measuring distance only.
   Statuses, notices, monthly figures, per-site captures, events and file sizes
   are SAMPLE DATA for discussion and must be replaced with Tideway's own. */

window.TW_SITES = [
  { id: 'acton-storm-tanks', name: 'Acton Storm Tanks', borough: 'London Borough of Ealing', stretch: 'west', lat: 51.508, lng: -0.262, status: 'operating' },
  { id: 'hammersmith-pumping-station', name: 'Hammersmith Pumping Station', borough: 'London Borough of Hammersmith and Fulham', stretch: 'west', lat: 51.488, lng: -0.226, status: 'operating' },
  { id: 'barn-elms', name: 'Barn Elms', borough: 'London Borough of Wandsworth', stretch: 'west', lat: 51.472, lng: -0.226, status: 'operating' },
  { id: 'putney-embankment-foreshore', name: 'Putney Embankment Foreshore', borough: 'London Borough of Wandsworth', stretch: 'west', lat: 51.467, lng: -0.215, status: 'space', space: 'putney' },
  { id: 'king-georges-park', name: "King George's Park", borough: 'London Borough of Wandsworth', stretch: 'west', lat: 51.452, lng: -0.195, status: 'operating' },
  { id: 'dormay-street', name: 'Dormay Street', borough: 'London Borough of Wandsworth', stretch: 'west', lat: 51.459, lng: -0.192, status: 'operating' },
  { id: 'carnwath-road-riverside', name: 'Carnwath Road Riverside', borough: 'London Borough of Hammersmith and Fulham', stretch: 'west', lat: 51.467, lng: -0.190, status: 'works' },
  { id: 'falconbrook-pumping-station', name: 'Falconbrook Pumping Station', borough: 'London Borough of Wandsworth', stretch: 'central', lat: 51.470, lng: -0.177, status: 'operating' },
  { id: 'cremorne-wharf-depot', name: 'Cremorne Wharf Depot', borough: 'Royal Borough of Kensington and Chelsea', stretch: 'central', lat: 51.479, lng: -0.179, status: 'operating' },
  { id: 'chelsea-quay', name: 'Chelsea Quay', borough: 'Royal Borough of Kensington and Chelsea', stretch: 'central', lat: 51.484, lng: -0.157, status: 'space', space: 'chelsea' },
  { id: 'kirtling-street', name: 'Kirtling Street', borough: 'London Borough of Wandsworth', stretch: 'central', lat: 51.482, lng: -0.140, status: 'works' },
  { id: 'heathwall-pumping-station', name: 'Heathwall Pumping Station', borough: 'London Borough of Wandsworth', stretch: 'central', lat: 51.484, lng: -0.136, status: 'space', space: 'heathwall' },
  { id: 'effra-quay', name: 'Effra Quay & Isle of Effra', borough: 'London Borough of Lambeth', stretch: 'central', lat: 51.489, lng: -0.122, status: 'space', space: 'effra' },
  { id: 'tyburn-quay', name: 'Tyburn Quay', borough: 'City of Westminster', stretch: 'central', lat: 51.506, lng: -0.121, status: 'space', space: 'tyburn' },
  { id: 'bazalgette-embankment', name: 'Bazalgette Embankment', borough: 'City of London', stretch: 'central', lat: 51.510, lng: -0.105, status: 'space', space: 'bazalgette' },
  { id: 'shad-thames-pumping-station', name: 'Shad Thames Pumping Station', borough: 'London Borough of Southwark', stretch: 'east', lat: 51.501, lng: -0.073, status: 'operating' },
  { id: 'chambers-wharf', name: 'Chambers Wharf', borough: 'London Borough of Southwark', stretch: 'east', lat: 51.500, lng: -0.064, status: 'works' },
  { id: 'king-edward-memorial-park-foreshore', name: 'King Edward Memorial Park Foreshore', borough: 'London Borough of Tower Hamlets', stretch: 'east', lat: 51.508, lng: -0.047, status: 'space', space: 'kemp' },
  { id: 'bekesbourne-street', name: 'Bekesbourne Street', borough: 'London Borough of Tower Hamlets', stretch: 'east', lat: 51.513, lng: -0.040, status: 'operating' },
  { id: 'earl-pumping-station', name: 'Earl Pumping Station', borough: 'London Borough of Lewisham', stretch: 'east', lat: 51.487, lng: -0.035, status: 'operating' },
  { id: 'deptford-church-street', name: 'Deptford Church Street', borough: 'London Borough of Lewisham', stretch: 'east', lat: 51.478, lng: -0.024, status: 'operating' },
  { id: 'greenwich-pumping-station', name: 'Greenwich Pumping Station', borough: 'Royal Borough of Greenwich', stretch: 'east', lat: 51.476, lng: -0.018, status: 'operating' },
  { id: 'abbey-mills-pumping-station', name: 'Abbey Mills Pumping Station', borough: 'London Borough of Newham', stretch: 'east', lat: 51.530, lng: -0.004, status: 'operating' },
  { id: 'beckton-sewage-treatment-works', name: 'Beckton Sewage Treatment Works', borough: 'London Borough of Newham', stretch: 'east', lat: 51.515, lng: 0.083, status: 'operating' }
];

window.TW_STATUS = {
  works: { label: 'Works continuing', short: 'Works' },
  space: { label: 'Public space open', short: 'Space open' },
  operating: { label: 'Operating, site complete', short: 'Operating' }
};

window.TW_STRETCH = { west: 'West (Acton to Fulham)', central: 'Central (Fulham to Blackfriars)', east: 'East (Bermondsey to Beckton)' };

/* Approximate centres of postcode districts, so the near-me lookup works
   without a geocoding service. A real build would use a postcode API. */
window.TW_POSTCODES = {
  W3: [51.510, -0.270], W4: [51.492, -0.262], W6: [51.492, -0.228], SW13: [51.474, -0.243], SW15: [51.462, -0.220],
  SW6: [51.475, -0.200], SW18: [51.455, -0.192], SW10: [51.483, -0.180], SW11: [51.470, -0.165], SW3: [51.488, -0.165],
  SW8: [51.478, -0.135], SW1: [51.497, -0.135], SE11: [51.489, -0.112], WC2: [51.512, -0.122], EC4: [51.512, -0.105],
  SE1: [51.500, -0.100], SE16: [51.497, -0.060], E1W: [51.507, -0.059], E1: [51.516, -0.065], E14: [51.505, -0.020],
  SE8: [51.478, -0.028], SE10: [51.480, -0.005], E15: [51.540, 0.000], E16: [51.510, 0.030], E6: [51.525, 0.055]
};

/* Sample notices for site pages (R34). */
window.TW_NOTICES = {
  'chambers-wharf': [
    { date: '2026-10-09', type: 'works', title: 'River wall parapet: final section', body: 'Work on the last section of the permanent river wall parapet continues this month. Some work is tidal and may run until 10pm Monday to Friday.' },
    { date: '2026-09-24', type: 'river', title: 'Barge movements for removal of cofferdam fill', body: 'Two barge movements a week until the end of October, timed with high tide.' },
    { date: '2026-09-02', type: 'road', title: 'Bevington Street footway reopened', body: 'The footway next to the site has reopened. Signed diversions have been removed.' },
    { date: '2026-08-14', type: 'hours', title: 'Saturday working hours confirmed', body: 'Concrete breaking on Saturdays stays at 9am to 2pm after the trial period.' },
    { date: '2026-07-01', type: 'works', title: 'Landscaping of the new riverside space begins', body: 'Planting, seating and paving for the new public space. Expected to finish in spring 2027.' }
  ]
};
window.TW_NOTICE_TYPES = { works: 'Works', road: 'Roads and footpaths', river: 'River', hours: 'Working hours' };

/* Liaison group meetings, as listed on the live Chambers Wharf page (R36). */
window.TW_CLWG = [
  { date: '2025-12-15', notes: true, slides: true },
  { date: '2025-06-16', notes: true, slides: true },
  { date: '2025-02-11', notes: true, slides: true },
  { date: '2024-11-04', notes: true, slides: true },
  { date: '2024-07-02', notes: true, slides: true },
  { date: '2024-03-26', notes: true, slides: true },
  { date: '2023-11-14', notes: true, slides: true, extra: 'December 2023 archaeology update' },
  { date: '2023-06-05', notes: true, slides: true },
  { date: '2022-11-21', notes: true, slides: true },
  { date: '2022-07-04', notes: true, slides: true }
];

/* Monthly updates (R24). SAMPLE figures. */
window.TW_MONTHS = [
  { id: '2026-09', label: 'September 2026', rain: 58, storms: 7, volume: 0.61, spills: 1, note: 'A wet end to the month. The tunnel took all seven storms; one short discharge at a connection point during the 22 September downpour is being checked.' },
  { id: '2026-08', label: 'August 2026', rain: 41, storms: 4, volume: 0.33, spills: 0, note: 'Four storms, all captured. Active Tideway sessions started on the water at Putney and Wapping.' },
  { id: '2026-07', label: 'July 2026', rain: 22, storms: 2, volume: 0.12, spills: 0, note: 'A dry month. King Edward Memorial Park Foreshore opened on 29 July.' }
];

/* Overflow connection points (R22, R23). SAMPLE figures per site. */
window.TW_CAPTURE = {
  'acton-storm-tanks': [0.9, 4], 'hammersmith-pumping-station': [1.6, 9], 'putney-embankment-foreshore': [0.4, 6],
  'king-georges-park': [0.3, 5], 'carnwath-road-riverside': [0.5, 6], 'falconbrook-pumping-station': [0.7, 8],
  'cremorne-wharf-depot': [0.4, 5], 'chelsea-quay': [0.8, 9], 'heathwall-pumping-station': [0.6, 7],
  'effra-quay': [0.9, 8], 'tyburn-quay': [0.5, 7], 'bazalgette-embankment': [1.4, 11], 'shad-thames-pumping-station': [0.2, 4],
  'chambers-wharf': [0.6, 6], 'king-edward-memorial-park-foreshore': [1.1, 10], 'earl-pumping-station': [0.5, 6],
  'deptford-church-street': [0.4, 5], 'greenwich-pumping-station': [1.0, 9]
};

/* The seven new riverside spaces (R40, R41). Features are SAMPLE unless noted. */
window.TW_SPACES = [
  { id: 'bazalgette', site: 'bazalgette-embankment', name: 'Bazalgette Embankment', borough: 'City of London', station: 'Blackfriars', features: ['stepfree', 'floodable', 'art', 'seating'], opened: 'Open now' },
  { id: 'tyburn', site: 'tyburn-quay', name: 'Tyburn Quay', borough: 'City of Westminster', station: '[to confirm]', features: ['stepfree', 'art', 'seating'], opened: 'Open now' },
  { id: 'effra', site: 'effra-quay', name: 'Effra Quay & Isle of Effra', borough: 'London Borough of Lambeth', station: 'Vauxhall', features: ['stepfree', 'seating', 'planting'], opened: 'Open now' },
  { id: 'heathwall', site: 'heathwall-pumping-station', name: 'Heathwall Pumping Station', borough: 'London Borough of Wandsworth', station: 'Battersea Power Station', features: ['stepfree', 'seating'], opened: 'Open now' },
  { id: 'chelsea', site: 'chelsea-quay', name: 'Chelsea Quay', borough: 'Royal Borough of Kensington and Chelsea', station: 'Sloane Square', features: ['floodable', 'seating', 'planting'], opened: 'Open now' },
  { id: 'putney', site: 'putney-embankment-foreshore', name: 'Putney Embankment Foreshore', borough: 'London Borough of Wandsworth', station: 'Putney Bridge', features: ['stepfree', 'water', 'seating'], opened: 'Open now' },
  { id: 'kemp', site: 'king-edward-memorial-park-foreshore', name: 'King Edward Memorial Park Foreshore', borough: 'London Borough of Tower Hamlets', station: 'Shadwell', features: ['stepfree', 'floodable', 'art', 'planting', 'play'], opened: 'Opened 29 July 2026', area: '2,600 square metres' }
];
window.TW_FEATURES = { stepfree: 'Step-free', floodable: 'Floods at high tide', art: 'Public art', seating: 'Seating', planting: 'Planting', play: 'Play', water: 'On-water activities' };

/* Events (R42). SAMPLE dates and sessions; Active Tideway is real, run with Active360 and London Sports Trust. */
window.TW_EVENTS = [
  { date: '2026-10-17', time: '10:00', type: 'active', title: 'Stand-up paddleboarding taster', place: 'putney', partner: 'Active360', price: 'Subsidised' },
  { date: '2026-10-18', time: '11:00', type: 'walk', title: 'Natural history walk along the foreshore', place: 'kemp', partner: 'London Sports Trust', price: 'Free' },
  { date: '2026-10-24', time: '09:30', type: 'active', title: 'Litter pick and river survey', place: 'bazalgette', partner: 'Active360', price: 'Free' },
  { date: '2026-10-25', time: '14:00', type: 'art', title: 'Art on the Tideway guided trail', place: 'bazalgette', partner: 'Tideway', price: 'Free' },
  { date: '2026-10-31', time: '10:00', type: 'active', title: 'Paddleboarding for beginners', place: 'kemp', partner: 'Active360', price: 'Subsidised' },
  { date: '2026-11-07', time: '13:00', type: 'talk', title: 'How the super sewer works: a talk on site', place: 'heathwall', partner: 'Tideway', price: 'Free' },
  { date: '2026-11-14', time: '10:30', type: 'walk', title: 'Wildlife on the tidal Thames', place: 'chelsea', partner: 'London Sports Trust', price: 'Free' },
  { date: '2026-11-21', time: '11:00', type: 'art', title: 'Poetry on the ventilation columns: a reading walk', place: 'effra', partner: 'Tideway', price: 'Free' }
];
window.TW_EVENT_TYPES = { active: 'Active Tideway', walk: 'Walks and tours', art: 'Art', talk: 'Talks' };

/* Search index for prototype 5 (R50–R56). Titles of news, reports and videos are real;
   summaries, sizes and some dates are SAMPLE. */
window.TW_DOCS = [
  { t: 'Thames Tideway Tunnel Benefits Realisation Report 2025', type: 'report', topic: 'river', site: '', date: '2026-10-12', fmt: 'PDF', size: '6.2 MB', s: 'The first full-year assessment: storm overflow volume to the tidal Thames down about 86%, 84 tonnes of sewage litter prevented, days of elevated health risk down from 75.7% to 10.4%.' },
  { t: 'New report reveals positive impact of super sewer after first year of operation', type: 'news', topic: 'river', site: '', date: '2026-10-12', s: 'The first annual Tideway Benefits Report, published as operation of the tunnel passes to Thames Water.' },
  { t: 'Tideway launches new photography prize celebrating a new chapter for the River Thames', type: 'news', topic: 'community', site: '', date: '2026-09-27', s: 'The Tideway Prize invites photographers to capture the river now the super sewer is working.' },
  { t: 'Super sewer company launches Active Tideway to help Londoners reconnect with the River Thames', type: 'news', topic: 'community', site: '', date: '2026-08-06', s: 'Subsidised on-water and riverside sessions with Active360 and London Sports Trust.' },
  { t: 'New riverside space opens in Wapping following super sewer works', type: 'news', topic: 'spaces', site: 'king-edward-memorial-park-foreshore', date: '2026-08-04', s: 'A 2,600 square metre riverside park at King Edward Memorial Park, the last of the new public spaces to open.' },
  { t: 'Tideway publishes Annual Report as London’s super sewer captures over 20 million tonnes of sewage', type: 'news', topic: 'corporate', site: '', date: '2026-06-11', s: 'Annual Report and Accounts for 2025-26.' },
  { t: 'Tideway Annual Report 2025-26', type: 'annual', topic: 'corporate', site: '', date: '2026-06-11', fmt: 'PDF', size: '9.8 MB', s: 'Strategic report, governance and financial statements for the year to 31 March 2026.' },
  { t: 'Tideway Annual Report 2024-25', type: 'annual', topic: 'corporate', site: '', date: '2025-06-12', fmt: 'PDF', size: '9.1 MB', s: 'The year the tunnel became fully operational.' },
  { t: 'Tideway Annual Report 2023-24', type: 'annual', topic: 'corporate', site: '', date: '2024-06-13', fmt: 'PDF', size: '8.7 MB', s: 'The year system testing began.' },
  { t: 'Tideway Annual Report 2022-23', type: 'annual', topic: 'corporate', site: '', date: '2023-06-15', fmt: 'PDF', size: '8.4 MB', s: 'Annual Report and Accounts for 2022-23.' },
  { t: 'Tideway Annual Report 2021-22', type: 'annual', topic: 'corporate', site: '', date: '2022-06-16', fmt: 'PDF', size: '7.9 MB', s: 'Annual Report and Accounts for 2021-22.' },
  { t: 'Tideway Annual Report 2020-21', type: 'annual', topic: 'corporate', site: '', date: '2021-06-17', fmt: 'PDF', size: '7.5 MB', s: 'Annual Report and Accounts for 2020-21.' },
  { t: 'Modern slavery and human trafficking statement 2025', type: 'policy', topic: 'corporate', site: '', date: '2025-09-30', fmt: 'PDF', size: '0.4 MB', s: 'How Tideway works to prevent modern slavery in its operations and supply chain.' },
  { t: 'Tideway Sustainability Report 2023-24', type: 'report', topic: 'legacy', site: '', date: '2024-07-01', fmt: 'PDF', size: '5.3 MB', s: 'The final standalone sustainability report from the construction programme.' },
  { t: 'Legacy brochure', type: 'report', topic: 'legacy', site: '', date: '2025-03-01', fmt: 'PDF', size: '4.1 MB', s: 'The five legacy themes: environment; health, safety and wellbeing; economy; people; place.' },
  { t: 'Carbon case study', type: 'legacy', topic: 'legacy', site: '', date: '2024-11-01', fmt: 'PDF', size: '1.2 MB', s: 'How the project measured and reduced construction carbon, including moving material by river.' },
  { t: 'Social impact report', type: 'legacy', topic: 'legacy', site: '', date: '2025-02-01', fmt: 'PDF', size: '3.6 MB', s: 'The social value of jobs, skills, apprenticeships and community partnerships.' },
  { t: 'Every boat counts: moving construction materials by river', type: 'legacy', topic: 'legacy', site: '', date: '2024-05-01', fmt: 'Page', s: 'Why and how the project used the Thames to move spoil and materials, and what it saved.' },
  { t: 'Code of Construction Practice, Part A (Chambers Wharf)', type: 'planning', topic: 'construction', site: 'chambers-wharf', date: '2014-09-12', fmt: 'PDF', size: '2.1 MB', s: 'General requirements for construction at all sites, as approved in the Development Consent Order.' },
  { t: 'Code of Construction Practice, Part B (Chambers Wharf)', type: 'planning', topic: 'construction', site: 'chambers-wharf', date: '2014-09-12', fmt: 'PDF', size: '1.4 MB', s: 'Site-specific measures for Chambers Wharf.' },
  { t: 'Design and Access Statement (Chambers Wharf)', type: 'planning', topic: 'construction', site: 'chambers-wharf', date: '2014-09-12', fmt: 'PDF', size: '12.6 MB', s: 'The permanent design of the site and the new public space.' },
  { t: 'Transport Assessment (Chambers Wharf)', type: 'planning', topic: 'construction', site: 'chambers-wharf', date: '2014-09-12', fmt: 'PDF', size: '3.3 MB', s: 'Road and river transport during construction.' },
  { t: 'Chambers Wharf Community Liaison Working Group: notes, 15 December 2025', type: 'clwg', topic: 'construction', site: 'chambers-wharf', date: '2025-12-15', fmt: 'PDF', size: '0.3 MB', s: 'Notes and presentation from the last meeting of 2025.' },
  { t: 'Air quality and noise monitoring report, quarter 2 2026', type: 'report', topic: 'construction', site: '', date: '2026-07-20', fmt: 'PDF', size: '1.8 MB', s: 'Monitoring results from sites with works continuing.' },
  { t: 'Independent Compensation Panel monthly report, September 2026', type: 'report', topic: 'help', site: '', date: '2026-10-05', fmt: 'PDF', size: '0.5 MB', s: 'Claims received, decided and paid under the compensation programme.' },
  { t: 'CSO discharges: risk to navigation', type: 'policy', topic: 'river', site: '', date: '2025-04-01', fmt: 'PDF', size: '0.6 MB', s: 'Guidance for river users on the remaining discharge points.' },
  { t: 'Complaints procedure', type: 'page', topic: 'help', site: '', date: '2026-01-10', fmt: 'Page', s: 'How to make a complaint, what happens next and how long it takes.' },
  { t: 'Compensation information', type: 'page', topic: 'help', site: '', date: '2026-01-10', fmt: 'Page', s: 'Who can claim, how to claim and the role of the Independent Compensation Panel.' },
  { t: 'A last visit to the tunnels', type: 'video', topic: 'construction', site: '', date: '2024-06-01', fmt: 'Video', size: '1:38', s: 'A final walk through the tunnel before it was filled for the first time.' },
  { t: 'Looking East', type: 'video', topic: 'construction', site: 'chambers-wharf', date: '2024-03-01', fmt: 'Video', size: '2:22', s: 'The eastern section of the tunnel and its sites.' },
  { t: "London's Super Sewer: September 2023 update", type: 'video', topic: 'construction', site: '', date: '2023-09-30', fmt: 'Video', size: '3:05', s: 'The last of the monthly construction updates.' },
  { t: "London's Super Sewer: January 2023, year in review", type: 'video', topic: 'construction', site: '', date: '2023-01-31', fmt: 'Video', size: '4:12', s: 'A look back at 2022 on the project.' },
  { t: 'TBM Selina arrives at Chambers Wharf', type: 'video', topic: 'construction', site: 'chambers-wharf', date: '2021-02-01', fmt: 'Video', size: '1:55', s: 'Tunnelling machine Selina completes her drive.' }
];
window.TW_DOC_TYPES = { report: 'Reports', annual: 'Annual reports', news: 'News', policy: 'Policies', planning: 'Planning documents', clwg: 'Liaison group notes', legacy: 'Learning legacy', page: 'Help pages', video: 'Video' };
window.TW_TOPICS = { river: 'River health', community: 'Community', spaces: 'Public spaces', corporate: 'Company and investors', legacy: 'Legacy', construction: 'Construction', help: 'Help and compensation' };

window.TW_DATE = function (iso) {
  var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var p = iso.split('-');
  return parseInt(p[2], 10) + ' ' + m[parseInt(p[1], 10) - 1] + ' ' + p[0];
};
