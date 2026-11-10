---
layout: layout.njk
title: printWatcher privacy policy
description: Privacy policy for printWatcher for Bambu Lab, the Wear OS and Android companion app for Bambu Lab printers.
permalink: /bambuwatch/privacy/
eleventyExcludeFromCollections: true
---
<section class="readme">

# printWatcher privacy policy

**printWatcher for Bambu Lab** ("the app") is a phone app and Wear OS watch app that show a Bambu Lab
3D printer's status. It is made by Jim Turner. This policy covers both apps.

*Effective November 10, 2026.*

## Summary

The app **does not collect, store on any server, sell or share any personal data.** It has no
accounts, ads, analytics or tracking. Everything it needs stays on your phone and watch.

## What the app stores on your devices

- **Printer connection settings** you enter: the printer's IP address, serial number and LAN access
  code. They are stored only on your phone, with the access code encrypted using the Android
  Keystore.
  - The version distributed on GitHub (not Google Play) can also save these settings to a file in
    your phone's Documents folder (`Documents/BambuWatch/printer.json`) so they survive
    reinstalling. That file is plain text and is only created if you grant file access.
- **The latest printer status** (print state, progress, time left, job name, temperatures, AMS
  filament information), kept on the phone and watch so it can be shown.

Uninstalling the app deletes this data, except the optional GitHub-version settings file, which you
can delete yourself.

## Network connections

- The phone app connects **only to your printer, on your local network** (MQTT over TLS). It does
  not contact Bambu Lab's cloud, the developer, or any other server.
- While the printer setup screen is open, the app **listens** for the announcements Bambu Lab
  printers broadcast on your local network (UDP port 2021), so it can list your printer and fill
  in its IP address and serial number. It doesn't send anything to do this, and the list isn't
  saved or shared.
- Printer status is sent from your phone to your watch using **Google Play services' Wear OS Data
  Layer**, the standard way Wear OS apps talk to their phone app. Depending on how your devices are
  connected, Google Play services may relay this through Google's servers. Only print status is
  sent; your printer access code is never sent to the watch. Google's handling of that data is
  covered by [Google's privacy policy](https://policies.google.com/privacy).

## Notifications

Print alerts are shown as notifications on your phone and mirrored to your watch by Wear OS. They
are generated on your phone from your printer's status.

## Permissions

| Permission | Why |
|---|---|
| Internet / network state | Connect to your printer on your local network. |
| Notifications | Print finished, problem and connection alerts. |
| Foreground service (connected device) | Keep the connection to your printer while the app is in the background, so alerts arrive on time. |
| Wi-Fi multicast | Hear printer announcements on your local network to find your printer during setup. |
| Run at startup | Resume monitoring after the phone restarts, if monitoring is on. |
| All files access (GitHub version only) | Save and restore the optional settings file in Documents. |

## Children

The app is not directed at children and collects no data from anyone.

## Changes

If this policy changes, the new version will be posted on this page with a new effective date.

## Contact

Questions: [{{ site.authorEmail }}](mailto:{{ site.authorEmail }})

printWatcher is not affiliated with or endorsed by Bambu Lab.

</section>
