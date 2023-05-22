// date = ( startDate, endDate )
//      | ( startDate, "Present" )
//      | ( endDate )
function DateGen( startDate, preEndDate ) {
  if (!startDate && preEndDate) return { endDate: preEndDate };
  let endDate = preEndDate? preEndDate : "Present";
  return { startDate, endDate };
}

// descriptions = [] 
//              | [ { on: true|false , header:"_default"|text, text: "text" }, ... ] (Array of Objects)
function DescriptionGen( on, preHeader, text ) {
  let header = preHeader? preHeader : "_default";
  return { on, header, text };
}

// entry = title
//      && (subtitle | null) (where null denoted by "" subtitle)   
//      && (date | null) (where null denoted by "" for start and any for end)
//      && (descriptions | null)
function EntryGen( title, subtitle, startDate, endDate, details ) {
  let out = { title };
  if (subtitle) { out.subtitle = subtitle };
  if (startDate || endDate) out.date = DateGen( startDate, endDate );
  if (details.length != 0) { out.descriptions = details };
  return out;
}

// item = { on: true|false, text} subList = { on, header, list } list = [subList ... ]
function itemGen( on, text ) {return {on, text}};
function subListGen( on, header, list) {return {on, header, list}};

// section = [ entry ... ] | [ item ... ] | { ... }
//        && tag: entryList, List (comma seperation + subcategories), object (for personal info only)
// Resume = { "name": section }

const sampleResume = {
  "Personals": { _type: "object",
                 "Name": "Billiam Wilheim IX", 
                 "Email": "billybob@yahoo.com", 
                 "Phone": "111-222-3333", 
                 "LinkedIn": "Billiam W. IX",
                 "GitHub": "BillyDaPirate",
                 "Intro": "Pirate turned Computer Science Nerd looking to gain work experience."              
                },
  "Skills": { _type: "List",
              _list:
              [ subListGen(true,"Pirate", ["Piracy", "Law", "Plundering", "Looking Cool", "Business Administration", "17th Century English Law"].map((e)=> itemGen(true,e))),
                subListGen(true,"CS", ["C#", "Python", "JavaScript", "React","R"].map((e)=> itemGen(true,e))),
                subListGen(true,"Other", ["Tutoring","Nuclear Science", "Mandarin Chinese"].map((e)=> itemGen(true,e)))
            ]
            },
  "Education": { _type: "entryList",
                 _list:
                 [ EntryGen("Piracy University","Westfordshireham, South UK", "19-08-1645","", 
                   [DescriptionGen(true,"","Valedictorian of Graduating Class"), DescriptionGen(false,"Average:", "16%")]),
                   EntryGen("Elmore High School","Mars", "01-09-1637","30-06-1644", 
                   [DescriptionGen(false,"Extracurriculars:","Football, Gang"), DescriptionGen(false,"","Class Nerd")]),
                 ]
            },
  "Experience": { _type: "entryList",
                  _list:
                  [ EntryGen("The Black Pearl","", "19-08-1650","", 
                    [DescriptionGen(true,"","Increased Plundering Efficency by 500%"), DescriptionGen(true,"","Boosted Morale"), DescriptionGen(true,"","Assisted in Production of 5 Movies")]),
                    EntryGen("Google CEO","San Franciso, CA", "15-11-2008","16-11-2008", 
                    [DescriptionGen(false,"","Lead Company to Record Breaking Profits within 1 day"), DescriptionGen(false,"","Guided employees on extended wellness breaks")]),
                 ]
            },
  "Awards": { _type: "entryList",
              _list: 
              [ EntryGen("Euclid Math Contest National Champion", "","", "10-10-2000", []),
                EntryGen("2002 Winner of LeetCode lmao", "","", "", []),
              ]
            }
};

//Potential Fields Types
//EntryList: Work Exp, Education, Volunteer Work, Courses, Awards, Publications, Patents
//List: Skills, Languages, Courses, Test Scores
//Object: Information


//here is what the pure JSON looks like:
console.log(JSON.stringify(sampleResume));
const sampleResumeJSON = {
  "Personals":{ "_type":"object",
                "Name":"Billiam Wilheim IX",
                "Email":"billybob@yahoo.com",
                "Phone":"111-222-3333",
                "LinkedIn":"Billiam W. IX",
                "GitHub":"BillyDaPirate",
                "Intro":"Pirate turned Computer Science Nerd looking to gain work experience."},
    "Skills":{"_type":"List",
              "_list":[{"on":true,
                        "header":"Pirate",
                        "list":[{"on":true,"text":"Piracy"},
                                {"on":true,"text":"Law"},
                                {"on":true,"text":"Plundering"},
                                {"on":true,"text":"Looking Cool"},
                                {"on":true,"text":"Business Administration"},
                                {"on":true,"text":"17th Century English Law"}]},
                        {"on":true,
                         "header":"CS","list":[{"on":true,"text":"C#"},
                                               {"on":true,"text":"Python"},
                                               {"on":true,"text":"JavaScript"},
                                               {"on":true,"text":"React"},
                                               {"on":true,"text":"R"}]},
                        {"on":true,"header":"Other","list":[{"on":true,"text":"Tutoring"},
                                                            {"on":true,"text":"Nuclear Science"},
                                                            {"on":true,"text":"Mandarin Chinese"}]}]},
    "Education":{"_type":"entryList",
                 "_list":[{"title":"Piracy University",
                           "subtitle":"Westfordshireham, South UK",
                           "date":{"startDate":"19-08-1645",
                           "endDate":"Present"},
                           "descriptions":[{"on":true, "header":"_default", "text":"Valedictorian of Graduating Class"},
                                           {"on":false, "header": "Average:", "text":"16%"}]},
                          {"title":"Elmore High School",
                          "subtitle":"Mars",
                          "date":{"startDate":"01-09-1637","endDate":"30-06-1644"},
                          "descriptions":[{"on":false, "header": "Extracurriculars:", "text":"Football, Gang"},
                                          {"on":false, "header": "_default", "text":"Class Nerd"}]}]},
      "Experience":{"_type":"entryList",
                    "_list":[{"title":"The Black Pearl",
                              "date":{"startDate":"19-08-1650",
                              "endDate":"Present"},
                              "descriptions":[{"on":true,"header": "_default","text":"Increased Plundering Efficency by 500%"},
                                              {"on":true,"header": "_default","text":"Boosted Morale"},
                                              {"on":true,"header": "_default","text":"Assisted in Production of 5 Movies"}]},
                             {"title":"Google CEO",
                             "subtitle":"San Franciso, CA",
                             "date":{"startDate":"15-11-2008","endDate":"16-11-2008"},
                             "descriptions":[{"on":false,"header": "_default","text":"Lead Company to Record Breaking Profits within 1 day"},
                                             {"on":false,"header": "_default","text":"Guided employees on extended wellness breaks"}]}]},
        "Awards":{"_type":"entryList",
                  "_list":[{"title":"Euclid Math Contest National Champion",
                            "date":{"endDate":"10-10-2000"}},
                            {"title":"2002 Winner of LeetCode lmao"}]}};

export { sampleResume, sampleResumeJSON };