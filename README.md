# MuseFind

MuseFind is a React Native application developed with Expo, designed for users to manage music entries, explore their music feed, and play tracks. It utilizes MongoDB for data storage and Ngrok for secure password hashing and salting.

## Features

- User registration and login with secure password hashing and salting
- Create music entries including track name, artist, genre, audio file, and image
- Browse music feed sorted by genre
- Play tracks directly from the application
- Filter music entries by genre, track, artist, or other criteria

## Technologies Used

- React Native
- Expo
- MongoDB
- Ngrok
- Express
- Node.js
- Bcrypt
- JSON Web Tokens (JWT)

## Troubleshooting

If you encounter issues with account creation or login, follow these steps:

1. Go to [Ngrok Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken) and sign in.
2. Reset the authtoken and copy the authtoken configuration command.
3. Paste the command in the Ngrok command prompt and press Enter.
4. Run `ngrok http 3000` again to start Ngrok with the new authtoken.

## Project Structure



- **app/**: Contains the main React Native application code.
  - **components/**: Reusable components used throughout the app.
  - **screens/**: Main screens of the app.
  - **navigation/**: Navigation configuration and navigators.
  - **context/**: Audio context provider for global state management.
  - **api.js**: API calls and configuration.

- **music-server/**: Backend server code.
  - **src/**: Server source code.
  - **models/**: MongoDB models.
  - **routes/**: API routes.
  - **middlewares/**: Custom middleware functions.
  - **index.js**: Entry point of the server.

- **ngrok/**: Ngrok configuration and dependencies.

## Installation Guide

```bash
# Step 1: Clone the Repository
git clone https://github.com/Mobile-Apps-at-LCC/MuseFind.git
cd MuseFind/Musefind

# Step 2: Install Dependencies
npm install
cd music-server
npm install
cd ../ngrok
npm install

# Step 3: Setup Ngrok
Open a terminal and navigate to the ngrok folder. Then type:
ngrok http 3000
# Copy the generated Ngrok URL and paste it into `app/api.js`

# Step 4: Start the Application
cd ../music-server
npm run dev

# Step 5: Start the React Native Application
# Open another terminal and navigate to the app folder (musefind/app). Then type:
npm run start
# Scan the QR code using Expo Go app on your device to run the application.

If you face issues with account creation or login, visit [Ngrok Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken) using your account. Reset the authtoken, copy the authtoken configuration, and follow the provided instructions in the Ngrok terminal window by pasting the command and restarting `ngrok http 3000`.

![Troubleshoot Ngrok](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/c31091b7-d1c4-44a3-9fa2-aa626ad1d4ab)


