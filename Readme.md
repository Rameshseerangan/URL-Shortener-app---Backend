# Advanced URL Shortener with Analytics, Custom Aliases, and Rate Limiting

## Overview

This project is an **Advanced URL Shortener** that allows users to shorten long URLs and track detailed analytics. It includes user authentication via **Google Sign-In**, custom URL aliases, comprehensive analytics (including redirects, clicks, device and OS types), and rate limiting to manage how many short URLs users can create within a specific time frame. Additionally, the app leverages **Redis caching** for improved performance by reducing database load.

## Features

- **User Authentication:**
  - Google Sign-In for secure user registration and login.
  
- **Create Short URL API:**
  - Generate short URLs with optional custom aliases.
  - Optionally group URLs by topic (e.g., acquisition, activation, retention).
  - Rate-limited creation of short URLs per user within a specified time frame.
  
- **Redirect Short URL API:**
  - Redirect to the original URL from the short URL alias.
  - Track user engagement such as timestamp, user agent, IP address, and geolocation.
  
- **Analytics Tracking:**
  - Track total clicks, unique clicks, and device/OS usage.
  - Get analytics for individual URLs, topic-based analytics, and overall analytics for the user.
  
- **Caching:**
  - Redis caching to store short and long URLs for faster retrieval and improved performance.

## Endpoints

### 1. **User Authentication:**
- **https://localhost/4000/api/Auth//google:**
  - Google Sign-In for secure user authentication.

### 2. **Create Short URL API:**
- **Endpoint:** `https://localhost/4000/url/api/shorten`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "longUrl": "https://www.google.com/search?gs_ssp=eJzj4tLP1Tcwzk0ut0xRYDRgdGDw4slNzE5VyK1UKCnKLAAAexIIkg&q=make+my+trip&oq=ma&gs_lcrp=EgZjaHJvbWUqEAgEEC4YxwEYsQMY0QMYgAQyBggAEEUYPDIGCAEQRRg5MgwIAhAjGCcYgAQYigUyDAgDECMYJxiABBiKBTIQCAQQLhjHARixAxjRAxiABDINCAUQABiDARixAxiABDIGCAYQRRg8MgYIBxBFGDzSAQg0NzQ1ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8",
    "customAlias": "custom-alias",
    "topic": "mytrip"
  }

### 2. **GET /api/analytics/{alias}**
- **Endpoint:** `https://localhost/4000/api/:alias`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
  "totalClicks": 150,
  "uniqueClicks": 120,
  "clicksByDate": [
    { "date": "2024-12-19", "clicks": 10 },
    { "date": "2024-12-20", "clicks": 15 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 50, "uniqueUsers": 45 },
    { "osName": "Android", "uniqueClicks": 40, "uniqueUsers": 35 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 80, "uniqueUsers": 70 },
    { "deviceName": "desktop", "uniqueClicks": 70, "uniqueUsers": 60 }
  ]
}

### 2. **GET /api/analytics/{alias}**
- **Endpoint:** `https://localhost/4000/api/:alias`
- **Method:** `POST`
- **Request Body:**

{
  "totalUrls": 5,
  "totalClicks": 500,
  "uniqueClicks": 450,
  "clicksByDate": [
    { "date": "2024-12-19", "clicks": 100 },
    { "date": "2024-12-20", "clicks": 150 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 200, "uniqueUsers": 180 },
    { "osName": "iOS", "uniqueClicks": 150, "uniqueUsers": 120 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 250, "uniqueUsers": 220 },
    { "deviceName": "tablet", "uniqueClicks": 150, "uniqueUsers": 130 }
  ]
}

## Rate Limiting

Response for Exceeding Rate Limit:
{
  "message": "Rate limit exceeded. Try again later."
}


