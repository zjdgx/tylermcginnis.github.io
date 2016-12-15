---
title: "Test your React Native app on your iPhone or iPad"
date: "2015-03-27T03:14:05.284Z"
layout: post
path: "/test-your-react-native-app-on-your-iphone-or-ipad-c632b4beb3ed/"
---

If you’re like me, one of the first things you tried to do when you first
started playing around with React Native is to run your app on your iPhone or
iPad. Sadly, you most likely ran into the follow error: “Could not connect to
development server. Ensure node server is running — run ‘npm start’ from React
root The operation couldn’t be completed. (NSURLErrorDomain error — 1003).”

Good news is there’s a way around this. This could change in the future, but
right now this is what works for me.

First, if you’re on a mac, open up Network Utility and copy down your IP
address. If you’re not on a mac, just find your IP address and copy it down.

Next, head over to “AppDelegate.m” in the iOS folder and find this line.

    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];

Now all you need to do is replace "localhost" with your IP address we copied
down earlier. Once you do that, head back over to Xcode, if your device is
plugged in you'll be able to select it to the right of the Play and Stop
buttons, click run, then the app should be downloaded to your Homescreen on your
phone.

If that doesn't work, make sure you have a paid Apple Developer Account. Remember, this isn't the open web anymore, we have to pay someone now to test our apps...