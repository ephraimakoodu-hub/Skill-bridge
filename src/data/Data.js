const skills = [
  // =====================================================
  // 1. WEB DEVELOPMENT
  // =====================================================
  {
    id: 1,
    name: "Web Development",
    description: "Learn how to build modern websites and full-stack web applications.",
    level: "Beginner",
    category: "Technology",
    roadmap: [
      {
        id: 1,
        title: "HTML Fundamentals",
        description: "Learn the structure and foundation of webpages.",
        lesson: {
          introduction: "HTML is the foundation of every webpage. It tells the browser what content exists and how that content is structured.",
          whatYouWillLearn: [
            "What HTML is and how it works",
            "How HTML elements and tags work",
            "How to create headings, paragraphs and links",
            "How to structure a basic webpage",
          ],
          sections: [
            {
              title: "What is HTML?",
              content: "HTML stands for HyperText Markup Language. It is used to structure content on the web, including headings, paragraphs, images, links, buttons and forms.",
            },
            {
              title: "HTML Elements",
              content: "HTML uses elements to describe different types of content. For example, h1 represents a main heading while p represents a paragraph.",
            },
          ],
          example: {
            title: "A Basic HTML Page",
            code: "<html>\n  <head>\n    <title>My Website</title>\n  </head>\n\n  <body>\n    <h1>Welcome to my website</h1>\n    <p>I am learning web development.</p>\n  </body>\n</html>",
          },
          task: {
            title: "Create Your First Webpage",
            description: "Create a simple HTML webpage introducing yourself.",
            requirements: [
              "Add a main heading with your name",
              "Add a paragraph about yourself",
              "Add a link to another website",
              "Save the file as index.html",
            ],
          },
          keyTakeaways: [
            "HTML provides the structure of webpages.",
            "HTML uses elements and tags.",
            "Headings and paragraphs are common HTML elements.",
            "Every web developer should understand HTML.",
          ],
          whyItMatters: "Every website you will ever build, no matter how advanced the tooling gets, is still HTML underneath. Employers test this directly: being asked to build a simple page from scratch in an interview is common, and shaky HTML habits show up as messy, hard-to-style pages later.",
          commonMistakes: [
            "Nesting tags incorrectly (for example, putting a heading inside a paragraph) instead of closing one element before opening the next.",
            "Using a heading tag purely because of its default size instead of because it marks an actual heading. Style size with CSS, not by picking the wrong heading level.",
          ],
        },
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        description: "Learn how to style and create responsive webpages.",
        lesson: {
          introduction: "CSS controls how HTML content looks. It allows you to change colors, spacing, fonts, layouts and much more.",
          whatYouWillLearn: [
            "What CSS is",
            "How to connect CSS to HTML",
            "How to use selectors",
            "How to control colors, fonts and spacing",
          ],
          sections: [
            {
              title: "What is CSS?",
              content: "CSS stands for Cascading Style Sheets. HTML creates the structure of a webpage while CSS controls its visual appearance.",
            },
            {
              title: "CSS Selectors",
              content: "Selectors allow you to choose which HTML elements you want to style. Common selectors include elements, classes and IDs.",
            },
            {
              title: "Responsive Design",
              content: "Responsive design allows webpages to adapt to different screen sizes such as phones, tablets and desktop computers.",
            },
          ],
          example: {
            title: "Basic CSS",
            code: "body {\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: blue;\n}\n\np {\n  font-size: 18px;\n}",
          },
          task: {
            title: "Style Your Webpage",
            description: "Take your HTML webpage and create a CSS file to make it look better.",
            requirements: [
              "Change the background color",
              "Change the heading color",
              "Change the paragraph font size",
              "Add spacing around your content",
            ],
          },
          keyTakeaways: [
            "CSS controls the appearance of webpages.",
            "Selectors target HTML elements.",
            "CSS controls colors, fonts and spacing.",
            "Responsive design makes websites work on different screens.",
          ],
          whyItMatters: "CSS is what separates a page that works from a page that looks intentional. Recruiters and clients judge a project's polish almost entirely through CSS, even when the HTML and JavaScript underneath are identical.",
          commonMistakes: [
            "Fighting the box model by not accounting for padding and border adding to an element's total width.",
            "Using excessive `!important` rules instead of understanding CSS specificity, which makes styles unpredictable as a project grows.",
          ],
        },
      },
      {
        id: 3,
        title: "JavaScript",
        description: "Learn programming fundamentals and make websites interactive.",
        lesson: {
          introduction: "JavaScript adds behavior and interactivity to websites. It allows webpages to respond to user actions and perform calculations or other tasks.",
          whatYouWillLearn: [
            "What JavaScript is",
            "Variables and data types",
            "Functions",
            "Events and user interaction",
          ],
          sections: [
            {
              title: "What is JavaScript?",
              content: "JavaScript is a programming language commonly used to make websites interactive. It can respond to clicks, validate forms, change content and communicate with servers.",
            },
            {
              title: "Variables",
              content: "Variables allow you to store information that your program can use later. JavaScript provides let and const for creating variables.",
            },
            {
              title: "Functions",
              content: "Functions are reusable blocks of code that perform a particular task.",
            },
          ],
          example: {
            title: "JavaScript Example",
            code: "const name = \"Alex\";\n\nfunction greet() {\n  alert(\"Hello \" + name);\n}\n\ngreet();",
          },
          task: {
            title: "Build an Interactive Button",
            description: "Create a webpage with a button that displays a message when clicked.",
            requirements: [
              "Create a button in HTML",
              "Create a JavaScript function",
              "Listen for a button click",
              "Display a message to the user",
            ],
          },
          keyTakeaways: [
            "JavaScript adds behavior to websites.",
            "Variables store information.",
            "Functions contain reusable logic.",
            "Events allow websites to respond to users.",
          ],
          whyItMatters: "JavaScript is what turns a static page into an application. It is also the single most-tested skill in frontend interviews, because it reveals whether someone actually understands programming logic or has only memorized markup.",
          commonMistakes: [
            "Confusing `==` and `===` and getting unexpected type-coercion bugs as a result.",
            "Not understanding that variables declared with `let` are scoped differently from `var`, leading to bugs inside loops and callbacks.",
          ],
        },
      },
      {
        id: 4,
        title: "Git & GitHub",
        description: "Learn how to manage and collaborate on your code.",
        lesson: {
          introduction: "Git is a version control system that helps developers track changes to their code. GitHub provides a platform for storing and collaborating on Git repositories.",
          whatYouWillLearn: [
            "What Git is",
            "Why version control is important",
            "Basic Git commands",
            "How GitHub works",
          ],
          sections: [
            {
              title: "What is Git?",
              content: "Git allows developers to save versions of projects and see how their code changed over time.",
            },
            {
              title: "What is GitHub?",
              content: "GitHub is an online platform where developers can store Git repositories, collaborate with others and share projects.",
            },
          ],
          example: {
            title: "Basic Git Commands",
            code: "git init\ngit add .\ngit commit -m \"Initial commit\"\ngit push",
          },
          task: {
            title: "Create Your First Repository",
            description: "Create a Git repository for one of your practice projects.",
            requirements: [
              "Initialize a Git repository",
              "Add your project files",
              "Create your first commit",
              "Create a GitHub repository",
            ],
          },
          keyTakeaways: [
            "Git tracks changes in your code.",
            "Git helps you work safely on projects.",
            "GitHub stores repositories online.",
            "Git and GitHub are important developer tools.",
          ],
          whyItMatters: "Git is not optional in professional development; it is the shared language every team uses to collaborate without overwriting each other's work. A developer who cannot explain a commit history or resolve a merge conflict will struggle on any real team, regardless of how good their code is.",
          commonMistakes: [
            "Writing vague commit messages like \"update\" or \"fix\" that give no information when looking back at history months later.",
            "Committing directly to a shared main branch instead of working in a feature branch, which makes mistakes harder to isolate and undo.",
          ],
        },
      },
      {
        id: 5,
        title: "React",
        description: "Learn how to build modern frontend applications.",
        lesson: {
          introduction: "React is a JavaScript library for building user interfaces. It allows developers to create reusable components and interactive applications.",
          whatYouWillLearn: [
            "What React is",
            "React components",
            "Props",
            "State and events",
          ],
          sections: [
            {
              title: "React Components",
              content: "Components are reusable pieces of a React application. A component can contain structure, logic and styling.",
            },
            {
              title: "Props",
              content: "Props allow a component to receive information from another component.",
            },
            {
              title: "State",
              content: "State allows a React component to remember information and update the interface when that information changes.",
            },
          ],
          example: {
            title: "Simple React Component",
            code: "function Welcome() {\n  return (\n    <div>\n      <h1>Welcome to SkillBridge</h1>\n      <p>Start learning today.</p>\n    </div>\n  );\n}\n\nexport default Welcome;",
          },
          task: {
            title: "Build a React Component",
            description: "Create a simple React component that displays information about yourself.",
            requirements: [
              "Create a React component",
              "Add a heading",
              "Add a paragraph",
              "Render the component in your application",
            ],
          },
          keyTakeaways: [
            "React is used to build user interfaces.",
            "Components are reusable pieces of UI.",
            "Props allow components to receive data.",
            "State allows components to manage changing data.",
          ],
          whyItMatters: "React (or a framework like it) is what most real frontend jobs in Nigeria and abroad actually ask for, because plain JavaScript becomes unmanageable once an interface has more than a handful of moving parts. Understanding components and state is the single biggest jump in capability a beginner developer makes.",
          commonMistakes: [
            "Mutating state directly instead of using the setter function, which causes the interface to silently fail to update.",
            "Overusing state for values that could just be calculated from existing props, which leads to components that fall out of sync with each other.",
          ],
        },
      },
      {
        id: 6,
        title: "APIs",
        description: "Learn how frontend applications communicate with servers.",
        lesson: {
          introduction: "APIs allow different software systems to communicate with each other. Frontend applications commonly use APIs to request data from servers.",
          whatYouWillLearn: [
            "What an API is",
            "HTTP requests",
            "GET and POST requests",
            "Working with JSON data",
          ],
          sections: [
            {
              title: "What is an API?",
              content: "An API is a set of rules that allows one application to communicate with another application or server.",
            },
            {
              title: "Fetching Data",
              content: "JavaScript applications can use fetch to send requests to APIs and receive information from servers.",
            },
          ],
          example: {
            title: "Fetching API Data",
            code: "fetch(\"https://example.com/api/users\")\n  .then(response => response.json())\n  .then(data => {\n    console.log(data);\n  });",
          },
          task: {
            title: "Fetch Data From an API",
            description: "Create a small application that retrieves information from an API and displays it.",
            requirements: [
              "Use fetch",
              "Send a GET request",
              "Convert the response to JSON",
              "Display the returned information",
            ],
          },
          keyTakeaways: [
            "APIs allow applications to communicate.",
            "HTTP is commonly used for API communication.",
            "JSON is commonly used to transfer data.",
            "Frontend applications can retrieve data using fetch.",
          ],
          whyItMatters: "Almost no real application works with only the data it starts with. Knowing how to fetch, send and handle external data through an API is what lets you connect a frontend to weather services, payment providers, user accounts, or any other real-world system.",
          commonMistakes: [
            "Forgetting to handle the case where a request fails or returns no data, which crashes the interface for the user instead of showing a clear message.",
            "Not reading API documentation carefully, then guessing at parameter names or response shapes instead of confirming them.",
          ],
        },
      },
      {
        id: 7,
        title: "Node.js & Express",
        description: "Learn how to build backend applications and APIs.",
        lesson: {
          introduction: "Node.js allows JavaScript to run outside the browser. Express makes it easier to create backend servers and APIs.",
          whatYouWillLearn: [
            "What Node.js is",
            "What Express is",
            "Creating a server",
            "Creating API routes",
          ],
          sections: [
            {
              title: "Node.js",
              content: "Node.js provides a runtime environment that allows JavaScript to run on a server.",
            },
            {
              title: "Express",
              content: "Express is a popular Node.js framework used for creating web servers and APIs.",
            },
          ],
          example: {
            title: "Simple Express Server",
            code: "const express = require(\"express\");\n\nconst app = express();\n\napp.get(\"/\", (req, res) => {\n  res.json({\n    message: \"Hello SkillBridge\"\n  });\n});\n\napp.listen(1000);",
          },
          task: {
            title: "Create an API",
            description: "Create a small Express server with at least one API endpoint.",
            requirements: [
              "Install Express",
              "Create an Express server",
              "Create a GET route",
              "Return JSON from the route",
            ],
          },
          keyTakeaways: [
            "Node.js runs JavaScript on the server.",
            "Express simplifies backend development.",
            "Routes define API endpoints.",
            "Backend applications can return JSON data.",
          ],
          whyItMatters: "Node.js and Express are what let you write the same language, JavaScript, on both the browser and the server, which is a major reason the ecosystem is so widely used for junior backend roles. Understanding this side of the stack is what turns a frontend developer into a full-stack one.",
          commonMistakes: [
            "Not validating incoming request data on the server, which leaves an API open to broken or malicious input.",
            "Blocking the main thread with long, synchronous operations, which is one of the most common causes of a slow Node.js server.",
          ],
        },
      },
      {
        id: 8,
        title: "Databases",
        description: "Learn how applications store and retrieve information.",
        lesson: {
          introduction: "Databases allow applications to store information permanently. MySQL is an example of a relational database system.",
          whatYouWillLearn: [
            "What databases are",
            "Tables and records",
            "SQL basics",
            "Connecting applications to databases",
          ],
          sections: [
            {
              title: "What is a Database?",
              content: "A database is an organized system for storing and retrieving information. Applications use databases to store users, products and transactions.",
            },
            {
              title: "SQL",
              content: "SQL is a language used to communicate with relational databases. It can be used to create, read, update and delete information.",
            },
          ],
          example: {
            title: "Basic SQL",
            code: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100),\n  email VARCHAR(150)\n);\n\nSELECT * FROM users;",
          },
          task: {
            title: "Create a Users Table",
            description: "Create a simple database table for storing user information.",
            requirements: [
              "Create a database",
              "Create a users table",
              "Add id, name and email columns",
              "Insert at least one user",
            ],
          },
          keyTakeaways: [
            "Databases store application information.",
            "Tables contain records.",
            "SQL is used to work with relational databases.",
            "Backend applications can communicate with databases.",
          ],
          whyItMatters: "An application without a database forgets everything the moment it restarts. Knowing how to design tables, relationships and queries is what lets an application actually remember users, orders, posts or results, which is the core of almost every real product.",
          commonMistakes: [
            "Storing the same piece of information in multiple places instead of designing relationships properly, which leads to data going out of sync.",
            "Writing queries that fetch far more data than a page actually needs, which slows an application down as it grows.",
          ],
        },
      },
      {
        id: 9,
        title: "Full-Stack Projects",
        description: "Combine everything you've learned to build complete applications.",
        lesson: {
          introduction: "You now have the foundation needed to combine frontend, backend and database technologies into complete applications.",
          whatYouWillLearn: [
            "How frontend and backend work together",
            "How APIs connect applications",
            "How databases store application data",
            "How to plan a complete project",
          ],
          sections: [
            {
              title: "Putting Everything Together",
              content: "A full-stack application can have a React frontend, a Node.js and Express backend, and a database such as MySQL. APIs connect these different parts.",
            },
            {
              title: "Building Real Projects",
              content: "The best way to improve is to build projects. Start small, solve real problems and gradually increase complexity.",
            },
          ],
          example: {
            title: "Full-Stack Structure",
            code: "React Frontend\n      ↓\n     API\n      ↓\nNode.js + Express\n      ↓\n    MySQL",
          },
          task: {
            title: "Build a Full-Stack Application",
            description: "Choose a useful idea and build a complete application using the technologies you've learned.",
            requirements: [
              "Create a frontend",
              "Create a backend API",
              "Connect a database",
              "Connect the frontend to the backend",
              "Test the complete application",
            ],
          },
          keyTakeaways: [
            "Frontend handles the user interface.",
            "Backend handles application logic.",
            "APIs connect frontend and backend.",
            "Databases store application data.",
            "Projects are the best way to strengthen your skills.",
          ],
          whyItMatters: "This is the step where isolated skills become a real, demonstrable product. Employers do not hire based on which topics you have covered; they hire based on what you can point to and explain, and a complete full-stack project is exactly that.",
          commonMistakes: [
            "Trying to build every feature at once instead of getting one thin slice, from frontend to database, working end to end first.",
            "Skipping error handling and edge cases because the \"happy path\" already works, which is usually where a project falls apart during a demo.",
          ],
        },
      },
      {
        id: 10,
        title: "Advanced: Thinking Like a Professional Developer",
        description: "Go beyond syntax into the habits that separate hobby code from production code.",
        premium: true,
        lesson: {
          introduction: "Anyone can learn the syntax of HTML, CSS and JavaScript from free tutorials. What is much harder to find, and what this lesson focuses on, is how experienced developers actually think: how they structure a codebase, review their own work, and reason about trade-offs before writing a single line.",
          whatYouWillLearn: [
            "How to break a feature down before writing any code",
            "How to structure files and components so a project stays maintainable",
            "How to read and give useful feedback on code, your own or someone else's",
            "How to reason about performance and security at a basic, practical level",
          ],
          sections: [
            {
              title: "Plan before you build",
              content: "Professionals rarely start typing immediately. Before writing code for a feature, they identify the smallest working version of it, list the states it can be in (loading, empty, error, success), and decide roughly how data will flow through it. Ten minutes of this thinking prevents hours of rewriting later.",
            },
            {
              title: "Structure is a form of communication",
              content: "How you organize files, name variables, and split components communicates intent to the next person reading your code, including future you. A project where related things live together, and names describe what something does rather than how it does it, is dramatically easier to maintain than one that simply works.",
            },
            {
              title: "Code review is a skill on its own",
              content: "Being able to read code and ask precise questions, \"what happens if this array is empty?\", \"why is this state duplicated in two places?\", is what separates a junior developer from a job-ready one. Practice this on your own past projects: reread code you wrote a few weeks ago and see what you would now do differently.",
            },
            {
              title: "Performance and security are not advanced topics you learn later",
              content: "Basic habits like not looping over the same data multiple times unnecessarily, validating any data before trusting it, and never exposing secret keys in frontend code, cost nothing to learn early and are frequently the exact things a technical interviewer probes for.",
            },
          ],
          task: {
            title: "Refactor an old project",
            description: "Go back to the first project you built in this roadmap and improve it using what you now know, without adding new features.",
            requirements: [
              "Rename at least five variables or functions to more clearly describe what they do",
              "Identify one place where the same logic is repeated and combine it into a single reusable function",
              "Add basic handling for at least one case you previously ignored (empty input, failed request, etc.)",
              "Write two sentences explaining what you changed and why, as if reviewing it for a teammate",
            ],
          },
          keyTakeaways: [
            "Planning before coding saves more time than it costs.",
            "Code structure and naming are a form of communication, not just organization.",
            "Reviewing code, including your own older code, is how real improvement happens.",
            "Basic performance and security habits should be part of how you code from day one, not an afterthought.",
          ],
          whyItMatters: "This is the thinking that technical interviews and real teams actually screen for. Two developers can know the exact same syntax; the one who thinks this way is the one who gets hired and promoted.",
          commonMistakes: [
            "Equating \"it works\" with \"it is done,\" without considering maintainability or edge cases.",
            "Avoiding feedback on your code because it feels personal, instead of treating it as the fastest way to improve.",
          ],
        },
      },
    ],
    projects: [
      1,
      2,
      3,
      4,
      5,
    ],
  },

  // =====================================================
  // 2. UI/UX DESIGN
  // =====================================================
  {
    id: 2,
    name: "UI/UX Design",
    description: "Learn how to design useful, accessible, and engaging digital experiences.",
    level: "Beginner",
    category: "Design",
    roadmap: [
      {
        id: 1,
        title: "Design Fundamentals",
        description: "Learn the basic principles behind good digital design.",
        lesson: {
          introduction: "Good design is more than making something look attractive. It involves creating experiences that are clear, useful and easy to understand.",
          whatYouWillLearn: [
            "Basic design principles",
            "Visual hierarchy",
            "Balance and alignment",
            "Consistency in design",
          ],
          sections: [
            {
              title: "What is UI Design?",
              content: "UI stands for User Interface. It focuses on the visual elements users interact with, such as buttons, menus, cards and forms.",
            },
            {
              title: "What is UX Design?",
              content: "UX stands for User Experience. It focuses on how easy, useful and enjoyable a product is to use.",
            },
          ],
          example: {
            title: "Good Interface Structure",
            code: "Header\n  ↓\nNavigation\n  ↓\nMain Content\n  ↓\nAction Button\n  ↓\nFooter",
          },
          task: {
            title: "Analyze an Interface",
            description: "Choose an application you use regularly and identify its main interface elements.",
            requirements: [
              "Identify the main navigation",
              "Identify important buttons",
              "Identify the main content area",
              "Write down three things that could be improved",
            ],
          },
          keyTakeaways: [
            "UI focuses on interface elements.",
            "UX focuses on the overall user experience.",
            "Good design should be clear and useful.",
            "Consistency improves usability.",
          ],
          whyItMatters: "Design fundamentals like alignment, spacing and hierarchy are what separate work that looks deliberate from work that looks accidental. Clients and hiring managers notice inconsistent spacing and misalignment immediately, even if they cannot name why something looks \"off\".",
          commonMistakes: [
            "Adding visual decoration before the layout's structure and spacing are solid, instead of the other way around.",
            "Using inconsistent spacing values throughout a design instead of working from a small, repeatable spacing scale.",
          ],
        },
      },
      {
        id: 2,
        title: "Typography",
        description: "Understand fonts, hierarchy, spacing, and readability.",
        lesson: {
          introduction: "Typography is the practice of arranging text so that it is readable, clear and visually effective.",
          whatYouWillLearn: [
            "Font families",
            "Font sizes",
            "Text hierarchy",
            "Line spacing and readability",
          ],
          sections: [
            {
              title: "Font Families",
              content: "Different fonts communicate different visual styles. Choose fonts that fit the purpose of the interface.",
            },
            {
              title: "Visual Hierarchy",
              content: "Headings, subheadings and body text should have different visual importance so users can scan information easily.",
            },
          ],
          example: {
            title: "Typography Hierarchy",
            code: "H1 → Main Heading\nH2 → Section Heading\nH3 → Subsection\nP  → Body Text",
          },
          task: {
            title: "Create a Typography System",
            description: "Design a simple typography system for a website.",
            requirements: [
              "Choose a heading font",
              "Choose a body font",
              "Define heading sizes",
              "Define body text size",
            ],
          },
          keyTakeaways: [
            "Typography affects readability.",
            "Hierarchy helps users scan information.",
            "Font choices should match the product.",
            "Spacing is important for readable text.",
          ],
          whyItMatters: "Typography carries most of the actual information on a screen, so weak type choices hurt usability directly, not just aesthetics. Being able to justify a font pairing and size scale is a common way interviewers separate someone who follows trends from someone who understands why those trends work.",
          commonMistakes: [
            "Using more than two typefaces in one design, which reads as unplanned rather than intentional.",
            "Setting body text too small or with too little line spacing, which quietly hurts readability without looking obviously wrong.",
          ],
        },
      },
      {
        id: 3,
        title: "Color Theory",
        description: "Learn how colors work together in digital interfaces.",
        lesson: {
          introduction: "Color is an important part of interface design. It can communicate meaning, create hierarchy and influence how users understand an interface.",
          whatYouWillLearn: [
            "Primary and secondary colors",
            "Color combinations",
            "Contrast",
            "Color meaning in interfaces",
          ],
          sections: [
            {
              title: "Color Harmony",
              content: "Color harmony refers to combinations of colors that work well together visually.",
            },
            {
              title: "Contrast",
              content: "Contrast helps important elements stand out and improves readability.",
            },
          ],
          example: {
            title: "Simple Color System",
            code: "Primary → Main actions\nSecondary → Supporting actions\nBackground → Page surface\nText → Main content\nSuccess → Positive feedback",
          },
          task: {
            title: "Create a Color Palette",
            description: "Create a simple color palette for a fictional application.",
            requirements: [
              "Choose a primary color",
              "Choose a secondary color",
              "Choose a background color",
              "Choose a text color",
            ],
          },
          keyTakeaways: [
            "Color creates visual hierarchy.",
            "Contrast improves readability.",
            "Color should be used consistently.",
            "A small color system is easier to maintain.",
          ],
          whyItMatters: "Color communicates meaning before a user reads a single word: it signals what is clickable, what is an error, and what is safe to ignore. Getting this wrong is a common reason otherwise good-looking interfaces confuse real users.",
          commonMistakes: [
            "Relying on color alone to communicate status (like red for error), which fails for colorblind users and in poor lighting.",
            "Picking colors that look good together on a swatch but fail accessibility contrast requirements once real text is placed on them.",
          ],
        },
      },
      {
        id: 4,
        title: "User Experience",
        description: "Understand how users interact with digital products.",
        lesson: {
          introduction: "User experience design focuses on understanding users and creating products that are useful, accessible and easy to navigate.",
          whatYouWillLearn: [
            "User needs",
            "User journeys",
            "Usability",
            "Common UX problems",
          ],
          sections: [
            {
              title: "Understanding Users",
              content: "Designers need to understand who will use a product and what those users are trying to accomplish.",
            },
            {
              title: "User Journeys",
              content: "A user journey describes the steps a person takes while completing a task in a digital product.",
            },
          ],
          example: {
            title: "Simple User Journey",
            code: "Open App\n   ↓\nLogin\n   ↓\nDashboard\n   ↓\nChoose Course\n   ↓\nStart Lesson",
          },
          task: {
            title: "Map a User Journey",
            description: "Create a simple user journey for an online learning platform.",
            requirements: [
              "Choose one user goal",
              "List the steps required",
              "Identify one possible problem",
              "Suggest an improvement",
            ],
          },
          keyTakeaways: [
            "UX starts with understanding users.",
            "User journeys show how people complete tasks.",
            "Usability is essential.",
            "Good UX reduces unnecessary friction.",
          ],
          whyItMatters: "UX is the discipline of designing for how people actually behave, not how you assume they behave. This is the skill that turns a pretty screen into a product people can use without frustration, and it is what separates a UI designer from a UX designer on a resume.",
          commonMistakes: [
            "Designing for the ideal, error-free user journey and ignoring what happens when something goes wrong.",
            "Skipping research or testing entirely and designing purely from personal preference.",
          ],
        },
      },
      {
        id: 5,
        title: "Wireframing",
        description: "Learn how to plan interfaces before designing them.",
        lesson: {
          introduction: "Wireframes are simple layouts used to plan the structure of an interface before adding detailed visual design.",
          whatYouWillLearn: [
            "What wireframes are",
            "Low-fidelity design",
            "Page structure",
            "Content hierarchy",
          ],
          sections: [
            {
              title: "Why Wireframe?",
              content: "Wireframes help designers focus on structure and functionality before spending time on visual details.",
            },
            {
              title: "Low-Fidelity Wireframes",
              content: "Low-fidelity wireframes are simple sketches or layouts that show where major elements should appear.",
            },
          ],
          example: {
            title: "Basic Dashboard Wireframe",
            code: "[ Logo ] [ Navigation ]\n\n[ Welcome Message ]\n\n[ Card ] [ Card ] [ Card ]\n\n[ Recent Activity ]\n\n[ Footer ]",
          },
          task: {
            title: "Create a Wireframe",
            description: "Create a wireframe for a simple dashboard.",
            requirements: [
              "Add a header",
              "Add navigation",
              "Add main content",
              "Add at least three cards",
            ],
          },
          keyTakeaways: [
            "Wireframes focus on structure.",
            "They help designers plan before visual design.",
            "Low-fidelity designs are quick to change.",
            "Content hierarchy should be clear.",
          ],
          whyItMatters: "Wireframes let you and a team agree on structure and flow before anyone spends time on visual polish, which saves significant rework. Being comfortable wireframing quickly is one of the clearest signs of a designer who can work efficiently under real deadlines.",
          commonMistakes: [
            "Adding color, fonts or images to a wireframe, which distracts from the layout and flow decisions it is meant to test.",
            "Wireframing every screen in full detail before getting any feedback, instead of validating the core flow first.",
          ],
        },
      },
      {
        id: 6,
        title: "Prototyping",
        description: "Turn your ideas into interactive designs.",
        lesson: {
          introduction: "Prototypes allow designers to simulate how a digital product will work before it is fully developed.",
          whatYouWillLearn: [
            "What prototypes are",
            "Interactive screens",
            "User flows",
            "Testing designs",
          ],
          sections: [
            {
              title: "Interactive Prototypes",
              content: "An interactive prototype connects screens and allows users to experience a planned interface.",
            },
            {
              title: "Testing",
              content: "Designers can test prototypes with users to discover usability problems before development begins.",
            },
          ],
          example: {
            title: "Simple Prototype Flow",
            code: "Home\n ↓\nLogin\n ↓\nDashboard\n ↓\nCourse\n ↓\nLesson",
          },
          task: {
            title: "Build a Prototype",
            description: "Create a simple interactive prototype for a learning application.",
            requirements: [
              "Create at least four screens",
              "Connect the screens",
              "Create one complete user flow",
              "Test the flow",
            ],
          },
          keyTakeaways: [
            "Prototypes simulate real products.",
            "They help discover design problems early.",
            "User flows connect screens together.",
            "Testing improves the final design.",
          ],
          whyItMatters: "A prototype is what lets you or a stakeholder actually click through an idea before a single line of code is written, catching usability problems while they are still cheap to fix. This is usually the deliverable that convinces a client or manager a design will work.",
          commonMistakes: [
            "Building a prototype with far more screens and states than needed to test the actual question you have.",
            "Skipping testing the prototype with a real person, and only reviewing it yourself.",
          ],
        },
      },
      {
        id: 7,
        title: "Design Systems",
        description: "Learn how to create consistent and scalable interfaces.",
        lesson: {
          introduction: "A design system is a collection of reusable components, styles and rules that help teams create consistent interfaces.",
          whatYouWillLearn: [
            "Design tokens",
            "Reusable components",
            "Spacing systems",
            "Component consistency",
          ],
          sections: [
            {
              title: "Reusable Components",
              content: "Buttons, inputs, cards and navigation elements can be standardized and reused throughout a product.",
            },
            {
              title: "Consistency",
              content: "A consistent design system makes products easier to use and easier for teams to maintain.",
            },
          ],
          example: {
            title: "Component System",
            code: "Button\nInput\nCard\nModal\nNavbar\nDropdown",
          },
          task: {
            title: "Create a Mini Design System",
            description: "Create a small design system containing common interface components.",
            requirements: [
              "Create button styles",
              "Create input styles",
              "Create card styles",
              "Define spacing rules",
            ],
          },
          keyTakeaways: [
            "Design systems improve consistency.",
            "Components can be reused.",
            "Design rules make products easier to maintain.",
            "Consistency improves user experience.",
          ],
          whyItMatters: "Design systems are what let a product stay visually consistent as it grows past a handful of screens, and knowing how to build or use one is expected on any team working on a product of real size.",
          commonMistakes: [
            "Creating one-off components for individual screens instead of reusing and extending existing ones.",
            "Letting a design system become out of date with the actual product, which quietly reintroduces inconsistency.",
          ],
        },
      },
      {
        id: 8,
        title: "Real-world Projects",
        description: "Apply your design knowledge to practical projects.",
        lesson: {
          introduction: "The best way to improve as a designer is to apply your knowledge to realistic projects and solve actual user problems.",
          whatYouWillLearn: [
            "How to plan a design project",
            "How to research users",
            "How to create interfaces",
            "How to present your design",
          ],
          sections: [
            {
              title: "From Idea to Design",
              content: "A complete design project normally moves through research, planning, wireframing, visual design, prototyping and testing.",
            },
            {
              title: "Building a Portfolio",
              content: "Documenting your design process helps demonstrate how you think and solve problems.",
            },
          ],
          example: {
            title: "Design Process",
            code: "Research\n   ↓\nWireframe\n   ↓\nUI Design\n   ↓\nPrototype\n   ↓\nTesting\n   ↓\nFinal Design",
          },
          task: {
            title: "Design a Complete Product",
            description: "Choose a simple product and take it from research to prototype.",
            requirements: [
              "Define the problem",
              "Create a user flow",
              "Create wireframes",
              "Create a visual design",
              "Create a prototype",
            ],
          },
          keyTakeaways: [
            "Practice improves design skills.",
            "A design process helps organize your work.",
            "User problems should guide design decisions.",
            "Good projects can become portfolio pieces.",
          ],
          whyItMatters: "This is where design fundamentals, UX thinking and a design system come together into something you can show in a portfolio review or interview, which is ultimately what gets a design role.",
          commonMistakes: [
            "Presenting only final screens without explaining the reasoning or process behind them, which is what interviewers actually want to hear.",
            "Polishing visuals extensively while skipping the research or flow-mapping that should have come first.",
          ],
        },
      },
      {
        id: 9,
        title: "Advanced: Designing for Trust and Accessibility",
        description: "Learn the depth of UX craft that separates portfolio-ready designers from beginners.",
        premium: true,
        lesson: {
          introduction: "Most design tutorials stop at making things look good. This lesson goes into two areas that senior designers are actually judged on: accessibility, designing so that people with different abilities can use your product, and trust, designing so people feel safe and confident using it.",
          whatYouWillLearn: [
            "Why accessibility is a core design skill, not an optional add-on",
            "How to check color contrast and touch target sizes properly",
            "How microcopy and small interface details build or break user trust",
            "How to critique a design the way a hiring manager would",
          ],
          sections: [
            {
              title: "Accessibility is usability for everyone",
              content: "A design that only works for someone with perfect vision, fine motor control and a fast connection excludes a large share of real users. Sufficient color contrast, readable font sizes, and touch targets large enough to tap accurately are not extra polish; they are part of whether the design actually works.",
            },
            {
              title: "Trust is designed, not accidental",
              content: "Small details, a clear error message instead of a vague one, a visible loading state instead of a frozen screen, honest and specific button labels, all reduce user anxiety. Products that feel trustworthy usually got there through dozens of small, deliberate decisions like these.",
            },
            {
              title: "Critiquing design like a hiring manager",
              content: "When reviewing your own work, ask three questions: what problem was this trying to solve, does the solution clearly address it, and what would confuse a first-time user? Being able to answer these for your own portfolio pieces is exactly what a design interview will ask you to do live.",
            },
          ],
          task: {
            title: "Audit one of your earlier projects",
            description: "Take a project you completed earlier in this roadmap and review it specifically for accessibility and trust.",
            requirements: [
              "Check text and background color combinations against a contrast standard and note any that fail",
              "Identify one place where an error or empty state was not designed, and design it",
              "Rewrite one piece of interface text (a button, a label) to be clearer and more specific",
              "Write a short critique of the original design as if presenting it in a portfolio review",
            ],
          },
          keyTakeaways: [
            "Accessibility is a core part of good design, not a separate checklist item.",
            "Trust is built through many small, deliberate interface decisions.",
            "Being able to critique your own work clearly is a skill interviewers specifically test for.",
          ],
          whyItMatters: "Accessibility and trust are exactly the areas junior designers most often skip, which is why demonstrating them clearly is one of the fastest ways to stand out in a portfolio review against people who only show polished visuals.",
          commonMistakes: [
            "Treating accessibility as something to add at the end, rather than a constraint considered from the first wireframe.",
            "Focusing a portfolio case study entirely on the final screens, with no mention of usability or accessibility decisions.",
          ],
        },
      },
    ],
    projects: [
      6,
      7,
    ],
  },

  // =====================================================
  // 3. DATA ANALYSIS
  // =====================================================
  {
    id: 3,
    name: "Data Analysis",
    description: "Learn how to work with data and turn information into useful insights.",
    level: "Beginner",
    category: "Technology",
    roadmap: [
      {
        id: 1,
        title: "Introduction to Data",
        description: "Understand what data is and how it is used.",
        lesson: {
          introduction: "Data is information collected from observations, measurements, transactions and other sources. Data analysis helps us turn that information into useful insights.",
          whatYouWillLearn: [
            "What data is",
            "Types of data",
            "Structured and unstructured data",
            "Why data matters",
          ],
          sections: [
            {
              title: "What is Data?",
              content: "Data is a collection of facts, values or observations that can be analyzed to answer questions or support decisions.",
            },
            {
              title: "Types of Data",
              content: "Data can be numerical, categorical, text-based and many other forms depending on what is being measured.",
            },
          ],
          example: {
            title: "Example Dataset",
            code: "Student   Score\nAlex      85\nJohn      72\nSarah     91\nDavid     68",
          },
          task: {
            title: "Identify Data Types",
            description: "Find examples of data around you and classify them.",
            requirements: [
              "Find five examples of data",
              "Identify their types",
              "Explain where each data item came from",
              "Explain why the data could be useful",
            ],
          },
          keyTakeaways: [
            "Data represents information.",
            "Data can have different types.",
            "Analysis helps turn data into insights.",
            "Organizations use data to make decisions.",
          ],
          whyItMatters: "Every analysis, chart or dashboard starts with understanding what a dataset actually represents and where its limitations are. Skipping this step is the most common reason beginners draw confident conclusions from flawed data.",
          commonMistakes: [
            "Jumping straight to charts before checking a dataset for missing values, duplicates or obvious errors.",
            "Treating correlation in a dataset as proof of causation without further investigation.",
          ],
        },
      },
      {
        id: 2,
        title: "Spreadsheets",
        description: "Learn how to organize and analyze data using spreadsheets.",
        lesson: {
          introduction: "Spreadsheets are powerful tools for organizing, calculating and analyzing data.",
          whatYouWillLearn: [
            "Rows and columns",
            "Formulas",
            "Sorting and filtering",
            "Basic spreadsheet functions",
          ],
          sections: [
            {
              title: "Spreadsheet Structure",
              content: "Spreadsheets organize information into rows and columns. Each intersection is called a cell.",
            },
            {
              title: "Formulas",
              content: "Formulas allow you to perform calculations automatically using spreadsheet data.",
            },
          ],
          example: {
            title: "Basic Spreadsheet Formula",
            code: "A1 = 20\nA2 = 30\n\nA3 = SUM(A1:A2)\n\nResult = 50",
          },
          task: {
            title: "Create a Sales Spreadsheet",
            description: "Create a spreadsheet containing basic sales information.",
            requirements: [
              "Create at least five products",
              "Add prices",
              "Add quantities",
              "Calculate total sales",
            ],
          },
          keyTakeaways: [
            "Spreadsheets organize data.",
            "Formulas automate calculations.",
            "Sorting and filtering help explore data.",
            "Spreadsheets are useful for basic analysis.",
          ],
          whyItMatters: "Spreadsheets remain the most widely used data tool in real workplaces in Nigeria and globally, because most business data starts and lives there. Being fluent in formulas and pivot tables is often the actual bar for an entry-level data role, before any programming language comes into it.",
          commonMistakes: [
            "Using manual copy-paste to summarize data instead of formulas or pivot tables that update automatically.",
            "Hard-coding numbers into formulas instead of referencing cells, which breaks the moment the source data changes.",
          ],
        },
      },
      {
        id: 3,
        title: "Statistics Fundamentals",
        description: "Learn the basic statistical concepts used in data analysis.",
        lesson: {
          introduction: "Statistics provides methods for summarizing and understanding data.",
          whatYouWillLearn: [
            "Mean",
            "Median",
            "Mode",
            "Range",
          ],
          sections: [
            {
              title: "Mean",
              content: "The mean is calculated by adding all values together and dividing by the number of values.",
            },
            {
              title: "Median and Mode",
              content: "The median is the middle value when data is ordered. The mode is the value that appears most frequently.",
            },
          ],
          example: {
            title: "Simple Statistics",
            code: "Scores:\n10, 20, 20, 30, 40\n\nMean = 24\nMedian = 20\nMode = 20\nRange = 30",
          },
          task: {
            title: "Analyze a Dataset",
            description: "Calculate basic statistics for a small dataset.",
            requirements: [
              "Find the mean",
              "Find the median",
              "Find the mode",
              "Find the range",
            ],
          },
          keyTakeaways: [
            "Statistics helps summarize data.",
            "Mean represents the average.",
            "Median represents the middle value.",
            "Mode represents the most common value.",
          ],
          whyItMatters: "Statistics is what lets you say whether a pattern in data is meaningful or just noise. Without this, it is easy to present a coincidence as an insight, which damages trust in an analyst's work.",
          commonMistakes: [
            "Reporting an average without mentioning how spread out the data is, which can hide a very uneven distribution.",
            "Drawing conclusions from a very small sample size as if it represents the whole population.",
          ],
        },
      },
      {
        id: 4,
        title: "SQL",
        description: "Learn how to retrieve and work with data in databases.",
        lesson: {
          introduction: "SQL allows analysts and developers to retrieve, filter and manipulate information stored in relational databases.",
          whatYouWillLearn: [
            "SELECT statements",
            "WHERE conditions",
            "ORDER BY",
            "Basic database queries",
          ],
          sections: [
            {
              title: "SELECT",
              content: "The SELECT statement is used to retrieve information from a database table.",
            },
            {
              title: "Filtering Data",
              content: "WHERE allows you to retrieve only records that match a specific condition.",
            },
          ],
          example: {
            title: "SQL Query",
            code: "SELECT name, score\nFROM students\nWHERE score >= 70\nORDER BY score DESC;",
          },
          task: {
            title: "Query a Dataset",
            description: "Create a database table and write queries to retrieve useful information.",
            requirements: [
              "Create a table",
              "Insert sample records",
              "Use SELECT",
              "Use WHERE",
              "Use ORDER BY",
            ],
          },
          keyTakeaways: [
            "SQL is used to work with relational databases.",
            "SELECT retrieves information.",
            "WHERE filters information.",
            "ORDER BY sorts query results.",
          ],
          whyItMatters: "SQL is how real analysts get data out of the databases companies actually use, rather than relying on someone else to export a spreadsheet for them. It is one of the most commonly required skills in data analyst job postings.",
          commonMistakes: [
            "Forgetting a WHERE clause on an UPDATE or DELETE statement, which can change or remove far more data than intended.",
            "Not understanding joins well enough, leading to accidentally duplicated or dropped rows in query results.",
          ],
        },
      },
      {
        id: 5,
        title: "Python for Data Analysis",
        description: "Use Python to manipulate and analyze datasets.",
        lesson: {
          introduction: "Python is widely used for data analysis because it has powerful libraries for working with datasets.",
          whatYouWillLearn: [
            "Python basics for analysis",
            "Lists and dictionaries",
            "Data manipulation",
            "Introduction to pandas",
          ],
          sections: [
            {
              title: "Python and Data",
              content: "Python provides simple syntax and powerful libraries that make it useful for processing and analyzing data.",
            },
            {
              title: "Pandas",
              content: "Pandas is a Python library commonly used to work with tables and datasets.",
            },
          ],
          example: {
            title: "Simple Python Analysis",
            code: "scores = [70, 80, 90, 60]\n\naverage = sum(scores) / len(scores)\n\nprint(average)",
          },
          task: {
            title: "Analyze Data with Python",
            description: "Use Python to calculate information from a small dataset.",
            requirements: [
              "Create a list of values",
              "Calculate the average",
              "Find the highest value",
              "Find the lowest value",
            ],
          },
          keyTakeaways: [
            "Python is widely used in data analysis.",
            "Lists can store collections of values.",
            "Python can perform calculations on data.",
            "Pandas is useful for larger datasets.",
          ],
          whyItMatters: "Python lets you automate the repetitive parts of analysis and handle datasets too large or messy for a spreadsheet, which is what separates someone doing manual reporting from someone doing scalable analysis.",
          commonMistakes: [
            "Not checking a DataFrame's shape and data types after loading it, then being confused by errors later.",
            "Writing analysis code with no structure or reusable functions, making it hard to rerun on new data.",
          ],
        },
      },
      {
        id: 6,
        title: "Data Visualization",
        description: "Learn how to communicate insights through visualizations.",
        lesson: {
          introduction: "Data visualization uses charts and graphs to make patterns and trends easier to understand.",
          whatYouWillLearn: [
            "Bar charts",
            "Line charts",
            "Pie charts",
            "Choosing appropriate visualizations",
          ],
          sections: [
            {
              title: "Why Visualize Data?",
              content: "Charts can make complex datasets easier to understand and help people identify trends and patterns.",
            },
            {
              title: "Choosing a Chart",
              content: "Different charts are useful for different questions. For example, line charts are useful for trends over time.",
            },
          ],
          example: {
            title: "Visualization Choices",
            code: "Categories → Bar Chart\n\nTime Trends → Line Chart\n\nParts of a Whole → Pie Chart",
          },
          task: {
            title: "Create a Data Dashboard",
            description: "Create visualizations for a small dataset.",
            requirements: [
              "Choose a dataset",
              "Create at least two charts",
              "Label your charts",
              "Write two insights from the data",
            ],
          },
          keyTakeaways: [
            "Visualization makes data easier to understand.",
            "Different charts answer different questions.",
            "Charts should have clear labels.",
            "A good visualization communicates an insight.",
          ],
          whyItMatters: "A correct analysis that is poorly visualized will not convince anyone. Knowing how to choose the right chart for the right question is what makes an insight land with a non-technical audience, which is most of the audience an analyst actually reports to.",
          commonMistakes: [
            "Using a pie chart for data with many categories, which becomes unreadable past four or five slices.",
            "Leaving a chart without clear axis labels or a title, forcing the viewer to guess what they are looking at.",
          ],
        },
      },
      {
        id: 7,
        title: "Data Projects",
        description: "Apply your skills to real-world datasets.",
        lesson: {
          introduction: "Projects help you combine data collection, cleaning, analysis and visualization into a complete workflow.",
          whatYouWillLearn: [
            "How to choose a dataset",
            "How to clean data",
            "How to analyze data",
            "How to present findings",
          ],
          sections: [
            {
              title: "The Analysis Process",
              content: "A typical analysis workflow includes collecting data, cleaning it, exploring it, analyzing it and communicating the results.",
            },
            {
              title: "Communicating Insights",
              content: "A good analyst does not only calculate numbers. They explain what the numbers mean and why the findings matter.",
            },
          ],
          example: {
            title: "Data Analysis Workflow",
            code: "Collect\n  ↓\nClean\n  ↓\nExplore\n  ↓\nAnalyze\n  ↓\nVisualize\n  ↓\nReport",
          },
          task: {
            title: "Complete a Data Analysis Project",
            description: "Choose a dataset and perform a complete analysis.",
            requirements: [
              "Find a dataset",
              "Clean the data",
              "Analyze the data",
              "Create visualizations",
              "Write your findings",
            ],
          },
          keyTakeaways: [
            "Projects strengthen analytical skills.",
            "Data should be cleaned before analysis.",
            "Visualizations help communicate findings.",
            "Insights should answer meaningful questions.",
          ],
          whyItMatters: "This is where the technical skills combine into a story: a real dataset, a clear question, and an honest answer supported by evidence. It is the single artifact most likely to get you through the first stage of a data analyst hiring process.",
          commonMistakes: [
            "Presenting every chart you made instead of only the ones that actually support your main finding.",
            "Stating a conclusion without showing the data or reasoning that led to it.",
          ],
        },
      },
      {
        id: 8,
        title: "Advanced: Communicating Data Insights Clearly",
        description: "The analysis skill most courses skip: turning numbers into a story someone will act on.",
        premium: true,
        lesson: {
          introduction: "A correct analysis that nobody understands or acts on has failed at its actual job. This lesson focuses on the most underrated data skill: taking a real finding and communicating it clearly enough that a non-technical decision-maker can act on it.",
          whatYouWillLearn: [
            "How to structure a data finding for a non-technical audience",
            "How to avoid the most common ways analysis misleads people, even unintentionally",
            "How to anticipate and answer the follow-up questions a finding will raise",
            "How to present uncertainty honestly without undermining your conclusion",
          ],
          sections: [
            {
              title: "Lead with the answer, not the process",
              content: "Beginners often present analysis in the order they did it: cleaning, then exploring, then concluding. Experienced analysts lead with the answer to the question that was actually asked, then support it with the two or three pieces of evidence that matter most. Everything else belongs in an appendix, not the headline.",
            },
            {
              title: "Common ways data misleads, even honestly",
              content: "Cherry-picking a time range that flatters a trend, using an average when the data is heavily skewed, and confusing a correlation with a cause are all easy to do without intending to mislead anyone. Checking your own analysis against these traps before presenting it is a habit worth building early.",
            },
            {
              title: "Presenting uncertainty without losing credibility",
              content: "Real data is rarely perfectly clean or conclusive. Saying \"this data suggests X, based on Y, though the sample size is limited\" is more credible, not less, than overstating a shaky conclusion. Decision-makers trust analysts who are upfront about the limits of what the data shows.",
            },
          ],
          task: {
            title: "Rewrite a past finding for a non-technical reader",
            description: "Take the conclusion from your Data Projects roadmap step and rewrite how you present it.",
            requirements: [
              "State the main finding in one sentence, before any explanation",
              "List the two most important pieces of evidence supporting it",
              "Add one honest limitation of the analysis (sample size, data quality, time range, etc.)",
              "Remove any chart or number that does not directly support the main finding",
            ],
          },
          keyTakeaways: [
            "Lead with the conclusion, then support it, not the other way around.",
            "Watch for common ways data can mislead, even without any bad intent.",
            "Stating a finding's limitations honestly builds more trust than it costs.",
          ],
          whyItMatters: "Most data analyst interviews and job performance reviews are ultimately about this skill: can you turn numbers into a clear, honest recommendation someone else can act on. It is a differently valuable skill than the technical steps that came before it in this roadmap.",
          commonMistakes: [
            "Including every chart produced during analysis instead of only the ones that support the main finding.",
            "Stating a conclusion with more confidence than the underlying data actually supports.",
          ],
        },
      },
    ],
    projects: [
      8,
    ],
  },

  // =====================================================
  // 4. ARTIFICIAL INTELLIGENCE
  // =====================================================
  {
    id: 4,
    name: "Artificial Intelligence",
    description: "Explore the fundamentals of AI and the technologies shaping modern software.",
    level: "Beginner",
    category: "Technology",
    roadmap: [
      {
        id: 1,
        title: "Introduction to AI",
        description: "Understand the basic concepts behind artificial intelligence.",
        lesson: {
          introduction: "Artificial intelligence is a field of computing focused on creating systems that can perform tasks that normally require aspects of human intelligence.",
          whatYouWillLearn: [
            "What AI means",
            "Examples of AI",
            "AI applications",
            "Basic AI terminology",
          ],
          sections: [
            {
              title: "What is AI?",
              content: "AI systems can process information, identify patterns and perform tasks based on programmed or learned behavior.",
            },
            {
              title: "AI in Everyday Life",
              content: "AI is used in recommendation systems, search engines, voice assistants, image recognition and many other applications.",
            },
          ],
          example: {
            title: "AI Applications",
            code: "Recommendation Systems\nVoice Assistants\nImage Recognition\nChatbots\nFraud Detection",
          },
          task: {
            title: "Find AI Around You",
            description: "Identify examples of AI systems that you interact with.",
            requirements: [
              "Find three AI applications",
              "Explain what each does",
              "Explain what data it might use",
              "Explain why AI is useful in each case",
            ],
          },
          keyTakeaways: [
            "AI is a field of computing.",
            "AI systems can identify patterns and perform tasks.",
            "AI is used in many industries.",
            "Data is important to many AI systems.",
          ],
          whyItMatters: "Understanding what AI actually is, and is not, protects you from both overhyping it and underestimating it. This distinction matters increasingly in interviews, where being able to explain AI clearly and honestly stands out.",
          commonMistakes: [
            "Treating every automated system as \"AI\" when it may just be a fixed set of rules with no learning involved.",
            "Assuming AI systems are neutral, when in reality they reflect the data and choices used to build them.",
          ],
        },
      },
      {
        id: 2,
        title: "Programming Fundamentals",
        description: "Build the programming foundation needed for AI.",
        lesson: {
          introduction: "Programming is an important foundation for working with AI because AI systems need software to process data and perform tasks.",
          whatYouWillLearn: [
            "Variables",
            "Conditions",
            "Loops",
            "Functions",
          ],
          sections: [
            {
              title: "Variables",
              content: "Variables store information that a program can use later.",
            },
            {
              title: "Functions",
              content: "Functions organize reusable pieces of program logic.",
            },
          ],
          example: {
            title: "Python Fundamentals",
            code: "name = \"Alex\"\nage = 20\n\nif age >= 18:\n    print(name + \" is an adult\")",
          },
          task: {
            title: "Create a Python Program",
            description: "Create a simple Python program using variables and conditions.",
            requirements: [
              "Create at least two variables",
              "Use an if statement",
              "Create a function",
              "Print a result",
            ],
          },
          keyTakeaways: [
            "Programming is important for AI development.",
            "Variables store information.",
            "Conditions control program decisions.",
            "Functions organize reusable logic.",
          ],
          whyItMatters: "You cannot work meaningfully with AI systems without being able to write and read code, since almost every AI tool, model or API is accessed through a programming language, most commonly Python.",
          commonMistakes: [
            "Skipping the fundamentals of variables, loops and functions to jump straight into AI libraries, then getting stuck on basic syntax errors.",
            "Copying code from tutorials without understanding what each line does, which makes debugging almost impossible later.",
          ],
        },
      },
      {
        id: 3,
        title: "Data & Machine Learning",
        description: "Understand how data is used to train machine learning systems.",
        lesson: {
          introduction: "Machine learning systems learn patterns from data. The quality and structure of the data can strongly affect the resulting model.",
          whatYouWillLearn: [
            "Training data",
            "Features",
            "Labels",
            "Machine learning basics",
          ],
          sections: [
            {
              title: "Training Data",
              content: "Training data is information provided to a machine learning system so that it can learn patterns.",
            },
            {
              title: "Features and Labels",
              content: "Features are inputs used by a model while labels represent the expected outputs in supervised learning.",
            },
          ],
          example: {
            title: "Simple Dataset",
            code: "Hours Studied | Exam Result\n2             | Fail\n5             | Pass\n7             | Pass\n1             | Fail",
          },
          task: {
            title: "Explore a Dataset",
            description: "Create a small dataset that could be used to predict an outcome.",
            requirements: [
              "Create at least five records",
              "Choose useful features",
              "Choose an output label",
              "Explain what the model could predict",
            ],
          },
          keyTakeaways: [
            "Machine learning uses data.",
            "Features are inputs to a model.",
            "Labels represent expected outputs.",
            "Good data is important for useful models.",
          ],
          whyItMatters: "Machine learning models are only as good as the data they are trained on. Understanding how data is collected, cleaned and prepared is often a bigger factor in a model's success than the choice of algorithm itself.",
          commonMistakes: [
            "Training and testing a model on the exact same data, which hides how it would actually perform on new data.",
            "Not checking a dataset for bias or imbalance before training a model on it.",
          ],
        },
      },
      {
        id: 4,
        title: "Machine Learning Fundamentals",
        description: "Learn the basic ideas behind machine learning.",
        lesson: {
          introduction: "Machine learning is a branch of AI where systems learn patterns from data rather than relying only on explicitly written rules.",
          whatYouWillLearn: [
            "Supervised learning",
            "Unsupervised learning",
            "Training and testing",
            "Model evaluation",
          ],
          sections: [
            {
              title: "Supervised Learning",
              content: "Supervised learning uses labeled examples to learn how inputs relate to known outputs.",
            },
            {
              title: "Unsupervised Learning",
              content: "Unsupervised learning looks for patterns or groups in data without predefined labels.",
            },
          ],
          example: {
            title: "Machine Learning Workflow",
            code: "Collect Data\n     ↓\nPrepare Data\n     ↓\nTrain Model\n     ↓\nTest Model\n     ↓\nEvaluate Results",
          },
          task: {
            title: "Design a Machine Learning Idea",
            description: "Describe a simple machine learning problem.",
            requirements: [
              "Define the problem",
              "Identify possible data",
              "Identify features",
              "Explain what the model should predict",
            ],
          },
          keyTakeaways: [
            "Machine learning learns patterns from data.",
            "Supervised learning uses labeled data.",
            "Unsupervised learning searches for patterns.",
            "Models should be evaluated using suitable data.",
          ],
          whyItMatters: "Knowing the core categories of machine learning, and which one fits a given problem, is what lets you reason about a new AI problem instead of only recognizing ones you have seen before.",
          commonMistakes: [
            "Choosing a model architecture before clearly defining what problem it is meant to solve.",
            "Judging a model only by accuracy, which can be misleading on imbalanced data where a naive guess would already score high.",
          ],
        },
      },
      {
        id: 5,
        title: "AI Applications",
        description: "Explore practical applications of artificial intelligence.",
        lesson: {
          introduction: "AI is used in many fields, from education and healthcare to finance, entertainment and software development.",
          whatYouWillLearn: [
            "AI in business",
            "AI in software",
            "AI in education",
            "AI in creative tools",
          ],
          sections: [
            {
              title: "AI in Software",
              content: "AI can help software applications understand text, classify information, make predictions and automate tasks.",
            },
            {
              title: "AI in Education",
              content: "AI-powered educational tools can help organize learning materials, provide explanations and support personalized learning.",
            },
          ],
          example: {
            title: "AI Application Categories",
            code: "Text → Chatbots\nImages → Recognition\nData → Predictions\nAudio → Speech Recognition\nRecommendations → Personalization",
          },
          task: {
            title: "Design an AI Application",
            description: "Come up with an idea for a useful AI-powered application.",
            requirements: [
              "Define the problem",
              "Explain how AI could help",
              "Identify the required data",
              "Describe the expected result",
            ],
          },
          keyTakeaways: [
            "AI can solve many different types of problems.",
            "Different AI applications use different types of data.",
            "AI should solve a meaningful problem.",
            "Understanding the problem is important before choosing technology.",
          ],
          whyItMatters: "Most people entering the AI field today will spend more time applying existing models through APIs than training models from scratch. Knowing how to integrate an AI service into a real product is a directly employable skill on its own.",
          commonMistakes: [
            "Sending user input directly to an AI service without any validation or limits, which can lead to unexpected cost or misuse.",
            "Not handling the case where an AI response is slow, empty, or unclear, which breaks the user experience.",
          ],
        },
      },
      {
        id: 6,
        title: "AI Projects",
        description: "Build projects that apply the concepts you've learned.",
        lesson: {
          introduction: "Projects allow you to combine programming, data and AI concepts into practical applications.",
          whatYouWillLearn: [
            "How to plan an AI project",
            "How to choose data",
            "How to build a prototype",
            "How to evaluate your idea",
          ],
          sections: [
            {
              title: "Planning an AI Project",
              content: "Start with a clear problem, identify the data needed and decide what the AI system should produce.",
            },
            {
              title: "Testing",
              content: "AI projects should be tested using appropriate examples to determine whether the system performs as expected.",
            },
          ],
          example: {
            title: "AI Project Structure",
            code: "Problem\n  ↓\nData\n  ↓\nProcessing\n  ↓\nAI Model\n  ↓\nPrediction\n  ↓\nUser Interface",
          },
          task: {
            title: "Build an AI Project",
            description: "Build a simple AI-powered application or prototype.",
            requirements: [
              "Define a problem",
              "Choose appropriate data",
              "Create the application",
              "Test the result",
              "Document what you learned",
            ],
          },
          keyTakeaways: [
            "Projects turn theory into practical skills.",
            "A clear problem should guide the project.",
            "Data is an important part of AI.",
            "Testing helps improve AI applications.",
          ],
          whyItMatters: "A working AI-powered project is far more convincing in an interview than a list of AI concepts you can define, because it proves you can actually integrate and reason about a real system, not just describe one.",
          commonMistakes: [
            "Building a project that only works with the exact input you tested, and never trying unexpected or messy input.",
            "Not being able to explain, in plain language, what your project's model or API is actually doing and why.",
          ],
        },
      },
      {
        id: 7,
        title: "Advanced: Evaluating and Trusting AI Systems",
        description: "The judgment skills that separate someone who uses AI tools from someone who understands them.",
        premium: true,
        lesson: {
          introduction: "Being able to call an AI API is a small part of working responsibly with AI. This lesson covers the judgment side: how to evaluate whether an AI system's output can be trusted, and how to think about its limitations before putting it in front of real users.",
          whatYouWillLearn: [
            "How to evaluate an AI model's output for reliability, not just correctness on the examples you tried",
            "Why AI systems can be confidently wrong, and how to design around that",
            "The basics of responsible use: bias, privacy and appropriate use cases",
            "How to explain an AI feature's limitations honestly to a non-technical stakeholder",
          ],
          sections: [
            {
              title: "Confident does not mean correct",
              content: "Many AI models, especially language models, present incorrect answers with the same confidence as correct ones. Testing a handful of examples that work is not the same as testing for reliability. Deliberately testing edge cases, unusual input, and questions the model is likely to get wrong is part of responsible use.",
            },
            {
              title: "Bias comes from data, not intent",
              content: "An AI model trained on biased or unrepresentative data will produce biased results, regardless of the intentions of whoever built it. Being able to ask \"what data was this likely trained on, and who might be underrepresented in it\" is a basic but important habit.",
            },
            {
              title: "Know when not to use AI",
              content: "Not every problem needs an AI-powered solution, and some decisions, especially ones affecting a real person's opportunities or rights, deserve more scrutiny than an automated system can currently provide. Recognizing this is a mark of maturity, not a limitation of your skills.",
            },
          ],
          task: {
            title: "Stress-test an AI feature",
            description: "Take the project you built in the AI Applications or AI Projects step and deliberately try to break it.",
            requirements: [
              "Test the feature with at least three unusual or unexpected inputs",
              "Note one case where the output was confidently wrong or misleading",
              "Write a short, honest description of this limitation, as you would explain it to a non-technical stakeholder",
              "Suggest one safeguard (a warning, a review step, a fallback) that would reduce the risk of this limitation",
            ],
          },
          keyTakeaways: [
            "AI systems can be confidently wrong; testing for reliability matters more than testing for a working demo.",
            "Bias in an AI system usually comes from its training data, not from deliberate intent.",
            "Knowing when not to rely on AI is as important as knowing how to use it.",
          ],
          whyItMatters: "As AI tools become part of more products, the ability to evaluate them critically, not just use them, is quickly becoming the differentiator between junior and senior practitioners in this field.",
          commonMistakes: [
            "Testing only the examples that are expected to work well, rather than trying to break the system.",
            "Presenting an AI feature to others without disclosing its known limitations.",
          ],
        },
      },
    ],
    projects: [
      9,
    ],
  },

  // =====================================================
  // 5. DIGITAL MARKETING
  // =====================================================
  {
    id: 5,
    name: "Digital Marketing",
    description: "Learn how businesses use digital platforms to reach and grow their audience.",
    level: "Beginner",
    category: "Business",
    roadmap: [
      {
        id: 1,
        title: "Marketing Fundamentals",
        description: "Understand the foundations of digital marketing.",
        lesson: {
          introduction: "Digital marketing involves using online channels and digital technologies to communicate with audiences and promote products, services or ideas.",
          whatYouWillLearn: [
            "What digital marketing is",
            "Target audiences",
            "Marketing goals",
            "Digital channels",
          ],
          sections: [
            {
              title: "What is Digital Marketing?",
              content: "Digital marketing uses online channels such as websites, search engines, email and social platforms to reach audiences.",
            },
            {
              title: "Target Audience",
              content: "A target audience is the group of people a campaign is designed to reach.",
            },
          ],
          example: {
            title: "Marketing Channels",
            code: "Website\nSocial Media\nEmail\nSearch Engines\nOnline Advertising",
          },
          task: {
            title: "Create a Marketing Plan",
            description: "Create a simple marketing plan for a fictional product.",
            requirements: [
              "Choose a product",
              "Define the target audience",
              "Choose three marketing channels",
              "Define one marketing goal",
            ],
          },
          keyTakeaways: [
            "Digital marketing uses online channels.",
            "A clear target audience is important.",
            "Marketing should have measurable goals.",
            "Different channels serve different purposes.",
          ],
          whyItMatters: "Marketing fundamentals, like knowing your audience and defining a clear goal, are what stop campaigns from being guesswork. Skipping this step is the most common reason marketing spend does not translate into results.",
          commonMistakes: [
            "Creating content or campaigns before clearly defining who the target audience actually is.",
            "Chasing every channel at once instead of focusing effort where the target audience actually spends time.",
          ],
        },
      },
      {
        id: 2,
        title: "Content Marketing",
        description: "Learn how useful content can attract and engage audiences.",
        lesson: {
          introduction: "Content marketing focuses on creating useful and relevant content that attracts and helps a target audience.",
          whatYouWillLearn: [
            "Types of content",
            "Content planning",
            "Audience needs",
            "Content consistency",
          ],
          sections: [
            {
              title: "Types of Content",
              content: "Content can include articles, videos, tutorials, graphics, social posts and other useful formats.",
            },
            {
              title: "Content Strategy",
              content: "A content strategy defines what content will be created, who it is for and what goals it should support.",
            },
          ],
          example: {
            title: "Content Plan",
            code: "Monday → Educational Post\nWednesday → Tutorial\nFriday → Product Story\nSunday → Weekly Summary",
          },
          task: {
            title: "Create a Content Calendar",
            description: "Create a one-week content calendar for a fictional brand.",
            requirements: [
              "Create at least five content ideas",
              "Define the audience",
              "Choose content formats",
              "Define the purpose of each post",
            ],
          },
          keyTakeaways: [
            "Useful content can attract audiences.",
            "Content should serve a clear purpose.",
            "Consistency matters.",
            "Know your audience before creating content.",
          ],
          whyItMatters: "Content is what actually earns attention and trust over time, rather than renting it through ads. Being able to plan and produce consistent content is one of the most requested skills in junior marketing and social media roles.",
          commonMistakes: [
            "Publishing content with no clear goal or call to action, so even good content does not lead anywhere.",
            "Posting inconsistently instead of working from a simple content calendar, which makes it hard to build an audience.",
          ],
        },
      },
      {
        id: 3,
        title: "Social Media Marketing",
        description: "Learn how brands use social platforms to reach people.",
        lesson: {
          introduction: "Social media marketing involves using social platforms to communicate with audiences, build awareness and support business goals.",
          whatYouWillLearn: [
            "Social media strategy",
            "Audience engagement",
            "Content formats",
            "Measuring performance",
          ],
          sections: [
            {
              title: "Choosing Platforms",
              content: "Different platforms attract different audiences and support different content formats.",
            },
            {
              title: "Engagement",
              content: "Engagement includes meaningful interactions such as comments, shares, saves and other responses to content.",
            },
          ],
          example: {
            title: "Social Media Strategy",
            code: "Goal\n ↓\nAudience\n ↓\nPlatform\n ↓\nContent\n ↓\nPublish\n ↓\nMeasure",
          },
          task: {
            title: "Create a Social Strategy",
            description: "Create a basic social media strategy for a fictional business.",
            requirements: [
              "Choose a business",
              "Choose two platforms",
              "Create five content ideas",
              "Define how performance will be measured",
            ],
          },
          keyTakeaways: [
            "Social media requires a strategy.",
            "Different platforms have different audiences.",
            "Engagement can provide useful feedback.",
            "Performance should be measured.",
          ],
          whyItMatters: "Each social platform has a different audience, format and algorithm, so treating them all the same wastes effort. Understanding platform-specific strategy is what separates someone managing an account from someone genuinely growing one.",
          commonMistakes: [
            "Reposting the same content unchanged across every platform instead of adapting format and tone to each one.",
            "Focusing entirely on follower count instead of engagement and actual business outcomes.",
          ],
        },
      },
      {
        id: 4,
        title: "Search Engine Optimization",
        description: "Understand how websites can become easier to discover online.",
        lesson: {
          introduction: "Search Engine Optimization, or SEO, involves improving websites and content so that search engines can understand and discover them more effectively.",
          whatYouWillLearn: [
            "What SEO is",
            "Keywords",
            "Page titles",
            "Quality content",
          ],
          sections: [
            {
              title: "What is SEO?",
              content: "SEO involves improving website structure and content so search engines can better understand the pages.",
            },
            {
              title: "Keywords",
              content: "Keywords are words or phrases that describe what people may search for when looking for information.",
            },
          ],
          example: {
            title: "Basic SEO Structure",
            code: "Useful Content\n      +\nClear Title\n      +\nGood Headings\n      +\nRelevant Keywords\n      +\nGood User Experience",
          },
          task: {
            title: "Improve a Webpage for SEO",
            description: "Choose a webpage and identify improvements that could make it easier to understand and discover.",
            requirements: [
              "Create a clear page title",
              "Add useful headings",
              "Identify relevant keywords",
              "Improve the page content",
            ],
          },
          keyTakeaways: [
            "SEO helps search engines understand webpages.",
            "Useful content is important.",
            "Clear headings improve structure.",
            "Keywords should naturally match the content.",
          ],
          whyItMatters: "Most people find products and information through search, not by directly visiting a website, which is why SEO remains one of the highest-leverage marketing skills. It is also one of the more technical marketing skills, which makes it stand out on a resume.",
          commonMistakes: [
            "Stuffing keywords unnaturally into content instead of writing for people first and search engines second.",
            "Ignoring page speed and mobile usability, which affect search ranking as much as the content itself.",
          ],
        },
      },
      {
        id: 5,
        title: "Analytics",
        description: "Learn how to measure and understand marketing performance.",
        lesson: {
          introduction: "Marketing analytics involves collecting and interpreting data to understand how campaigns perform.",
          whatYouWillLearn: [
            "Marketing metrics",
            "Traffic",
            "Engagement",
            "Conversion",
          ],
          sections: [
            {
              title: "Metrics",
              content: "Metrics provide numerical information about how content, campaigns or websites are performing.",
            },
            {
              title: "Conversions",
              content: "A conversion occurs when a user completes a desired action, such as signing up, purchasing or submitting a form.",
            },
          ],
          example: {
            title: "Simple Marketing Metrics",
            code: "Visitors: 1,000\nSignups: 100\nConversions: 25\n\nConversion Rate = 2.5%",
          },
          task: {
            title: "Analyze Campaign Data",
            description: "Analyze a fictional marketing campaign and identify its performance.",
            requirements: [
              "Calculate a conversion rate",
              "Identify the strongest metric",
              "Identify one weak area",
              "Suggest one improvement",
            ],
          },
          keyTakeaways: [
            "Analytics helps measure marketing performance.",
            "Metrics provide evidence for decisions.",
            "Conversions measure desired actions.",
            "Data can guide marketing improvements.",
          ],
          whyItMatters: "Without analytics, marketing decisions are just opinions. Knowing how to read and interpret campaign data is what lets you prove a campaign's value and improve the next one, which is exactly what employers want to see.",
          commonMistakes: [
            "Tracking vanity metrics like impressions while ignoring metrics tied to actual business goals, like conversions.",
            "Making changes to a campaign without waiting for enough data to draw a reliable conclusion.",
          ],
        },
      },
      {
        id: 6,
        title: "Marketing Projects",
        description: "Apply your knowledge to practical marketing campaigns.",
        lesson: {
          introduction: "A complete marketing project allows you to combine audience research, content, social media, SEO and analytics.",
          whatYouWillLearn: [
            "Campaign planning",
            "Content strategy",
            "Marketing measurement",
            "Campaign improvement",
          ],
          sections: [
            {
              title: "Campaign Planning",
              content: "A campaign should have a clear audience, objective, message, channels and measurement strategy.",
            },
            {
              title: "Improving Campaigns",
              content: "Analytics can show what is working and what needs to be changed.",
            },
          ],
          example: {
            title: "Marketing Campaign",
            code: "Goal\n ↓\nAudience\n ↓\nMessage\n ↓\nContent\n ↓\nChannels\n ↓\nAnalytics",
          },
          task: {
            title: "Create a Marketing Campaign",
            description: "Plan a complete digital marketing campaign for a fictional product.",
            requirements: [
              "Define the target audience",
              "Define the campaign goal",
              "Create content ideas",
              "Choose marketing channels",
              "Define success metrics",
            ],
          },
          keyTakeaways: [
            "Marketing campaigns need clear goals.",
            "Audience research guides marketing decisions.",
            "Content should support the campaign goal.",
            "Analytics helps improve campaigns.",
          ],
          whyItMatters: "A documented campaign, with a clear goal, execution and measured result, is what turns marketing knowledge into something you can present to a client or employer as proof of capability.",
          commonMistakes: [
            "Presenting a campaign's activity (posts made, ads run) without showing what result it actually produced.",
            "Skipping a reflection on what did not work, which is often more convincing to an employer than only showing wins.",
          ],
        },
      },
      {
        id: 7,
        title: "Advanced: Building a Repeatable Marketing Strategy",
        description: "Move from one-off campaigns to a strategy that keeps working after the first result.",
        premium: true,
        lesson: {
          introduction: "A single successful post or campaign can be luck. A repeatable strategy is a skill. This lesson covers how to turn a good result into a system you can run again, which is what separates a marketing hobbyist from someone who can be trusted to run an account or a budget.",
          whatYouWillLearn: [
            "How to turn a single successful campaign into a repeatable process",
            "How to set realistic goals and know what a good result actually looks like",
            "How to manage a small budget across channels responsibly",
            "How to report results in a way a business owner or manager will value",
          ],
          sections: [
            {
              title: "From lucky win to repeatable system",
              content: "After a campaign works, the important question is why it worked: was it the timing, the message, the audience, or the format? Writing this down, and testing it once more before assuming it is a reliable pattern, is what turns one good result into a strategy.",
            },
            {
              title: "Setting goals that mean something",
              content: "A goal like \"get more engagement\" cannot really succeed or fail. A goal like \"grow saves on our product posts by 20% over one month\" can be measured and defended. Learning to set goals like the second one is a small habit with an outsized effect on how credible your work looks.",
            },
            {
              title: "Reporting results the way a business owner thinks",
              content: "Most small business owners and managers care about outcomes: sales, leads, sign-ups, not raw engagement numbers. Framing a report around the outcome the business actually cares about, even when it is a modest one, builds far more trust than a report full of vanity metrics.",
            },
          ],
          task: {
            title: "Turn a past campaign into a repeatable playbook",
            description: "Take the campaign from your Marketing Projects roadmap step and document it as a process someone else could follow.",
            requirements: [
              "Write down the specific, measurable goal the campaign was trying to reach",
              "List the steps taken in order, clearly enough that someone else could repeat them",
              "State the actual result against the goal, honestly, even if it fell short",
              "Note one specific change you would make before running it again",
            ],
          },
          keyTakeaways: [
            "A repeatable process, not a single lucky result, is what makes a marketer valuable.",
            "Specific, measurable goals are what make a campaign's success or failure meaningful.",
            "Reporting should be framed around outcomes a business owner actually cares about.",
          ],
          whyItMatters: "Anyone can point to one post that did well. Being able to explain why, and repeat it deliberately, is what clients and employers are actually paying for when they hire a marketer.",
          commonMistakes: [
            "Assuming a single good result proves a strategy works, without testing it again.",
            "Reporting activity (posts made, hours spent) instead of the business outcome those activities were meant to produce.",
          ],
        },
      },
    ],
    projects: [],
  },

  // =====================================================
  // 6. VIDEO EDITING
  // =====================================================
  {
    id: 6,
    name: "Video Editing",
    description: "Learn how to turn raw footage into engaging and professional videos.",
    level: "Beginner",
    category: "Creative",
    roadmap: [
      {
        id: 1,
        title: "Editing Fundamentals",
        description: "Understand the basic concepts of video editing.",
        lesson: {
          introduction: "Video editing is the process of arranging and modifying footage to create a finished video that communicates a story or message.",
          whatYouWillLearn: [
            "Video editing basics",
            "Timeline editing",
            "Clips",
            "Basic workflow",
          ],
          sections: [
            {
              title: "The Timeline",
              content: "The timeline is where video and audio clips are arranged in sequence to create the final video.",
            },
            {
              title: "Editing Workflow",
              content: "A basic workflow includes importing footage, organizing clips, editing, adding audio and exporting the final video.",
            },
          ],
          example: {
            title: "Basic Editing Workflow",
            code: "Import Footage\n      ↓\nOrganize Clips\n      ↓\nEdit Timeline\n      ↓\nAdd Audio\n      ↓\nExport",
          },
          task: {
            title: "Create a Short Video",
            description: "Create a short video using several clips.",
            requirements: [
              "Import at least three clips",
              "Arrange the clips",
              "Remove unnecessary sections",
              "Export the final video",
            ],
          },
          keyTakeaways: [
            "Editing turns raw footage into a finished video.",
            "The timeline is central to editing.",
            "Organization makes editing easier.",
            "A good workflow saves time.",
          ],
          whyItMatters: "Understanding pacing and story structure before touching software is what separates an editor from someone who just knows which buttons to press. This thinking is what clients are actually paying for.",
          commonMistakes: [
            "Editing footage before deciding on the story or message the final video needs to communicate.",
            "Keeping every good shot in the timeline instead of cutting anything that does not serve the story.",
          ],
        },
      },
      {
        id: 2,
        title: "Cuts & Transitions",
        description: "Learn how to structure footage and create smooth transitions.",
        lesson: {
          introduction: "Cuts and transitions determine how one video clip moves to another and help control the rhythm of a video.",
          whatYouWillLearn: [
            "Basic cuts",
            "Trimming",
            "Transitions",
            "Video pacing",
          ],
          sections: [
            {
              title: "Cuts",
              content: "A cut changes from one clip to another. Good cuts remove unnecessary footage and keep the story moving.",
            },
            {
              title: "Transitions",
              content: "Transitions create visual connections between clips. They should be used when they support the purpose of the edit.",
            },
          ],
          example: {
            title: "Simple Timeline",
            code: "[Clip 1] → [Cut] → [Clip 2]\n             ↓\n          [Transition]\n             ↓\n          [Clip 3]",
          },
          task: {
            title: "Edit a Sequence",
            description: "Create a short sequence using cuts and a few appropriate transitions.",
            requirements: [
              "Use at least four clips",
              "Trim unnecessary footage",
              "Use cuts effectively",
              "Add at least one transition",
            ],
          },
          keyTakeaways: [
            "Cuts control the flow of a video.",
            "Trimming removes unnecessary content.",
            "Transitions should have a purpose.",
            "Good pacing keeps viewers engaged.",
          ],
          whyItMatters: "Cuts and transitions are what most viewers notice, consciously or not, before anything else in an edit. A rough cut can make even great footage feel unprofessional, while a clean one can elevate average footage.",
          commonMistakes: [
            "Overusing flashy transitions instead of relying on simple, well-timed cuts most of the time.",
            "Cutting on a jarring moment instead of on action or a natural beat in the footage or audio.",
          ],
        },
      },
      {
        id: 3,
        title: "Audio",
        description: "Learn how sound affects the quality of a video.",
        lesson: {
          introduction: "Audio is an important part of video editing. Clear dialogue, balanced music and appropriate sound effects can greatly improve a video.",
          whatYouWillLearn: [
            "Dialogue",
            "Background music",
            "Sound effects",
            "Audio levels",
          ],
          sections: [
            {
              title: "Dialogue",
              content: "Dialogue should be clear enough for viewers to understand without being overwhelmed by background sounds.",
            },
            {
              title: "Background Music",
              content: "Background music can support the mood of a video but should not distract from important dialogue.",
            },
          ],
          example: {
            title: "Audio Layers",
            code: "Dialogue\n   +\nMusic\n   +\nSound Effects\n   =\nFinished Audio",
          },
          task: {
            title: "Improve Video Audio",
            description: "Take a short video and improve its audio balance.",
            requirements: [
              "Add background music",
              "Adjust audio levels",
              "Add one suitable sound effect",
              "Make sure dialogue remains clear",
            ],
          },
          keyTakeaways: [
            "Audio strongly affects video quality.",
            "Dialogue should remain clear.",
            "Music should support the video.",
            "Balanced audio creates a better viewing experience.",
          ],
          whyItMatters: "Viewers tolerate mediocre visuals far more than they tolerate bad audio; poor sound is one of the fastest ways to lose an audience. Solid audio editing is often what separates amateur and professional-feeling video.",
          commonMistakes: [
            "Not normalizing audio levels across clips, causing jarring volume jumps between cuts.",
            "Leaving in background noise or hum that could have been reduced or removed during editing.",
          ],
        },
      },
      {
        id: 4,
        title: "Color",
        description: "Learn the fundamentals of improving the visual appearance of footage.",
        lesson: {
          introduction: "Color correction and color grading can improve the visual consistency and mood of video footage.",
          whatYouWillLearn: [
            "Brightness",
            "Contrast",
            "Color balance",
            "Visual consistency",
          ],
          sections: [
            {
              title: "Color Correction",
              content: "Color correction focuses on making footage look balanced and consistent.",
            },
            {
              title: "Color Grading",
              content: "Color grading adds a particular visual mood or style to footage.",
            },
          ],
          example: {
            title: "Color Workflow",
            code: "Exposure\n   ↓\nWhite Balance\n   ↓\nContrast\n   ↓\nColor Style",
          },
          task: {
            title: "Correct a Video",
            description: "Improve the visual consistency of a short video.",
            requirements: [
              "Adjust brightness",
              "Adjust contrast",
              "Correct obvious color problems",
              "Keep clips visually consistent",
            ],
          },
          keyTakeaways: [
            "Color correction improves balance.",
            "Color grading creates visual style.",
            "Consistency is important.",
            "Small adjustments can improve footage.",
          ],
          whyItMatters: "Color sets the mood of a video and creates consistency across shots taken at different times or with different cameras, which is what makes a video feel intentionally made rather than thrown together.",
          commonMistakes: [
            "Applying a strong stylistic color grade before correcting basic exposure and white balance first.",
            "Grading each clip independently without keeping a consistent look across the whole video.",
          ],
        },
      },
            {
        id: 5,
        title: "Motion & Effects",
        description: "Explore basic motion graphics and visual effects.",
        lesson: {
          introduction:
            "Motion and effects can make videos more informative and visually engaging when they are used appropriately.",

          whatYouWillLearn: [
            "Text animation",
            "Basic motion",
            "Keyframes",
            "Simple visual effects",
          ],

          sections: [
            {
              title: "Motion",
              content:
                "Motion can be used to animate text, images and other visual elements.",
            },
            {
              title: "Keyframes",
              content:
                "Keyframes allow editors to define how an element changes over time.",
            },
          ],

          example: {
            title: "Simple Motion",
            code:
              "Start Position\n" +
              "      ↓\n" +
              "    Keyframe\n" +
              "      ↓\n" +
              "End Position\n\n" +
              "Element moves between positions.",
          },

          task: {
            title: "Create a Motion Graphic",
            description:
              "Create a short title animation for a video.",
            requirements: [
              "Add text",
              "Animate the text",
              "Use at least two keyframes",
              "Keep the animation readable",
            ],
          },

          keyTakeaways: [
            "Motion can guide attention.",
            "Keyframes control changes over time.",
            "Effects should support the content.",
            "Simple effects are often more effective than excessive ones.",
          ],

          whyItMatters:
            "Motion graphics and effects are what modern audiences expect for titles, callouts and transitions, and being comfortable with them expands the type of client work you can take on, from simple cuts to full branded content.",

          commonMistakes: [
            "Adding effects because they are available rather than because they support the video's message.",
            "Using too many different animation styles in one video, which reads as inconsistent rather than polished.",
          ],
        },
      },

      {
        id: 6,
        title: "Video Projects",
        description: "Apply your editing skills to practical projects.",
        lesson: {
          introduction:
            "A complete video project combines editing, audio, color, motion and storytelling into one finished piece.",

          whatYouWillLearn: [
            "Planning a video",
            "Organizing footage",
            "Editing a complete sequence",
            "Exporting the final project",
          ],

          sections: [
            {
              title: "Planning",
              content:
                "Before editing, decide the purpose of the video, organize your footage and think about the story you want to communicate.",
            },
            {
              title: "Final Production",
              content:
                "A finished video should have clear pacing, understandable audio, consistent visuals and a suitable export format.",
            },
          ],

          example: {
            title: "Complete Video Workflow",
            code:
              "Plan\n" +
              " ↓\n" +
              "Record\n" +
              " ↓\n" +
              "Organize\n" +
              " ↓\n" +
              "Edit\n" +
              " ↓\n" +
              "Audio\n" +
              " ↓\n" +
              "Color\n" +
              " ↓\n" +
              "Effects\n" +
              " ↓\n" +
              "Export",
          },

          task: {
            title: "Create a Complete Video",
            description:
              "Create a finished video using the editing skills from this roadmap.",
            requirements: [
              "Plan the video",
              "Organize your footage",
              "Edit the timeline",
              "Add and balance audio",
              "Improve the color",
              "Add appropriate motion or effects",
              "Export the final video",
            ],
          },

          keyTakeaways: [
            "Projects combine individual editing skills.",
            "Planning makes editing easier.",
            "Audio and visuals should work together.",
            "Finished projects demonstrate practical ability.",
          ],

          whyItMatters:
            "A finished, polished video in a portfolio is worth more than any list of software skills, because it is the only thing that actually proves you can take raw footage to a finished, watchable result.",

          commonMistakes: [
            "Submitting a portfolio piece that is technically correct but has no clear story or hook for the viewer.",
            "Exporting at the wrong resolution or format for where the video will actually be watched.",
          ],
        },
      },

      {
        id: 7,
        title: "Advanced: Editing With Intent and Client Feedback",
        description:
          "The craft and communication skills that turn a hobby editor into a hireable one.",
        premium: true,

        lesson: {
          introduction:
            "Software skill alone does not make someone a working editor. This lesson focuses on two things most tutorials skip: editing with a deliberate intent behind every choice, and handling client feedback professionally, which is a huge part of freelance and studio editing work.",

          whatYouWillLearn: [
            "How to justify every major edit choice with a reason, not just instinct",
            "How to interpret vague client feedback and turn it into specific changes",
            "How to structure a project so revisions do not require redoing finished work",
            "How to build a short showreel that gets you hired",
          ],

          sections: [
            {
              title: "Every cut should have a reason",
              content:
                'Experienced editors can explain why a specific cut, transition or piece of music was chosen. Practicing this discipline, asking "why did I make this choice" for your own edits, sharpens your instincts faster than simply making more edits without reflection.',
            },

            {
              title: "Translating vague feedback",
              content:
                '"Make it feel more exciting" is common client feedback and genuinely unhelpful on its own. A professional editor translates this into specific options: faster pacing, more dynamic music, tighter cuts on action, and proposes them rather than guessing once and hoping.',
            },

            {
              title: "Structuring a project for revisions",
              content:
                "Keeping raw footage, selects, and a clearly organized timeline means a revision request does not mean starting over. This organizational habit is invisible in the final video but is exactly what makes an editor efficient enough to work with repeat clients.",
            },
          ],

          task: {
            title: "Re-edit with intent, then request feedback",
            description:
              "Take your Video Projects roadmap submission and revise it with a deliberate rationale for each major change.",
            requirements: [
              "List three specific edit decisions and the reason behind each one",
              "Ask someone to give feedback on the video, then translate at least one vague comment into a specific, actionable change",
              "Make that change without needing to redo unrelated parts of the edit",
              "Write two sentences on how you organized the project so this revision was manageable",
            ],
          },

          keyTakeaways: [
            "Being able to explain why you made an edit is as valuable as the edit itself.",
            "Translating vague feedback into specific options is a core professional skill.",
            "A well-organized project makes revisions fast instead of painful.",
          ],

          whyItMatters:
            "Almost all paid editing work involves a client, a manager or a creative director giving feedback. Editors who handle that process smoothly get repeat work; editors who only focus on the software skill often do not.",

          commonMistakes: [
            "Making an edit change and hoping it satisfies feedback, rather than confirming the interpretation first.",
            "Disorganized project files that make even small revisions time-consuming.",
          ],
        },
      },
    ],
  
    projects: [],
  },
];

// =====================================================
// PORTFOLIO PROJECTS
// =====================================================

const projects = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "Build a simple personal website where you introduce yourself and showcase your skills.",
    difficulty: "Beginner",
    category: "Web Development",
    skills: ["HTML", "CSS"],
    checklist: [
      "Plan the sections your portfolio needs (about, skills, contact)",
      "Build the HTML structure for each section",
      "Style the page with CSS, including spacing and colors",
      "Make sure the layout works on a phone-sized screen",
      "Publish or export the finished files",
    ],
  },

  {
    id: 2,
    title: "Responsive Landing Page",
    description:
      "Create a professional landing page that works beautifully on both desktop and mobile devices.",
    difficulty: "Beginner",
    category: "Web Development",
    skills: ["HTML", "CSS", "Responsive Design"],
    checklist: [
      "Sketch the layout for desktop and mobile",
      "Build the HTML structure",
      "Add responsive CSS using flexbox or grid",
      "Test the page at three different screen widths",
      "Fix any overlapping or broken elements",
    ],
  },

  {
    id: 3,
    title: "JavaScript To-Do App",
    description:
      "Build a task management application where users can create, complete, and delete tasks.",
    difficulty: "Beginner",
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
    checklist: [
      "Build the HTML structure for the task list",
      "Style the list and input field with CSS",
      "Write JavaScript to add a new task",
      "Write JavaScript to mark a task complete and delete it",
      "Test adding, completing and deleting several tasks",
    ],
  },

  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Build an application that retrieves weather information from an API and displays it clearly.",
    difficulty: "Intermediate",
    category: "Web Development",
    skills: ["React", "API", "JavaScript"],
    checklist: [
      "Choose and register for a weather API",
      "Build the input form for a city name",
      "Fetch data from the API using JavaScript or React",
      "Display the returned weather information clearly",
      "Handle a city that is not found without breaking the page",
    ],
  },

  {
    id: 5,
    title: "Student Result Portal",
    description:
      "Create a system where students can log in and view their academic results.",
    difficulty: "Intermediate",
    category: "Web Development",
    skills: ["React", "Node.js", "Express", "MySQL"],
    checklist: [
      "Design the database structure for students and results",
      "Build the backend API with Node.js and Express",
      "Connect the backend to a MySQL database",
      "Build the React frontend for login and viewing results",
      "Test the full flow from login to viewing a result",
    ],
    premium: true,
  },

  {
    id: 6,
    title: "Mobile App Redesign",
    description:
      "Choose an existing mobile application and redesign its user experience and interface.",
    difficulty: "Beginner",
    category: "UI/UX Design",
    skills: ["UX Research", "Wireframing", "UI Design"],
    checklist: [
      "Choose an app and identify three usability problems",
      "Sketch a wireframe for the improved flow",
      "Design the improved screens",
      "Write a short explanation of what changed and why",
      "Compare the before and after side by side",
    ],
  },

  {
    id: 7,
    title: "Business Dashboard",
    description:
      "Design a dashboard that presents important business information in a clear and useful way.",
    difficulty: "Intermediate",
    category: "UI/UX Design",
    skills: ["UI Design", "UX", "Data Visualization"],
    checklist: [
      "List the key metrics the dashboard needs to show",
      "Sketch a wireframe of the layout",
      "Design the visual version with a consistent style",
      "Add sample charts or data visualizations",
      "Review the design for clarity and visual hierarchy",
    ],
  },

  {
    id: 8,
    title: "Sales Data Analysis",
    description:
      "Analyze a sales dataset and identify trends, patterns, and useful business insights.",
    difficulty: "Intermediate",
    category: "Data Analysis",
    skills: ["Excel", "Statistics", "Data Visualization"],
    checklist: [
      "Find or create a sales dataset",
      "Clean the data and remove errors or duplicates",
      "Calculate key statistics such as totals and averages",
      "Build at least two charts from the data",
      "Write three insights the data reveals",
    ],
  },

  {
    id: 9,
    title: "AI Chat Assistant",
    description:
      "Build a simple conversational application that demonstrates how AI can be integrated into software.",
    difficulty: "Advanced",
    category: "Artificial Intelligence",
    skills: ["JavaScript", "APIs", "AI"],
    checklist: [
      "Define what the assistant should help users do",
      "Set up the interface for sending and receiving messages",
      "Connect the interface to an AI or language API",
      "Handle loading and error states in the conversation",
      "Test the assistant with several different questions",
    ],
    premium: true,
  },
];

// =====================================================
// OPPORTUNITIES
// =====================================================

const opportunities = [
  {
    id: 1,
    title: "Frontend Development Intern",
    organization: "TechHub Lagos",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Internship",
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
    description:
      "Work with a small product team building customer-facing web features. Good fit for someone who has completed the Web Development roadmap and a portfolio project.",
    postedAt: "2026-08-01",
    applyUrl: null,
  },

  {
    id: 2,
    title: "Junior UI/UX Designer",
    organization: "Northbridge Studio",
    location: "Abuja, Nigeria (Remote)",
    type: "Entry-level",
    category: "UI/UX Design",
    skills: ["Wireframing", "UI Design", "Prototyping"],
    description:
      "Support the design team with wireframes, mockups and prototypes for mobile and web products. A portfolio with at least one complete case study is required.",
    postedAt: "2026-07-20",
    applyUrl: null,
  },

  {
    id: 3,
    title: "Data Analysis Trainee Program",
    organization: "Insight Analytics NG",
    location: "Port Harcourt, Nigeria",
    type: "Traineeship",
    category: "Data Analysis",
    skills: ["Spreadsheets", "SQL", "Data Visualization"],
    description:
      "A structured six-month program for people who can clean, analyze and visualize a dataset and explain what it shows.",
    postedAt: "2026-08-10",
    applyUrl: null,
  },

  {
    id: 4,
    title: "React Developer (Junior)",
    organization: "Vertex Software",
    location: "Remote (Nigeria-based)",
    type: "Full-time",
    category: "Web Development",
    skills: ["React", "JavaScript", "APIs"],
    description:
      "Join a small engineering team shipping a React application. Comfortable with components, props, state and consuming REST APIs.",
    postedAt: "2026-08-15",
    applyUrl: null,
  },

  {
    id: 5,
    title: "Social Media & Content Intern",
    organization: "Bloom Marketing Collective",
    location: "Lagos, Nigeria",
    type: "Internship",
    category: "Digital Marketing",
    skills: ["Content Marketing", "Social Media Marketing"],
    description:
      "Plan and create content calendars, draft posts and track engagement across two client accounts.",
    postedAt: "2026-07-28",
    applyUrl: null,
  },

  {
    id: 6,
    title: "AI Product Support Assistant",
    organization: "Cortex Labs",
    location: "Remote",
    type: "Part-time",
    category: "Artificial Intelligence",
    skills: ["AI", "APIs", "JavaScript"],
    description:
      "Help test and document an AI-assisted product, write example prompts and report issues to the engineering team.",
    postedAt: "2026-08-05",
    applyUrl: null,
  },

  {
    id: 7,
    title: "Video Editor - Short-form Content",
    organization: "Reel House Studios",
    location: "Ibadan, Nigeria",
    type: "Freelance",
    category: "Video Editing",
    skills: ["Cuts & Transitions", "Audio", "Color"],
    description:
      "Edit short-form video content for two brand accounts on a weekly basis. A short reel or sample edit is required to apply.",
    postedAt: "2026-08-12",
    applyUrl: null,
  },

  {
    id: 8,
    title: "Backend Engineering Intern",
    organization: "Fintrust Systems",
    location: "Lagos, Nigeria (On-site)",
    type: "Internship",
    category: "Web Development",
    skills: ["Node.js & Express", "Databases", "APIs"],
    description:
      "Build and maintain API endpoints for an internal tool, working directly with a senior backend engineer.",
    postedAt: "2026-08-18",
    applyUrl: null,
  },
];

// =====================================================
// EXPORTS
// =====================================================

export { skills, projects, opportunities };

