# News Aggregator Application

This is a news aggregator app built with React and TypeScript. It pulls articles from multiple sources such as NewsAPI, Guardian, and NYTimes, allowing users to search and filter news based on various parameters.

### Features
- **Article Search & Filter**: Search articles by keywords, and filter them by date, category, and source.

- **Personalized News Feed**: Users can customize their news feed by selecting their preferred sources, categories, and authors.

- **Mobile Responsive**: Optimized for mobile devices to provide a seamless user experience.

- **Dockerized Application**: The app is containerized with Docker, ensuring a consistent development environment.

### Data Sources
The app fetches news articles from the following sources:
1. NewsAPI
2. Guardian
3. New York Times

### Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn, Radix-ui
- **State Management**: React Context API for managing global state
- **Backend**: No backend (third-party APIs used for fetching data)
- **Docker**: Docker for containerization of the app

### Prerequisites
To run the application locally or in a Docker container, ensure the following are set up:

1. **Node.js** (v16+)
2. **Docker** (for containerization)

### Installation & Running the App

#### Option 1: Run the app locally

1. Clone the repository:
   ```bash
   git clone git@github.com:matosky/news-aggregator.git
   cd <project_folder>
2. npm install
3. npm run dev

### Option 2: Dockerize the app

1. Build the Docker image:
  
  docker build -t news-aggregator .

2. Run the Docker container:

  docker run -p 3000:3000 news-aggregator

### Environment Variables
 
VITE_NEWSAPI_KEY=your_newsapi_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key

### Best Practices

- DRY (Don't Repeat Yourself): Reusable components and services to avoid code duplication.
- KISS (Keep It Simple, Stupid): The code is kept simple and easy to understand.
- SOLID Principles: The app follows SOLID principles for clean, maintainable code.

### Development Notes

- The app fetches articles from NewsAPI, Guardian, and NYTimes.
- Filters are applied dynamically based on user inputs.
- The Dockerized version is set up to make deployment and development environments consistent.





