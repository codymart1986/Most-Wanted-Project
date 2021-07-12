"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;

  // this is a comment
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      promptFor(
        "Would you like to search by a trait? Enter 'yes' or 'no' ",
        yesNo
      ).toLowerCase();
    case "yes":
      let searchOption = promptFor(
      "What traits would you like to search by? (input numbers) \n" +
        "1. Eye Color \n" +
        "2. Gender \n" +
        "3. DOB \n" +
        "4. Height \n" +
        "5. Weight \n" +
        "6. Occupation \n",
      autoValid
      );
      
      let filteredSearch = people;

      searchOption.split(' ');

      if(searchOption.includes(1)){
        filteredSearch = searchByEyeColor(filteredSearch);
      }

      if(searchOption.includes(2)){
        filteredSearch = searchByGender(filteredSearch);
      }

      if(searchOption.includes(3)){
        filteredSearch = searchByDob(filteredSearch);
      }

      if(searchOption.includes(4)){
        filteredSearch = searchByHeight(filteredSearch);
      }

      if(searchOption.includes(5)){
        filteredSearch = searchByWeight(filteredSearch);
      }

      if(searchOption.includes(6)){
        filteredSearch = searchByOccupation(filteredSearch);
      }

      displayPeople(filteredSearch);

    case "no":
      break;

    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson[0];
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What color is this person's eyes?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByWeight(people) {
  let weight = promptFor("What is the person's weight in lbs?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.weight == weight) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is this person's job?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height in inches?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.height == height) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByDob(people) {
  let height = promptFor(
    "What is the person's date of birth? (mm/dd/yyyy)",
    autoValid
  );

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dob) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
//TODO: add other trait filter functions here.

// searchByMultipleTraits
// Please choose a trait you would like to start searching by
// EX: If they type in gender
// Once done searching by gender
// Ask them woul

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

//Trying to fix merge conflict and push!

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {  
}

//#endregion
