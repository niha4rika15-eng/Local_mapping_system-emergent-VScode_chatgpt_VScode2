# Changelog

## NFC + PDR calibration update

- Added robust NDEF URL, text, JSON payload, saved-landmark ID, and legacy UID handling.
- Added actionable NFC failure messages for unsupported browsers, permissions, secure contexts, unreadable tags, and unmatched anchors.
- Added saved-anchor deep links for NFC URL tags and iOS Shortcuts.
- Added Admin actions to start at a saved anchor, copy its NFC URL, and write the URL to compatible NFC tags.
- Added JSON import/export for landmarks and calibration data to move data between browser/device profiles.
- Added a supervised least-squares linear regression model to learn personalized stride length from measured walks.
- Extracted NDEF decoding into a small testable module and added automated tests for URL/text payload decoding and model fitting.
- Added NFC/model setup documentation.
- Corrected the training UI's persistence wording: map/training data remains local to the current browser unless exported.
## QR location handoff

- Replaced the public NFC scan button and Admin UID capture field with phone-camera QR scanning.
- QR anchors carry a place label, latitude, longitude, and floor; scanning confirms and sets the indoor starting point.
- Added camera permission/status handling, QR-to-landmark form fill, copyable QR destination links, and E1/E2/E3 gate QR payload tests.
- Rebuilt the flattened source archive into the documented frontend, backend, docs, and tests folders.
