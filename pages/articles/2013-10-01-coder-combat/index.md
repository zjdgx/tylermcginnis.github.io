---
title: "Coder Combat: A Real-Time One on One Programming Competition"
date: "2013-10-01T09:14:05.284Z"
layout: post
path: "/coder-combat-a-real-time-one-on-one-programming-competition-8baa3e89fe26/"
---

## Brief Non-Technical Description

[Coder Combat ](https://tylermcginnis.com/codercombat.jit.su)is a real time one
on one programming competition over the web. It attempts to simulate the
emotions felt in a technical interview while also improving your programming
skills. Competitors are paired up in a room and are then given an algorithm to
solve. During the match each player will be able to see up to date progress on
where their competitor is at at all times. Once someone solves the algorithm,
the winner and loser will both be notified and a ten second countdown will
prepare both competitors for the next match.

![](https://cdn-images-1.medium.com/max/800/0*6XjvVoFolPTUlPD3.png)

![](https://cdn-images-1.medium.com/max/800/0*jYlR1w8Oz8i20YOd.png)

![](https://cdn-images-1.medium.com/max/800/0*MNmQbQQjE14bOzDd.png)

![](https://cdn-images-1.medium.com/max/800/0*bKxjYQh7-zqBwZYx.png)

#### Technical Description

**Coder Combat utilizes various technologies including**

![](https://cdn-images-1.medium.com/max/800/0*hR947Nya_YF6E1U_.png)

I use Angular.js on the front end with the two text editors being Directives,
and a Socket.IO, Http, and CountDown service. My schema for Mongo involves a
Title, Question, Parameter, and Answer. When a user clicks submit, an ng-click
event is fired, I then take the code that was in his or her editor, parse it to
be in the correct format, pass in the Parameter from the DB, evaluate it, then
compare the result to the actual answer.

Socket.IO is the main contributor of this application. I used Sockets in order
to keep a constant live stream going between both users and their editors.

#### Challenges

It’s a weird feeling when you’re about to start a really big project. Although
I’ve worked on Web Apps in the past, none of them have been this big. When I
started this project I had put up huge mental barriers. I thought I didn’t know
enough, I had no idea how I was going to take this awesome idea I had in my head
and actually create it. I could, and one day probably will, write a whole blog
post on overcoming mental barriers in Software Engineering. The secret? Well,
you kind of just have to trust what you know and understand you’re going to fail
a lot, but it’s in overcoming that failure that you’ll succeed. During the full
phase of the project I probably hit about 5–6 walls where I thought, ‘I really
don’t know what to do now’ or ‘I really don’t know how to solve this particular
problem’. However, with the looming two week deadline we had quickly
approaching, I had no time to just debug for 2–3 days and figure it out. I had
to do what was very, very difficult for me to do, forget the problem and have
faith that eventually I would read something or run into the solution at another
time. This is exactly what happened — every single time. One example of this is
I spent the entire day two Saturdays ago trying to figure out why my initial
Modal was freezing and crashing chrome. I literally spent all day trying to
figure it out. I was sure my
[problem](http://stackoverflow.com/questions/18808295/closing-an-angular-ui-modal-on-a-socketio-event)
was with Angular in that for some reason when I tried to hide the Modal, it
wasn’t working. Then I later realized that Socket.IO was making a [Double
Connection](http://stackoverflow.com/questions/18815843/socket-io-event-being-triggered-twice)
which throwing everything off in my Socket.IO rooms. I spent all day debugging
then finally had to just move on. About 3 days later I was having similar issues
on another section of my site. I then figured out that I was declaring my
Controller in both my HTML ```<div ng-controller = ‘myCntrl’></div>``` and in my
$routeProvider. This is the reason that everything was being triggered twice
which was then freezing my modal. By deleting one line in my code, I fixed two
very big bugs I was facing.

As a whole, the biggest problems I faced were definitely related to Sockets and
more specifically the use of rooms with sockets. For every connection that is
made, I categorize that user into a specific room based on a certain algorithm.
Being a live game, the user has the option to stay, disconnect, or refresh. This
leads to a vast array or certain behavior that could happen in one specific
room. This behavior needed to be somehow connected with other rooms and the
behavior of the users in that room. For example, if there are two rooms each
containing two users, the game needs to be able to detect if both rooms have
someone disconnect, and then pair those remaining users.

#### The Outcome

Overall, I’m very pleased with what I’ve created and I’ve received pretty good
feedback so far. One of my [really good
friends](https://twitter.com/jakelingwall) back in Utah works at
[Domo](http://www.domo.com/) and was able to show off CoderCombat to a few of
the developers there. One in particular is a guy I’ve looked up to for a while
now and is probably the best developer in Utah under 30 (Merrick Christensen).
He played Coder Combat and said “This is awesome. I’m impressed”. I was on
Cloud-9 all morning yesterday. Although kind of weird, it’s an amazing feeling
when developers you really look up to enjoy the Software you build.

![](https://cdn-images-1.medium.com/max/800/0*v6n7OB2uBLwBXO0k.png)