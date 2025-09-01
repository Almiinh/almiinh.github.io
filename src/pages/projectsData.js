const tags = {
    dl: { name: "Deep Learning", color: "white", backgroundColor: "mediumslateblue" },
    java: { name: "Java", color: "white", backgroundColor: "#3c2c79" },
    web: { name: "Web", color: "white", backgroundColor: "#705C53" },
    nlp: { name: "NLP", color: "white", backgroundColor: "mediumseagreen" },
    llm: { name: "LLM", color: "white", backgroundColor: "#6ca496" },
    ml: { name: "Machine Learning", color: "var(--color-text", backgroundColor: "peru" },
    js: { name: "JavaScript", color: "black", backgroundColor: "#f0db4f" },
    css: { name: "CSS", color: "white", backgroundColor: "#29a9df" },
    c: { name: "C", color: "white", backgroundColor: "#A8B9CC" },
    cv: { name: "Computer Vision", color: "black", backgroundColor: "#E6E6FA" },
    ip: { name: "Image Processing", color: "black", backgroundColor: "navajowhite" },
    cloud: { name: "Cloud Computing", color: "white", backgroundColor: "#0041c3;" },
    sw: { name: "Semantic Web", color: "white", backgroundColor: "blueviolet" },
    python: { name: "Python", color: "black", backgroundColor: "#ffc42d" },
    php: { name: "PHP", color: "white", backgroundColor: "#787CB5" },
    svelte: { name: "Svelte", color: "white", backgroundColor: "#ff3e00" },
};

const csProjects = [
    {
        href: "https://github.com/Almiinh/cloud-computing/",
        tags: [tags.cloud, tags.java],
        image: "/index/preview-cloud-computing.png",
        title: "File Processing through AWS S3 & SQS",
        tooltip:
            "An AWS-based solution to consolidate daily sales data from globally distributed stores of a \
            large retailer w/ Client-Worker-Consolidator architecture.",
    },
    // {
    //     href: "",
    //     tags: [tags.sw, tags.python],
    //     title: "A SW-based Search Engine",
    //     tooltip:
    //         "Using JSON-LD data stored in a Apache Jena Fuseki local server to browse through food offers in \
    //         coopcycles.com websites",
    // },
    {
        href: "https://github.com/Almiinh/red-object-detector",
        tags: [tags.cv, tags.python],
        image: "/index/preview-red-detection.png",
        title: "Detection of Red Object Motion",
        tooltip:
            "Using HSV colour space to detect red ranges on webcam and position difference across frames to detect motion on webcam.",
    },
    {
        href: "https://github.com/Almiinh/imageprocessing",
        image: "/index/preview-morphomath.png",
        tags: [tags.ip, tags.python],
        title: "Compilation of notebooks presenting image processing techniques.",
        tooltip:
            "Image Segmentation, Enhancement, Histogram Equalization, Fourier Transform, Restoration, \
            Morpho Maths, ML ...",
    },
    {
        href: "https://github.com/Almiinh/game-of-life",
        image: "/index/preview-conway.webp",
        tags: [tags.c],
        title: "The Conway's Game of Life in C",
        tooltip: "The well known game of life written in C in the terminal",
    },
    {
        href: "https://github.com/Almiinh/car-rental-webapp",
        image: "/index/preview-car-rental.png",
        tags: [tags.web, tags.php],
        title: "A Car Rental Web App in PHP/Symfony",
        tooltip: "A Web App as if you were to rent a car.",
    },
    // {
    //     href: "https://github.com/Almiinh/flashcard-webapp/",
    //     tags: [tags.web, tags.java],
    //     title: "A Flashcard Web App in Java/Spring Boot & Vue.js",
    //     tooltip: "(Need repair) A Web App Mockup to store flashcards",
    // },
    {
        href: "https://mylaur5.github.io/theater-tracker",
        image: "/index/preview-theater-tracker.png",
        tags: [tags.web, tags.js, tags.svelte],
        title: "Imaginarium Theater Tracker",
        tooltip: "A Web App to check Genshin Impact Imaginarium Theater game season and compare your characters data",
    },
];

const mlProjects = [
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/nlp_VectorRAG_vs_GraphRAG.ipynb",
        tags: [tags.nlp, tags.llm],
        title: "Summary of Scientific Articles: Comparison of Vector RAG vs Graph Pipelines with LLMs",
        tooltip:
            "A comparison of Vector RAG and Graph RAG pipeline to summary scientific article w/ Langchain",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/dl_ImageClassification.ipynb",
        tags: [tags.dl],
        title: "Image classifier w/ CNN: Cat and dogs",
        tooltip:
            "A CNN model training to classify cat and dog images. Classification of their breeds w/ Tensorflow Keras",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/dl_TimeSeries.ipynb",
        tags: [tags.dl],
        title: "Time Series Prediction w/ LSTM",
        tooltip: "LSTM model training, predicting a time series of office occupancy w/ Tensorflow Keras",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/ml/2-decision-tree/DecisionTree.ipynb",
        tags: [tags.ml],
        title: "Decision Trees: ID3 vs CART",
        tooltip:
            "An plain implementation of ID3 and CART in Python w/ Numpy to understand the algorithm of Decision Trees. Comparison with the sklearn implementation",
    },
    {
        href: "https://github.com/Almiinh/ml-exercises/blob/main/nlp_TokenClassification.ipynb",
        tags: [tags.nlp, tags.llm],
        title: "Part-of-Speech Tagging by finetuning BERT (PyTorch)",
        tooltip: "Finetuning of BERT on Part-of-Speech Tagging",
    },
];

const webProjects = [
    {
        href: "/web/project3-rock-paper-scissors/index.html",
        tags: [{ ...tags.js, name: "JS Basics" }],
        title: "Rock Paper Scissors",
    },
    {
        href: "/web/project4-etch-a-sketch/index.html",
        tags: [{ ...tags.js, name: "DOM Input, Click and Mouseover Events" }],
        title: "Etch-a-Sketch",
    },
    {
        href: "/web/project5-calculator/index.html",
        tags: [{ ...tags.js, name: "DOM Key Bindings Event" }],
        title: "Calculator",
    },
    {
        href: "/web/project7-dashboard/index.html",
        tags: [{ ...tags.css, name: "CSS Grids and Flexbox" }],
        title: "Dashboard",
    },
    {
        href: "/web/project9-tic-tac-toe/index.html",
        tags: [{ ...tags.js, name: "JS Modules" }],
        title: "Tic Tac Toe",
    },
    {
        href: "/web/project11-todo-list/index.html",
        tags: [{ ...tags.js, name: "JS Component, Classes" }],
        title: "Todo List",
    },
    {
        href: "/web/project12-weather-app/index.html",
        tags: [{ ...tags.js, name: "JS Fetch, Async" }],
        title: "Weather App",
    },
    {
        href: "/web/project18-battleship/index.html",
        tags: [{ name: "TS, Game Logic, DOM Manipulation", color: "white", backgroundColor: "#3178c6" }],
        title: "Battleship Game",
    },
].map((p) => ({ ...p, image: p.href.replace("/index.html", "/preview.png") }));

const projects = [
    {
        heading: "CS Projects",
        projects: csProjects,
    },
    {
        heading: "AI / ML Projects",
        projects: mlProjects,
    },
    {
        heading: "Web Projects",
        projects: webProjects,
    },
];

export { projects };
