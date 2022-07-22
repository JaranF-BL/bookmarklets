# Bookmarklets Repo
Code that is only ever meant to be invoked by selecting the particular JavaScript bookmark from the browser's bookmarks toolbar. The raison d'être for these bookmarklets is to provide productivity boons by automating parts of often repeated tasks.

## Bookmarklet 1: Curl Command Generator for NGINX Cache Clearing
So, tickets come into TopDesk asking to have the NGINX cache cleared for a particular file on the website or directory. The command (executed in CMD.exe command line) shell is always the same; it's just the URL that changes at the end. So this JavaScript bookmarklet's job is to do the following when it's invoked:

1. Pick up the selected text from the webpage
2. Perform all necessary checks on what's been picked 
3. Put picked up text into Curl command(s) ready to be pasted into the command line
4. Put stuff done in step 3 into clipboard
5. Notify user of outcome (successful or reason for failure)


**Discovery: Things that dictate if MVP for makes programming this realistically achievable**
 -  ✔️ Check MS-DOS command line commands can be chained together
 -  ✔️ Check that clipboard can be written to in JS
 -  ✔️ If all the above are, "yes" then a MVP is possible
  - ⚠️ Read D.H.'s wiki page on NGINX cache (see https://wiki.bl.uk:8443/display/DAS/HOW+TO%3A+Manage+the+NGINX+Cache)

**Nice to Haves**
 - Cross-browser clipboard functionality
 - Ability to detect when multiple Curl commands need to be generated based on input
 - Give user ability tweak the boilerplate Curl command without having to edit JavaScript code of bookmarklet

**Programming Task To-Dos**
1. ~~Bootstrap [MVP] Jasmine tests / Karma test runner (via NPM)~~
2. ~~Point test runner at tests~~
4. ----WRITE THE ACTUAL CODE TO DO JOB BY COMPLETEING BELOW----
3. [MVP] Pick up currently selected text
2. [MVP] Santize URL
3. Determine if multiple lines worth of URLs have been picked up
4. [MVP] Insert what was picked up from 2. into Curl command
5. Featue detect what sort of programatic clipboard access, this browseer suppoorts
6. Place into clipboard what was done in 4. so it is ready to be pasted
7. If everythin is OK, inform you how to run the command (i.e. WIN + R and then Ctrl + V)
8. If unsuccessful inform user what went wrong
9. ----BUILD TASKS BELOW TO MAKE DEPLOY - READY----
10. Code uglified to one line and uglified result prepended with "javascript:"
