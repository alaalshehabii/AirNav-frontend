
# ✈️ AirNav

## 📝 Description
AirNav is a full-stack airport and flight navigation web application designed to help travelers easily browse flights, track their status, and explore airport facilities in one clean and intuitive platform. The application allows users to view detailed flight information such as origin, destination, date, terminal, gate, and status, while also discovering services available inside the airport including restaurants, cafés, lounges, and prayer rooms. AirNav supports guest and authenticated users, implements secure JWT-based authentication, and applies role-based authorization to ensure only permitted users can create, update, or delete data.

## 🎯 Background
AirNav was created to simplify the travel experience by combining flight tracking and airport facility discovery into a single web application. Instead of relying on multiple sources, users can quickly access all essential travel information in one place. This project was developed as an individual capstone to demonstrate full-stack development skills, RESTful API design, authentication, database relationships, and frontend-backend integration.

## 🚀 Getting Started
- Frontend Repository: https://github.com/alaalshehabii/AirNav-frontend  
- Backend Repository: https://github.com/alaalshehabii/nav-backendd
- TRELLO link- https://trello.com/b/EWSmMDQk/airnav

## ✨ Features
- Browse all available flights  
- View detailed flight information  
- JWT authentication (sign up, sign in, sign out)  
- Role-based authorization (guest, user, admin)  
- Save flights to a personal list  
- Remove saved flights  
- View airport facilities by terminal  
- Admin management of flights and facilities  

## 🧩 CRUD Functionality
AirNav implements full CRUD functionality for Flights on both the frontend and backend, allowing authorized users to create, read, update, and delete flight records. Additional CRUD operations are implemented on the backend for facilities, notices, and user-flight relationships.

## 🔐 Authentication & Authorization
The application uses JWT-based authentication across the frontend and backend. Guest users have read-only access, authenticated users can save flights, and admin users can manage application data securely.

## 🗄️ Database Design
The database consists of users, flights, facilities, notices, and a user_flights join table to represent relationships between users and their saved flights.

## 🧰 Technologies Used
- React  
- FastAPI  
- PostgreSQL  
- SQLAlchemy  
- JWT Authentication  
- JavaScript  
- CSS
  
<img width="900" alt="Screenshot 2025-12-27 at 5 58 33 AM" src="https://github.com/user-attachments/assets/24b7fe1d-1af1-4649-9170-9c52dcb1f254" />
<img width="900" alt="Screenshot 2025-12-27 at 5 58 51 AM" src="https://github.com/user-attachments/assets/aeed4389-7336-43fc-b6fa-d40366a55088" />
<img width="900" alt="Screenshot 2025-12-27 at 5 59 17 AM" src="https://github.com/user-attachments/assets/000e5ba8-d701-4a37-93ad-9eab46d1f7c0" />
<img width="900" alt="Screenshot 2025-12-27 at 5 59 27 AM" src="https://github.com/user-attachments/assets/ec479009-1cf3-40cc-9f34-f14354a5c295" />
<img width="900"  alt="Screenshot 2025-12-27 at 5 59 38 AM" src="https://github.com/user-attachments/assets/226dd78c-da53-456a-bc61-ffb7d068c0e6" />
<img width="900" alt="Screenshot 2025-12-27 at 6 00 25 AM" src="https://github.com/user-attachments/assets/d04f3a24-281b-42e3-b681-d1c60a2bb36c" />
<img width="900" alt="Screenshot 2025-12-27 at 5 59 08 AM" src="https://github.com/user-attachments/assets/2c35d2d3-45f3-43c7-a136-4bdf4bc2b1bf" />


  ## ERD
  <img width="1000"  alt="Screenshot 2025-12-27 at 5 53 34 AM" src="https://github.com/user-attachments/assets/84031984-c3cb-472d-b0a0-9f52f7ca28ef" />


## 🔮 Next Steps
- Add real-time flight status updates  
- Implement user profile editing  
- Improve facility search and filtering  
- Enhance UI and accessibility  
