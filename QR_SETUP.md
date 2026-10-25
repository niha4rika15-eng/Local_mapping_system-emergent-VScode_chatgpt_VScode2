# PCNS QR code setup

## Scan a location code

1. Open PCNS on an HTTPS website (or localhost while developing).
2. Choose **SCAN QR** and allow camera access.
3. Point the rear camera at a PCNS place QR code.
4. Check the displayed place name, coordinates, and floor. Confirm to set that point as the indoor anchor.

The printed QR stores a compact location payload, so the anchor can be opened on another device without first importing its saved-landmark list. Use the PCNS **SCAN QR** camera to read it; a normal camera app may display the payload as text instead of opening PCNS.

## Add a saved landmark from a QR code

Open Admin, choose **Scan QR to fill place details**, scan a PCNS code, review the name and coordinates, then select **Add landmark**. This stores the landmark in that browser's local storage. Saved data is not automatically synchronized to other devices.

## Camera permissions and limitations

- Camera access requires an HTTPS page or localhost and browser permission.
- The camera scanner library is loaded from unpkg, so the page needs an internet connection to load it.
- If camera access is denied, allow it in the browser's site settings and reload.
- The included gate QR codes use the coordinates supplied for this project and floor `0` (ground level). Confirm their exact placement on site before using them for actual navigation.
- The location codes are not a substitute for a surveyed indoor floor plan. PDR can drift after a scan.

## QR data format

Printed codes contain JSON with the type `pcns-anchor`, place name, latitude, longitude, and floor. The scanner also accepts PCNS QR links with `pcns_qr=1` and the same location details.
