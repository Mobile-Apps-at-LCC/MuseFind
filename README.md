# Application Name

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
Open a cmd terminal and navigate the projects ngrok folder then type,
ngrok http 3000
# Copy the generated Ngrok URL and paste it into `app/api.js`

Copy the links below into browser for the image references to show up. 
![ngrok](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/6a372ee2-637e-4140-b313-a97b0097a3c6)
![ngrok2](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/1a87150f-7e2c-4369-921f-71f0634d5448)
![ngrok3](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/bbef8ba1-803f-4402-b9cb-f87fc925b570)


# Step 4: Start the Application
cd ../music-server
npm run dev


Copy the links below into browser for the image references to show up. 
![music-server](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/60e26e92-f49c-42c6-bc27-07466cb8c3e0)

# Step 5: Scan the Application
# Open a separate terminal window in your code editor and navigate to the application directory(musefind\musefind\app), at this point you should have a cmd for ngrok, a terminal window for music-server, and finally a terminal window for app folder. then type:
npm run start
scan application
Copy the links below into browser for the image references to show up. 
![applicationstart](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/24184067-6819-45e9-8a34-84affb449624)


If for whatever reason the application does not allow you to create an account or login, then go to https://dashboard.ngrok.com/get-started/your-authtoken, using your own account. Reset the authtoken, then copy the authtoken config, the first instruction, and place it in the ngrok CMD terminal window, hit enter, then after this type ngrok http 3000. This should fix the error, if and only if there are errors on login or account creation.

![ngrok troubleshoot](https://github.com/Mobile-Apps-at-LCC/MuseFind/assets/41456635/c31091b7-d1c4-44a3-9fa2-aa626ad1d4ab)

