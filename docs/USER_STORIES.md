# User Stories

## CreateMember Component

### User Story 1: Create New Member
As a user, I want to be able to add a new member by filling out a form with required details such as name, email, phone number, address, start date, and duration so that I can successfully create a new member in the system.

### User Story 2: Show Error for Empty Required Fields
As a user, I want the system to display an error message when I attempt to submit the form with any required field left empty, so that I can be reminded to fill in all the necessary information before proceeding.

### User Story 3: Show Error for Duplicate Email or Phone Number
As a user, I want the system to notify me if I try to add a new member with an email address or phone number that already exists in the system, so that I avoid creating duplicate members with the same contact information.

---

## GetMemberByAddressSearch Component

### User Story 1: View Single Member by Address
As a user, I want to be able to see full details of a member when there is only one member associated with a given address so that I can view specific information easily.

### User Story 2: View Multiple Members by Address
As a user, I want to see a list of all members associated with a specific address so that I can select or view them accordingly.

### User Story 3: Error Message for No Results
As a user, I want the system to show an error message when no members are found for a given address so that I know the search yielded no results.

---

## GetMemberByEmailSearch Component

### User Story 1: View Single Member by Email
As a user, I want to be able to see full details of a member when there is only one member associated with a given email so that I can view specific information easily.

### User Story 2: View Single Member Despite Multiple Members Having the Same Email
As a user, I want to see the details of only one member, even if multiple members have the same email address, to avoid viewing duplicate entries and ensure the correct member is displayed.

### User Story 3: Error Message for No Results
As a user, I want to see an error message when no members are found for a given email so that I know the search yielded no results.

---

## GetMemberByNameSearch Component

### User Story 1: View Single Member by Name
As a user, I want to see the full details of a member when there is only one member associated with a given name so that I can view specific information easily.

### User Story 2: View List of Members When Multiple Members Are Found
As a user, I want to see a list of all members associated with a specific name when there are multiple members, so that I can view or select them accordingly.

### User Story 3: Display Error Message for No Results
As a user, I want to see an error message when no members are found for the given name so that I know the search yielded no results.

---

## GetMemberByPhoneNumberSearch Component

### User Story 1: View Member by Phone Number
As a user I want to see the full details of a member when a member is found by phone number so that I can view specific information about that member easily.

### User Story 2: Display Error Message for No Results
As a user, I want to see an error message when no members are found for the given phone number so that I know the search yielded no results.

### User Story 3: Go Back to Previous Page
As a user, I want to be able to go back to the previous page when I click the "Go Back" button, so that I can navigate away from the current page easily.

---

## GetMemberByStartDateSearch Component

### User Story 1: View Single Member by Start Date
As a user, I want to see the full details of a member when there is only one member associated with a specific start date, so that I can view their information easily.

### User Story 2: View List of Members When Multiple Members Are Found
As a user, I want to see a list of all members who share the same start date so that I can view or select them accordingly.

### User Story 3: Display Error Message for No Results
As a user, I want to see an error message when no members are found for the given phone number so that I know the search yielded no results.

---

## GetTournamentByEndDateSearch Component

### User Story 1: View Tournament Details by End Date
As a user, I want to see the details of a tournament when only one tournament matches the specified end date, so that I can easily view its information (such as dates, location, fees, and prize).

### User Story 2: Display Error Message When No Tournaments Are Found
As a user, I want to see an error message when no tournaments are found for the given end date, so that I know the search didn’t yield any results.

### User Story 3: Navigate Back When 'Go Back' Button is Clicked
As a user, I want to be able to navigate back to the previous page or screen when I click the "Go Back" button, so I can return to the previous view easily.

---

## GetTournamentByStartDateSearch Component

### User Story 1: View Tournament Details by Start Date
As a user, I want to see the details of a tournament when only one tournament matches the specified start date, so that I can easily view its information (such as dates, location, fees, and prize).

### User Story 2: Display Error Message When No Tournaments Are Found
As a user, I want to see an error message when no tournaments are found for the given start date, so that I know the search didn’t yield any results.

### User Story 3: Navigate Back When 'Go Back' Button is Clicked
As a user, I want to be able to navigate back to the previous page or screen when I click the "Go Back" button, so I can return to the previous view easily.

---

## GetTournamentByLocationSearch Component

### User Story 1: View Tournament Details by Location
As a user, I want to see the details of a tournament when only one tournament matches the specified location, so that I can easily view its information such as dates, location, fees, and prize.

### User Story 2: View Multiple Tournaments by Location
As a user, I want to see a list of tournaments that are held in the same location, so that I can compare different tournaments that occur in the same place.

### User Story 3: Display Error Message When No Tournaments Are Found
As a user, I want to see an error message when no tournaments are found for the given location, so that I know the search didn’t yield any results.
