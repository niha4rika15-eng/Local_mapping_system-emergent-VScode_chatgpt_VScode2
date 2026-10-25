# PCNS — Precision Campus Navigation System

PCNS is a mobile-responsive campus-navigation prototype built with vanilla JavaScript and Leaflet. It combines outdoor GPS, saved campus landmarks, QR-code location handoff, indoor pedestrian dead reckoning (PDR), floor-aware display, and manual map-training markers.

## Improvements in this package

- **Cross-platform QR anchors:** QR codes contain the place name, latitude, longitude, and floor. Scanning a code confirms and sets the indoor anchor without requiring NFC or pre-synced landmark data.
- **Camera scanning:** The main **SCAN QR** action opens the phone's rear camera. In Admin, **Scan QR to fill place details** fills the landmark form from a PCNS QR code.
- **QR destination links:** Admin → Saved landmarks provides **Start here** and **Copy QR link** actions. QR camera use requires HTTPS (or localhost), camera permission, and the QR scanner library loaded from the internet.
- **Portable map backup:** Export/import a JSON bundle containing landmarks and calibration data so the same anchor IDs can be installed in each browser/device.
- **Supervised step-length regression:** Admin → Personalized PDR model accepts measured walks and fits a least-squares stride model. The learned coefficient is used by subsequent PDR steps and is persisted locally.
- **Tests and docs:** QR payload and model tests are in `tests/`; setup guides are in `docs/`.

## Run locally

Requirements: Node.js and npm.

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`. Browser APIs such as geolocation, motion sensors, and camera access require compatible devices, permissions, and generally HTTPS or localhost. The public GitHub Pages deployment is already an HTTPS secure context.

Run the automated tests:

```bash
cd frontend
npm test
```

## Use the QR codes

1. Allow camera permission when prompted and choose **SCAN QR**.
2. Point the rear camera at a PCNS location code. Review the displayed location, coordinates, and floor.
3. Confirm the prompt to enter Indoor mode at that location.
4. To save a place on the current device, open Admin, choose **Scan QR to fill place details**, review the filled landmark fields, and press **Add landmark**.

The printable E1/E2/E3 gate codes are supplied separately as a PDF. Coordinates are the values provided for this build; verify them on site before using the system for navigation. Read [`docs/QR_SETUP.md`](docs/QR_SETUP.md) for details.

## Publish the QR-enabled site

The uploaded project ZIP was flattened, so this package restores the documented `frontend/public` layout. If GitHub Pages for your repository publishes from the repository root, copy the **contents** of `frontend/public` into that published root (including `index.html`, `pcns.js`, `pcns-qr.js`, `pcns.css`, `pcns-ml.js`, and `demo-floor.geojson`), then commit and push. The QR codes in the supplied PDF need this updated build online before they can be scanned by PCNS.

## Train the PDR step-length model

The included model is a supervised linear regression that estimates distance from the detected step count:

`distance_m = learned_stride_length_m × detected_steps`

Walk a measured, straight route on a single floor and record detected steps and measured distance. Add at least two calibration samples in Admin and press **Train model**. Validate against a separate measured route. See [`docs/ML_CALIBRATION.md`](docs/ML_CALIBRATION.md).

This is a genuine, interpretable calibration model, but it is **not** a fully learned indoor-positioning model. A complete localization model needs a labelled sensor dataset (ground-truth positions synchronized with acceleration, gyroscope, heading, step, floor, and device information) and held-out validation trajectories.

## Persistence and security

- Landmarks, settings, markers, and the calibration model are stored in the current browser's `localStorage`. They are not synchronized between devices and are not automatically backed up. JSON import/export is the current transfer mechanism.
- The backend is still an optional health-check-only FastAPI service; no cloud database is configured. The GitHub Pages frontend remains static.
- The browser-side admin password is only a convenience gate, not secure authentication. Do not store sensitive information or treat the current client-side gate as a security boundary.
- The bundled `demo-floor.geojson` is illustrative E-Block demo geometry, not a surveyed floor plan. Verify campus coordinates, floor-plan geometry, anchor placement, and route measurements before relying on it for real navigation.
- PDR heading/step detection depends on device sensors and can drift. Hallway snapping is a visual correction, not indoor route finding or turn-by-turn guidance.

## Project layout

- `frontend/public/index.html` — application shell
- `frontend/public/pcns.css` — responsive UI styles
- `frontend/public/pcns.js` — outdoor GPS, QR scanning, PDR, training, storage, and admin logic
- `frontend/public/pcns-ml.js` — supervised step-length regression model
- `frontend/public/pcns-qr.js` — QR anchor payload validation and URL generation
- `frontend/public/demo-floor.geojson` — sample floor geometry
- `backend/server.py` — optional API health check
- `docs/` — QR setup and model-training guides
- `tests/` — QR payload and ML regression tests
