#  web-based email program

## Objectives
  * Dealing with JSON files.
  * Dealing with Unit testing and Mocking tutorial.
  * Implement a Gmail-like web application.
  * Applying learned design patterns.
  * Increase knowledge of REST APIs.
  
## Requirements
  The aim of the project is to implement the basic functionalities of a mail server, including the manipulation of mails, attachments, and contacts.
  You should provide the following requirements. However, you are not limited to them, you can
  add more functionalities to your application
  
## Mail Manipulation
This section will describe all the work needed (but not limited to) regarding the mailing system.
  * Inbox Folder (default, priority)
  * Trash Folder: auto delete emails after 30 days.
  * Composing and Drafts.
  * Sent Mails Folder.
  * User Folders (Adding, Renaming, Deleting).
  * Filters: to filter mails according to subject or sender and direct them to a specific mail folder.
  * Searching and Sorting based on different attributes (Date, Sender, Receivers, Importance, Subject, Body, Attachments, . . . ).
  
## Attachments
This section will describe all the work needed (but not limited to) regarding the attachments.
  * Adding, Deleting attachment(s) of an email.
  * Viewing an attachment.

## Contact Manipulations
This section will describe all the work needed (but not limited to) regarding the contacts.
  * Adding, Editing, and Deleting.
  * Searching and Sorting.
  * Contact information: Name, One or multiple email addresses.
  
## Implementation Details
You can either reuse your own data structures implemented last year, or use built-in ones.
  • Use the appropriate HTTP request types corresponding to the different CRUD operations for
  sending, retrieving and manipulating the emails for example:
    – On creation use post request and send details in the request body.
    – On delete use delete request.
  • Design an efficient JSON schema to store the email content and metadata required for retrieving
  emails and their folder organizations.
    – Your JSON schema will be evaluated for its efficiency and optimality.
  • Apply at least 5 design patterns.
  • When sending an email to multiple receivers, a queue data structure is used to handle the
  sending to multiple receivers operation.
  • You should support any file type as an attachment.
  • Each email can hold none, one, or many attachments.
  • Emails are retrieved using pagination.
    – Moving forward and backward loads the appropriate page.
  • Inbox should support 2 modes of operations:
    – Default: Which will show the emails newest to oldest (be default), user can choose a
    different sorting later.
    – Priority: You should use priority queue data structure to view important emails first, you
    should support at least 4 priorities. Priority will be assigned when composing a new email
    manually.
  • You should enable selecting multiple emails to be able to bulk move, delete, ...etc.
