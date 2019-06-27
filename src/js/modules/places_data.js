//This is currently mostly just tall tales stuff

var places = [
    /* {
        "loc": [-86.620361, 88.368896], 
        "title": "Pirate Lord's Daughter",
        "desc": "Woman with eyepatch"
    },  */   
    {
        "loc": [-98.689331, 114.637573], 
        "title": "Magpie's Wing (N13)",
        "desc": "Underwater, just off the west coast of an uncharted island at N13",
        "image" : "magpies_wing.jpg",
        talltale: 1
    }, 
    /* {
        "loc": [-98.689331, 114.637573], 
        "title": "Puzzle Room",
        "desc": "Underwater, just off the west coast of an uncharted island at N13",
        "image" : "magpies_wing.jpg",
        talltale: 1
    },  */
    {
        "loc": [-99.158081, 115.043823], 
        "title": "Mercia's Lost Memories Journal 1",
        "desc": "On the beach of the west coast of an uncharted island at N13",
        "image" : "mercia_journal_1.jpg",
        talltale: 1
    }, 
    {
        "loc": [-125.335937, 133.6171883], 
        "title": "Mercia's Lost Memories Journal 2",
        "desc": "In cave at across from the Tavern on the other spire at Anchient Spire Outpost",
        "image" : "mercia_journal_2.jpg",
        talltale: 1
    },
    {
        "loc": [-142.648437, 129.21875], 
        "title": "Mercia's Lost Memories Journal 3",
        "desc": "At Devil's Ridge on a cliff overlooking the beach on the north east side by a cannon",
        "image" : "mercia_journal_3.jpg",
        talltale: 1
    },
    {
        "loc": [-147.6875, 99.710938], 
        "title": "Mercia's Lost Memories Journal 4",
        "desc": "Inside Thieve's Haven, north west side, inside a shack in a crate",
        "image" : "mercia_journal_4-2.jpg",
        talltale: 1
    },
    {
        "loc": [-134.179687, 81.648438], 
        "title": "Mercia's Lost Memories Journal 5",
        "desc": "On Plunder Outpost, by the gold hoarder's tent in a broken rowboat",
        "image" : "mercia_journal_5.jpg",
        talltale: 1
    },



    {
        "loc": [-146.304687, 60.507813], 
        "title": "Bounty Hunter's Journal 1",
        "desc": "On the inside of the outermost ring of Shark Bait cove in a wrecked rowboat",
        "image" : "bounty_hunter_journal_01.jpg",
        talltale: 2
    },
    {
        "loc": [-123.828125, 36.515625], 
        "title": "Bounty Hunter's Journal 2",
        "desc": "On the north beach of Discovery Ridge, next to a half buried skeleton",
        "image" : "bounty_hunter_journal_02.jpg",
        talltale: 2
    },
    {
        "loc": [-92.09375, 145.625], 
        "title": "Bounty Hunter's Journal 3",
        "desc": "Right off the shore of the eastern bay of Kraken's Fall. By a pile of skulls",
        "image" : "bounty_hunter_journal_03.jpg",
        talltale: 2
    },
    {
        "loc": [-91.681335, 47.646057], 
        "title": "Bounty Hunter's Journal 4",
        "desc": "at the top of the main mountain on Wanderer's Refuge tucked into a fence on some stone.",
        "image" : "bounty_hunter_journal_04.jpg",
        talltale: 2
    },
    {
        "loc": [-115.734375, 106.710938], 
        "title": "Bounty Hunter's Journal 5",
        "desc": "In the smaller cave right off the doc on Crook's Hollow. Straight back next to a skeleton next to a wall",
        "image" : "mercia_journal_5.jpg",
        talltale: 2
    },

    {
        "loc": [-40.96286, 62.526276], 
        "title": "Briggsy Journal 1",
        "desc": "Inside the North West cave on Lone Cove. In on the right by some glowing mushrooms.",
        "image" : "briggsy_journal_01.jpg",
        talltale: 3
    },
    {
        "loc": [-95.986481, 15.967438], 
        "title": "Briggsy Journal 2",
        "desc": "in a broken barrel by a cooking fire on the North West shore of Mermaid's Hideaway",
        "image" : "briggsy_journal_02.jpg",
        talltale: 3
    },
    {
        "loc": [-137.257812, 44.59375], 
        "title": "Briggsy Journal 3",
        "desc": "in a hole in the bow of the wrecked ship on Old Salt's Atoll",
        "image" : "briggsy_journal_03.jpg",
        talltale: 3
    },
    {
        "loc": [-54.125, 105.515625], 
        "title": "Briggsy Journal 4",
        "desc": "in a bookshelf in the tavern on Dagger Tooth Outpost",
        "image" : "briggsy_journal_04.jpg",
        talltale: 3
    },
    {
        "loc": [-55.703125, 145.148438], 
        "title": "Briggsy Journal 5",
        "desc": "at the very top of the galleon on Galleons Grave in the cage with a skeleton",
        "image" : "briggsy_journal_05.jpg",
        talltale: 3
    } , 
    
    
    {
        "loc": [-67.523437, 66.414063], 
        "title": "Stars of a Thief journals – Sudds’ Notes 1",
        "desc": "On the eastern most little island of Rum Runner Isle",
        "image" : "mercia_journal_5.jpg",
        talltale: 4
    },
    {
        "loc": [-117.914062, 52.132813], 
        "title": "Stars of a Thief journals – Sudds’ Notes 2",
        "desc": "On Plunder Valley right by the beacon",
        "image" : "mercia_journal_5.jpg",
        talltale: 4
    },
    {
        "loc": [-115.226562, 85.5], 
        "title": "Stars of a Thief journals – Sudds’ Notes 3",
        "desc": "North Eastern edge of the central island on Snake Island. Over a ledge.",
        "image" : "mercia_journal_5.jpg",
        talltale: 4
    },
    {
        "loc": [-142.4375, 127.9375], 
        "title": "Stars of a Thief journals – Sudds’ Notes 4",
        "desc": "At the tallest point on Devils Ridge. You'll need to climb up some rocks to get there.",
        "image" : "mercia_journal_5.jpg",
        talltale: 4
    },
    {
        "loc": [-67.453125, 15.375], 
        "title": "Stars of a Thief journals – Sudds’ Notes 5",
        "desc": "On a ridge overlooking the sea on Cresent Isle by some star gazing equipment",
        "image" : "mercia_journal_5.jpg",
        talltale: 4
    },



    {
        "loc": [-58.546875, 30.3046885], 
        "title": "Wild Rose journals – Lovers’ Notes 1",
        "desc": "Right by some barrels in the middle of Rapier Cay",
        "image" : "mercia_journal_5.jpg",
        talltale: 5
    },
    {
        "loc": [-70.140625, 50.640625], 
        "title": "Wild Rose journals – Lovers’ Notes 2",
        "desc": "in a barrel by the campfire on the beach of Cannon Cove",
        "image" : "mercia_journal_5.jpg",
        talltale: 5
    },
    {
        "loc": [-42.078125, 62.8125], 
        "title": "Wild Rose journals – Lovers’ Notes 3",
        "desc": "at the base of the giant boudler in the middle of Lone Cove",
        "image" : "mercia_journal_5.jpg",
        talltale: 5
    },
    {
        "loc": [-91.929687, 31.015625], 
        "title": "Wild Rose journals – Lovers’ Notes 4",
        "desc": "on top of a barrel on the south east side of Lagoon of Whispers",
        "image" : "mercia_journal_5.jpg",
        talltale: 5
    },
    {
        "loc": [-28.5, 19.765625], 
        "title": "Wild Rose journals – Lovers’ Notes 4",
        "desc": "by a couple barrels on one of the eastern islets at Sailor's Bounty",
        "image" : "mercia_journal_5.jpg",
        talltale: 5
    }  
    
    
    
    
];

export {places};