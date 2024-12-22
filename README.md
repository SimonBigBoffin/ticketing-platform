# Ticketing Platform
## Introduction
This is a simple ticketing platform, created for Secure Screening Services to show my ability to create an application and
to follow there Challenge requirements. I have used the follow Tech stack to create this application:
- Laravel 10
- Laravel Sail
- Inertia.js (React)
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

/vendor/bin/sail up -d
/vendor/bin/sail artisan key:generate
/vendor/bin/sail artisan migrate --seed
```
2. Running the project
```
/vendor/bin/sail artisan schedule:work
```

## ScreenShots

