# Ticketing Platform
## Introduction
This is a simple ticketing platform, created for Secure Screening Services to show my ability to create an application and
to follow there Challenge requirements. I have used the follow Tech stack to create this application:
- Laravel 10
- Laravel Sail
- Inertia.js (React)
- TailwindCss (+TailwindUI) (latest versions)
- MySQL 8
- Docker
- PHP 8.3 (Laravel Sail)

## Requirements
- Composer 2.0+
- Docker
- Git

## Installation

### Setting up the project
```
git clone https://github.com/SimonBigBoffin/ticketing-platform.git
cd ticketing-platform
composer install

cp .env.example .env

./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate:refresh --seed
```

### Running the project
```
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev

In another terminal, run the following command:
./vendor/bin/sail artisan schedule:work
```
### Additional Features have been added
There is a Admin Login/Logout at the top of the page, (see screenshot below) the following 
Username (email) and Password, Admins can close ticket, see the close link in the Admin View
```
Email: admin@example.com
Password: password
```

## ScreenShots

### Frontend (WelcomePage) Guest Access
![image](https://github.com/user-attachments/assets/704e5066-1d97-46d0-859d-2fb6e0c94581)

### Frontend (WelcomePage) Admin Access 
![image](https://github.com/user-attachments/assets/d9a64ff5-7b37-44ce-923a-92beeba24fbb)


### Frontend (TicketPage)
![image](https://github.com/user-attachments/assets/92806457-4d63-4d40-9a81-4e9d48ea839c)
### Test Coverage
![image](https://github.com/user-attachments/assets/05e200b9-4369-4d9b-af22-60a88619aad6)
### Docker Setup (using Laravel Sail)
![image](https://github.com/user-attachments/assets/538616b1-da1a-40cd-8936-efc9bf36191b)
