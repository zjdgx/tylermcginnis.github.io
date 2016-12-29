---
title: "How to Install the Facebook SDK into a React Native Android or iOS App"
date: "2016-08-11T16:28:46.001Z"
layout: post
path: "/installing-the-facebook-sdk-into-a-react-native-android-and-ios-app/"
articleImage: "https://cdn-images-1.medium.com/max/1600/1*4FvJS-mWhJJPftIQ32r5eQ.png"
description: "A guide to installing the Facebook SDK into a React Native App"
---

So I made this snarky tweet at 4 a.m. This is my peace offering.

<markup>
  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;I have not failed. I have just found 10,000 ways to incorrectly install the Facebook SDK into a React Native app.&quot; - Thomas Edison</p>&mdash; Tyler McGinnis (@tylermcginnis33) <a href="https://twitter.com/tylermcginnis33/status/756069723842895873">July 21, 2016</a></blockquote>
</markup>

If you’re a native Android or iOS developer and are already familiar with their
respective ecosystems, this blog post probably won’t do you much good.

But if you’re a JavaScript developer who doesn’t know what an Info.plist or a
strings.xml file is — and you’d sooner wait 45 minutes for *npm install* to
finish than open up Xcode— this guide is for you.

> Note that this is a just an excerpt from my much more comprehensive [React Training](http://reacttraining.com/)’s [React
Native](http://courses.reactjsprogram.com/courses/reactnative) course.

Let’s assume you’re reading this because you’re more concerned with “how” than
“why.” So, unlike my typical posts, this one will be heavy on implementation
details and light on understanding the abstractions.

I’m also assuming you’re using React Native .29 or above. If you’re using a
version older than that, well, you have bigger problems than getting this
tutorial to work.

We’re going to use Facebook’s
__[react-native-fbsdk](https://github.com/facebook/react-native-fbsdk)__ library,
which is just a wrapper around the Facebook SDKs for Android and iOS. It will
give us access to Facebook login, sharing, graph requests, and app events.

In your terminal run:

```bash
npm install --save
```

Next up, we need to do some linking.

Again, in your terminal run:

```bash
react-native link
```

Now let’s register a new app with Facebook.

Head over to [Facebook’s developers
site](https://developers.facebook.com/apps) and "Add a New App".

When you see this screen select iOS…

<img
  alt='Creating a new Facebook iOS app'
  src='https://cdn-images-1.medium.com/max/1600/1*4FvJS-mWhJJPftIQ32r5eQ.png' />

…type in the name of your project, then hit the main submit button which at the
time of this writing says “Create new Facebook App Id.” Be sure to enter in a
contact email address and select a Category.

If you’re lucky, at this point you’ll get a fun little game about matching
Tigers or watches. Facebook is just full of fun micro experiences 🙃.

Once at this view, you’re going to do exactly what is says, and download the SDK
to your __~/Documents folder__.

<img
  alt='Facebook Download SDK Screen'
  src='https://cdn-images-1.medium.com/max/1600/1*FVKb0kaaMcpiIdpQGXQSqg.png' />

Coming from the web, this is going to feel super strange, but it’s the only way
I could get the SDK tied up properly without having to resort to using Pods.

At this point you should have successfully installed “react-native-fbsdk” and
created a new iOS Facebook app. The FacebookSDK should be located in the
~/Documents folder of your computer.

Now for the moment we’ve been training for.

Go to your project and double click on *YourAppName.xcodeproj* project to open
it up in Xcode.

Once you have your project opened in Xcode, right click on your project’s name
in the left sidebar and select “*New Group*” and type in “*Frameworks*”.

<img
  alt='Xcode New Group'
  src='https://cdn-images-1.medium.com/max/1600/1*u_VxnYfkmFwMqfsIRHYzZA.png' />

Then open up your *~Documents/FacebookSDK* folder from earlier and drag
__FBSDKCoreKit.Framework__, __FBSDKLoginKit.Framework__, __FBSDKShareKit.Framework__
into the *Frameworks* group you just created. The end result should look like
this,

<img
  alt='Frameworks Folder'
  src='https://cdn-images-1.medium.com/max/1600/1*jjYoKYB9IRARqgieq8IdbQ.png' />

Now, *click on the “Build Settings” tag* (pictured below) then search for
“*Framework Search Paths*”. Once you find it add “*~/Documents/FacebookSDK*”.
(To get the little popup box double click on the highlighted line right below
the word “Spero” then click the + button to add the text).

<img
  alt='Add source to Facebook SDK to your Framework Search Paths'
  src='https://cdn-images-1.medium.com/max/1600/1*B1id2NBIE7oe3tgkzAvbyQ.png' />

Now we need to dive into our Info.plist. For this step we’ll need our Facebook
App ID number. To get this, head back over to your Facebook developer dashboard
and it will be on the home screen under “App ID”.

<img
  alt='Getting your Facebook App ID'
  src='https://cdn-images-1.medium.com/max/1600/1*UJ5XDtQXNojJSaJhoJvmFQ.png' />

Now open up your app in your preferred IDE and then open up the “*Info.plist*”
file located in “*ios/YourAppName*”

Now, right below this strange line

```xml
<string>????</string>
```

add this code,

```xml
<key>CFBundleURLTypes</key>
 <array>
  <dict>
   <key>CFBundleURLSchemes</key>
   <array>
    <string>fbYOUR-APP-ID</string>
   </array>
  </dict>
 </array>
 <key>FacebookAppID</key>
 <string>YOUR-APP-ID</string>
 <key>FacebookDisplayName</key>
 <string>YOUR-FACEBOOK-DISPLAY-NAME</string>
 <key>LSApplicationQueriesSchemes</key>
 <array>
  <string>fbapi</string>
  <string>fb-messenger-api</string>
  <string>fbauth2</string>
  <string>fbshareextension</string>
 </array>
```

Be sure to swap out “*YOUR-APP-ID*” with your Facebook APP Id and
“*YOUR-FACEBOOK-DISPLAY-NAME*” with, well, your Facebook app display name.

Now head back to Xcode and grab your “*Bundle Identifier*” number located in the
“*General*” tab.

<img
  src='https://cdn-images-1.medium.com/max/1600/1*ZyvGrlmQiDvNmWSUMrGttA.png'
  alt='Getting your Bundle Identifier for a React Native app' />

Once you have that, copy it to your clipboard.

Now head over to your Facebook Developer dashboard again and click on
“*Settings*” -> “*Basic*” -> “*+Add Platform*” and select “*iOS*”.

<img
  src='https://cdn-images-1.medium.com/max/1600/1*qwrrlHYGuNSBKx4L8E9JNQ.png'
  alt='Add Platform iOS' />

Once you select iOS you’ll see a place to enter in your “*Bundle ID*” you just
got from Xcode. Do that and be sure to select “*Save Changes*”.

Now head back to your text editor and open up “*ios/PROJECT-NAME/AppDelegate.m*”

Right above *@implementation AppDelegate* you need to import FBSDKCoreKit. Go
ahead and add

```objectivec
#import <FBSDKCoreKit/FBSDKCoreKit.h>
```

Now right above the “*@end*” line (and after the didFinishLaunchingWithOptions
block) add this code,

```objectivec
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (BOOL)application:(UIApplication *)application
    openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication
    annotation:(id)annotation {
    return [[FBSDKApplicationDelegate sharedInstance] application:application
      openURL:url
      sourceApplication:sourceApplication
      annotation:annotation];
}
```

So your final AppDelegate.m file will look something like this,

```objectivec
#import "AppDelegate.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
      moduleName:@"Spero"
      initialProperties:nil
      launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
      openURL:url
      sourceApplication:sourceApplication
      annotation:annotation];
}
 @end
```

Good news is that’s all you need to do for iOS. If you’re not building an
Android app as well, you’re all set. However, if you are (or if you ever plan
on) building an Android app as well, continue on.

__Update__: If at this point you’re still getting an error, it may be due to some
recent changes in iOS 10 and Xcode 8. Head over to the “Capabilities” section in
Xcode and enable “Keychain Sharing”

<img
  alt='Keychain Settings'
  src='https://cdn-images-1.medium.com/max/1600/1*bhEKd5j4nub5ZjIgGiY9Yw.png' />

__Now onto Android.__

Now in your text editor head over to your “*MainApplication.java*” file located
at *android/app/src/main/java/com/<project name>*

After all of the other imports in *MainApplication.java*, add the following
imports.

```java
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
```

Now inside the MainApplication class, add the following properties,

```java
private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
}
```

<img
  src='https://cdn-images-1.medium.com/max/1600/1*BFSO72Bmtg-Nsji1lvzU1w.png'
  alt='After adding the imports and the properties, your MainApplication class should
resemble this' />

Now go ahead and head to the bottom of your MainApplication class and add this
Override to the class.

```java
@Override
public void onCreate() {
  super.onCreate();
  FacebookSdk.sdkInitialize(getApplicationContext());
}
```

Now the last step in this file is you need to include the FBSDKPackage to your
Array of React packages. Find the code that looks like this,

```java
@Override
protected List<ReactPackage> getPackages() {
   return Arrays.<ReactPackage>asList(
    new MainReactPackage()
   );
}
```

and go ahead and add “*new FBSDKPackage(mCallbackManager)”* as a new list item
on that array.

Once you’re finished, your code should look similar to this (changes are bold)

```java
package com.spero;
import android.app.Application;
import android.util.Log;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.List;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
public class MainApplication extends Application implements ReactApplication {
private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
  };
@Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
@Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
}
```

Alright we’re really close. Now head over to *MainActivity.java (located at
“android/*app/src/main/java/com/<project name>/” and do the following,

First import android.content.Intent;

```java
import android.content.Intent;
```

next, add this Override to your MainActivity class

```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
```

Your final code will look like this (changes in bold)

```java
package com.spero;
import com.facebook.react.ReactActivity;
import android.content.Intent;
public class MainActivity extends ReactActivity {
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected String getMainComponentName() {
        return "Spero";
    }
}
```

Take a few deep breaths. We’re just a few changes away from Valhalla.

Head over to “*strings.xml*” located at
*android/app/src/main/res/values/strings.xml* and add a new string with your
facebook app id.

```xml
<string name="facebook_app_id">YOUR_APP_ID</string>
```

Your strings.xml file will now look similar to this,

```xml
<resources>
    <string name="app_name">NameOfYourApp</string>
    <string name="facebook_app_id">YOUR-FACEBOOK-ID</string>
</resources>
```

One. More. File. To. Go.

Head over to *AndroidManifest.xml* located at “*android/app/src/main*” and add
the following code right before **</application>**

```java
<activity android:name="com.facebook.FacebookActivity"
  android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
  android:theme="@style/com_facebook_activity_theme"
  android:label="@string/app_name" />
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

And with those 48 easy, fool proofs steps, you’re good to go!

To see all these changes in a real project, dive into the changes files above
[in this project.](https://github.com/ReactjsProgram/React-Native/tree/progress)