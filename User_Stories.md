User Stories
---

Users are patients and admins are doctors. We'll refer to them as such.
Both sides of the application will be single page.
The log in system itself will be a separate page.


The patient will be able to register & log in.
The patient will see their profile page (pic/no pic?).
	Their profile page will have a list of current problems (diagnoses?)
		Each problem will have boards assigned to them by the doctors that the patient can see.
	Their profile page will have their prescriptions (if possible per HIPAA), any current problems.
		The prescriptions will have reminders about refills. Span of usage - usage data in legibile font size(!)
			The reminders will ping the Twilio API (possibly polling daily or per Dr requests) to send SMS messages to patient cell

The doctor will be able to register & log in as admin.
The doctor will see different patient records.
	Each patient record will have boards made by the doctor. <- pulled in from API from dr
		Each record will be pulled in from Trello API of the doctor (in the future - own Trello app inside the doctor login)
The doctor will be able to view each patient as a single page.
	Each page will have editable boards that are drawing info from their Trello API like the 


Nice to have
---
Analytics for doctor side - d3js

Before 
Before launch - 
App will need security & encryption - HIPAA laws re security details for apps