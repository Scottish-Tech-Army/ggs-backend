// Photos already retrieved from wikimedia and other web linked sources

export type RetrievedPhoto = {
  file: string;
  attribution: string;
  copyright: string;
  originalUrl: string;
};

export const PHOTO_LINKS: Record<string, RetrievedPhoto> = {
  "https://commons.wikimedia.org/wiki/File:Winter_Gardens,_Duthie_Park,_Aberdeen_-_geograph.org.uk_-_214009.jpg":
    {
      file: "Winter_Gardens%2C_Duthie_Park%2C_Aberdeen_-_geograph.org.uk_-_214009.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Winter_Gardens,_Duthie_Park,_Aberdeen_-_geograph.org.uk_-_214009.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:DSCF1764_Johnston_Gardens_Aberdeen.jpg":
    {
      file: "640px-DSCF1764_Johnston_Gardens_Aberdeen.jpg",
      attribution: "AlasdairW",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:DSCF1764_Johnston_Gardens_Aberdeen.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:A_misty_day_at_Mousa_Broch.jpg": {
    file: "A_misty_day_at_Mousa_Broch.jpg",
    attribution: "Jorunn",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:A_misty_day_at_Mousa_Broch.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Broch_of_Clickimin_01.jpg": {
    file: "640px-Broch_of_Clickimin_01.jpg",
    attribution: "DougRM",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Broch_of_Clickimin_01.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:EshaNess_Lighthouse_(8204991572).jpg":
    {
      file: "640px-EshaNess_Lighthouse_%288204991572%29.jpg",
      attribution: "JotaCartas",
      copyright: "CC BY 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:EshaNess_Lighthouse_(8204991572).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Sumburgh_Head_IMG_1315.jpg": {
    file: "640px-Sumburgh_Head_IMG_1315.jpg",
    attribution: "De728631",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Sumburgh_Head_IMG_1315.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:%27Bobby%27s_Bus_Shelter%27,_Baltasound,_Unst,_Shetland._-_panoramio.jpg":
    {
      file: "640px-%27Bobby%27s_Bus_Shelter%27%2C_Baltasound%2C_Unst%2C_Shetland._-_panoramio.jpg",
      attribution: "Panoramio upload bot",
      copyright: "CC BY 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:%27Bobby%27s_Bus_Shelter%27,_Baltasound,_Unst,_Shetland._-_panoramio.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Jarlshof_Prehistoric_%26_Norse_Settlement,_Sumburgh,_Shetland_Islands.jpg":
    {
      file: "640px-Jarlshof_Prehistoric_%26_Norse_Settlement%2C_Sumburgh%2C_Shetland_Islands.jpg",
      attribution: "Stinglehammer",
      copyright: "CC0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Jarlshof_Prehistoric_%26_Norse_Settlement,_Sumburgh,_Shetland_Islands.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Meffan_Institute_-_geograph.org.uk_-_1291301.jpg":
    {
      file: "Meffan_Institute_-_geograph.org.uk_-_1291301.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Meffan_Institute_-_geograph.org.uk_-_1291301.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:War_Memorial_at_Balmashanner_-_geograph.org.uk_-_402698.jpg":
    {
      file: "War_Memorial_at_Balmashanner_-_geograph.org.uk_-_402698.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:War_Memorial_at_Balmashanner_-_geograph.org.uk_-_402698.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Kirriemuir_Camera_Obscura_-_geograph.org.uk_-_574982.jpg":
    {
      file: "Kirriemuir_Camera_Obscura_-_geograph.org.uk_-_574982.jpg",
      attribution: "File Upload Bot (Magnus Manske)",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Kirriemuir_Camera_Obscura_-_geograph.org.uk_-_574982.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Gateway_to_the_Glens_Museum._-_geograph.org.uk_-_423949.jpg":
    {
      file: "Gateway_to_the_Glens_Museum._-_geograph.org.uk_-_423949.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Gateway_to_the_Glens_Museum._-_geograph.org.uk_-_423949.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dalhousie_Arch,_Edzell_-_geograph.org.uk_-_1000574.jpg":
    {
      file: "Dalhousie_Arch%2C_Edzell_-_geograph.org.uk_-_1000574.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dalhousie_Arch,_Edzell_-_geograph.org.uk_-_1000574.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Brechin_Cathedral_20090616_from_the_south.jpg":
    {
      file: "640px-Brechin_Cathedral_20090616_from_the_south.jpg",
      attribution: "Otter",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Brechin_Cathedral_20090616_from_the_south.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Signal_Tower_Museum_-_geograph.org.uk_-_1247673.jpg":
    {
      file: "Signal_Tower_Museum_-_geograph.org.uk_-_1247673.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Signal_Tower_Museum_-_geograph.org.uk_-_1247673.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Barry_Mill2.jpg": {
    file: "640px-Barry_Mill2.jpg",
    attribution: "Scott MacDonald",
    copyright: "CC BY-SA 3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Barry_Mill2.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Dibble_tree.jpg": {
    file: "640px-Dibble_tree.jpg",
    attribution: "Catfish Jim and the soapdish",
    copyright: "Public domain",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Dibble_tree.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:House_of_Dun_-_geograph.org.uk_-_1918387.jpg":
    {
      file: "House_of_Dun_-_geograph.org.uk_-_1918387.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:House_of_Dun_-_geograph.org.uk_-_1918387.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Another_View_of_Scurdie_Ness_Lighthouse_-_geograph.org.uk_-_1204176.jpg":
    {
      file: "Another_View_of_Scurdie_Ness_Lighthouse_-_geograph.org.uk_-_1204176.jpg",
      attribution: "File Upload Bot (Magnus Manske)",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Another_View_of_Scurdie_Ness_Lighthouse_-_geograph.org.uk_-_1204176.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Aden_country_park_campsite_1_-_geograph.org.uk_-_774864.jpg":
    {
      file: "Aden_country_park_campsite_1_-_geograph.org.uk_-_774864.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Aden_country_park_campsite_1_-_geograph.org.uk_-_774864.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Stag_on_Mormond_Hill.jpg": {
    file: "640px-Stag_on_Mormond_Hill.jpg",
    attribution: "Finavon",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Stag_on_Mormond_Hill.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Peterhead_Lido_-_geograph.org.uk_-_159757.jpg":
    {
      file: "Peterhead_Lido_-_geograph.org.uk_-_159757.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Peterhead_Lido_-_geograph.org.uk_-_159757.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Bridge_over_the_Deveron_-_geograph.org.uk_-_1248701.jpg":
    {
      file: "Bridge_over_the_Deveron_-_geograph.org.uk_-_1248701.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Bridge_over_the_Deveron_-_geograph.org.uk_-_1248701.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Moat_Brae,_National_Centre_for_Children%27s_Literature_and_Storytelling.jpg":
    {
      file: "640px-Moat_Brae%2C_National_Centre_for_Children%27s_Literature_and_Storytelling.jpg",
      attribution: "MoatBrae",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Moat_Brae,_National_Centre_for_Children%27s_Literature_and_Storytelling.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Ellisland_Farm_Auldgirth.JPG": {
    file: "640px-Ellisland_Farm_Auldgirth.JPG",
    attribution: "Rosser1954",
    copyright: "Public domain",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Ellisland_Farm_Auldgirth.JPG",
  },
  "https://commons.wikimedia.org/wiki/File:Devorgilla_Bridge,_Dumfries_(26588006583).jpg":
    {
      file: "640px-Devorgilla_Bridge%2C_Dumfries_%2826588006583%29.jpg",
      attribution: "Zambog",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Devorgilla_Bridge,_Dumfries_(26588006583).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Drumlanrig_Castle.jpg": {
    file: "Drumlanrig_Castle.jpg",
    attribution: "Natl1",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Drumlanrig_Castle.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Caerlaverock_Castle,_Dumfriesshire.jpg":
    {
      file: "Caerlaverock_Castle%2C_Dumfriesshire.jpg",
      attribution: "Broichmore",
      copyright: "CC BY 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Caerlaverock_Castle,_Dumfriesshire.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Old_Blacksmith%27s_Shop_-_geograph.org.uk_-_881585.jpg":
    {
      file: "The_Old_Blacksmith%27s_Shop_-_geograph.org.uk_-_881585.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Old_Blacksmith%27s_Shop_-_geograph.org.uk_-_881585.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Devil%27s_Porridge_Museum.jpg": {
    file: "640px-The_Devil%27s_Porridge_Museum.jpg",
    attribution: "Earlgreydays",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:The_Devil%27s_Porridge_Museum.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Dumfries,_Dock_Park,_Bandstand.jpg":
    {
      file: "640px-Dumfries%2C_Dock_Park%2C_Bandstand.jpg",
      attribution: "Grant McIntosh Photography",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dumfries,_Dock_Park,_Bandstand.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Logan_Botanic_Garden_(43275930372).jpg":
    {
      file: "640px-Logan_Botanic_Garden_%2843275930372%29.jpg",
      attribution: "Naturiss",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Logan_Botanic_Garden_(43275930372).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Marina_at_Kirkcudbright_Harbour_-_geograph.org.uk_-_2030162.jpg":
    {
      file: "640px-Marina_at_Kirkcudbright_Harbour_-_geograph.org.uk_-_2030162.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Marina_at_Kirkcudbright_Harbour_-_geograph.org.uk_-_2030162.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Sweetheart_Abbey1.jpg": {
    file: "640px-Sweetheart_Abbey1.jpg",
    attribution: "File Upload Bot (Magnus Manske)",
    copyright: "Public domain",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Sweetheart_Abbey1.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Caerlaverock_Wetland_Centre_-_geograph.org.uk_-_3411378.jpg":
    {
      file: "Caerlaverock_Wetland_Centre_-_geograph.org.uk_-_3411378.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Caerlaverock_Wetland_Centre_-_geograph.org.uk_-_3411378.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Cairn_on_Long_Fell_looking_to_Criffel_-_geograph.org.uk_-_1997817.jpg":
    {
      file: "640px-Cairn_on_Long_Fell_looking_to_Criffel_-_geograph.org.uk_-_1997817.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Cairn_on_Long_Fell_looking_to_Criffel_-_geograph.org.uk_-_1997817.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Trig_Pillar,_The_Merrick_-_geograph.org.uk_-_462822.jpg":
    {
      file: "Trig_Pillar%2C_The_Merrick_-_geograph.org.uk_-_462822.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Trig_Pillar,_The_Merrick_-_geograph.org.uk_-_462822.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Powfoot_Spa_%26_beach_with_the_Solway_Firth,_Dumfries_%26_Galloway.jpg":
    {
      file: "640px-Powfoot_Spa_%26_beach_with_the_Solway_Firth%2C_Dumfries_%26_Galloway.jpg",
      attribution: "Rosser1954",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Powfoot_Spa_%26_beach_with_the_Solway_Firth,_Dumfries_%26_Galloway.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Burns_Statue_-_geograph.org.uk_-_401572.jpg":
    {
      file: "Burns_Statue_-_geograph.org.uk_-_401572.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Burns_Statue_-_geograph.org.uk_-_401572.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Jean_Armour_Statue,_Dumfries_-_geograph.org.uk_-_151761.jpg":
    {
      file: "Jean_Armour_Statue%2C_Dumfries_-_geograph.org.uk_-_151761.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Jean_Armour_Statue,_Dumfries_-_geograph.org.uk_-_151761.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dumfries_Museum,_old_windmill_tower,_Dumfries_%26_Galloway,_Scotland.jpg":
    {
      file: "640px-Dumfries_Museum%2C_old_windmill_tower%2C_Dumfries_%26_Galloway%2C_Scotland.jpg",
      attribution: "Rosser1954",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dumfries_Museum,_old_windmill_tower,_Dumfries_%26_Galloway,_Scotland.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:V%26A_Dundee_Near_Completion_Feb_2018_(Alex_Liivet).jpg":
    {
      file: "640px-V%26A_Dundee_Near_Completion_Feb_2018_%28Alex_Liivet%29.jpg",
      attribution: "Laerol",
      copyright: "CC BY 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:V%26A_Dundee_Near_Completion_Feb_2018_(Alex_Liivet).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:RRS_Discovery_Dundee.JPG": {
    file: "640px-RRS_Discovery_Dundee.JPG",
    attribution: "J budissin",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:RRS_Discovery_Dundee.JPG",
  },
  "https://commons.wikimedia.org/wiki/File:Mills_Observatory_(geograph_4897866).jpg":
    {
      file: "640px-Mills_Observatory_%28geograph_4897866%29.jpg",
      attribution: "Crowsus",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Mills_Observatory_(geograph_4897866).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Balgay_Park_(geograph_4527842).jpg":
    {
      file: "640px-Balgay_Park_%28geograph_4527842%29.jpg",
      attribution: "Crowsus",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Balgay_Park_(geograph_4527842).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:287_Dundee_Science_Centre_AR.jpg": {
    file: "640px-287_Dundee_Science_Centre_AR.jpg",
    attribution: "DundeeScienceCentre",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:287_Dundee_Science_Centre_AR.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:The_McManus_(51380568903).jpg": {
    file: "640px-The_McManus_%2851380568903%29.jpg",
    attribution: "Jammyscone",
    copyright: "CC0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:The_McManus_(51380568903).jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Desperate_dan.jpg": {
    file: "Desperate_dan.jpg",
    attribution: "Catfish Jim and the soapdish",
    copyright: "CC BY-SA 2.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Desperate_dan.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Oor_Wullie_statue.jpg": {
    file: "640px-Oor_Wullie_statue.jpg",
    attribution: "Sahaib",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Oor_Wullie_statue.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:DC_Thomson_Dundee_Meadowside_north_east_distant_view_(post_refurb).jpg":
    {
      file: "640px-DC_Thomson_Dundee_Meadowside_north_east_distant_view_%28post_refurb%29.jpg",
      attribution: "Laerol",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:DC_Thomson_Dundee_Meadowside_north_east_distant_view_(post_refurb).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St_Pauls_Cathedral,_Dundee_(geograph_3856675).jpg":
    {
      file: "St_Pauls_Cathedral%2C_Dundee_%28geograph_3856675%29.jpg",
      attribution: "Cnbrb",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St_Pauls_Cathedral,_Dundee_(geograph_3856675).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Slessor_Gardens_Feb_2018.jpg": {
    file: "640px-Slessor_Gardens_Feb_2018.jpg",
    attribution: "Laerol",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Slessor_Gardens_Feb_2018.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Queen_Victoria_Statue,_Albert_Square_-_geograph.org.uk_-_2459392.jpg":
    {
      file: "Queen_Victoria_Statue%2C_Albert_Square_-_geograph.org.uk_-_2459392.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Queen_Victoria_Statue,_Albert_Square_-_geograph.org.uk_-_2459392.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:%27Lemmings%27_sculpture_-_detail_(geograph_6299613).jpg":
    {
      file: "%27Lemmings%27_sculpture_-_detail_%28geograph_6299613%29.jpg",
      attribution: "Cakelot1",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:%27Lemmings%27_sculpture_-_detail_(geograph_6299613).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Tay_Road_Bridge_-_geograph.org.uk_-_433424.jpg":
    {
      file: "Tay_Road_Bridge_-_geograph.org.uk_-_433424.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Tay_Road_Bridge_-_geograph.org.uk_-_433424.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Tay_Rail_Bridge.jpg": {
    file: "640px-Tay_Rail_Bridge.jpg",
    attribution: "Macieklew",
    copyright: "CC BY-SA 3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Tay_Rail_Bridge.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Dundee_-_Verdant_Works_Museum,_courtyard_(geograph_5231391).jpg":
    {
      file: "640px-Dundee_-_Verdant_Works_Museum%2C_courtyard_%28geograph_5231391%29.jpg",
      attribution: "Plucas58",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dundee_-_Verdant_Works_Museum,_courtyard_(geograph_5231391).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Caird_Hall_and_Caird_Hall_Square,_Dundee.jpg":
    {
      file: "640px-Caird_Hall_and_Caird_Hall_Square%2C_Dundee.jpg",
      attribution: "Stephencdickson",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Caird_Hall_and_Caird_Hall_Square,_Dundee.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Penguins_on_the_wall_-_geograph.org.uk_-_1804952.jpg":
    {
      file: "640px-Penguins_on_the_wall_-_geograph.org.uk_-_1804952.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Penguins_on_the_wall_-_geograph.org.uk_-_1804952.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dundee_Museum_of_Transport.jpg": {
    file: "640px-Dundee_Museum_of_Transport.jpg",
    attribution: "Ramarshal",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Dundee_Museum_of_Transport.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Magdalen_Green_Bandstand_-_geograph.org.uk_-_1253228.jpg":
    {
      file: "Magdalen_Green_Bandstand_-_geograph.org.uk_-_1253228.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Magdalen_Green_Bandstand_-_geograph.org.uk_-_1253228.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Mains_Castle_-_geograph.org.uk_-_1224186.jpg":
    {
      file: "Mains_Castle_-_geograph.org.uk_-_1224186.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Mains_Castle_-_geograph.org.uk_-_1224186.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dundee_Rep,_South_Tay_Street_-_geograph.org.uk_-_2464945.jpg":
    {
      file: "Dundee_Rep%2C_South_Tay_Street_-_geograph.org.uk_-_2464945.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dundee_Rep,_South_Tay_Street_-_geograph.org.uk_-_2464945.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dundee_Contemporary_Arts.jpg": {
    file: "640px-Dundee_Contemporary_Arts.jpg",
    attribution: "Ydam~commonswiki",
    copyright: "CC-BY-SA-3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Dundee_Contemporary_Arts.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Wojtek_statue_in_Duns_%E2%80%94_Geograph-5305348-by-Jim-Barton.jpg":
    {
      file: "640px-Wojtek_statue_in_Duns_%E2%80%94_Geograph-5305348-by-Jim-Barton.jpg",
      attribution: "Eissink",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Wojtek_statue_in_Duns_%E2%80%94_Geograph-5305348-by-Jim-Barton.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Arctic_Tern_Sculpture_at_the_SeaBird_Centre,_North_Berwick_-_geograph.org.uk_-_1198452.jpg":
    {
      file: "Arctic_Tern_Sculpture_at_the_SeaBird_Centre%2C_North_Berwick_-_geograph.org.uk_-_1198452.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Arctic_Tern_Sculpture_at_the_SeaBird_Centre,_North_Berwick_-_geograph.org.uk_-_1198452.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:PrestongrangeMuseum2.jpg": {
    file: "640px-PrestongrangeMuseum2.jpg",
    attribution: "File Upload Bot (Magnus Manske)",
    copyright: "Public domain",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:PrestongrangeMuseum2.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Rural_East_Lothian_,_Foxlake,_near_Dunbar_-_geograph.org.uk_-_3112980.jpg":
    {
      file: "640px-Rural_East_Lothian_%2C_Foxlake%2C_near_Dunbar_-_geograph.org.uk_-_3112980.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Rural_East_Lothian_,_Foxlake,_near_Dunbar_-_geograph.org.uk_-_3112980.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Traprain_Law_4.jpg": {
    file: "640px-Traprain_Law_4.jpg",
    attribution: "File Upload Bot (Magnus Manske)",
    copyright: "Public domain",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Traprain_Law_4.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Doorway,_Yester_Castle_-_geograph.org.uk_-_873897.jpg":
    {
      file: "Doorway%2C_Yester_Castle_-_geograph.org.uk_-_873897.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Doorway,_Yester_Castle_-_geograph.org.uk_-_873897.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Bridge_to_nowhere,_Belhaven_Bay_-_geograph.org.uk_-_219872.jpg":
    {
      file: "Bridge_to_nowhere%2C_Belhaven_Bay_-_geograph.org.uk_-_219872.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Bridge_to_nowhere,_Belhaven_Bay_-_geograph.org.uk_-_219872.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St._Mary%27s_Kirk,_Haddington.jpg": {
    file: "640px-St._Mary%27s_Kirk%2C_Haddington.jpg",
    attribution: "Martin york",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:St._Mary%27s_Kirk,_Haddington.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Newhailes_House_in_2021.jpg": {
    file: "640px-Newhailes_House_in_2021.jpg",
    attribution: "Lupe",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Newhailes_House_in_2021.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Whitelee_Wind_Farm_turbines.jpg": {
    file: "640px-Whitelee_Wind_Farm_turbines.jpg",
    attribution: "Dylsss",
    copyright: "CC0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Whitelee_Wind_Farm_turbines.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:St_Mary_S_Cathedral_Edinburgh_(61091454).jpeg":
    {
      file: "640px-St_Mary_S_Cathedral_Edinburgh_%2861091454%29.jpeg",
      attribution: "DarwIn",
      copyright: "CC BY 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St_Mary_S_Cathedral_Edinburgh_(61091454).jpeg",
    },
  "https://commons.wikimedia.org/wiki/File:Edinburgh_Scottish_Parliament_Holyrood_07.JPG":
    {
      file: "640px-Edinburgh_Scottish_Parliament_Holyrood_07.JPG",
      attribution: "Ad Meskens",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Edinburgh_Scottish_Parliament_Holyrood_07.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Fisheries_Museum_-_geograph.org.uk_-_564129.jpg":
    {
      file: "Fisheries_Museum_-_geograph.org.uk_-_564129.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Fisheries_Museum_-_geograph.org.uk_-_564129.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St_._Andrews_Botanic_Garden_-_geograph.org.uk_-_991562.jpg":
    {
      file: "St_._Andrews_Botanic_Garden_-_geograph.org.uk_-_991562.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St_._Andrews_Botanic_Garden_-_geograph.org.uk_-_991562.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Good_Samaritan_-_geograph.org.uk_-_130640.jpg":
    {
      file: "The_Good_Samaritan_-_geograph.org.uk_-_130640.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Good_Samaritan_-_geograph.org.uk_-_130640.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Jimmy_Shand_Sculpture_in_Auchtermuchty_(BM_Forbes_photo).jpg":
    {
      file: "640px-Jimmy_Shand_Sculpture_in_Auchtermuchty_%28BM_Forbes_photo%29.jpg",
      attribution: "Flickr upload bot",
      copyright: "CC BY 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Jimmy_Shand_Sculpture_in_Auchtermuchty_(BM_Forbes_photo).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Wallace_Monument_Aerial,_Stirling.jpg":
    {
      file: "640px-The_Wallace_Monument_Aerial%2C_Stirling.jpg",
      attribution: "BusterBrownBB",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Wallace_Monument_Aerial,_Stirling.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:MK18543_Bannockburn.jpg": {
    file: "640px-MK18543_Bannockburn.jpg",
    attribution: "Martin Kraft",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:MK18543_Bannockburn.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Blair_Drummond_Safari_Park_(21).jpg":
    {
      file: "640px-Blair_Drummond_Safari_Park_%2821%29.jpg",
      attribution: "Stevanhogg",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Blair_Drummond_Safari_Park_(21).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Kings_Knot_from_Stirling_Castle_-_panoramio.jpg":
    {
      file: "640px-The_Kings_Knot_from_Stirling_Castle_-_panoramio.jpg",
      attribution: "Panoramio upload bot",
      copyright: "CC BY 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Kings_Knot_from_Stirling_Castle_-_panoramio.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Old_Stirling_Bridge.jpg": {
    file: "640px-Old_Stirling_Bridge.jpg",
    attribution: "RFARKAS",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Old_Stirling_Bridge.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Stirling_-_The_Smith_Institute_Museum_20120419.jpg":
    {
      file: "640px-Stirling_-_The_Smith_Institute_Museum_20120419.jpg",
      attribution: "Otter",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Stirling_-_The_Smith_Institute_Museum_20120419.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Torwood_Castle_-_geograph.org.uk_-_2769669.jpg":
    {
      file: "640px-Torwood_Castle_-_geograph.org.uk_-_2769669.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Torwood_Castle_-_geograph.org.uk_-_2769669.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Pineapple.jpg": {
    file: "The_Pineapple.jpg",
    attribution: "Cactus.man",
    copyright: "CC BY-SA 2.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:The_Pineapple.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Antonine_Wall_at_Seabegs_Wood_-_geograph.org.uk_-_930380.jpg":
    {
      file: "Antonine_Wall_at_Seabegs_Wood_-_geograph.org.uk_-_930380.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Antonine_Wall_at_Seabegs_Wood_-_geograph.org.uk_-_930380.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Falkirk_(Millennium)_Wheel.jpg": {
    file: "640px-Falkirk_%28Millennium%29_Wheel.jpg",
    attribution: "Geo Swan",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Falkirk_(Millennium)_Wheel.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Callendar_House_-_geograph.org.uk_-_2727695.jpg":
    {
      file: "640px-Callendar_House_-_geograph.org.uk_-_2727695.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Callendar_House_-_geograph.org.uk_-_2727695.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Loch_Lubnaig_from_the_path_to_Ben_Ledi,_Scotland.jpg":
    {
      file: "640px-Loch_Lubnaig_from_the_path_to_Ben_Ledi%2C_Scotland.jpg",
      attribution: "Podzemnik",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Loch_Lubnaig_from_the_path_to_Ben_Ledi,_Scotland.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Stronachlachar_Pier_-_geograph.org.uk_-_1532477.jpg":
    {
      file: "Stronachlachar_Pier_-_geograph.org.uk_-_1532477.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Stronachlachar_Pier_-_geograph.org.uk_-_1532477.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Bully_beef%5E_-_geograph.org.uk_-_353697.jpg":
    {
      file: "Bully_beef%5E_-_geograph.org.uk_-_353697.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Bully_beef%5E_-_geograph.org.uk_-_353697.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Seat_at_the_tip_of_the_park_area_of_Ferry_Point_-_geograph.org.uk_-_2268350.jpg":
    {
      file: "640px-Seat_at_the_tip_of_the_park_area_of_Ferry_Point_-_geograph.org.uk_-_2268350.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Seat_at_the_tip_of_the_park_area_of_Ferry_Point_-_geograph.org.uk_-_2268350.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Path_along_the_esker,_Evanton_Community_Wood_(geograph_6311837).jpg":
    {
      file: "640px-Path_along_the_esker%2C_Evanton_Community_Wood_%28geograph_6311837%29.jpg",
      attribution: "Bjh21",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Path_along_the_esker,_Evanton_Community_Wood_(geograph_6311837).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Lochbroom_,_Sir_Arthur_Fowlers_Memorial_Clock_at_Ullapool_-_geograph.org.uk_-_2255531.jpg":
    {
      file: "640px-Lochbroom_%2C_Sir_Arthur_Fowlers_Memorial_Clock_at_Ullapool_-_geograph.org.uk_-_2255531.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Lochbroom_,_Sir_Arthur_Fowlers_Memorial_Clock_at_Ullapool_-_geograph.org.uk_-_2255531.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Touchstone_Maze_-_panoramio.jpg": {
    file: "640px-Touchstone_Maze_-_panoramio.jpg",
    attribution: "Panoramio upload bot",
    copyright: "CC BY 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Touchstone_Maze_-_panoramio.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Tain,_Alexandra_Bridge_-_geograph.org.uk_-_2526517.jpg":
    {
      file: "Tain%2C_Alexandra_Bridge_-_geograph.org.uk_-_2526517.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Tain,_Alexandra_Bridge_-_geograph.org.uk_-_2526517.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Track_through_Clash_Wood_-_geograph.org.uk_-_957965.jpg":
    {
      file: "Track_through_Clash_Wood_-_geograph.org.uk_-_957965.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Track_through_Clash_Wood_-_geograph.org.uk_-_957965.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Fairy_Glen,_Rosemarkie.png": {
    file: "640px-Fairy_Glen%2C_Rosemarkie.png",
    attribution: "Pampuco",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Fairy_Glen,_Rosemarkie.png",
  },
  "https://commons.wikimedia.org/wiki/File:Fortrose_Cathedral_north_2013.jpg": {
    file: "640px-Fortrose_Cathedral_north_2013.jpg",
    attribution: "DeFacto",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Fortrose_Cathedral_north_2013.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Cromarty_Lighthouse_(geograph_2337177).jpg":
    {
      file: "640px-Cromarty_Lighthouse_%28geograph_2337177%29.jpg",
      attribution: "File Upload Bot (Magnus Manske)",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Cromarty_Lighthouse_(geograph_2337177).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Falls_of_Rogie._-_geograph.org.uk_-_1020481.jpg":
    {
      file: "The_Falls_of_Rogie._-_geograph.org.uk_-_1020481.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Falls_of_Rogie._-_geograph.org.uk_-_1020481.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Benmore.jpg": {
    file: "640px-Benmore.jpg",
    attribution: "Javier martin",
    copyright: "CC BY 3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Benmore.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Ascend_of_the_Ben_Nevis_03.jpg": {
    file: "640px-Ascend_of_the_Ben_Nevis_03.jpg",
    attribution: "Rubdos",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Ascend_of_the_Ben_Nevis_03.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Glenfinnan_Viaduct_3_20211024.jpg": {
    file: "640px-Glenfinnan_Viaduct_3_20211024.jpg",
    attribution: "Domob",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Glenfinnan_Viaduct_3_20211024.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Glenfinnan_monument_20211024.jpg": {
    file: "640px-Glenfinnan_monument_20211024.jpg",
    attribution: "Domob",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Glenfinnan_monument_20211024.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Neptune%27s_Staircase_20211023.jpg":
    {
      file: "640px-Neptune%27s_Staircase_20211023.jpg",
      attribution: "Domob",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Neptune%27s_Staircase_20211023.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Glencoe_Visitor_Centre_-_geograph.org.uk_-_2512200.jpg":
    {
      file: "640px-Glencoe_Visitor_Centre_-_geograph.org.uk_-_2512200.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Glencoe_Visitor_Centre_-_geograph.org.uk_-_2512200.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Loch_Ness_-_panoramio_(16).jpg": {
    file: "640px-Loch_Ness_-_panoramio_%2816%29.jpg",
    attribution: "Panoramio upload bot",
    copyright: "CC BY 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Loch_Ness_-_panoramio_(16).jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Commando_Memorial,_Spean_Bridge_-_geograph.org.uk_-_107762.jpg":
    {
      file: "Commando_Memorial%2C_Spean_Bridge_-_geograph.org.uk_-_107762.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Commando_Memorial,_Spean_Bridge_-_geograph.org.uk_-_107762.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:SkyeBridge.jpg": {
    file: "640px-SkyeBridge.jpg",
    attribution: "Macieklew",
    copyright: "CC BY-SA 4.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:SkyeBridge.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Eilean_Donan_Castle_Panorama.jpg": {
    file: "640px-Eilean_Donan_Castle_Panorama.jpg",
    attribution: "Ritchyblack",
    copyright: "FAL",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Eilean_Donan_Castle_Panorama.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Old_Man_of_Storr.jpg": {
    file: "640px-Old_Man_of_Storr.jpg",
    attribution: "Nono vlf",
    copyright: "CC BY-SA 4.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Old_Man_of_Storr.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:John_Rae_statue,_Stromness_Pierhead,_Stromness,_Orkney.jpg":
    {
      file: "640px-John_Rae_statue%2C_Stromness_Pierhead%2C_Stromness%2C_Orkney.jpg",
      attribution: "Dger",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:John_Rae_statue,_Stromness_Pierhead,_Stromness,_Orkney.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Strom_Pier_Arts_Center_cropped.jpg":
    {
      file: "Strom_Pier_Arts_Center_cropped.jpg",
      attribution: "RTG",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Strom_Pier_Arts_Center_cropped.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Stromness_Museum_2017.jpg": {
    file: "640px-Stromness_Museum_2017.jpg",
    attribution: "Unukorno",
    copyright: "CC BY 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Stromness_Museum_2017.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Whalebone_from_North_-_geograph.org.uk_-_514435.jpg":
    {
      file: "Whalebone_from_North_-_geograph.org.uk_-_514435.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Whalebone_from_North_-_geograph.org.uk_-_514435.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dounby_Click_Mill,_Orkney_2017-05-24.jpg":
    {
      file: "640px-Dounby_Click_Mill%2C_Orkney_2017-05-24.jpg",
      attribution: "Schwerdf",
      copyright: "CC BY 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dounby_Click_Mill,_Orkney_2017-05-24.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Ring_of_Brodgar,_Orkney.jpg": {
    file: "640px-Ring_of_Brodgar%2C_Orkney.jpg",
    attribution: "Stevekeiretsu",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Ring_of_Brodgar,_Orkney.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Happy_Valley_Arch_-_geograph.org.uk_-_2514872.jpg":
    {
      file: "640px-Happy_Valley_Arch_-_geograph.org.uk_-_2514872.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Happy_Valley_Arch_-_geograph.org.uk_-_2514872.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Trumland_House_-_geograph.org.uk_-_1448279.jpg":
    {
      file: "Trumland_House_-_geograph.org.uk_-_1448279.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Trumland_House_-_geograph.org.uk_-_1448279.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Midhowe_Chambered_Cairn_20110525_compartments_from_above.jpg":
    {
      file: "640px-Midhowe_Chambered_Cairn_20110525_compartments_from_above.jpg",
      attribution: "Otter",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Midhowe_Chambered_Cairn_20110525_compartments_from_above.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Skara_Brae_and_the_Bay_of_Skaill_-_geograph.org.uk_-_1768351.jpg":
    {
      file: "Skara_Brae_and_the_Bay_of_Skaill_-_geograph.org.uk_-_1768351.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Skara_Brae_and_the_Bay_of_Skaill_-_geograph.org.uk_-_1768351.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Skara_Brae-habitations.jpg": {
    file: "640px-Skara_Brae-habitations.jpg",
    attribution: "Danielhbordeleau",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Skara_Brae-habitations.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Broch_of_Gurness,_Shamrock_House.jpg":
    {
      file: "640px-Broch_of_Gurness%2C_Shamrock_House.jpg",
      attribution: "Gaius Cornelius",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Broch_of_Gurness,_Shamrock_House.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Rocks_at_Herston_Taing_-_geograph.org.uk_-_178237.jpg":
    {
      file: "Rocks_at_Herston_Taing_-_geograph.org.uk_-_178237.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Rocks_at_Herston_Taing_-_geograph.org.uk_-_178237.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Churchill-Barrier-1.jpg": {
    file: "640px-Churchill-Barrier-1.jpg",
    attribution: "BillC",
    copyright: "CC-BY-SA-3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Churchill-Barrier-1.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Italian_Chapel_(exterior),_Orkney-PS-Edit_final.jpg":
    {
      file: "640px-Italian_Chapel_%28exterior%29%2C_Orkney-PS-Edit_final.jpg",
      attribution: "MichaelMaggs",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Italian_Chapel_(exterior),_Orkney-PS-Edit_final.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St._Magnus_Cathedral,_Kirkwall_-_geograph.org.uk_-_2096130.jpg":
    {
      file: "640px-St._Magnus_Cathedral%2C_Kirkwall_-_geograph.org.uk_-_2096130.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St._Magnus_Cathedral,_Kirkwall_-_geograph.org.uk_-_2096130.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Tankerness_House_Museum_20110526.jpg":
    {
      file: "640px-Tankerness_House_Museum_20110526.jpg",
      attribution: "LittleDwangs",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Tankerness_House_Museum_20110526.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Peedie_Sea,_Sanday_-_geograph.org.uk_-_224501.jpg":
    {
      file: "Peedie_Sea%2C_Sanday_-_geograph.org.uk_-_224501.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Peedie_Sea,_Sanday_-_geograph.org.uk_-_224501.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Groatie_Hoose_-_geograph.org.uk_-_1441813.jpg":
    {
      file: "The_Groatie_Hoose_-_geograph.org.uk_-_1441813.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Groatie_Hoose_-_geograph.org.uk_-_1441813.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St._Magnus_Church,_Egilsay_-_geograph.org.uk_-_1434978.jpg":
    {
      file: "St._Magnus_Church%2C_Egilsay_-_geograph.org.uk_-_1434978.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St._Magnus_Church,_Egilsay_-_geograph.org.uk_-_1434978.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Orkney_Wireless_Museum,_Kirkwall_(25869863128).jpg":
    {
      file: "640px-Orkney_Wireless_Museum%2C_Kirkwall_%2825869863128%29.jpg",
      attribution: "LittleDwangs",
      copyright: "CC BY 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Orkney_Wireless_Museum,_Kirkwall_(25869863128).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Cairn_o%27Mount_Viewpoint_-_geograph.org.uk_-_1391717.jpg":
    {
      file: "Cairn_o%27Mount_Viewpoint_-_geograph.org.uk_-_1391717.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Cairn_o%27Mount_Viewpoint_-_geograph.org.uk_-_1391717.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Carron_fish_bar.jpg": {
    file: "640px-Carron_fish_bar.jpg",
    attribution: "Taras",
    copyright: "CC BY-SA 4.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Carron_fish_bar.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Tower_of_Johnston_-_geograph.org.uk_-_3250423.jpg":
    {
      file: "640px-Tower_of_Johnston_-_geograph.org.uk_-_3250423.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Tower_of_Johnston_-_geograph.org.uk_-_3250423.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Pluscarden_Abbey_20080430.jpg": {
    file: "640px-Pluscarden_Abbey_20080430.jpg",
    attribution: "Otter",
    copyright: "CC-BY-SA-3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Pluscarden_Abbey_20080430.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Loch_of_Blairs_-_geograph.org.uk_-_2321894.jpg":
    {
      file: "Loch_of_Blairs_-_geograph.org.uk_-_2321894.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Loch_of_Blairs_-_geograph.org.uk_-_2321894.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Duffus_Castle.jpg": {
    file: "640px-Duffus_Castle.jpg",
    attribution: "Angusmclellan",
    copyright: "CC-BY-SA-3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Duffus_Castle.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:The_Palace_of_Spynie_-_geograph.org.uk_-_1340516.jpg":
    {
      file: "The_Palace_of_Spynie_-_geograph.org.uk_-_1340516.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Palace_of_Spynie_-_geograph.org.uk_-_1340516.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Sanquhar_Loch,_Forres_-_geograph.org.uk_-_253597.jpg":
    {
      file: "Sanquhar_Loch%2C_Forres_-_geograph.org.uk_-_253597.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Sanquhar_Loch,_Forres_-_geograph.org.uk_-_253597.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Forres_-_Mercat_Cross_and_Tolbooth_-_geograph.org.uk_-_884375.jpg":
    {
      file: "Forres_-_Mercat_Cross_and_Tolbooth_-_geograph.org.uk_-_884375.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Forres_-_Mercat_Cross_and_Tolbooth_-_geograph.org.uk_-_884375.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:RB_20211006_Bow_fiddle_rock.jpg": {
    file: "640px-RB_20211006_Bow_fiddle_rock.jpg",
    attribution: "Monster4711",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:RB_20211006_Bow_fiddle_rock.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:The_Three_Kings_-_geograph.org.uk_-_684750.jpg":
    {
      file: "The_Three_Kings_-_geograph.org.uk_-_684750.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Three_Kings_-_geograph.org.uk_-_684750.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Cullen_viaduct_-_geograph.org.uk_-_1547842.jpg":
    {
      file: "640px-Cullen_viaduct_-_geograph.org.uk_-_1547842.jpg",
      attribution: "Geograph Update Bot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Cullen_viaduct_-_geograph.org.uk_-_1547842.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Whale%27s_Moo_-_geograph.org.uk_-_684697.jpg":
    {
      file: "Whale%27s_Moo_-_geograph.org.uk_-_684697.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Whale%27s_Moo_-_geograph.org.uk_-_684697.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Cullen_Auld_Kirk_-_geograph.org.uk_-_248927.jpg":
    {
      file: "Cullen_Auld_Kirk_-_geograph.org.uk_-_248927.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Cullen_Auld_Kirk_-_geograph.org.uk_-_248927.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Buckie_Lifeboat_at_Station_-_geograph.org.uk_-_2088230.jpg":
    {
      file: "Buckie_Lifeboat_at_Station_-_geograph.org.uk_-_2088230.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Buckie_Lifeboat_at_Station_-_geograph.org.uk_-_2088230.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St._Rufus_Church,_Keith_-_geograph.org.uk_-_326209.jpg":
    {
      file: "St._Rufus_Church%2C_Keith_-_geograph.org.uk_-_326209.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St._Rufus_Church,_Keith_-_geograph.org.uk_-_326209.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:North_CHurch,_Keith_(geograph_3626025).jpg":
    {
      file: "640px-North_CHurch%2C_Keith_%28geograph_3626025%29.jpg",
      attribution: "George Burgess",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:North_CHurch,_Keith_(geograph_3626025).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Keith_kosciol_katolicki.jpg": {
    file: "640px-Keith_kosciol_katolicki.jpg",
    attribution: "Hindiana~commonswiki",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Keith_kosciol_katolicki.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Keith,_Tarnash_Falls.jpg": {
    file: "640px-Keith%2C_Tarnash_Falls.jpg",
    attribution: "Reinhard Müller",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Keith,_Tarnash_Falls.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Longmore_Halls_-_geograph.org.uk_-_394942.jpg":
    {
      file: "Longmore_Halls_-_geograph.org.uk_-_394942.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Longmore_Halls_-_geograph.org.uk_-_394942.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Auld_Brig_at_Keith_-_geograph.org.uk_-_688662.jpg":
    {
      file: "The_Auld_Brig_at_Keith_-_geograph.org.uk_-_688662.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Auld_Brig_at_Keith_-_geograph.org.uk_-_688662.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Fochabers_Folk_Museum_-_geograph.org.uk_-_199959.jpg":
    {
      file: "Fochabers_Folk_Museum_-_geograph.org.uk_-_199959.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Fochabers_Folk_Museum_-_geograph.org.uk_-_199959.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_main_entrance_to_Gordon_Castle_and_War_memorial_near_Fochabers,_Morayshire_-_geograph.org.uk_-_177990.jpg":
    {
      file: "The_main_entrance_to_Gordon_Castle_and_War_memorial_near_Fochabers%2C_Morayshire_-_geograph.org.uk_-_177990.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_main_entrance_to_Gordon_Castle_and_War_memorial_near_Fochabers,_Morayshire_-_geograph.org.uk_-_177990.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dufftown_Clock_Tower_looking_east.jpg":
    {
      file: "640px-Dufftown_Clock_Tower_looking_east.jpg",
      attribution: "Coldupnorth",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dufftown_Clock_Tower_looking_east.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Bridge_in_hill.jpg": {
    file: "640px-Bridge_in_hill.jpg",
    attribution: "Adeletron 3030",
    copyright: "CC0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Bridge_in_hill.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Elgin_Cathedral_panorama_20211025.jpg":
    {
      file: "640px-Elgin_Cathedral_panorama_20211025.jpg",
      attribution: "Domob",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Elgin_Cathedral_panorama_20211025.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Lady_Hill_Toposcope_-_geograph.org.uk_-_2435808.jpg":
    {
      file: "640px-Lady_Hill_Toposcope_-_geograph.org.uk_-_2435808.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Lady_Hill_Toposcope_-_geograph.org.uk_-_2435808.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Johnstons_Woollen_Mill_at_Elgin_-_geograph.org.uk_-_1452361.jpg":
    {
      file: "Johnstons_Woollen_Mill_at_Elgin_-_geograph.org.uk_-_1452361.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Johnstons_Woollen_Mill_at_Elgin_-_geograph.org.uk_-_1452361.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Biblical_Gardens_-_geograph.org.uk_-_811333.jpg":
    {
      file: "The_Biblical_Gardens_-_geograph.org.uk_-_811333.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Biblical_Gardens_-_geograph.org.uk_-_811333.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Museum,_Elgin_-_geograph.org.uk_-_1287997.jpg":
    {
      file: "Museum%2C_Elgin_-_geograph.org.uk_-_1287997.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Museum,_Elgin_-_geograph.org.uk_-_1287997.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Elgin_museum_Moray.JPG": {
    file: "640px-Elgin_museum_Moray.JPG",
    attribution: "Geni",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Elgin_museum_Moray.JPG",
  },
  "https://commons.wikimedia.org/wiki/File:St_Giles_Church_-_geograph.org.uk_-_885730.jpg":
    {
      file: "St_Giles_Church_-_geograph.org.uk_-_885730.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:St_Giles_Church_-_geograph.org.uk_-_885730.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Elgin,_North_College_Street,_Grant_Lodge_(former_Library).jpg":
    {
      file: "640px-Elgin%2C_North_College_Street%2C_Grant_Lodge_%28former_Library%29.jpg",
      attribution: "Slhuyton",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Elgin,_North_College_Street,_Grant_Lodge_(former_Library).jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Covesea_Lighthouse_Lossiemouth.JPG":
    {
      file: "640px-Covesea_Lighthouse_Lossiemouth.JPG",
      attribution: "File Upload Bot (Magnus Manske)",
      copyright: "Public domain",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Covesea_Lighthouse_Lossiemouth.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Seine_net_and_gold_post_box_-_Pioneered_in_Lossiemouth_-_geograph.org.uk_-_3064890.jpg":
    {
      file: "Seine_net_and_gold_post_box_-_Pioneered_in_Lossiemouth_-_geograph.org.uk_-_3064890.jpg",
      attribution: "File Upload Bot (Magnus Manske)",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Seine_net_and_gold_post_box_-_Pioneered_in_Lossiemouth_-_geograph.org.uk_-_3064890.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Rampart_at_Burghead_-_geograph.org.uk_-_899156.jpg":
    {
      file: "Rampart_at_Burghead_-_geograph.org.uk_-_899156.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Rampart_at_Burghead_-_geograph.org.uk_-_899156.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Hopeman_Harbour_-_geograph.org.uk_-_1438414.jpg":
    {
      file: "Hopeman_Harbour_-_geograph.org.uk_-_1438414.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Hopeman_Harbour_-_geograph.org.uk_-_1438414.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Summerlee_Heritage_Park_No.53.jpg": {
    file: "640px-Summerlee_Heritage_Park_No.53.jpg",
    attribution: "Oxyman",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Summerlee_Heritage_Park_No.53.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Paisley_Philosophical_Society_-_geograph.org.uk_-_754633.jpg":
    {
      file: "Paisley_Philosophical_Society_-_geograph.org.uk_-_754633.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Paisley_Philosophical_Society_-_geograph.org.uk_-_754633.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Monkey_House_-_geograph.org.uk_-_75536.jpg":
    {
      file: "The_Monkey_House_-_geograph.org.uk_-_75536.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Monkey_House_-_geograph.org.uk_-_75536.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Wojtek_the_bear_statue._Duns,_Berwickshire.jpg":
    {
      file: "640px-Wojtek_the_bear_statue._Duns%2C_Berwickshire.jpg",
      attribution: "Rosser1954",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Wojtek_the_bear_statue._Duns,_Berwickshire.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Eyemouth_Harbour_-_geograph.org.uk_-_2566381.jpg":
    {
      file: "640px-Eyemouth_Harbour_-_geograph.org.uk_-_2566381.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Eyemouth_Harbour_-_geograph.org.uk_-_2566381.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Duns_Castle1.jpg": {
    file: "640px-Duns_Castle1.jpg",
    attribution: "File Upload Bot (Magnus Manske)",
    copyright: "CC BY-SA 3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Duns_Castle1.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Stable_block_on_the_Hirsel_estate_-_geograph.org.uk_-_3580834.jpg":
    {
      file: "640px-Stable_block_on_the_Hirsel_estate_-_geograph.org.uk_-_3580834.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Stable_block_on_the_Hirsel_estate_-_geograph.org.uk_-_3580834.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Kelsae_Stane_(44409807281).jpg": {
    file: "640px-Kelsae_Stane_%2844409807281%29.jpg",
    attribution: "CountessCobra",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Kelsae_Stane_(44409807281).jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Floors_Castle,_Roxburghshire.jpg": {
    file: "640px-Floors_Castle%2C_Roxburghshire.jpg",
    attribution: "Hogweard",
    copyright: "Public domain",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Floors_Castle,_Roxburghshire.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Jedburgh_Castle_01.jpg": {
    file: "640px-Jedburgh_Castle_01.jpg",
    attribution: "Meho29",
    copyright: "CC BY-SA 3.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Jedburgh_Castle_01.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Lodge_in_Wilton_Lodge_Park_in_Hawick.jpg":
    {
      file: "640px-Lodge_in_Wilton_Lodge_Park_in_Hawick.jpg",
      attribution: "Victuallers",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Lodge_in_Wilton_Lodge_Park_in_Hawick.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:The_Monteath_Mausoleum_-_geograph.org.uk_-_891709.jpg":
    {
      file: "The_Monteath_Mausoleum_-_geograph.org.uk_-_891709.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Monteath_Mausoleum_-_geograph.org.uk_-_891709.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:St_Mary%27s_Abbey,_Melrose.jpg": {
    file: "640px-St_Mary%27s_Abbey%2C_Melrose.jpg",
    attribution: "Grimaft",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:St_Mary%27s_Abbey,_Melrose.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:The_Scottish_Borders_Donkey_Sanctuary_-_geograph.org.uk_-_1814165.jpg":
    {
      file: "The_Scottish_Borders_Donkey_Sanctuary_-_geograph.org.uk_-_1814165.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:The_Scottish_Borders_Donkey_Sanctuary_-_geograph.org.uk_-_1814165.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:GTOS_key_photo.jpg": {
    file: "640px-GTOS_key_photo.jpg",
    attribution: "IMF121",
    copyright: "CC BY-SA 4.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:GTOS_key_photo.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Abbotsford_House.jpg": {
    file: "640px-Abbotsford_House.jpg",
    attribution: "Ad Meskens",
    copyright: "CC BY-SA 3.0",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Abbotsford_House.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Borders_College_Scottish_Borders_Campus_in_Galashiels_-_geograph.org.uk_-_1398700.jpg":
    {
      file: "Borders_College_Scottish_Borders_Campus_in_Galashiels_-_geograph.org.uk_-_1398700.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Borders_College_Scottish_Borders_Campus_in_Galashiels_-_geograph.org.uk_-_1398700.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Mapa_Scotland,_Barony_Castle,_Scottish_Borders.JPG":
    {
      file: "640px-Mapa_Scotland%2C_Barony_Castle%2C_Scottish_Borders.JPG",
      attribution: "Kim Traynor",
      copyright: "CC BY-SA 3.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Mapa_Scotland,_Barony_Castle,_Scottish_Borders.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Scrape_Burn,_Dawyck_Botanic_Gardens.JPG":
    {
      file: "640px-Scrape_Burn%2C_Dawyck_Botanic_Gardens.JPG",
      attribution: "Rosser1954",
      copyright: "Public domain",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Scrape_Burn,_Dawyck_Botanic_Gardens.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Motherwell_Heritage_Centre_(the_tower)_-_geograph.org.uk_-_956786.jpg":
    {
      file: "Motherwell_Heritage_Centre_%28the_tower%29_-_geograph.org.uk_-_956786.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Motherwell_Heritage_Centre_(the_tower)_-_geograph.org.uk_-_956786.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Innerpeffray_Library_-_view_from_SW.jpg":
    {
      file: "640px-Innerpeffray_Library_-_view_from_SW.jpg",
      attribution: "ArchHist",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Innerpeffray_Library_-_view_from_SW.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Vane_Farm_Reserve_-_geograph.org.uk_-_955372.jpg":
    {
      file: "Vane_Farm_Reserve_-_geograph.org.uk_-_955372.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Vane_Farm_Reserve_-_geograph.org.uk_-_955372.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Moncreiffe_Hill_circle_01.jpg": {
    file: "640px-Moncreiffe_Hill_circle_01.jpg",
    attribution: "Syrio",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Moncreiffe_Hill_circle_01.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:ALLOA_TOWER_REAR_VIEW_FROM_ACROSS_THE_LAWN.JPG":
    {
      file: "640px-ALLOA_TOWER_REAR_VIEW_FROM_ACROSS_THE_LAWN.JPG",
      attribution: "HARTLEPOOLMARINA2014",
      copyright: "CC BY-SA 4.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:ALLOA_TOWER_REAR_VIEW_FROM_ACROSS_THE_LAWN.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Gartmorn_Dam_-_geograph.org.uk_-_1562685.jpg":
    {
      file: "Gartmorn_Dam_-_geograph.org.uk_-_1562685.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Gartmorn_Dam_-_geograph.org.uk_-_1562685.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Fair_Maid%27s_House,_Perth.jpg": {
    file: "640px-Fair_Maid%27s_House%2C_Perth.jpg",
    attribution: "Kilnburn",
    copyright: "Attribution",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Fair_Maid%27s_House,_Perth.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Perth,_Scotland_(8924972766).jpg": {
    file: "640px-Perth%2C_Scotland_%288924972766%29.jpg",
    attribution: "INeverCry",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Perth,_Scotland_(8924972766).jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Ossian%27s_Hall,_The_Hermitage,_Perth.JPG":
    {
      file: "640px-Ossian%27s_Hall%2C_The_Hermitage%2C_Perth.JPG",
      attribution: "Rosser1954",
      copyright: "Public domain",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Ossian%27s_Hall,_The_Hermitage,_Perth.JPG",
    },
  "https://commons.wikimedia.org/wiki/File:Woodland_path_-_geograph.org.uk_-_1535914.jpg":
    {
      file: "Woodland_path_-_geograph.org.uk_-_1535914.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Woodland_path_-_geograph.org.uk_-_1535914.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:CAI.2-000008_Cairnpapple.jpg": {
    file: "CAI.2-000008_Cairnpapple.jpg",
    attribution: "Archaeology Scotland",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:CAI.2-000008_Cairnpapple.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Torphichen_Preceptory_-_geograph.org.uk_-_2874269.jpg":
    {
      file: "Torphichen_Preceptory_-_geograph.org.uk_-_2874269.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Torphichen_Preceptory_-_geograph.org.uk_-_2874269.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Scottish_Korean_War_Memorial_-_geograph.org.uk_-_1157183.jpg":
    {
      file: "Scottish_Korean_War_Memorial_-_geograph.org.uk_-_1157183.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Scottish_Korean_War_Memorial_-_geograph.org.uk_-_1157183.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Almond_Valley_Heritage_Trust.jpg": {
    file: "640px-Almond_Valley_Heritage_Trust.jpg",
    attribution: "Macfack",
    copyright: "CC BY-SA 4.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Almond_Valley_Heritage_Trust.jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Dome,_McArthur_Glen_-_geograph.org.uk_-_1279552.jpg":
    {
      file: "Dome%2C_McArthur_Glen_-_geograph.org.uk_-_1279552.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dome,_McArthur_Glen_-_geograph.org.uk_-_1279552.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Five_Sisters_Zoo_-_geograph.org.uk_-_2109827.jpg":
    {
      file: "Five_Sisters_Zoo_-_geograph.org.uk_-_2109827.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Five_Sisters_Zoo_-_geograph.org.uk_-_2109827.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Naysmith_Bridge_-_geograph.org.uk_-_1396694.jpg":
    {
      file: "Naysmith_Bridge_-_geograph.org.uk_-_1396694.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Naysmith_Bridge_-_geograph.org.uk_-_1396694.jpg",
    },
  "https://commons.wikimedia.org/wiki/File:Dunollie_Castle_(3579199547).jpg": {
    file: "640px-Dunollie_Castle_%283579199547%29.jpg",
    attribution: "Thesupermat2",
    copyright: "CC BY-SA 2.0",
    originalUrl:
      "https://commons.wikimedia.org/wiki/File:Dunollie_Castle_(3579199547).jpg",
  },
  "https://commons.wikimedia.org/wiki/File:Dundee_Law_-_geograph.org.uk_-_713047.jpg":
    {
      file: "Dundee_Law_-_geograph.org.uk_-_713047.jpg",
      attribution: "GeographBot",
      copyright: "CC BY-SA 2.0",
      originalUrl:
        "https://commons.wikimedia.org/wiki/File:Dundee_Law_-_geograph.org.uk_-_713047.jpg",
    },
};
