# Application Name

## Installation Guide

```bash
# Step 1: Clone the Repository
git clone https://github.com/yourusername/yourrepository.git
cd MuseFind/Musefind

# Step 2: Install Dependencies
npm install
cd ../music-server
npm install
cd ../ngrok
npm install

# Step 3: Setup Ngrok
ngrok http 3000
# Copy the generated Ngrok URL and paste it into `app/api.js`

# Step 4: Start the Application
cd ../music-server
npm run dev
npm run start

# Step 5: Scan the Application
# Open a separate terminal window in your code editor and navigate to the application directory, then type:
npm run start
