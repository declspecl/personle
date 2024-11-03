# personle

## Tech Stack

This project uses the following technologies:
- React + TS frontend, notably using Tailwind CSS, react-router, Tanstack Query, and modified shadcn/ui components
- Spring Boot REST API
- Nginx for serving static React assets and reverse proxy to API
- AWS EC2 w/ Route 53 (self-hosted), DynamoDB, and S3
- Certbot for SSL certs

## Features

As of 2024-11-03, the following features have been implemented:
- Daily play mode: a correct Persona is chosen every day for everyone to share
- Free play mode: purely client-side with a randomly chosen correct Persona
- Compendium: a listing of all the Personas the game considers and their relevant information, with numerous QoL filters

## Screenshots (2024-10-27)
### Home Page
![20241027_20h28m15s_grim](https://github.com/user-attachments/assets/4cafc446-47b8-458d-abef-26688680711f)

### Daily Play Page
![20241027_20h29m54s_grim](https://github.com/user-attachments/assets/3dd44c48-7740-4bac-93dc-0a8ee44d38b1)

### Compendium Page
![20241027_20h30m05s_grim](https://github.com/user-attachments/assets/aeaaa151-baf2-4271-87be-a969a4a1057d)
