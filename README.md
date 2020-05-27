# realtimetext
 A real time text editor website!

[![Netlify Status](https://api.netlify.com/api/v1/badges/f5c72e86-591a-402d-a850-848f557ee249/deploy-status)](https://app.netlify.com/sites/realtimetextedit/deploys)

### Link to the website
https://realtimetextedit.netlify.app/



### Note
This does not use any WebSockets technology (didn't know about them when I started making this site).
Instead, it checks regularly a JSON bin, specially generated for the document (thanks to JSON Blob).

(You can check that through your js console)

Also, because HTTP requests are used, the document might be laggy sometimes (because it's way less efficient).
