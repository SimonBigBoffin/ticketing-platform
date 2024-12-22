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

1. Setting up the project
```
git clone https://github.com/SimonBigBoffin/ticketing-platform.git
cd ticketing-platform
composer install

cp .env.example .env

./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
```
2. Running the project
```
/vendor/bin/sail artisan schedule:work
```

## ScreenShots

### Frontend (WelcomePage)
![image](https://github.com/user-attachments/assets/7ecdaf4c-2bd2-4acf-8871-ae9a9211d64a)
### Frontend (TicketPage)
![image](https://github.com/user-attachments/assets/92806457-4d63-4d40-9a81-4e9d48ea839c)
### Test Coverage
![image](https://github.com/user-attachments/assets/05e200b9-4369-4d9b-af22-60a88619aad6)
### Docker Setup (using Laravel Sail)
![image](https://github.com/user-attachments/assets/538616b1-da1a-40cd-8936-efc9bf36191b)
