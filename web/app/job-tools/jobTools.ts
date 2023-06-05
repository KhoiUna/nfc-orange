const tags = {
    0: {
        title: "job tracker",
        color: "bg-red-300"
    },
    1: {
        title: "job auto-fill",
        color: "bg-green-300"
    },
    2: {
        title: "resume assistance",
        color: "bg-purple-300"
    },
    3: {
        title: "linkedin review",
        color: "bg-blue-300"
    },
    4: {
        title: "job search",
        color: "bg-yellow-300"
    },
    5: {
        title: "career coaching",
        color: "bg-indigo-300"
    },
    6: {
        title: "cover letter",
        color: "bg-orange-300"
    },
    7: {
        title: "mock interview",
        color: "bg-pink-300"
    }
};

const jobTools = [
    {
        name: "ChatGPT",
        tags: [tags[2], tags[6]],
        url: "https://chat.openai.com/",
        text: "ChatGPT: get instant answers, find creative inspiration, and learn something new. Use ChatGPT for free today."
    },
    {
        name: "Simplify",
        tags: [tags[1], tags[0]],
        url: "https://simplify.jobs/",
        text: "Discover relevant jobs. Apply 10x faster."
    },
    {
        name: "Teal",
        tags: [tags[0], tags[2]],
        url: "https://www.tealhq.com/",
        text: "Better Resume. Faster Search. More Offers. Simplify your job search and land your next position sooner with Teal's all-in-one suite of tools."
    },
    {
        name: "Careerflow",
        tags: [tags[0], tags[3], tags[2]],
        url: "https://www.careerflow.ai/",
        text: "Land your dream job. Without the stress. Your Job Search's AI Copilot is here."
    },
    {
        name: "Handshake",
        tags: [tags[4]],
        url: "https://joinhandshake.com/",
        text: "The #1 way college students get hired - Meet people who help you land the job"
    },
    {
        name: "Indeed",
        tags: [tags[4]],
        url: "https://www.indeed.com/",
        text: "Let employers find you"
    },
    {
        name: "Glassdoor",
        tags: [tags[4]],
        url: "https://www.glassdoor.com/",
        text:
            "Millions of people are searching for jobs, salary information, company reviews, and interview questions. See what others are looking for on Glassdoor today."
    },
    {
        name: "untapped",
        tags: [tags[4]],
        url: "https://www.untapped.io/",
        text: "Untapped is a recruiting platform where candidates find jobs and get hired by the world's top tech companies."
    },
    {
        name: "Braintrust",
        tags: [tags[4]],
        url: "https://www.usebraintrust.com/",
        text: "Access the world's best jobs. Your work. Your network. Your future."
    },
    {
        name: "Wonsulting",
        tags: [tags[5]],
        url: "https://www.wonsulting.com/",
        text:
            "CAREER COACHING TO PROPEL YOUR CAREER\nWe help you get hired\nWe've helped over 100,000 people land their dream jobs. Let our job search strategies take you from resumes to better days."
    },
    {
        name: "Coverdoc.ai",
        tags: [tags[6]],
        url: "https://coverdoc.ai/",
        text: "Write personalized cover letters 10x faster. Speed up your job search with personalized AI-powered cover letters written in minutes."
    },
    {
        name: "Shadowing AI",
        tags: [tags[7]],
        url: "https://shadowing.ai/",
        text:
            "Conversational AI Interview Practices For Jobs Across Industries in 60+ languages\nTo be your best at your interview."
    },
    {
        name: "Dice",
        tags: [tags[4]],
        url: "https://www.dice.com/",
        text: "Find your next tech job. Explore open roles at companies hiring now."
    }
];

export default jobTools.sort((a, b) => a.name.localeCompare(b.name))
