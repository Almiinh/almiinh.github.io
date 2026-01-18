import previewRedDetection from "$assets/index/preview-red-detection.png";
import previewImageClassifier from "$assets/index/preview-image-classifier.png";
import previewRag from "$assets/index/preview-rag.png";
import previewMorphomath from "$assets/index/preview-morphomath.png";
import previewConway from "$assets/index/preview-conway.webp";
import previewCarRental from "$assets/index/preview-car-rental.png";
import previewTheaterTracker from "$assets/index/preview-theater-tracker.png";
import previewCloudComputing from "$assets/index/preview-cloud-computing.png";



const tags = {
    dl: { name: "Deep Learning", color: "white", backgroundColor: "mediumslateblue" },
    java: { name: "Java", color: "white", backgroundColor: "#3c2c79" },
    html: { name: "HTML", color: "white", backgroundColor: "#ff4e1d" },
    web: { name: "Web", color: "white", backgroundColor: "#705C53" },
    nlp: { name: "NLP", color: "white", backgroundColor: "mediumseagreen" },
    llm: { name: "LLM", color: "white", backgroundColor: "#6ca496" },
    ml: { name: "Machine Learning", color: "white", backgroundColor: "peru" },
    js: { name: "JavaScript", color: "black", backgroundColor: "#f0db4f" },
    css: { name: "CSS", color: "white", backgroundColor: "#29a9df" },
    c: { name: "C", color: "black", backgroundColor: "#A8B9CC" },
    cv: { name: "Computer Vision", color: "black", backgroundColor: "#E6E6FA" },
    ip: { name: "Image Processing", color: "black", backgroundColor: "navajowhite" },
    cloud: { name: "Cloud Computing", color: "white", backgroundColor: "#0041c3;" },
    sw: { name: "Semantic Web", color: "white", backgroundColor: "blueviolet" },
    python: { name: "Python", color: "black", backgroundColor: "#ffc42d" },
    php: { name: "PHP", color: "white", backgroundColor: "#787CB5" },
    svelte: { name: "Svelte", color: "white", backgroundColor: "#ff3e00" },
    ts: { name: "TypeScript", color: "white", backgroundColor: "#3178c6" },
    dsa: { name: "DSA", color: "black", backgroundColor: "#ffd983" },
};

const csProjects = [
    {
        href: "https://github.com/Almiinh/cloud-computing/",
        tags: [tags.cloud, tags.java],
        image: previewCloudComputing.src,
        title: "File Processing through AWS S3 & SQS",
        desc: "An AWS-based solution to consolidate daily sales data from globally distributed stores of a \
            large retailer w/ Client-Worker-Consolidator architecture.",
    },
    // {
    //     href: "",
    //     tags: [tags.sw, tags.python],
    //     title: "A SW-based Search Engine",
    //     desc:
    //         "Using JSON-LD data stored in a Apache Jena Fuseki local server to browse through food offers in \
    //         coopcycles.com websites",
    // },
    {
        href: "https://github.com/Almiinh/red-object-detector",
        tags: [tags.cv, tags.python],
        image: previewRedDetection.src,
        title: "Detection of Red Object Motion",
        desc: "Using HSV colour space to detect red ranges on webcam and position difference across frames to detect motion on webcam.",
    },
    {
        href: "https://github.com/Almiinh/imageprocessing",
        image: previewMorphomath.src,
        tags: [tags.ip, tags.python],
        title: "Compilation of notebooks presenting image processing techniques",
        desc: "Image Segmentation, Enhancement, Histogram Equalization, Fourier Transform, Restoration, \
            Morpho Maths, ML ...",
    },
    {
        href: "https://github.com/Almiinh/game-of-life",
        image: previewConway.src,
        tags: [tags.c],
        title: "The Conway's Game of Life in C",
        desc: "The well known game of life written in C in the terminal",
    },
    {
        href: "https://github.com/Almiinh/car-rental-webapp",
        image: previewCarRental.src,
        tags: [tags.web, tags.php],
        title: "A Car Rental Web App in PHP/Symfony",
        desc: "A Web App as if you were to rent a car.",
    },
    // {
    //     href: "https://github.com/Almiinh/flashcard-webapp/",
    //     tags: [tags.web, tags.java],
    //     title: "A Flashcard Web App in Java/Spring Boot & Vue.js",
    //     desc: "(Need repair) A Web App Mockup to store flashcards",
    // },
    {
        href: "https://mylaur5.github.io/theater-tracker",
        image: previewTheaterTracker.src,
        tags: [tags.web, tags.js, tags.svelte],
        title: "Imaginarium Theater Tracker",
        desc: "A Web App to check Genshin Impact Imaginarium Theater game season and compare your characters data",
    },
];

const mlProjects = [
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/dl/dl_ImageClassification.ipynb",
        tags: [tags.dl],
        title: "Image classifier w/ CNN: Cat and dogs",
        image:  previewImageClassifier.src,
        desc: "A CNN model training to classify cat and dog images. Classification of their breeds w/ Tensorflow Keras",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/nlp/nlp_VectorRAG_vs_GraphRAG.ipynb",
        tags: [tags.nlp, tags.llm],
        title: "Summary of Scientific Articles: Comparison of Vector RAG vs Graph Pipelines with LLMs",
        image: previewRag.src,
        desc: "A comparison of Vector RAG and Graph RAG pipeline to summary scientific article w/ Langchain",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/dl/dl_TimeSeries.ipynb",
        tags: [tags.dl],
        title: "Time Series Prediction w/ LSTM",
        desc: "LSTM model training, predicting a time series of office occupancy w/ Tensorflow Keras",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/ml/2-decision-tree/DecisionTree.ipynb",
        tags: [tags.ml],
        title: "Decision Trees: ID3 vs CART",
        desc: "An plain implementation of ID3 and CART in Python w/ Numpy to understand the algorithm of Decision Trees. Comparison with the sklearn implementation",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/nlp/nlp_TokenClassification.ipynb",
        tags: [tags.nlp, tags.llm],
        title: "Part-of-Speech Tagging by finetuning BERT (PyTorch)",
        desc: "Finetuning of BERT on Part-of-Speech Tagging",
    },
];

const webProjects = [
    {
        href: "/web/project1-odin-recipes/index.html",
        tags: [{ ...tags.html, name: "HTML Basics" }],
        title: "A Recipe page",
    },
    {
        href: "/web/project2-landing-page/index.html",
        tags: [{ ...tags.css, name: "CSS Basics" }],
        title: "A Landing page",
    },
    {
        href: "/web/project3-rock-paper-scissors/index.html",
        tags: [{ ...tags.js, name: "JS Basics" }],
        image: "/web/project3-rock-paper-scissors/preview.png",
        title: "Rock Paper Scissors",
        desc: "Play Rock Paper Scissors game against the computer",
    },
    {
        href: "/web/project4-etch-a-sketch/index.html",
        image: "/web/project4-etch-a-sketch/preview.png",
        tags: [{ ...tags.js, name: "DOM Input, Click and Mouseover Events" }],
        title: "Etch-a-Sketch",
        desc: "Draw on a grid of squares by hovering the mouse",
    },
    {
        href: "/web/project5-calculator/index.html",
        image: "/web/project5-calculator/preview.png",
        tags: [{ ...tags.js, name: "DOM Key Bindings Event" }],
        title: "Calculator",
        desc: "Use a functional calculator with keyboard support",
    },
    {
        href: "/web/project6-validation-form/index.html",
        tags: [{ ...tags.js, name: "HTML Forms" }],
        title: "A Fake Validation Form",
    },
    {
        href: "/web/project7-dashboard/index.html",
        image: "/web/project7-dashboard/preview.png",
        tags: [{ ...tags.css, name: "CSS Grids and Flexbox" }],
        title: "Dashboard",
    },
    {
        href: "/web/project8-library/index.html",
        tags: [{ ...tags.js, name: "JS OOP" }],
        title: "Library",
        desc: "A book library to add, remove and change read status of books",
    },
    {
        href: "/web/project9-tic-tac-toe/index.html",
        image: "/web/project9-tic-tac-toe/preview.png",
        tags: [{ ...tags.js, name: "JS Modules" }],
        title: "Tic Tac Toe",
        desc: "Play Tic Tac Toe game against another player",
    },
    {
        href: "/web/project11-todo-list/index.html",
        image: "/web/project11-todo-list/preview.png",
        tags: [{ ...tags.js, name: "JS Component, Classes" }],
        title: "Todo List",
        desc: "A Todo List to add, remove, edit and mark tasks as complete",
    },
    {
        href: "/web/project12-weather-app/index.html",
        image: "/web/project12-weather-app/preview.png",
        tags: [{ ...tags.js, name: "JS Fetch, Async" }],
        title: "Weather App",
        desc: "Get the current weather of a city using OpenWeather API",
    },
    // {
    //     href: "/web/project13-recursion/index.html",
    //     tags: [tags.dsa, { ...tags.js, name: "Recursion" }],
    //     title: "Recursion Console",
    //     desc: "Test the Fibonacci sequence in recursion and iteration",
    // },
    // {
    //     href: "/web/project14-linked-list/index.html",
    //     tags: [tags.dsa, { ...tags.js, name: "Linked List" }],
    //     title: "Linked List Console",
    // },
    // {
    //     href: "/web/project15-hashmap/index.html",
    //     tags: [tags.dsa, { ...tags.js, name: "Hashmap" }],
    //     title: "Hashmap Console",
    // },
    // {
    //     href: "/web/project16-binary-search-trees/index.html",
    //     tags: [tags.dsa, { ...tags.js, name: "Binary Search Tree" }],
    //     title: "Binary Search Tree Console",
    // },
    {
        href: "/web/project18-battleship/index.html",
        image: "/web/project18-battleship/preview.png",
        tags: [{ name: "TS, Game Logic, DOM Manipulation", color: "white", backgroundColor: "#3178c6" }],
        title: "Battleship Game",
        desc: "Play Battleship game against the computer",
    },
];

const projects = [
    {
        heading: "CS Projects",
        id: "cs-projects",
        projects: csProjects,
    },
    {
        heading: "AI / ML Projects",
        id: "ml-projects",
        projects: mlProjects,
    },
    {
        heading: "Web Projects",
        id: "web-projects",
        projects: webProjects,
    },
];

export { projects, tags };
