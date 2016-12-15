---
title: "Categorizing Sockets and Broadcasting to Rooms with Socket.IO"
date: "2013-10-02T08:14:05.284Z"
layout: post
path: "/categorizing-sockets-and-broadcasting-to-rooms-with-socket-io-27d6a57b4b96/"
---

The idea and execution of creating ‘Rooms’ with Socket.IO and only emitting an
event to users in that specific room is documented as overly complex, but it
doesn’t have to be. This process is actually rather simple if you read the right
material. For, [Coder Combat, ](http://codercombat.jit.su/)I needed to use
SocketIO’s Rooms to create the one on one game play that I desired. This post
will hopefully get you started on the right path of using Socket.IO rooms.

First, to have a specific Socket join a room, on ‘Connection’, do
socket.join(‘roomName’). Then that specific Sockets room can be accessed and
seen by doing io.sockets.clients(‘roomName’). Although convenient, I actually
found that keeping track of rooms in this matter was frustrating because there
are a lot more methods and properties that each socket had so it crowded what I
actually cared about, which was the room. To fix this I just created the
following variables.

```javascript
var room;
var playerCountInRoom = 0;
var roomCount = 0;
var roomList = {};
```

First off whenever a new user would connect, I would give that Socket it’s own
property of ‘room’ (socket[‘room’] = room) with room being roomCount.toString().
This would ensure that every socket was then put in the appropriate room.

As you can see, I need a roomCount to be able to increment every time the
room is full (or room % 2 === 0), and I had a roomList object that I would add
the users to whenever a new user would connect. Now, I had this convenient
object that basically mirrors the overly complex Object that Socket.IO kept for
me. Once you actually have the desired amount of users in a room, emitting
events to only those users is simple. Here’s the run down.

```io.sockets.in(‘roomName’).emit();``` This emits whatever you want to ALL users who
are in the room ‘roomName’.

```socket.broadcast.to(‘roomName’).emit()``` This
emits whatever you want to every user in ‘roomName’ EXCEPT FOR the sender.

Although you probably won’t use it, io.sockets.emit() emits an event to all
sockets connected to the server.

Last but not least ```socket.broadcast.emit()```
emits whatever to all sockets connected to the server except for the socket
sending the request.

That’s really it. You just add a room property
to every socket, create a roomList object to keep track of which rooms every is
in, then you broadcast and event to only the room you want to receive that
event.