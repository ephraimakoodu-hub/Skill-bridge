// "Go Deeper" content - the premium layer shown to subscribed users on
// top of the free lesson. Each entry adds context a free tutorial
// usually skips: how professionals actually reason about the topic,
// specific mistakes that get people rejected at interview/review stage,
// and a harder challenge than the free task.
//
// Keyed by skillId -> stepId.

const deepDives = {
  // ================= 1: WEB DEVELOPMENT =================
  1: {
    1: {
      heading: "Go deeper: how browsers actually read your HTML",
      paragraph:
        "A browser reads your HTML top to bottom and builds something called the DOM (Document Object Model) - a tree structure in memory. Every tag becomes a node in that tree, and everything else (CSS, JavaScript, screen readers) works against that tree, not against your original file. This is why tag order and nesting matter more than most beginners realize: a heading that is structurally wrong will confuse a screen reader even if it looks perfect visually, and a form field without a matching label will fail an accessibility audit even though it renders fine.",
      proTips: [
        "Use semantic tags (nav, main, section, article, footer) instead of divs for everything - it costs nothing and it is the difference between amateur and professional markup.",
        "Validate your HTML with the W3C validator occasionally. Real production teams catch structural bugs this way before they become CSS bugs.",
        "Every image needs meaningful alt text. 'Photo' is not alt text. Describe what the image communicates.",
      ],
      challenge:
        "Rebuild your practice page using only semantic tags (header, nav, main, section, footer) and zero divs. Then check it with a screen reader or browser accessibility inspector.",
    },
    2: {
      heading: "Go deeper: the cascade is not optional",
      paragraph:
        "CSS stands for Cascading Style Sheets, and the cascade - the rules for which style wins when two rules conflict - is the single most misunderstood part of CSS for beginners. Specificity, source order and the !important flag all interact, and if you do not understand the order, you will end up fighting your own stylesheet instead of writing it. Professionals keep specificity low on purpose: flat class selectors, minimal nesting, almost no !important, so the next person (often future-you) can predict what a rule will do.",
      proTips: [
        "Prefer classes over IDs for styling. IDs have high specificity and make later overrides painful.",
        "Learn the box model (content, padding, border, margin) by inspecting real elements in devtools, not just reading about it.",
        "If you reach for !important, it usually means a specificity problem upstream - fix that instead.",
      ],
      challenge:
        "Take a page you have styled and rewrite it using only flat, single-class selectors (no nested selectors, no IDs, no !important). Confirm it still looks identical.",
    },
    3: {
      heading: "Go deeper: JavaScript's execution model",
      paragraph:
        "JavaScript runs on a single thread with something called an event loop. This is why a long-running loop can freeze your entire page, and why asynchronous code (things like fetch calls) does not run immediately - it gets queued and handled once the current code finishes. Understanding this is what separates someone who can write working code from someone who can explain why their code behaved the way it did, which is exactly what gets tested in a technical interview.",
      proTips: [
        "Learn the difference between let, const and var, and default to const unless a value needs to change.",
        "Practice reading error messages fully instead of only the first line - the line number and stack trace usually tell you exactly where to look.",
        "Console.log liberally while learning. Professionals do this too; the difference is knowing what to remove before shipping.",
      ],
      challenge:
        "Add input validation to your to-do list task: reject empty tasks, trim whitespace, and show a message instead of silently failing.",
    },
    4: {
      heading: "Go deeper: writing commit history someone else can read",
      paragraph:
        "Git is not just a backup system - your commit history is documentation. A hiring manager or teammate looking at your repository will judge your commit messages almost as much as your code: 'fixed stuff' tells them nothing, while 'fix: prevent form submission when email field is empty' tells them exactly what changed and why. Branches matter for the same reason: working directly on main with no branches is a common beginner tell.",
      proTips: [
        "Write commit messages in the imperative mood: 'add', 'fix', 'refactor' - not 'added' or 'fixes'.",
        "Create a new branch for each feature or fix, even in personal projects, to build the habit early.",
        "Use a .gitignore file from the start so node_modules and environment files never get committed by accident.",
      ],
      challenge:
        "Take your last three commits and rewrite their messages as if a stranger needs to understand what changed without opening the diff.",
    },
    5: {
      heading: "Go deeper: why React thinks in components, not pages",
      paragraph:
        "The hardest mental shift moving from plain JavaScript to React is thinking in components: small, reusable pieces of UI that own their own state and re-render when that state changes. Most beginner React bugs come from either mutating state directly instead of using the setter function, or from putting state too high or too low in the component tree. Professionals plan component structure before writing code - sketching which piece of UI owns which piece of data - rather than writing one giant component and untangling it later.",
      proTips: [
        "Never mutate state directly (state.push(x)) - always use the setter with a new array or object.",
        "If two components need the same data, that data usually belongs in their shared parent, not duplicated in both.",
        "Keep components small enough that you can describe what one does in a single sentence.",
      ],
      challenge:
        "Refactor your to-do list into at least three components (TaskList, TaskItem, AddTaskForm) that pass data through props instead of one large component.",
    },
    6: {
      heading: "Go deeper: designing for a request that can fail",
      paragraph:
        "Every real API call can fail: the network can drop, the server can be down, the response can be malformed. Tutorials often only show the happy path where the request succeeds, but employers specifically look for handling of loading states and errors, because that is what separates a demo from a shippable feature. Think in three states for every fetch: loading, success, and error - and design UI for all three, not just the one that looks good in a screenshot.",
      proTips: [
        "Always wrap fetch calls in try/catch (or handle .catch on promises) - an unhandled rejection can silently break your UI.",
        "Show the user something while data is loading. A blank screen for two seconds looks broken even when it is not.",
        "Read the actual API documentation for rate limits and required headers before assuming a request will 'just work'.",
      ],
      challenge:
        "Take your weather app project and deliberately break the API key to trigger an error. Make sure the UI shows a clear, non-technical error message instead of crashing.",
    },
    7: {
      heading: "Go deeper: what a route actually promises",
      paragraph:
        "A backend route is a contract: given this input, you will get this output, this status code, in this shape. Weak backend code returns 200 OK for everything, even failures, which makes the frontend guess what happened. Strong backend code uses status codes correctly (400 for bad input, 401/403 for auth problems, 404 for missing resources, 500 for server errors) and returns consistent error shapes so the frontend can handle them predictably.",
      proTips: [
        "Validate incoming request data on the server, even if the frontend already validates it - never trust the client.",
        "Use middleware for repeated logic like authentication checks instead of copying the same code into every route.",
        "Log errors on the server with enough context (which route, which input) to actually debug them later.",
      ],
      challenge:
        "Add proper status codes and a consistent JSON error shape ({ error: 'message' }) to every route in your Express app, including the ones that currently only handle success.",
    },
    8: {
      heading: "Go deeper: modeling data before you write a single query",
      paragraph:
        "The biggest database mistakes happen before any code is written - in the schema design. A poorly modeled database (duplicated data, missing relationships, no constraints) creates bugs that are expensive to fix later because real data is already sitting in the broken structure. Professionals sketch their tables and relationships on paper or a whiteboard first, thinking through what should be unique, what should be required, and how tables relate, before touching SQL.",
      proTips: [
        "Decide which fields must be unique (like email) and enforce that at the database level, not just in application code.",
        "Use foreign keys to represent relationships between tables instead of just storing an ID and hoping it matches something.",
        "Think about what happens when related data is deleted - should linked records be deleted too, or blocked from deletion?",
      ],
      challenge:
        "Sketch the full schema for the student results project (tables, columns, relationships) before writing any SQL, and identify every place a constraint (unique, required, foreign key) should exist.",
    },
    9: {
      heading: "Go deeper: the gap between 'it works on my machine' and shipped software",
      paragraph:
        "Combining a frontend and backend into one working application exposes every gap in your understanding at once: CORS errors, environment variables, mismatched data shapes between what the backend sends and what the frontend expects. This is the most valuable debugging practice you can get, because it mirrors exactly what junior developer work looks like day to day - not writing new features from scratch, but figuring out why two pieces that should work together do not.",
      proTips: [
        "When frontend and backend disagree, check the actual network response in devtools before assuming either side is 'wrong' - the truth is in the payload.",
        "Keep environment-specific values (API URLs, keys) in environment variables, never hard-coded, so moving between local and deployed environments does not break things.",
        "Write down every bug you hit and how you fixed it. That log becomes your fastest reference the next time it happens.",
      ],
      challenge:
        "Deploy your full-stack project somewhere real (even a free tier host) so the frontend and backend are talking to each other outside your local machine, not just on localhost.",
    },
    10: {
      heading: "Go deeper: what actually separates a hobbyist from a hire",
      paragraph:
        "At this stage the missing skill is rarely syntax - it is judgment. Professionals read error messages fully before searching for them. They write code assuming someone else will read it next week. They ask 'what happens when this input is empty, huge, or malicious' before shipping, not after a bug report. None of this is taught in a single tutorial; it is built by repeatedly hitting real problems and reflecting on what you would do differently, which is exactly what the projects on this platform are designed to force you to practice.",
      proTips: [
        "Before marking any project complete, deliberately try to break it: empty inputs, huge inputs, wrong types, no internet connection.",
        "Read one piece of someone else's production code (an open-source project) a week, even if you only understand half of it.",
        "Keep a running list of every bug that took you more than 30 minutes to fix, and what the actual root cause turned out to be.",
      ],
      challenge:
        "Pick your strongest completed project and write a short 'what I would do differently' note as if reviewing someone else's code. Be genuinely critical.",
    },
  },

  // ================= 2: UI/UX DESIGN =================
  2: {
    1: {
      heading: "Go deeper: design principles are trade-offs, not rules",
      paragraph:
        "Beginners often treat design principles (balance, contrast, alignment, proximity) as a checklist to tick off. Professionals treat them as trade-offs: adding contrast to make one element stand out means everything else recedes, which is exactly the point - you are choosing what the user notices first, second, and last. The real skill is being able to explain why you made a choice, not just that you followed a rule, because that is what design critique and client conversations actually test.",
      proTips: [
        "For every design decision, be able to finish the sentence: 'I did this because...' If you cannot, revisit the decision.",
        "Study one interface you use daily and identify what it is intentionally drawing your eye to first.",
        "Contrast is not only about color - size, weight, and spacing all create contrast too.",
      ],
      challenge:
        "Take a design you have made and identify, in writing, the single element you most want a first-time viewer to notice, and explain what specifically makes their eye go there first.",
    },
    2: {
      heading: "Go deeper: typography is a hierarchy system, not a font choice",
      paragraph:
        "Picking a nice font is the easy 10% of typography. The hard, valuable 90% is building a consistent type scale - a defined set of sizes and weights for headings, body text, captions and labels - so every screen in a product feels like part of the same system instead of a one-off design. Professionals rarely use more than two typefaces in a single product, and they define the scale before designing a single screen.",
      proTips: [
        "Limit yourself to a maximum of two font families per project: one for headings, one for body text.",
        "Define your type scale (e.g. 32/24/18/16/14px) before starting any screens, and reuse it everywhere.",
        "Line height matters as much as font size - body text usually needs 1.4 to 1.6 times the font size for comfortable reading.",
      ],
      challenge:
        "Define a five-level type scale (from largest heading to smallest caption) and apply it consistently across three different screens of a project.",
    },
    3: {
      heading: "Go deeper: color needs a system, not just a palette",
      paragraph:
        "A pretty color palette is not the same as a usable color system. Real products need colors defined by role - primary, secondary, success, warning, error, neutral text, background - so that meaning stays consistent everywhere. This is also where accessibility becomes non-negotiable: text and background color combinations need enough contrast (measured by a real ratio, not a guess) for people with low vision to actually read your interface.",
      proTips: [
        "Check every text/background color pair against WCAG contrast guidelines using a free contrast checker tool.",
        "Reserve red and green specifically for error and success states so their meaning is never ambiguous.",
        "Do not rely on color alone to communicate status - pair it with an icon or label for accessibility.",
      ],
      challenge:
        "Build a small color system with named roles (primary, error, success, background, text) and run every text/background pairing through a contrast checker before using it.",
    },
    4: {
      heading: "Go deeper: UX is decisions made before any screen exists",
      paragraph:
        "The most expensive UX mistakes happen before a single pixel is placed - when the flow itself is wrong. Professionals map the user's journey (what are they trying to do, what do they know, what could confuse them) before opening a design tool. A beautiful screen solving the wrong problem is still a failure; a plain screen solving the right problem with zero confusion is a success. This is the difference employers are actually screening for when they ask about your 'process', not just your final screens.",
      proTips: [
        "Before designing any screen, write one sentence describing the user's goal and one sentence describing how they will know they succeeded.",
        "List every question a first-time user might have looking at a new screen, and check whether your design answers each one.",
        "Test your flow by asking someone unfamiliar with the project to complete a task while you watch silently.",
      ],
      challenge:
        "Pick an app you use and map its onboarding flow step by step, noting every point where you personally felt confused or hesitated, and why.",
    },
    5: {
      heading: "Go deeper: wireframes exist to kill bad ideas cheaply",
      paragraph:
        "The entire point of a wireframe is that it is cheap and fast to throw away. If you find yourself perfecting colors or fonts in a wireframe, you have skipped the purpose of the stage: proving the layout and flow work before investing time in visual polish. Professionals deliberately keep wireframes ugly - grayscale boxes and placeholder text - specifically so stakeholders critique the structure instead of getting distracted by aesthetics.",
      proTips: [
        "Use only grayscale and placeholder text in wireframes - no real colors, no final copy, no real images.",
        "Wireframe the unhappy paths too (empty states, error states, loading states), not just the ideal case.",
        "Get feedback on a wireframe before moving to high-fidelity design - changes here cost minutes, changes later cost hours.",
      ],
      challenge:
        "Wireframe not just the main success screen of your project, but also its empty state (no data yet) and its error state (something went wrong).",
    },
    6: {
      heading: "Go deeper: prototypes should answer a specific question",
      paragraph:
        "A prototype without a purpose is just a slower wireframe. Before building one, professionals decide exactly what question it needs to answer: does this navigation pattern make sense? Does this checkout flow feel too long? Prototyping everything at high fidelity wastes time; prototyping just enough to test the specific uncertainty is the actual skill.",
      proTips: [
        "Decide the one question your prototype needs to answer before you start building it.",
        "Only add interactivity to the parts of the flow relevant to that question - skip polishing screens outside the test path.",
        "Watch someone use your prototype without explaining it first. Their confusion is more honest than their opinion afterward.",
      ],
      challenge:
        "Build a clickable prototype of a single specific flow (like signing up or checking out) and test it on one other person, noting exactly where they hesitated.",
    },
    7: {
      heading: "Go deeper: a design system is a promise of consistency at scale",
      paragraph:
        "Design systems matter because a product with 5 screens can survive inconsistency; a product with 50 screens cannot. A real design system defines reusable components (buttons, inputs, cards) with clear rules for when each variant is used, so any designer or developer on the team produces consistent results without needing to ask. This is one of the most in-demand, and most misunderstood, skills in junior design hiring.",
      proTips: [
        "Start a design system with the smallest reusable pieces: buttons, input fields, and text styles - not entire page layouts.",
        "Document when to use each component variant (primary vs secondary button), not just what they look like.",
        "Reuse components ruthlessly. If you are recreating a button from scratch on a new screen, something is missing from your system.",
      ],
      challenge:
        "Build a mini component library with at least three button states (default, hover, disabled) and document in one sentence each when to use them.",
    },
    8: {
      heading: "Go deeper: a case study is what actually gets you hired",
      paragraph:
        "A portfolio of pretty screens with no explanation is one of the most common reasons junior designers get passed over. What hiring managers actually want is a case study: the problem, your process, the constraints you worked under, what you tried that did not work, and the outcome. Screens alone show what you made; a case study shows how you think, which is what they are actually hiring for.",
      proTips: [
        "For every project, write down the problem you were solving before you show any screens.",
        "Include at least one thing that did not work initially and what you changed because of it - this shows real process, not just a polished result.",
        "End every case study with a clear outcome or reflection, even if the project was practice rather than a real client.",
      ],
      challenge:
        "Write a short case study (problem, process, outcome) for your completed project before adding it to your showcase notes.",
    },
    9: {
      heading: "Go deeper: designing for the users your peers forget",
      paragraph:
        "Trust and accessibility are what separate a portfolio piece from a product someone could actually ship. Trust means: does the interface make the user feel safe entering their card details, does an error message explain what to do next instead of just saying 'error'. Accessibility means: can someone using a screen reader, or someone with low vision, or someone who cannot use a mouse, still complete the task. Most beginner portfolios ignore both, which is exactly why demonstrating them stands out.",
      proTips: [
        "Write error messages that tell the user what to do next, not just what went wrong ('Enter a valid email' beats 'Error').",
        "Check that every interactive element in your design is reachable and operable using only a keyboard.",
        "Never use placeholder text as the only label for a form field - it disappears the moment someone starts typing.",
      ],
      challenge:
        "Take your best screen and rewrite every error and empty state message so it explains, in plain language, exactly what the user should do next.",
    },
  },

  // ================= 3: DATA ANALYSIS =================
  3: {
    1: {
      heading: "Go deeper: data is only as good as the question behind it",
      paragraph:
        "The most common beginner mistake in data analysis is jumping straight into a dataset without a clear question. Professionals start with: what decision will this analysis inform? Without that, you can produce technically correct numbers that answer nothing anyone needed to know. Every dataset you touch from now on should start with one written sentence: what question am I trying to answer, and who needs the answer.",
      proTips: [
        "Write your question down before opening the dataset - it keeps you from wandering into interesting but irrelevant tangents.",
        "Distinguish between data quality problems (missing values, duplicates) and analysis problems (wrong question, wrong method) - they need different fixes.",
        "Always ask where a dataset came from and how it was collected before trusting conclusions drawn from it.",
      ],
      challenge:
        "Take any dataset you find and write one sentence stating the exact business question you would use it to answer, before doing any analysis.",
    },
    2: {
      heading: "Go deeper: spreadsheets scale further than most people think",
      paragraph:
        "Spreadsheets are often dismissed as a beginner tool, but professionals use pivot tables, VLOOKUP/XLOOKUP, and conditional formatting to do real analysis on datasets with tens of thousands of rows before ever opening Python or SQL. The actual skill being tested is not 'do you know Excel' - it is whether you can structure messy, real-world data (inconsistent formatting, missing values, duplicate entries) into something analyzable at all.",
      proTips: [
        "Learn pivot tables properly - they answer 80% of common 'summarize this data' requests faster than any formula chain.",
        "Use data validation to prevent bad entries at the source instead of cleaning them up after the fact.",
        "Freeze header rows and use named ranges on any spreadsheet you expect to revisit later.",
      ],
      challenge:
        "Take a messy dataset (inconsistent capitalization, duplicate rows, blank cells) and clean it fully before building a single pivot table from it.",
    },
    3: {
      heading: "Go deeper: statistics prevents you from fooling yourself",
      paragraph:
        "Basic statistics is not about memorizing formulas - it is about not being misled by your own data. A small sample can show a dramatic-looking trend that is pure noise. An average can hide two very different groups blended together. Understanding mean versus median, and knowing when an outlier is distorting your summary numbers, is what stops an analyst from confidently reporting a conclusion that would not survive a second look.",
      proTips: [
        "Always check whether mean or median better represents your data - a few extreme values can make the mean misleading.",
        "Look at the spread (range, standard deviation) of your data, not just the average - two datasets with the same average can look completely different.",
        "Be suspicious of any 'trend' based on a very small sample size before drawing conclusions from it.",
      ],
      challenge:
        "Take a dataset with at least one extreme outlier and calculate both the mean and median. Explain in writing which one better represents the data and why.",
    },
    4: {
      heading: "Go deeper: SQL is about asking precise questions",
      paragraph:
        "SQL beginners often write queries that technically run but return the wrong answer, usually because of a misunderstood JOIN or a missing GROUP BY. The real skill is translating an English question ('which customers spent more than 50,000 last month') into a precise query, step by step: what tables, what filter, what grouping, what aggregation. Professionals build complex queries incrementally, checking results at each step, rather than writing the whole thing at once and hoping.",
      proTips: [
        "Build complex queries in stages: SELECT and FROM first, check the result, then add WHERE, then GROUP BY, then HAVING.",
        "Understand the difference between INNER JOIN and LEFT JOIN - using the wrong one silently drops or duplicates rows.",
        "Always sanity-check a query's row count against what you expect before trusting the result.",
      ],
      challenge:
        "Write a query that answers a specific business question (e.g. 'top 5 highest performing students by average score') and verify the result by checking two rows manually.",
    },
    5: {
      heading: "Go deeper: pandas rewards thinking in whole columns, not loops",
      paragraph:
        "The most common performance and readability mistake in Python data analysis is writing a for-loop to process a dataset row by row, when pandas is built to operate on entire columns at once. Vectorized operations are faster and, more importantly, closer to how professionals actually write and read pandas code. Learning to think in 'apply this operation to this whole column' instead of 'loop through each row' is the single biggest jump in code quality at this stage.",
      proTips: [
        "Avoid iterating over DataFrame rows with a for-loop - look for a vectorized pandas operation first.",
        "Use .isnull() and .duplicated() early in any analysis to understand data quality before doing anything else.",
        "Chain operations (filter, group, aggregate) in a readable sequence rather than creating a dozen intermediate variables.",
      ],
      challenge:
        "Take any analysis you have written with a for-loop over rows and rewrite it using a vectorized pandas operation instead.",
    },
    6: {
      heading: "Go deeper: every chart makes a claim - make sure it is true",
      paragraph:
        "A chart is an argument, not decoration. Truncating a y-axis can make a 2% change look dramatic. A pie chart with nine slices communicates almost nothing. Choosing the right chart type for the question (trend over time needs a line chart, comparison across categories needs a bar chart, relationship between two variables needs a scatter plot) is what makes a visualization honest and useful instead of misleading or confusing.",
      proTips: [
        "Match chart type to the question: trends over time = line chart, category comparison = bar chart, relationships = scatter plot.",
        "Start bar chart y-axes at zero - truncating them exaggerates differences and misleads the viewer.",
        "Every chart needs a title that states the finding, not just the metric ('Sales dropped in Q3' beats 'Sales by Quarter').",
      ],
      challenge:
        "Take one chart you have made and rewrite its title to state the actual finding, then check whether the chart type you chose is the right one for that finding.",
    },
    7: {
      heading: "Go deeper: real datasets are never clean",
      paragraph:
        "Course datasets are almost always pre-cleaned, which quietly hides the hardest part of real analyst work: figuring out what to do with missing values, inconsistent categories, and data that simply does not match what the documentation claims. Professionals spend the majority of their time on data cleaning, not analysis - and treat that time as part of the actual skill, not an annoying prerequisite to it.",
      proTips: [
        "Budget more time for cleaning a real dataset than for analyzing it - this is normal, not a sign you are doing something wrong.",
        "Document every cleaning decision you make (why you dropped a row, how you filled a missing value) so your analysis is reproducible.",
        "Never silently drop missing data without checking whether it is missing randomly or for a meaningful reason.",
      ],
      challenge:
        "For your sales dataset project, write a short data cleaning log listing every change you made and why, before presenting any findings.",
    },
    8: {
      heading: "Go deeper: the insight is worthless if no one acts on it",
      paragraph:
        "This is the skill most tutorials skip entirely: turning a correct analysis into something a non-technical decision-maker will actually understand and act on. That means leading with the finding, not the method ('sales dropped 18% in the north region' beats 'I ran a groupby on region and calculated percent change'), and being explicit about what you recommend doing about it. An analyst who can only report numbers is replaceable; one who can turn numbers into a decision is not.",
      proTips: [
        "Lead every finding with the conclusion, then support it with the numbers - not the other way around.",
        "Translate every statistic into a plain-language sentence a non-analyst could repeat correctly to someone else.",
        "Always end an analysis with a recommendation or a clear next question, not just a description of what the data shows.",
      ],
      challenge:
        "Take your sales analysis project and write a three-sentence executive summary: the finding, why it matters, and what you would recommend doing next.",
    },
  },

  // ================= 4: ARTIFICIAL INTELLIGENCE =================
  4: {
    1: {
      heading: "Go deeper: AI is pattern-matching, not thinking",
      paragraph:
        "The most important mental model at this stage is understanding that AI systems find statistical patterns in data - they do not reason the way people do, even when their output looks fluent and confident. This distinction matters practically: it explains why AI systems can be confidently wrong, why they inherit biases present in their training data, and why 'the AI said so' is never a sufficient justification on its own for an important decision.",
      proTips: [
        "Whenever an AI tool gives you an answer, ask what pattern in its training data could explain that answer - it builds real intuition.",
        "Distinguish between AI that generates (text, images) and AI that classifies or predicts (spam detection, credit scoring) - they are evaluated differently.",
        "Treat confident-sounding AI output with the same skepticism you would give a confident stranger with no credentials.",
      ],
      challenge:
        "Ask an AI chatbot a question you know the answer to well, and identify one specific place its answer is subtly wrong or oversimplified.",
    },
    2: {
      heading: "Go deeper: the math you actually need, and when",
      paragraph:
        "You do not need to master calculus and linear algebra before writing useful code, but you do eventually need enough programming fundamentals - functions, loops, working with arrays and matrices of numbers - to understand what a machine learning library is doing under the hood instead of only calling functions you do not understand. Professionals build this incrementally, learning the math each concept requires exactly when they hit it, not all upfront.",
      proTips: [
        "Get comfortable with basic array/matrix operations in Python (NumPy) before moving to machine learning libraries.",
        "When a machine learning concept references a formula, look up just enough of the math to understand what the formula is trying to achieve, not the full derivation.",
        "Practice writing small, correct functions before trying to build anything AI-related - most AI bugs are actually just regular programming bugs.",
      ],
      challenge:
        "Write a small Python function using NumPy that calculates the average and standard deviation of a list of numbers without using a built-in shortcut for either.",
    },
    3: {
      heading: "Go deeper: garbage in, garbage out is not a cliche",
      paragraph:
        "The quality of a machine learning model is bounded by the quality of its training data, full stop. A model trained on biased or unrepresentative data will make biased or unrepresentative predictions, no matter how sophisticated the algorithm is. Professionals spend enormous effort auditing training data for gaps and imbalances before ever tuning a model, because no amount of tuning fixes a fundamentally broken dataset.",
      proTips: [
        "Before training anything, check whether your dataset represents the population you actually want to make predictions about.",
        "Look specifically for imbalanced classes (e.g. 95% one outcome, 5% another) - this silently breaks naive accuracy measurements.",
        "Split your data into training and test sets before doing any exploration, to avoid accidentally 'peeking' at test data.",
      ],
      challenge:
        "Take any classification dataset and check the balance of its target classes. If it is imbalanced, describe one technique you could use to address that.",
    },
    4: {
      heading: "Go deeper: why models overfit, and why it matters",
      paragraph:
        "Overfitting is a model that has memorized its training data instead of learning generalizable patterns - it performs beautifully on data it has seen and poorly on new data. This is the single most common reason a machine learning project fails in production despite looking great in a notebook. Understanding train/test splits and validation is not optional technical detail; it is the difference between a model that works and one that only appears to work.",
      proTips: [
        "Always evaluate a model on data it has never seen during training - performance on training data alone is meaningless.",
        "If training accuracy is much higher than test accuracy, that is a strong sign of overfitting.",
        "Start with the simplest model that could plausibly work before reaching for something more complex.",
      ],
      challenge:
        "Train a simple model on a dataset, then compare its accuracy on the training set versus a held-out test set. Explain any gap you see.",
    },
    5: {
      heading: "Go deeper: matching the AI tool to the actual problem",
      paragraph:
        "A huge amount of wasted effort in applied AI comes from reaching for a complex model when a simple rule-based system or basic statistics would solve the problem faster, cheaper, and more reliably. Professionals evaluate whether AI is even the right tool before building anything - asking whether the problem has enough data, whether errors are tolerable, and whether a simpler approach already exists.",
      proTips: [
        "Before building an AI solution, ask whether a simple rule-based approach could solve 80% of the problem with none of the complexity.",
        "Consider the cost of an AI system being wrong for your specific use case - some applications tolerate errors far better than others.",
        "Check whether a pre-trained model or existing API already solves your problem before building one from scratch.",
      ],
      challenge:
        "Pick a real problem you have encountered and write two sentences: what a simple rule-based solution would look like, and when it would break down enough to justify a machine learning approach instead.",
    },
    6: {
      heading: "Go deeper: shipping an AI feature means handling its failures",
      paragraph:
        "Building an AI-powered project is not finished when the model produces good output most of the time - it is finished when you have decided what happens the other times. What does your interface show when the AI is uncertain, wrong, or unavailable? Beginners build only the success path; professionals design the failure path with equal care, because that is where user trust is actually won or lost.",
      proTips: [
        "Design an explicit fallback or error state for when the AI call fails or times out - never let the interface hang silently.",
        "Show users when they are interacting with AI-generated content, especially where accuracy matters.",
        "Set reasonable limits (input length, request rate) so a single request cannot break or exhaust your project.",
      ],
      challenge:
        "In your AI assistant project, deliberately simulate a failed API call and design a clear, honest message the user sees when that happens.",
    },
    7: {
      heading: "Go deeper: the judgment layer no course can automate",
      paragraph:
        "Anyone can call an AI API. What is valuable, and what employers are actually screening for at this level, is judgment: knowing when to trust an AI output and when to verify it, understanding the limitations and biases of a given model, and being able to explain those limitations to someone non-technical. This is the difference between being a user of AI tools and being someone who can be trusted to deploy them responsibly.",
      proTips: [
        "For any AI system, be able to name at least one scenario where it would confidently give a wrong or harmful answer.",
        "Practice explaining an AI system's limitations to someone without a technical background, in plain language.",
        "Treat AI-generated output as a draft to verify, not a finished answer to trust, especially for anything factual or consequential.",
      ],
      challenge:
        "Pick an AI tool you use and write three sentences: one thing it does well, one specific way it can fail, and one thing you would tell a non-technical user to watch out for.",
    },
  },

  // ================= 5: DIGITAL MARKETING =================
  5: {
    1: {
      heading: "Go deeper: marketing is a system, not a single tactic",
      paragraph:
        "Beginners often treat marketing as a list of unrelated tactics: post on social media, run an ad, write a blog. Professionals treat it as a funnel - awareness, consideration, decision, retention - where every tactic has a specific job at a specific stage. A campaign can fail not because the content was bad, but because it was aimed at the wrong stage entirely, like running a hard-sell ad to people who have never heard of the brand.",
      proTips: [
        "For any piece of marketing content, identify which funnel stage it is targeting before creating it.",
        "Do not judge a campaign's success by a single metric (likes) without checking whether it matches the funnel stage it was meant to serve.",
        "Map your audience's actual questions and doubts at each funnel stage before writing anything.",
      ],
      challenge:
        "Take a brand you follow and identify one piece of their content for each funnel stage: one for awareness, one for consideration, one for decision.",
    },
    2: {
      heading: "Go deeper: content marketing is a long game measured honestly",
      paragraph:
        "Most beginner content marketing fails because it treats content as an ad in disguise - all pitch, no value - and expects results within a week. Professionals plan content around genuinely useful answers to their audience's real questions, and measure success over months using metrics like return visitors and time on page, not just a single post's likes.",
      proTips: [
        "Base every piece of content on a real question your audience is actually asking, not what you want to say about the brand.",
        "Track content performance over weeks and months, not single posts - content marketing compounds slowly.",
        "Repurpose one strong piece of content into multiple formats (post, short video, email) instead of always starting from scratch.",
      ],
      challenge:
        "Write down three real questions your target audience would search for, and outline one piece of content that genuinely answers each.",
    },
    3: {
      heading: "Go deeper: platforms reward different content for different reasons",
      paragraph:
        "Posting the identical content across every platform is one of the clearest signs of a beginner marketer. Each platform's algorithm rewards different behavior - short-form video platforms reward watch-through rate, professional networks reward comment discussion, image platforms reward saves. Understanding what each platform is actually optimizing for changes what you create, not just where you post it.",
      proTips: [
        "Research what metric each platform's algorithm prioritizes (watch time, comments, saves) before planning content for it.",
        "Adapt format, not just captions, for each platform instead of copy-pasting identical content everywhere.",
        "Engage with comments quickly after posting - many algorithms weight early engagement heavily.",
      ],
      challenge:
        "Pick one piece of content and rewrite it as three genuinely different versions optimized for three different platforms, not just resized.",
    },
    4: {
      heading: "Go deeper: SEO is answering a question better than anyone else",
      paragraph:
        "Search engine optimization is often taught as a checklist of keywords and meta tags, but the actual underlying principle is simpler and harder: your content needs to answer the searcher's question more completely and clearly than every competing page. Keyword stuffing without genuinely useful content gets penalized, not rewarded, by modern search algorithms - the technical checklist only matters once the content itself deserves to rank.",
      proTips: [
        "Before optimizing anything technically, ask whether your content actually answers the searcher's question better than the current top results.",
        "Use keywords naturally in headings and early paragraphs - stuffing them unnaturally can hurt more than help.",
        "Page load speed and mobile-friendliness are ranking factors, not just user-experience nice-to-haves.",
      ],
      challenge:
        "Search for a keyword relevant to a project you care about, read the top three results, and identify one specific gap your content could fill better than all of them.",
    },
    5: {
      heading: "Go deeper: vanity metrics versus metrics that matter",
      paragraph:
        "Likes and follower counts are the easiest metrics to see and the least useful for judging whether marketing is working. Professionals track metrics tied to actual business outcomes - conversion rate, cost per acquisition, return visitor rate - because a viral post that drives zero sales taught the business nothing useful. Learning to ask 'so what' after every metric is the core analytics skill in marketing.",
      proTips: [
        "For every metric you report, ask 'so what' - what decision does this number actually inform?",
        "Track conversion rate (percentage who take the desired action), not just traffic or engagement volume.",
        "Compare metrics against a baseline or previous period - a number with no comparison tells you almost nothing.",
      ],
      challenge:
        "Take any analytics dashboard you have access to (or a sample one) and identify one vanity metric and one metric that actually reflects business impact.",
    },
    6: {
      heading: "Go deeper: a campaign needs a hypothesis, not just an idea",
      paragraph:
        "The difference between an amateur campaign and a professional one is often a single sentence written before anything is created: 'I believe [this audience] will respond to [this message] because [this reason], and I will know it worked if [this metric] moves.' Without that hypothesis, a campaign cannot really succeed or fail - there is nothing specific to measure it against, and no clear lesson to carry into the next one.",
      proTips: [
        "Write a one-sentence hypothesis for any campaign before creating content: audience, message, expected result.",
        "Decide your success metric before launching, not after seeing how it performed.",
        "Plan a small test before a full campaign whenever budget or time allows.",
      ],
      challenge:
        "Write a full hypothesis (audience, message, reason, success metric) for your marketing project campaign before building any content for it.",
    },
    7: {
      heading: "Go deeper: strategy is what survives after the first campaign ends",
      paragraph:
        "A single successful campaign proves an idea can work once. A strategy is the system that keeps producing results after the excitement of the first launch fades - a repeatable process for finding what resonates, doing more of it, and cutting what does not. Marketers who only know how to execute individual campaigns plateau quickly; marketers who build a feedback loop between results and future decisions keep improving.",
      proTips: [
        "After every campaign, write down what you would keep, what you would change, and why - build this into a habit, not a one-off.",
        "Identify your single best-performing piece of content or channel and deliberately invest more there before trying something new.",
        "Build a simple monthly review habit: what worked, what did not, what you will test next.",
      ],
      challenge:
        "For your marketing project, write a short post-campaign review: what worked, what you would change, and one specific thing you will test differently next time.",
    },
  },

  // ================= 6: VIDEO EDITING =================
  6: {
    1: {
      heading: "Go deeper: editing is decision-making, not button-pressing",
      paragraph:
        "Learning the software's buttons is the easy part. The actual craft of editing is a series of decisions: what to cut, what to keep, where to place each cut so it feels invisible or intentional. Beginners often keep too much footage out of attachment to what they filmed; professionals are ruthless, keeping only what serves the story or message, because a viewer's attention is the most valuable thing an editor is managing.",
      proTips: [
        "Watch your rough cut and note every moment your own attention drifts - that is almost always something to cut or tighten.",
        "Cut on action (a movement already in progress) rather than on stillness - it hides the cut and keeps energy up.",
        "Edit for your audience's attention span first, your attachment to the footage second.",
      ],
      challenge:
        "Take a raw clip at least 3 minutes long and edit it down to under 60 seconds, keeping only what is essential to the story.",
    },
    2: {
      heading: "Go deeper: rhythm is the invisible skill viewers actually feel",
      paragraph:
        "The difference between a video that feels professional and one that feels amateur is often rhythm - the pacing and timing of cuts relative to the content and any music. Cutting on the beat of music, varying shot length to match energy, and using J-cuts and L-cuts (where audio from one clip overlaps the next) are techniques viewers cannot name but absolutely feel the absence of when they are missing.",
      proTips: [
        "Try cutting a sequence to match the beat of background music - it instantly makes pacing feel intentional.",
        "Use J-cuts and L-cuts (audio leading or trailing the video cut) to make dialogue-heavy sequences feel natural instead of choppy.",
        "Vary your shot length deliberately - a sequence of identical-length cuts feels mechanical even when each cut is technically fine.",
      ],
      challenge:
        "Take a talking-head clip and add one J-cut and one L-cut to smooth two transitions, then compare it to the straight cut version.",
    },
    3: {
      heading: "Go deeper: audiences forgive rough video far more than rough audio",
      paragraph:
        "This is one of the most consistent findings in video production: viewers tolerate mediocre visuals far more than they tolerate bad audio. Background noise, inconsistent volume between clips, and harsh sudden loud moments will make people click away faster than a slightly shaky shot ever will. Professionals mix audio levels carefully and treat sound design as equal in importance to the visual edit, not an afterthought added at the end.",
      proTips: [
        "Normalize audio levels across all your clips so volume does not jump noticeably between cuts.",
        "Add a subtle noise reduction pass to any clip with noticeable background hiss or hum before other processing.",
        "Leave a little headroom in your levels - audio that peaks too close to maximum distorts on louder playback systems.",
      ],
      challenge:
        "Take two clips recorded at different volumes and manually match their perceived loudness so the transition between them is seamless.",
    },
    4: {
      heading: "Go deeper: color grading is about consistency, not filters",
      paragraph:
        "A common beginner mistake is applying a dramatic preset filter to a single clip in isolation. Professional color work starts with color correction - making every shot in a sequence match in exposure and white balance, so the footage looks like it was filmed in one continuous session - before any creative color grading is applied on top. Skipping correction and jumping straight to a stylized look is why beginner edits often look inconsistent from cut to cut.",
      proTips: [
        "Color correct every clip to match exposure and white balance before applying any creative grade.",
        "Grade while looking at clips next to each other in your timeline, not one at a time in isolation - consistency is the goal.",
        "Skin tones are the fastest way to spot a bad grade - if skin looks unnatural, the whole grade usually needs adjusting.",
      ],
      challenge:
        "Take two clips shot in different lighting and color correct them to match, so a viewer cannot tell they were filmed at different times.",
    },
    5: {
      heading: "Go deeper: motion should clarify, not decorate",
      paragraph:
        "Motion graphics and effects are easy to overuse once you learn them, and overuse is exactly what marks a beginner reel. Professionals ask what a piece of motion is actually communicating - drawing attention to a key word, showing a process, guiding the eye - before adding it. If an effect does not make the message clearer or the moment more impactful, it is usually just noise competing with the content.",
      proTips: [
        "Before adding any effect, state in one sentence what it is communicating - if you cannot, reconsider adding it.",
        "Keep text animations simple and fast; viewers need to read the message, not admire the animation.",
        "Use effects consistently within a single video - randomly different transition styles read as unplanned.",
      ],
      challenge:
        "Take a video with at least three different transition styles and standardize them to one consistent style throughout.",
    },
    6: {
      heading: "Go deeper: a real project has constraints a tutorial does not",
      paragraph:
        "Working with your own practice footage is forgiving - you can reshoot, you control everything. Working with a real project (footage from a client, an event you cannot redo) forces the harder, more valuable skill: solving problems with the footage you actually have, not the footage you wish you had. This is exactly the muscle that gets tested on real freelance or job work.",
      proTips: [
        "When footage has a flaw you cannot fix, decide whether to hide it (creative cutaway), minimize it, or accept it - do not ignore it.",
        "Build a shot list or logging pass before editing a longer project, so you know what you have before you start cutting.",
        "Keep a backup of your original footage before making any destructive edits.",
      ],
      challenge:
        "Take footage with at least one real flaw (bad framing, audio glitch, awkward moment) and edit around it so the final cut does not draw attention to the problem.",
    },
    7: {
      heading: "Go deeper: revisions are part of the craft, not a failure of it",
      paragraph:
        "New editors often take feedback personally, treating a request for revisions as criticism of their skill. Professionals treat revisions as a normal, expected part of the process - the client or director has context the editor does not, and vice versa. Being able to receive specific, sometimes vague feedback ('make it pop more') and translate it into concrete editing decisions is a communication skill as much as a technical one, and it is what determines whether someone gets hired again.",
      proTips: [
        "When feedback is vague ('make it faster'), ask a clarifying question or offer two specific interpretations rather than guessing silently.",
        "Keep versioned exports (v1, v2, v3) so you can compare changes and revert if a revision does not work out.",
        "Deliver a short note with each revision explaining what you changed and why, so feedback loops move faster.",
      ],
      challenge:
        "Take a finished edit, write one deliberately vague piece of feedback for it as if you were a client, then revise the edit based on your own interpretation of that feedback.",
    },
  },
};

export { deepDives };
