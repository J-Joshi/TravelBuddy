# **Travel Buddy**  
An innovative web application designed to enhance travel experiences by connecting users with compatible travel partners and recommending destinations based on user mood analysis using machine learning.

---

## **Table of Contents**  
- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Usage](#usage)  
- [API Details](#api-details)  
- [Limitations](#limitations)  
- [Future Enhancements](#future-enhancements)  

---

## **Overview**  
Travel Buddy is a full-stack web application built to connect travelers based on their preferences and recommend destinations using a machine learning-based mood analysis API. It aims to make travel more personalized, enjoyable, and collaborative.  

---

## **Features**  
- User registration and authentication for secure access.  
- Matchmaking based on travel preferences to suggest compatible travel partners.  
- Machine learning-powered mood analysis that recommends destinations based on user input.  
- Destination suggestions retrieved dynamically from the backend.  
- User-friendly interface with responsive design.  
- Real-time data storage and retrieval with MongoDB.  

---

## **Technologies Used**  
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Machine Learning**: Hugging Face Transformers (Sentiment Analysis), SpaCy (Dependency Parsing)  
- **Other Tools**: Mongoose, Postman, Git/GitHub  

---

## **Usage**

1. Register or log in to your account.
2. Enter your travel preferences to find compatible travel partners.
3. Use the mood analysis feature by describing your current mood in a text box.
4. Receive a mood-based destination recommendation instantly.

---

## **Mood Analysis API**

This Flask-based application is an **AI/ML-powered API** designed for mood analysis, integrating cutting-edge natural language processing (NLP) techniques to deliver personalized insights.


## **Key Features**

1. **AI-Powered Sentiment Analysis**:
   - Utilizes Hugging Face's **sentiment-analysis** pipeline to classify user input as positive, negative, or neutral.
   - Provides a confidence score indicating the certainty of the analysis.

2. **Advanced NLP with SpaCy**:
   - Leverages SpaCy's **dependency parsing** to detect negations in user text for accurate mood detection.
   - Employs **semantic similarity** to identify moods such as "adventurous" when keywords are contextually implied.

3. **Custom Mood Mapping**:
   - Maps user sentiment to predefined moods such as happy, sad, calm, or adventurous.
   - Detects specific keywords (e.g., "adventure," "thrilling") for a deeper understanding of user emotions.

4. **Seamless Frontend Integration**:
   - Configured with **CORS** to enable smooth communication with web-based frontends.
   - Provides RESTful routes (`/` for status checks and `/analyze` for mood analysis).

5. **Secure Deployment**:
   - Includes an SSL context using self-signed certificates to ensure secure communication between the frontend and backend.

---

## **Flow of the Application**

1. **Input**:
   - Accepts a POST request at `/analyze` with JSON containing the user's text. Example:
     ```json
     { "text": "I want an exciting adventure." }
     ```

2. **Processing**:
   - Sentiment analysis is performed using Hugging Face Transformers.
   - SpaCy processes the text for dependency parsing and semantic similarity to refine mood classification.

3. **Output**:
   - Returns a JSON response with the detected mood and confidence score. Example:
     ```json
     { "mood": "adventurous", "score": 0.98 }
     ```

---

## **How It Enhances Web Development**

- **Personalization**: The API integrates seamlessly into web projects, enabling personalized user experiences.
- **Real-Time Processing**: Provides live mood analysis to drive dynamic web functionality.
- **Scalability**: The modular design allows integration with any frontend framework (e.g., React, Vue, Angular).
- **AI/ML in Practice**: Showcases the practical use of AI/ML models for intelligent, user-centric applications.

---

 ## **Limitations**

- **Limited User Base**: The application is currently in its initial phase and has a limited user base. As a result, users may not always find a travel match.
- **Destination Data**: The backend currently provides destination recommendations specific to Lucknow and Indore only.

---

## **Future Enhancements**

- Expand the user base and implement enhanced matchmaking algorithms.
- Increase the diversity of destination data to include more cities and popular travel spots.
- Add real-time chat functionality for matched travel partners.
- Implement advanced sentiment analysis using custom-trained models.

