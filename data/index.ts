
export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I prioritize team collaboration, fostering open communication ",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/back1.png",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm very flexible with time zone communications",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development.",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Currently building an AI code reviewer app",
      description: "The Inside Scoop",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "AI Trip Planner",
      des: "🌍 Your Ultimate Travel Companion, the smartest way to plan your dream vacations!",
      img: "/tripplanner.png",
      iconLists: ["/re.svg", "/tail.svg", "/js.svg", "/firebase.svg", "/c.svg", "/vite.svg"],
      link: "https://web-ai-tripplanner.vercel.app",
    },
    {
      id: 2,
      title: "Issue Tracker",
      des: "An issue tracker built with Next.js that allows users to create, manage, and track issues for projects.",
      img: "/issue-tracker.png",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/firebase.svg", "/c.svg" ,"/prisma.svg", "/sentry.svg"],
      link: "https://web-issue-tracker.vercel.app",
    },
    {
      id: 3,
      title: "PlugPoint EV Charging Station Tracker",
      des: "The EV Charging Station Tracker is your ultimate companion on the road, designed for electric vehicle owners who want to effortlessly locate nearby charging stations.",
      img: "/mini-project.jpg",
      iconLists: ["/re.svg", "/expo.svg", "/js.svg", "/firebase.svg", "/c.svg", "/google-maps.svg"],
      link: "https://github.com/devkobby24/mini-project",
    },
    // {
    //   id: 4,
    //   title: "FindDevJob",
    //   des: "FindDevJob is a mobile application built with React Native and Expo that allows users to search for developer jobs across various industries and locations.",
    //   img: "/jobsearch.png",
    //   iconLists: ["/re.svg", "/css-icon.svg", "/js.svg", "/api.svg", "/expo.svg"],
    //   link: "https://github.com/devkobby24/JobFinderApp",
    // },
    // {
    //   id: 5,
    //   title: "Password Generator",
    //   des: "A simple webpage that generates random passwords using HTML, CSS, and JavaScript. Users can click the Generate button to create a random password instantly.",
    //   img: "/passwordgen.png",
    //   iconLists: ["/html-icon.svg", "/js.svg", "/css-icon.svg",],
    //   link: "https://passphrasegenerator.netlify.app/",
    // },
    // {
    //   id: 6,
    //   title: "Non Profit Foundation Website",
    //   des: "Welcome to the official website of Therestella Foundation, a nonprofit organization dedicated to empowering underprivileged communities through education and sustainable development initiatives.",
    //   img: "/therestella.png",
    //   iconLists: ["/html-icon.svg", "/js.svg", "/css-icon.svg", "/php.svg", "/scss.svg"],
    //   link: "https://therestellafoundation.netlify.app",
    // }
  ];
  
  export const testimonials = [
    {
      quote:
        "Justice is one of the most reliable developers I have worked with. Their ability to handle complex tasks like integrating Firebase with a Next.js app while maintaining clean, efficient code is impressive. They also have a great sense of UI/UX design!.",
      name: "Peter Essibu",
      title: "Student at University of Cape Coast",
      img: "/peter.jpg",
    },
    {
      quote:
        "Justice took charge of our AI trip planner's front-end and made it intuitive and user-friendly. Their skill in working with Google APIs and React is outstanding. The charging station tracker feature they implemented is a game changer for our users!.",
      name: "Samuel Affum",
      title: "Student at KNUST",
      img: "/sammy.jpg",
    },
    {
      quote:
        "I've been consistently impressed by Justice' ability to manage complex tasks like issue tracking, Firestore integration, and authentication workflows in our app. They handle everything with a calm demeanor and always deliver high-quality code.",
      name: "Ignatus Forkuo",
      title: "Student at KNUST",
      img: "/igna.jpg",
    },
    {
      quote:
        "Justice is a brilliant developer who helped us build an issue tracker dashboard with React and Prisma. Their understanding of databases and efficient query handling with MySQL was a great asset to our team.",
      name: "Francis Adjei",
      title: "Software Developer at Brolly",
      img: "/sammy.jpg",
    },
    {
      quote:
        "Collaborating with Justice was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Justice's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Justice is the ideal partner.",
      name: "Godwin Opoku Duah",
      title: "C.T.O at Brolly",
      img: "/kobby.jpg",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "Meriskill",
      img: "/meriskill.png",
      // nameImg: "/cloudName.svg",
    },
    // {
    //   id: 2,
    //   name: "appwrite",
    //   img: "/app.svg",
    //   nameImg: "/appName.svg",
    // },
    // {
    //   id: 3,
    //   name: "HOSTINGER",
    //   img: "/host.svg",
    //   nameImg: "/hostName.svg",
    // },
    // {
    //   id: 4,
    //   name: "stream",
    //   img: "/s.svg",
    //   nameImg: "/streamName.svg",
    // },
    // {
    //   id: 5,
    //   name: "docker.",
    //   img: "/dock.svg",
    //   nameImg: "/dockerName.svg",
    // },
  ];
  
  export const workExperience = [
    {
      id: 1,
      title: "Data Analysis Intern",
      desc: "Analyzed and visualized data, created comprehensive reports, and utilized Power BI to support informed decision-making.",
      className: "md:col-span-2",
      thumbnail: "/exp1.svg",
    },
    // {
    //   id: 2,
    //   title: "Mobile App Dev - JSM Tech",
    //   desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    //   className: "md:col-span-2", // change to md:col-span-2
    //   thumbnail: "/exp2.svg",
    // },
    {
      id: 2,
      title: "Freelance Web Dev Project",
      desc: "Led the dev of a foundation website for a client, from initial concept to deployment on the web.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp2.svg",
    },
    // {
    //   id: 4,
    //   title: "Lead Frontend Developer",
    //   desc: "Developed and maintained user-facing features using modern frontend technologies.",
    //   className: "md:col-span-2",
    //   thumbnail: "/exp4.svg",
    // },
  ];
  
  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      link: "https://github.com/devkobby24",
    },
    {
      id: 2,
      img: "/twit.svg",
      link: "https://twitter.com/kay_dev24"
    },
    {
      id: 3,
      img: "/link.svg",
      link: "https://www.linkedin.com/in/justice-duah-7ab6b4239"
    },
  ];