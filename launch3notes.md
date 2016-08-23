Launch 3 is created on tuesday, 23rd of august. 

Hi Eason! 

Here's my issue list. 

1. Content:
- Rewrite 'about us' to exclude what we was, and talk about what we are. 
- Rewrite costs and refunds, etc. Or remove. 
- Typewriter: Load one header, then write the launch note, then change headers with new buzzwords. 

2. Favicon:
- It throws this error: 
GET http://localhost:3000/favicon.ico 500 (Internal Server Error)
In app.js, l. 14-15 it says: 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

Eason, do you know how to fix it? 


3. Hero:
I put the jquery script in the top af the frontpage.ejs, to make it load a bit quicker, since it sometimes gives me an error, because it doesn't fully load before the typed.js). It's probably a hack, and it might still give errors - but I failed putting a delay on it. This is what I tried to use: 

setTimeout(function(){
},500); 

4. The sign-up! 
It seems to be working, but honestly, since I didn't create it, it's too far away from my skillset right now. I can't fix it fast. I don't know what it needs, for inputting emails on a sendgrid list, that we can use for newsletters. It's a nice to have, at the moment, because we currently don't have any plans for newsletters. On the other hand, if we had a long list of emails from the sign-up, I would defenitely use it. 

Eason, if you can see a quick sollution, then feel free to upgrade our platform. If not, then we'll wait and I'll look into it some more. 

5. The rest: 

- Correct all footers and check for dead links / wrong links.
- Update the footer text everywhere and comment out the sign-up



