# Deployment Guide

## Required Environment Variables

You **must** set these environment variables in your deployment platform:

```
FIREBASE_PROJECT_ID=garagesale-318e2
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@garagesale-318e2.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2ff9gcSkxU3YD
vr1NZrBzhUduQO4ATznu4b9//++JXojm3L/8o9fy/3UnMBMp+fWZ/1xZ8yojcYqe
WWucBwQ8zkIv9bqOcBaJQfcKBLXqA2DAwU1hCrghZHkHgdXEYoxsU6VlALQ5zMOF
nx8/3Xy92JBz7LG4fT3oAOLvjzJkgj1p+O3U8B+BIFnoI9mHjVA4XWFIdDv3uoZd
I7uXUaj0ctbIWLOoz0Cq0Hl692HN3A+wO/yW0yprqmjYaGJJFX3JeENF7w75QtJM
8tkZRnaEr7dWlahJYVpczpQyD6CaL6OWUyBIQi+hzPrALYDJwiwCQL2L+Y486ub/
DQ3KzuMtAgMBAAECggEAEc7KFflPlDp5OH9V41DYehqw2uTndKHxMiAsUDYY2Uuf
dKu+Pk3SBlUq850rhDvvMqJVEDVRe4OaYROyaQIpmzIOCmENCIDj6haaSot6zEWd
HOIgBg6w421K/tJgGkRQQJ00SrQJYjSFhdX+YNHhA3jiYQrhWB08kRWjuiMRP0u+
DQ5u8n5feGWR/Hjo1XwgIOLojlg3mVMab0dhm0fu93jsm/ZQ5WWhP8lzvUfF2NDk
6kHuB6lqfI4Uj/HSq9zBTbRPhz+6JkoKx58VR26RJIIAxcGTHhQak7634KeNVFqo
/Z8zIfWTNwaEaj+MtLSGOAN/vkBXVAVgJFyyTYcmjwKBgQDcZEZ/wp6lthQPszOn
P37S2O+Tc9fJ0nYJvY7Pda9ro6sKSFO0ivraibcpvDhRt4yeCsw3NgZ6N2SvX0lT
JeyvEghJTusXRgKHmDTJcXzZAqY7CGRG4rc+xMpXzgsp3awl4trB7ImaVx1bzPpR
3RjUvFM6/f267/xOv+22nsglYwKBgQDT+iRow4haGugdKGEuzZXyj5BVGIt5rtR6
f/OttFRgofWfng1Gb2kGfK/IuifdEl1HScYJueAroA7I9Qhnb8YGuHC1KfUDgHVc
ywt0+KlVppQt2WJV+RKnYqvN4QV1YsJ1Rtjidwvz1tDeTqaBbFlFKG/RcAEc5Rr+
vAXw/8nCLwKBgFu5sE3EJls5qKfQIZNeLd57Q1rPP+RTn6T2K9XUWSoneCxTZeMi
ZL1Hy9+m4pnAFtpADDZ+WbvMCi+jLNVaV2OV0bURD28kSDE++9lLTnbTT3QKThHi
kfmh1cUtkB/gjqFGBV3ooGyIDUQDz7r6ljcUGl/XDh8bepsb7kevVgWZAoGBAIPx
iqIvO3sijmI/1SYFz5T46ZUePwrR2O4bILl5qp+vkCz3eznhdRUVnXEq9k8z9B3A
fOVm7nMZILrTUpTXzQI34efSIvE4D1VgCVSYxwZKNqfHTN9ItuS7lUcEDpq/i1zm
aW+lPCpeBwqpGBktMO/MOLW7quWqccAnlucowBP/AoGAKOGdL3S7+PvqTX2Z1WCb
L80XwqBVO34SWQ19nE1JMexhwwTkW6Nk4Dj7kiq/boxPj2wXGCl5IXEayJ6SvIzF
T034Fk3yxgzPt2arX8xYfO8dBSRYxa+sSbLt4lEglppzHSeMJZBaP8SOTNV3gPdp
Ix30muYlAi9OOUpBKkKq/sE=
-----END PRIVATE KEY-----
```

## Important Notes

### For FIREBASE_PRIVATE_KEY:
- **Copy the entire key** including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep the `\n` characters in the key (they represent newlines)
- Most platforms accept multi-line values, but some require the key as a single line with `\n`

### Platform-Specific Instructions:

#### **Render / Railway / Heroku:**
1. Go to your app's Environment Variables section
2. Add each variable name and value
3. The platform will automatically restart your app

#### **AWS Lambda:**
1. Go to Configuration → Environment Variables
2. Add each variable
3. The `\n` characters in FIREBASE_PRIVATE_KEY should work as-is

#### **Vercel:**
1. Go to Settings → Environment Variables
2. Add each variable
3. Redeploy your app after adding variables

## Testing Locally
The `.env` file is already configured for local development. Just run:
```bash
npm start
```
