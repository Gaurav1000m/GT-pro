/**
 * Study With Gaurav - Modern Educational Web App
 * Features:
 * 1. Splash screen with logo + PRO badge animation & dismiss
 * 2. Light/Dark theme toggle with localStorage persistence
 * 3. Search bar with live filtering & empty state
 * 4. Left-sliding Category Sidebar Drawer & chips
 * 5. Hero slider carousel (auto-advance, touch-swipe, dots, CTA)
 * 6. Recently Visited cards with progress & localStorage persistence
 * 7. Bookmark / Save functionality with dedicated Saved view
 * 8. Fixed floating bottom nav (Home | Donation | Saved) with glowing spotlight dome
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== DATA ARCHITECTURE ====================
  const categoriesData = [
    {
      id: "physics-wallah",
      name: "Physics Wallah",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Physics_wallah_logo.jpg"
    },
    {
      id: "pw-ott-pi-pro",
      name: "PW OTT - Pi Pro",
      logo: "https://i.ibb.co/FRDwFWc/20260613-082831.jpg"
    },
    {
      id: "next-toppers",
      name: "Next Toppers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s"
    },
    {
      id: "missionjeet",
      name: "MissionJEET",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s"
    },
    {
      id: "vibrant-academy",
      name: "Vibrant Academy",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png"
    },
    {
      id: "munil-sir",
      name: "Munil Sir",
      logo: "https://nocache-appxdb.classx.co.in/subject/2024-08-09-0.845544467533613.png"
    },
    {
      id: "rojgar-with-ankit",
      name: "Rojgar With Ankit",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg"
    },
    {
      id: "science-and-fun",
      name: "Science And Fun",
      logo: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2022-11-09-0.46231084813575274.png"
    },
    {
      id: "just-padhle",
      name: "Just Padhle",
      logo: "https://i.ibb.co/fdZ4rc6F/10266.jpg"
    },
    {
      id: "selection-way",
      name: "Selection Way",
      logo: "https://www.selectionway.com/next_images/logo.png"
    },
    {
      id: "master-sahab",
      name: "Master Sahab",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s"
    },
    {
      id: "unacademy",
      name: "UnAcademy",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png"
    },
    {
      id: "test-book",
      name: "Test Book",
      logo: "https://i.postimg.cc/bvrQ7HjG/images-(3).png"
    },
    {
      id: "toppers-wisdom",
      name: "Topper's Wisdom",
      logo: "https://i.postimg.cc/NGSDG8B9/logo.png"
    },
    {
      id: "study-iq",
      name: "Study IQ",
      logo: "https://i.postimg.cc/yNGghPfd/download.png"
    },
    {
      id: "khan-global-studies",
      name: "Khan Global Studies",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg"
    },
    {
      id: "gs-version",
      name: "Gs Version",
      logo: "https://i.postimg.cc/6Qt2YgcB/IMG-20260621-114809.jpg"
    },
    {
      id: "futurekul",
      name: "Futurekul",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg"
    },
    {
      id: "cds-journey",
      name: "CDS JOURNEY",
      logo: "https://i.postimg.cc/RZKjTBwV/images-(2).jpg"
    },
    {
      id: "career-will",
      name: "Career Will",
      logo: "https://careerwillforpc.com.in/wp-content/uploads/2026/03/careerwill-pc.png"
    },
    {
      id: "sachin-academy",
      name: "Sachin Academy",
      logo: "https://i.postimg.cc/HkTLk8ZY/images-2026-07-14T141545-975.jpg"
    },
    {
      id: "vidhyakul",
      name: "Vidhyakul",
      logo: "https://cdn-1.webcatalog.io/catalog/vidyakul/vidyakul-icon-filled-256.webp?v=1714780458007"
    },
    {
      id: "md-classes",
      name: "MD classes",
      logo: "https://i.postimg.cc/bwbmK3zB/download-(2).jpg"
    },
    {
      id: "utkarsh-classes",
      name: "Uttkarsh Classes",
      logo: "https://dicb8ki8nr06d.cloudfront.net/webiste_public/images/utkarsh_logo.webp"
    },
    {
      id: "apna-college",
      name: "Apna College",
      logo: "https://i.ibb.co/0y74Ks8X/x.jpg"
    },
    {
      id: "education-baba",
      name: "Education Baba",
      logo: "https://i.ibb.co/9kSMLvKQ/x.jpg"
    },
    {
      id: "test-ranker",
      name: "Test Ranker",
      logo: "https://i.postimg.cc/1XBncYSw/images-(5).jpg"
    },
    {
      id: "target-board",
      name: "Target Board",
      logo: "https://i.postimg.cc/MZy8cDF6/download.jpg"
    },
    {
      id: "book",
      name: "BOOK",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg"
    },
    {
      id: "padhle-akshay",
      name: "Padhle Akshay",
      logo: "https://framerusercontent.com/images/N5AlmRNRnQQa7FnlvrGcUzUhZGY.png?scale-down-to=512"
    },
    {
      id: "all-competition",
      name: "All competition",
      logo: "https://img.magnific.com/free-vector/corporate-leadership-bullseye-concept-background-company-success_1017-63147.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      id: "iit-school",
      name: "IIT School",
      logo: "https://cdn-1.webcatalog.io/catalog/iit-school/iit-school-icon-filled-256.png?v=1717862732147"
    },
    {
      id: "english-speaking",
      name: "English Speaking",
      logo: "https://cdn-icons-png.magnific.com/256/5309/5309804.png?semt=ais_white_label"
    }
  ];

  const PW_LOGO = "https://upload.wikimedia.org/wikipedia/commons/7/76/Physics_wallah_logo.jpg";
  const SW_LOGO = "/images/logo.webp";

  /** @type {import("./types/website").Website[]} */
  const WEBSITES = [
    {
      id: "pw-0",
      name: "Physics Wallah OFFICIAL ✅",
      url: "https://www.pw.live/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-1",
      name: "Physics Wallah 🚀",
      url: "https://deltastudy.fun/study-v2/batches",
      logo: "https://i.postimg.cc/dQ75LH4X/image.png",
      category: "physics-wallah"
    },
    {
      id: "pw-2",
      name: "Physics Wallah 🔥",
      url: "https://solaris-gateway-copy-f8171f72.base44.app/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-3",
      name: "Physics Wallah 🌟",
      url: "https://service-401016407438.asia-southeast1.run.app/",
      logo: "https://service-401016407438.asia-southeast1.run.app/assets/xyro_logo_1784951123684-BXR0viUT.jpg",
      category: "physics-wallah"
    },
    {
      id: "pw-4",
      name: "Physics Wallah ✨",
      url: "https://pwthor.live/study/batches",
      logo: "https://pwthor.live/logo.png",
      category: "physics-wallah"
    },
    {
      id: "pw-5",
      name: "Physics Wallah 💥",
      url: "https://eduzex-pw.pages.dev/batches",
      logo: "https://eduzex.is-great.org/pw.png",
      category: "physics-wallah"
    },
    {
      id: "pw-6",
      name: "Physics Wallah ⚡",
      url: "https://physicswalla.studypanda.live/auth",
      logo: "https://i.ibb.co/NnTM9ZwF/studypanda-pw.png",
      category: "physics-wallah"
    },
    {
      id: "pw-7",
      name: "Physics Wallah 💎",
      url: "https://pw.studybeepro.site/auth",
      logo: "https://i.ibb.co/h1YdY795/IMG-4134.png",
      category: "physics-wallah"
    },
    {
      id: "pw-8",
      name: "Physics Wallah 🏆",
      url: "https://pw.studyparcham.in/#home-view",
      logo: "https://i.ibb.co/JRm7BVV3/file-00000000e590820b902af6a255a06b59.png",
      category: "physics-wallah"
    },
    {
      id: "pw-9",
      name: "Physics Wallah 🎯",
      url: "https://pw.primestudy.live/auth",
      logo: "https://files.catbox.moe/oqcdfv.png",
      category: "physics-wallah"
    },
    {
      id: "pw-10",
      name: "Physics Wallah 📚",
      url: "https://nexthope.pages.dev/pw/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-11",
      name: "Physics Wallah 🎓",
      url: "https://s4-cdn.samfygros.com/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-12",
      name: "Physics Wallah 💡",
      url: "https://pw.learntopper.in/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-13",
      name: "Physics Wallah ⭐",
      url: "https://hvyufyfyufuigiugiu.vercel.app/study/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-14",
      name: "Physics Wallah 💯",
      url: "https://wefqwefwefgweg.vercel.app/study/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-15",
      name: "Physics Wallah 👑",
      url: "https://vdk2-main-navy.vercel.app/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw4free",
      name: "Physics Wallah 🌈",
      url: "https://pw4free.in/study/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "vidcloud-eu",
      name: "Physics Wallah 🔥",
      url: "https://vidcloud.eu.org/#batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-lectures-vercel",
      name: "Physics Wallah 💻",
      url: "https://pw-lectures.vercel.app/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "mystudybuddy-pw",
      name: "Physics Wallah 📱",
      url: "https://www.mystudybuddy.in/batches.php",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pwxlearnjh2",
      name: "Physics Wallah 😎",
      url: "https://pwxlearnjh2.vercel.app/login?redirect=%2Fbatches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pwx-pages-dev",
      name: "PWX Study Portal ⚡",
      url: "https://pwx.pages.dev/pw",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-muftukmall",
      name: "PW Muftukmall 🛒",
      url: "https://pw.muftukmall.in/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-studybison",
      name: "StudyBison PW 🦬",
      url: "https://pw.studybison.in/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "akki-studyx-batches",
      name: "Akki StudyX Batches 🚀",
      url: "https://akkistudyx.in/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "edufreek-pw-generate",
      name: "EduFreek PW Generator ⚡",
      url: "https://edufreekpw.infinityfreeapp.com/generate.php",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "edufreek-main",
      name: "EduFreek Portal 🌟",
      url: "https://edufreek.infinityfreeapp.com/?i=1",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "studyratna-s2-cdn",
      name: "StudyRatna CDN 💎",
      url: "https://s2-cdn.studyratna.cc/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "official-pw-ott",
      name: "PW OTT OFFICIAL ✅",
      url: "https://pw.live",
      logo: "https://i.ibb.co/FRDwFWc/20260613-082831.jpg",
      category: "pw-ott-pi-pro"
    },
    {
      id: "pw-ott-1",
      name: "PW OTT 🚀",
      url: "https://pipro.deltastudy.fun/",
      logo: "https://i.ibb.co/FRDwFWc/20260613-082831.jpg",
      category: "pw-ott-pi-pro"
    },
    {
      id: "official-next-toppers",
      name: "Next Toppers OFFICIAL ✅",
      url: "https://nexttoppers.com",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-1",
      name: "Next Toppers 🚀",
      url: "https://nexthope.pages.dev/nt/",
      logo: "https://i.ibb.co/v4k8LdYN/nexthope.png",
      category: "next-toppers"
    },
    {
      id: "nt-2",
      name: "Next Toppers 🔥",
      url: "https://eduvibe-nt.pages.dev/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-3",
      name: "Next Toppers 🌟",
      url: "https://deltastudy.fun/nexttoppers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-4",
      name: "Next Toppers ✨",
      url: "https://nt.studybeepro.site/",
      logo: "https://i.ibb.co/Lzkbgnhz/IMG-4138.png",
      category: "next-toppers"
    },
    {
      id: "nt-5",
      name: "Next Toppers 💥",
      url: "https://studyparcham.in/nt/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-6",
      name: "Next Toppers ⚡",
      url: "https://studypanda.live/nexttoppers",
      logo: "https://i.ibb.co/pBzfccMX/studypanda-nexttopers.png",
      category: "next-toppers"
    },
    {
      id: "nt-7",
      name: "Next Toppers 💎",
      url: "https://nexttopper.primestudy.live/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-8",
      name: "Next Toppers 🏆",
      url: "https://www.nexttoppers.com/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-9",
      name: "Next Toppers 🎯",
      url: "https://nt1.learntopper.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-10",
      name: "Next Toppers 📚",
      url: "https://nexttoppers.asmultiverse.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-11",
      name: "Next Toppers 🎓",
      url: "https://eduvibe-nt.pages.dev/old-batches/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "mystudybuddy-nt",
      name: "Next Toppers 💡",
      url: "https://www.mystudybuddy.in/Next-toppers/index.html",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nexttoppersheked",
      name: "Next Toppers ⭐",
      url: "https://nexttoppersheked.netlify.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "padhaikaadda-nt",
      name: "Next Toppers 💯",
      url: "https://padhaikaadda.in/next-toppers/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nextedu-official",
      name: "Next Toppers 👑",
      url: "https://nextedu-official.netlify.app/nexttoppers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "next-toppersnt-vercel",
      name: "Next Toppers 🌈",
      url: "https://next-toppersnt.vercel.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "learnjh-nt",
      name: "Next Toppers 🔥",
      url: "https://learnjh.vercel.app/nexttoppers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "edunext-base44",
      name: "Next Toppers 💻",
      url: "https://edunext.base44.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "trms-nt",
      name: "Next Toppers 📱",
      url: "https://trms-nt.vercel.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nexttoppersharsh",
      name: "Next Toppers 😎",
      url: "https://nexttoppersharsh.netlify.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-streamfiles",
      name: "Next Toppers 🎉",
      url: "https://nt.streamfiles.eu.org",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-studybison",
      name: "StudyBison Next Toppers 🦬",
      url: "https://nt.studybison.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "edufreek-nt-pages",
      name: "EduFreek Next Toppers 🎯",
      url: "https://edufreeknt.pages.dev/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "mj-1",
      name: "MissionJEET OFFICIAL ✅",
      url: "https://missionjeet.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "pipeline-missionjeet",
      name: "MissionJEET Pipeline 🎯",
      url: "https://pipeline.missionjeet.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-mta",
      name: "MissionJEET 🚀",
      url: "https://mj.mtaiirus.site/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-2",
      name: "MissionJEET 🔥",
      url: "https://mission-jeet.primestudy.live/missionjeet/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-3",
      name: "MissionJEET 🌟",
      url: "https://studyparcham.in/mj/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-4",
      name: "MissionJEET ✨",
      url: "https://deltastudy.fun/missionjeet",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-5",
      name: "MissionJEET 💥",
      url: "https://studypanda.live/missionjeet",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-6",
      name: "MissionJEET ⚡",
      url: "https://studybeepro.site/mj/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-7",
      name: "MissionJEET 💎",
      url: "https://nexthope.pages.dev/mj/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-8",
      name: "MissionJEET 🏆",
      url: "https://missionjeet.modgalaxy.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-9",
      name: "MissionJEET 🎯",
      url: "https://mj.learntopper.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mission-jeet-next",
      name: "MissionJEET 📚",
      url: "https://next-jeet.pages.dev/mission-jeet",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "official-missionjeet",
      name: "MissionJEET 🎓",
      url: "https://missionjeet.in",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "learnjh-missionjeet",
      name: "MissionJEET 💡",
      url: "https://learnjh.vercel.app/missionjeet",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-streamfiles",
      name: "Mission Jeet ⭐",
      url: "https://mj.streamfiles.eu.org/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "mj-studybison",
      name: "StudyBison MissionJEET 🏆",
      url: "https://mj.studybison.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "edufreek-mj",
      name: "EduFreek MissionJEET ⚡",
      url: "https://edufreek.ct.ws/generate.php?platform=mj",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "official-vibrant",
      name: "Vibrant Academy OFFICIAL ✅",
      url: "https://vibrantacademy.com",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "va-1",
      name: "Vibrant Academy 🚀",
      url: "https://nexthope.pages.dev/vb/",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-2",
      name: "Vibrant Academy 🔥",
      url: "https://vb-studysquad.pages.dev/",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-3",
      name: "Vibrant Academy 🌟",
      url: "https://studyparcham.in/vibrant/",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-4",
      name: "Vibrant Academy ✨",
      url: "https://deltastudy.fun/vibrant",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-5",
      name: "Vibrant Academy 💥",
      url: "https://studybeepro.site/vibrante/",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-6",
      name: "Vibrant Academy ⚡",
      url: "https://studypanda.live/vibrant",
      logo: "/images/classx-subject.webp",
      category: "vibrant-academy"
    },
    {
      id: "va-studybison",
      name: "StudyBison Vibrant Academy 🏛️",
      url: "https://va.studybison.in/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "edufreek-vibrant",
      name: "EduFreek Vibrant 🌟",
      url: "https://edufreek.ct.ws/generate.php?platform=vb",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "official-munil-sir",
      name: "Munil Sir OFFICIAL ✅",
      url: "https://study.munilsir.com/",
      logo: "https://nocache-appxdb.classx.co.in/subject/2024-08-09-0.845544467533613.png",
      category: "munil-sir"
    },
    {
      id: "ms-1",
      name: "Munil Sir 🚀",
      url: "https://deltastudy.fun/munilsir",
      logo: "https://nocache-appxdb.classx.co.in/subject/2024-08-09-0.845544467533613.png",
      category: "munil-sir"
    },
    {
      id: "rwa-1",
      name: "RWA OFFICIAL ✅",
      url: "https://rojgarwithankit.co.in/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-2",
      name: "RWA 🚀",
      url: "https://rwa.studybeepro.site/rwax/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-3",
      name: "RWA 🔥",
      url: "https://rwa.studypanda.live/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-4",
      name: "RWA 🌟",
      url: "https://deltastudy.fun/rojgarwithankit",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-5",
      name: "RWA ✨",
      url: "https://rwa-dreamstudy.pages.dev/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-6",
      name: "RWA 💥",
      url: "https://nexthope.pages.dev/rwa/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-7",
      name: "RWA ⚡",
      url: "https://learnbyakp.site/rwa/batch",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-8",
      name: "RWA 💎",
      url: "https://spidy-rwa.vercel.app/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-9",
      name: "RWA 🏆",
      url: "https://rwa.edustream.indevs.in/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "official-rwa",
      name: "RWA 🎯",
      url: "https://rojgarwithankit.co.in",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-sumit-qzz",
      name: "RWA 📚",
      url: "https://rwa.sumit.qzz.io/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "rwa-streamfiles",
      name: "RWA 🎓",
      url: "https://rwa.streamfiles.eu.org/#all",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "sf-1",
      name: "Science And Fun OFFICIAL ✅",
      url: "https://scienceandfun.live/",
      logo: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2022-11-09-0.46231084813575274.png",
      category: "science-and-fun"
    },
    {
      id: "sf-2",
      name: "Science And Fun 🚀",
      url: "https://deltastudy.fun/scienceandfun",
      logo: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2022-11-09-0.46231084813575274.png",
      category: "science-and-fun"
    },
    {
      id: "official-science-fun",
      name: "Science And Fun 🔥",
      url: "https://scienceandfun.live",
      logo: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2022-11-09-0.46231084813575274.png",
      category: "science-and-fun"
    },
    {
      id: "jp-2",
      name: "Just Padhle OFFICIAL ✅",
      url: "https://padhle.in/home/",
      logo: "https://i.ibb.co/fdZ4rc6F/10266.jpg",
      category: "just-padhle"
    },
    {
      id: "jp-1",
      name: "Just Padhle 🚀",
      url: "https://deltastudy.fun/padhle",
      logo: "https://i.ibb.co/fdZ4rc6F/10266.jpg",
      category: "just-padhle"
    },
    {
      id: "official-just-padhle",
      name: "Just Padhle 🔥",
      url: "https://padhle.in",
      logo: "https://i.ibb.co/fdZ4rc6F/10266.jpg",
      category: "just-padhle"
    },
    {
      id: "sw-1",
      name: "Selection Way OFFICIAL ✅",
      url: "https://www.selectionway.com/",
      logo: SW_LOGO,
      category: "selection-way"
    },
    {
      id: "sw-live-vercel",
      name: "Selection Way 🚀",
      url: "https://selectionwaylive.vercel.app/",
      logo: SW_LOGO,
      category: "selection-way"
    },
    {
      id: "sw-2",
      name: "Selection Way 🔥",
      url: "https://deltastudy.fun/sway",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-3",
      name: "Selection Way 🌟",
      url: "https://studybeepro.site/selectionbee/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-4",
      name: "Selection Way ✨",
      url: "https://nexthope.pages.dev/sw/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-5",
      name: "Selection Way 💥",
      url: "https://sw.learntopper.in/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-6",
      name: "Selection Way ⚡",
      url: "https://asmultiverse.in/details?id=selection-way",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-7",
      name: "Selection Way 💎",
      url: "https://nexthope.pages.dev/sw/all-batches",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "sw-8",
      name: "Selection Way 🏆",
      url: "https://selectionwayy.vercel.app/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "official-selection-way",
      name: "Selection Way 🎯",
      url: "https://selectionway.com",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "selection-way-streamfiles",
      name: "Selection Way 📚",
      url: "https://selectionway.streamfiles.eu.org/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "official-unacademy",
      name: "UnAcademy OFFICIAL ✅",
      url: "https://unacademy.com",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-1",
      name: "Unacademy 🚀",
      url: "https://studyuk.online/goal/index.php?change=1",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-2",
      name: "Unacademy 🔥",
      url: "https://studypanda.live/una",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-3",
      name: "Unacademy 🌟",
      url: "https://uncs.pages.dev/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-4",
      name: "Unacademy ✨",
      url: "https://unc.studybeepro.site/of-unc/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-5",
      name: "Unacademy 💥",
      url: "https://unacademy.primestudy.live/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-6",
      name: "Unacademy ⚡",
      url: "https://nexthope.pages.dev/unacademy/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "un-7",
      name: "Unacademy 💎",
      url: "https://unacademy.thescholarverse.site/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "ua-studybison",
      name: "StudyBison UnAcademy 🎓",
      url: "https://uncs.studybison.in/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "edufreek-unacademy",
      name: "EduFreek UnAcademy ⚡",
      url: "https://edufreek.ct.ws/generate.php?platform=unacademy",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "edufreek-unacademy-offline",
      name: "EduFreek UnAcademy Offline 🏢",
      url: "https://edufreek.ct.ws/generate.php?platform=uncoffline",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "official-master-sahab",
      name: "Master Sahab OFFICIAL ✅",
      url: "https://mastersahab.in",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s",
      category: "master-sahab"
    },
    {
      id: "msahab-1",
      name: "Master Sahab 🚀",
      url: "https://deltastudy.fun/mastersahab",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s",
      category: "master-sahab"
    },
    {
      id: "msahab-2",
      name: "Master Sahab 🔥",
      url: "https://mastersahab.studybeepro.site/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s",
      category: "master-sahab"
    },
    {
      id: "msahab-3",
      name: "Master Sahab 🌟",
      url: "https://nexthope.pages.dev/mastersahab/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s",
      category: "master-sahab"
    },
    {
      id: "ms-studybison",
      name: "StudyBison Master Sahab 🎓",
      url: "https://ms.studybison.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIU9FCUpuoM2huY5k-ggVgZIB28M4VKpaS-1NOCixoA&s",
      category: "master-sahab"
    },
    {
      id: "official-test-book",
      name: "Test Book OFFICIAL ✅",
      url: "https://testbook.com",
      logo: "https://i.postimg.cc/bvrQ7HjG/images-(3).png",
      category: "test-book"
    },
    {
      id: "tb-1",
      name: "Test Book 🚀",
      url: "https://test.pwthor.live/",
      logo: "https://i.postimg.cc/bvrQ7HjG/images-(3).png",
      category: "test-book"
    },
    {
      id: "tb-2",
      name: "Test Book 🔥",
      url: "https://repeatermock.com/",
      logo: "https://i.postimg.cc/bvrQ7HjG/images-(3).png",
      category: "test-book"
    },
    {
      id: "official-toppers-wisdom",
      name: "Topper's Wisdom OFFICIAL ✅",
      url: "https://topperswisdom.com",
      logo: "https://i.postimg.cc/NGSDG8B9/logo.png",
      category: "toppers-wisdom"
    },
    {
      id: "tw-1",
      name: "Topper's Wisdom 🚀",
      url: "https://studyapkmod-toperwis.vercel.app/",
      logo: "https://i.postimg.cc/NGSDG8B9/logo.png",
      category: "toppers-wisdom"
    },
    {
      id: "official-study-iq",
      name: "Study IQ OFFICIAL ✅",
      url: "https://studyiq.com",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "siq-1",
      name: "Study IQ 🚀",
      url: "https://asmultiverse.in/details?id=study-iq",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "siq-2",
      name: "Study IQ 🔥",
      url: "https://madxt2z.liveblog365.com/studyiq/?i=2",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "siq-3",
      name: "Study IQ 🌟",
      url: "https://studyiq.thescholarverse.site/auth",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "studyiq-streamfiles",
      name: "Study IQ ✨",
      url: "https://studyiq.streamfiles.eu.org/",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "official-kgs",
      name: "KGS OFFICIAL ✅",
      url: "https://khanglobalstudies.com",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg",
      category: "khan-global-studies"
    },
    {
      id: "kgs-1",
      name: "KGS 🚀",
      url: "https://asmultiverse.in/details?id=Khan%20Global%20Studies",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg",
      category: "khan-global-studies"
    },
    {
      id: "kgs-2",
      name: "KGS 🔥",
      url: "https://studyapkmodkgs.vercel.app/home",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg",
      category: "khan-global-studies"
    },
    {
      id: "kgs-3",
      name: "KGS 🌟",
      url: "https://sahukgs.vercel.app/batches",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg",
      category: "khan-global-studies"
    },
    {
      id: "official-gs-version",
      name: "Gs Version OFFICIAL ✅",
      url: "https://gsvision.co.in/",
      logo: "https://i.postimg.cc/6Qt2YgcB/IMG-20260621-114809.jpg",
      category: "gs-version"
    },
    {
      id: "gsv-1",
      name: "Gs Version 🚀",
      url: "https://gs.learntopper.in/",
      logo: "https://i.postimg.cc/6Qt2YgcB/IMG-20260621-114809.jpg",
      category: "gs-version"
    },
    {
      id: "gsv-2",
      name: "Gs Version 🔥",
      url: "https://nexthope.pages.dev/gsvision/",
      logo: "https://i.postimg.cc/6Qt2YgcB/IMG-20260621-114809.jpg",
      category: "gs-version"
    },
    {
      id: "gsvision-dreamstudy",
      name: "GS Vision 🌟",
      url: "https://gsvision-dreamstudy.pages.dev/",
      logo: "https://i.postimg.cc/6Qt2YgcB/IMG-20260621-114809.jpg",
      category: "gs-version"
    },
    {
      id: "official-futurekul",
      name: "Futurekul OFFICIAL ✅",
      url: "https://futurekul.com",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "fk-1",
      name: "Futurekul 🚀",
      url: "https://pw.learntopper.in/",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "fk-2",
      name: "Futurekul 🔥",
      url: "https://studybeepro.site/futurekul/",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "fk-3",
      name: "Futurekul 🌟",
      url: "https://nexthope.pages.dev/futurekul/",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "fk-dreamstudy",
      name: "Futurekul ✨",
      url: "https://futurekul-dreamstudy.pages.dev/",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "fl-studybison",
      name: "StudyBison Futurekul 🚀",
      url: "https://fl.studybison.in/",
      logo: "https://i.postimg.cc/z3YX3H2x/images-(1).jpg",
      category: "futurekul"
    },
    {
      id: "official-cds-journey",
      name: "CDS JOURNEY OFFICIAL ✅",
      url: "https://cdsjourney.com",
      logo: "https://i.postimg.cc/RZKjTBwV/images-(2).jpg",
      category: "cds-journey"
    },
    {
      id: "cdsj-1",
      name: "CDS JOURNEY 🚀",
      url: "https://merry-flan-8b1dd4.netlify.app/#batches",
      logo: "https://i.postimg.cc/RZKjTBwV/images-(2).jpg",
      category: "cds-journey"
    },
    {
      id: "cds-streamfiles",
      name: "CDS Journey 🔥",
      url: "https://cds.streamfiles.eu.org/",
      logo: "https://i.postimg.cc/RZKjTBwV/images-(2).jpg",
      category: "cds-journey"
    },
    {
      id: "official-career-will",
      name: "Career Will OFFICIAL ✅",
      url: "https://careerwill.com",
      logo: "https://careerwillforpc.com.in/wp-content/uploads/2026/03/careerwill-pc.png",
      category: "career-will"
    },
    {
      id: "cw-1",
      name: "Career Will 🚀",
      url: "https://asmultiverse.in/details?id=Career%20Will",
      logo: "https://careerwillforpc.com.in/wp-content/uploads/2026/03/careerwill-pc.png",
      category: "career-will"
    },
    {
      id: "cw-2",
      name: "Career Will 🔥",
      url: "https://runtkyp.xo.je/?i=1",
      logo: "https://careerwillforpc.com.in/wp-content/uploads/2026/03/careerwill-pc.png",
      category: "career-will"
    },
    {
      id: "official-sachin-academy",
      name: "Sachin Academy OFFICIAL ✅",
      url: "https://sachinacademy.com",
      logo: "https://i.postimg.cc/HkTLk8ZY/images-2026-07-14T141545-975.jpg",
      category: "sachin-academy"
    },
    {
      id: "sa-1",
      name: "Sachin Academy 🚀",
      url: "https://sachinclassex1.vercel.app/",
      logo: "https://i.postimg.cc/HkTLk8ZY/images-2026-07-14T141545-975.jpg",
      category: "sachin-academy"
    },
    {
      id: "official-vidhyakul",
      name: "Vidhyakul OFFICIAL ✅",
      url: "https://vidyakul.com",
      logo: "https://cdn-1.webcatalog.io/catalog/vidyakul/vidyakul-icon-filled-256.webp?v=1714780458007",
      category: "vidhyakul"
    },
    {
      id: "vk-1",
      name: "Vidhyakul 🚀",
      url: "https://vidyakool.streamfiles.eu.org/",
      logo: "https://cdn-1.webcatalog.io/catalog/vidyakul/vidyakul-icon-filled-256.webp?v=1714780458007",
      category: "vidhyakul"
    },
    {
      id: "official-md-classes",
      name: "MD classes OFFICIAL ✅",
      url: "https://mdclasses.classx.co.in/",
      logo: "https://i.postimg.cc/bwbmK3zB/download-(2).jpg",
      category: "md-classes"
    },
    {
      id: "mdc-1",
      name: "MD Classes 🚀",
      url: "https://mdclassesx.vercel.app/",
      logo: "https://i.postimg.cc/bwbmK3zB/download-(2).jpg",
      category: "md-classes"
    },
    {
      id: "official-utkarsh",
      name: "Utkarsh OFFICIAL ✅",
      url: "https://utkarsh.com",
      logo: "https://dicb8ki8nr06d.cloudfront.net/webiste_public/images/utkarsh_logo.webp",
      category: "utkarsh-classes"
    },
    {
      id: "utk-1",
      name: "Utkarsh 🚀",
      url: "https://asmultiverse.in/details?id=Utkarsh%20Classes",
      logo: "https://dicb8ki8nr06d.cloudfront.net/webiste_public/images/utkarsh_logo.webp",
      category: "utkarsh-classes"
    },
    {
      id: "official-apna-college",
      name: "Apna College OFFICIAL ✅",
      url: "https://www.apnacollege.in/",
      logo: "https://i.ibb.co/0y74Ks8X/x.jpg",
      category: "apna-college"
    },
    {
      id: "ac-1",
      name: "Apna College 🚀",
      url: "https://asmultiverse.in/details?id=apna-college-mod-apk",
      logo: "https://i.ibb.co/0y74Ks8X/x.jpg",
      category: "apna-college"
    },
    {
      id: "official-education-baba",
      name: "Education Baba OFFICIAL ✅",
      url: "https://educationbaba.com",
      logo: "https://i.ibb.co/9kSMLvKQ/x.jpg",
      category: "education-baba"
    },
    {
      id: "eb-1",
      name: "Education Baba 🚀",
      url: "https://asmultiverse.in/details?id=education-baba",
      logo: "https://i.ibb.co/9kSMLvKQ/x.jpg",
      category: "education-baba"
    },
    {
      id: "official-test-ranker",
      name: "Test Ranker OFFICIAL ✅",
      url: "https://www.testranking.in/",
      logo: "https://i.postimg.cc/1XBncYSw/images-(5).jpg",
      category: "test-ranker"
    },
    {
      id: "tr-1",
      name: "Test Ranker 🚀",
      url: "https://testranking.examsaathi.site/",
      logo: "https://i.postimg.cc/1XBncYSw/images-(5).jpg",
      category: "test-ranker"
    },
    {
      id: "official-target-board",
      name: "Target Board OFFICIAL ✅",
      url: "https://targetboard.com",
      logo: "https://i.postimg.cc/MZy8cDF6/download.jpg",
      category: "target-board"
    },
    {
      id: "tgb-1",
      name: "Target Board 🚀",
      url: "https://nexthope.pages.dev/targetboard/",
      logo: "https://i.postimg.cc/MZy8cDF6/download.jpg",
      category: "target-board"
    },
    {
      id: "official-book",
      name: "BOOK OFFICIAL ✅",
      url: "https://books.com",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "bk-1",
      name: "BOOK 🚀",
      url: "https://bookverse.deltastudy.fun/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "bk-2",
      name: "BOOK 🔥",
      url: "https://studypanda.live/books",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "bk-3",
      name: "BOOK 🌟",
      url: "https://books.studybeepro.site/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "bk-4",
      name: "BOOK ✨",
      url: "https://nexthope.pages.dev/pinnacle/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "pinnacle-dreamstudy-books",
      name: "BOOK 💥",
      url: "https://pinnacle-dreamstudy.pages.dev/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "learnjh-books",
      name: "Books ⚡",
      url: "https://learnjh.vercel.app/books",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "pw-books-streamfiles",
      name: "Pw Books 💎",
      url: "https://books.streamfiles.eu.org/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "books-studybison",
      name: "StudyBison Books 📚",
      url: "https://books.studybison.in/",
      logo: "https://st2.depositphotos.com/3573725/6541/v/450/depositphotos_65413355-stock-illustration-book-logo.jpg",
      category: "book"
    },
    {
      id: "padhle-akshay-official",
      name: "Padhle Akshay OFFICIAL ✅",
      url: "https://eduzex.is-great.org/padhleakshay/batches.php",
      logo: "https://framerusercontent.com/images/N5AlmRNRnQQa7FnlvrGcUzUhZGY.png?scale-down-to=512",
      category: "padhle-akshay"
    },
    {
      id: "nextedu-padhle-akshay",
      name: "Padhle Akshay 🚀",
      url: "https://nextedu-official.netlify.app/padhle-akshay/",
      logo: "https://framerusercontent.com/images/N5AlmRNRnQQa7FnlvrGcUzUhZGY.png?scale-down-to=512",
      category: "padhle-akshay"
    },
    {
      id: "all-competition-classes",
      name: "All Competition OFFICIAL ✅",
      url: "https://www.allcompetitionclasses.com/",
      logo: "https://img.magnific.com/free-vector/corporate-leadership-bullseye-concept-background-company-success_1017-63147.jpg?semt=ais_hybrid&w=740&q=80",
      category: "all-competition"
    },
    {
      id: "iit-school-1",
      name: "IIT School OFFICIAL ✅",
      url: "https://www.iitschool.in/",
      logo: "https://cdn-1.webcatalog.io/catalog/iit-school/iit-school-icon-filled-256.png?v=1717862732147",
      category: "iit-school"
    },
    {
      id: "iit-school-2",
      name: "IIT School 🚀",
      url: "https://others.streamfiles.eu.org",
      logo: "https://cdn-1.webcatalog.io/catalog/iit-school/iit-school-icon-filled-256.png?v=1717862732147",
      category: "iit-school"
    },
    {
      id: "pw-rolexcoderz",
      name: "PW Rolex Coderz",
      url: "https://rolexcoderz.com/PW/",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-marco",
      name: "PW Marco",
      url: "https://www.pwmarco.site/study/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-testmain",
      name: "PW Test Main",
      url: "https://pwtestmainnewsite.vercel.app/auth",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pw-studyspark",
      name: "PW StudySpark Verify",
      url: "https://studyspark.study/verify",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "pipro-studyspark",
      name: "Pi Pro StudySpark",
      url: "https://pi.studyspark.study/",
      logo: "https://i.ibb.co/FRDwFWc/20260613-082831.jpg",
      category: "pw-ott-pi-pro"
    },
    {
      id: "vibrant-rolexcoderz",
      name: "Vibrant Rolex Coderz",
      url: "https://rolexcoderz.com/VT/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "vibrant-studyspark",
      name: "Vibrant StudySpark",
      url: "https://vt.studyspark.pro/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "nt-rolexcoderz",
      name: "Next Toppers Rolex Coderz",
      url: "https://rolexcoderz.com/NT",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-studyspark",
      name: "Next Toppers StudySpark",
      url: "https://nt.studyspark.pro/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-videocrypt",
      name: "Next Toppers VideoCrypt",
      url: "https://nexttoppers.videocrypt.in/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-verify-key",
      name: "Next Toppers Verify Key",
      url: "https://next-toppersnt.vercel.app/verify-key",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-heked",
      name: "Next Toppers Heked",
      url: "https://nexttoppersheked.netlify.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "nt-official-vercel",
      name: "Next Toppers Official Vercel",
      url: "https://nexttoppers-official.vercel.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "missionjeet-studyspark",
      name: "MissionJEET StudySpark",
      url: "https://jeet.studyspark.pro/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "english-speaking-ar",
      name: "English Speaking AR",
      url: "https://rolexcoderz.com/AR/",
      logo: "/images/english_speaking_logo.jpg",
      category: "english-speaking"
    },
    {
      id: "studyiq-spidy",
      name: "Study IQ Spidy Portal",
      url: "https://spidyiq.vercel.app/",
      logo: "https://i.postimg.cc/yNGghPfd/download.png",
      category: "study-iq"
    },
    {
      id: "selection-way-pages",
      name: "Selection Way 3DX Portal",
      url: "https://newsw-3dx.pages.dev/",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "cds-journey-spidy",
      name: "CDS Journey Spidy Universe",
      url: "https://spidyuniversecds.vercel.app/",
      logo: "https://i.postimg.cc/RZKjTBwV/images-(2).jpg",
      category: "cds-journey"
    },
    {
      id: "next-toppers-spidy",
      name: "Next Toppers Spidy Portal",
      url: "https://spidytopper.vercel.app/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "unacademy-spidy",
      name: "Unacademy Spidy Portal",
      url: "https://spidyunacademy.vercel.app/",
      logo: "https://i.postimg.cc/PJj1bKn9/images-2026-07-02T231828-233.png",
      category: "unacademy"
    },
    {
      id: "vidyagram-workers-bat",
      name: "Vidyagram BAT Portal",
      url: "https://bat.vidyagram.workers.dev/",
      logo: "https://cdn-1.webcatalog.io/catalog/vidyakul/vidyakul-icon-filled-256.webp?v=1714780458007",
      category: "vidhyakul"
    },
    {
      id: "rojgar-with-ankit-workers-bat",
      name: "Rojgar With Ankit BAT Portal",
      url: "https://bat.rwaa.workers.dev/",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2025-02-10-0.12268714003029602.jpeg",
      category: "rojgar-with-ankit"
    },
    {
      id: "khan-global-studies-workers-bat",
      name: "Khan GS BAT Portal",
      url: "https://bat.kgss.workers.dev/",
      logo: "https://i.postimg.cc/zXnQX9Bc/images-2026-07-06T121712-741.jpg",
      category: "khan-global-studies"
    },
    {
      id: "next-topper-workers-bat",
      name: "Next Topper BAT Portal",
      url: "https://bat.nexttopper.workers.dev/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "careerwill-workers-bat",
      name: "Careerwill BAT Portal",
      url: "https://bat.careerw.workers.dev/",
      logo: "https://careerwillforpc.com.in/wp-content/uploads/2026/03/careerwill-pc.png",
      category: "career-will"
    },
    {
      id: "pw-learnxpw-batches",
      name: "PW LearnX Batches",
      url: "https://www.learnxpw.site/study/batches",
      logo: PW_LOGO,
      category: "physics-wallah"
    },
    {
      id: "next-toppers-learnxpw",
      name: "Next Toppers LearnX Portal",
      url: "https://www.learnxpw.site/study/nexttoppers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mUiY27Zw1lOwzgyGbwpdWlVgzDEZGmrfjfZqT0XGew&s",
      category: "next-toppers"
    },
    {
      id: "missionjeet-learnxpw",
      name: "MissionJEET LearnX Portal",
      url: "https://www.learnxpw.site/study/missionjeet",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhmAX6UC18CYhwU2a6f7gn9E5WE0g4hzSQK2zyH_nVA&s",
      category: "missionjeet"
    },
    {
      id: "vibrant-learnxpw",
      name: "Vibrant Academy LearnX Portal",
      url: "https://www.learnxpw.site/study/vibrant",
      logo: "https://nocache-appxdb-v2.classx.co.in/subject/2026-02-24-0.8461171343418096.png",
      category: "vibrant-academy"
    },
    {
      id: "selection-way-learnxpw",
      name: "Selection Way LearnX Portal",
      url: "https://www.learnxpw.site/study/sway",
      logo: "https://www.selectionway.com/next_images/logo.png",
      category: "selection-way"
    },
    {
      id: "pw-ott-pi-pro-learnxpw",
      name: "Pi Pro LearnX Portal",
      url: "https://www.learnxpw.site/study/pi",
      logo: "https://i.ibb.co/FRDwFWc/20260613-082831.jpg",
      category: "pw-ott-pi-pro"
    }
  ];

  // Generate Hero Carousel Slides dynamically from all categories
  const heroSlidesData = categoriesData.map(cat => ({
    id: `slide-${cat.id}`,
    title: cat.name,
    logo: cat.logo,
    buttonText: 'Explore Now'
  }));

  const defaultRecentlyVisited = [
    {
      id: 'rec-1',
      title: 'Arrival of Europeans in India',
      category: 'History',
      subtitle: 'Modern History • 42m left',
      badge: 'HIST-01',
      progress: 75,
      gradient: 'thumb-gradient-history',
      glyph: '⛵ 🏛️'
    },
    {
      id: 'rec-2',
      title: 'Root Words (Part-1)',
      category: 'English',
      subtitle: 'English Grammar • 18m left',
      badge: 'VOCAB',
      progress: 48,
      gradient: 'thumb-gradient-vocab',
      glyph: '🌱'
    },
    {
      id: 'rec-3',
      title: 'Universe & Cosmology',
      category: 'Physics',
      subtitle: 'Astrophysics • 55m left',
      badge: 'PHYS-04',
      progress: 25,
      gradient: 'thumb-gradient-space',
      glyph: '🌌 ✨'
    },
    {
      id: 'rec-4',
      title: 'Organic Reaction Mechanisms',
      category: 'Chemistry',
      subtitle: 'Organic Chemistry • 8m left',
      badge: 'CHEM-09',
      progress: 90,
      gradient: 'thumb-gradient-chem',
      glyph: '⬡ 🧪'
    },
    {
      id: 'rec-5',
      title: 'Integration by Parts Formula Sheet',
      category: 'Mathematics',
      subtitle: 'Calculus • 12m left',
      badge: 'MATH-03',
      progress: 60,
      gradient: 'thumb-gradient-math',
      glyph: '∫'
    }
  ];

  // ==================== DOM ELEMENTS ====================
  const splashScreen = document.getElementById('splash-screen');
  const skipSplashBtn = document.getElementById('skip-splash-btn');
  const replaySplashBtn = document.getElementById('replay-splash-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const searchInput = document.getElementById('subject-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const openCategoryBtn = document.getElementById('open-category-filter-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const categorySidebar = document.getElementById('category-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sidebarCategoriesList = document.getElementById('sidebar-categories-list');
  const quickChips = document.querySelectorAll('.filter-chip');
  const heroSlidesContainer = document.getElementById('hero-slides-container');
  const heroDotsContainer = document.getElementById('hero-dots-container');
  const heroCarousel = document.getElementById('hero-carousel');
  const categoriesRectContainer = document.getElementById('categories-rect-container');
  const categoryCountPill = document.getElementById('category-count-pill');
  const recentCardsContainer = document.getElementById('recent-cards-container');
  const recentEmptyState = document.getElementById('recent-empty-state');
  const savedItemsContainer = document.getElementById('saved-items-container');
  const savedEmptyState = document.getElementById('saved-empty-state');
  const savedCounter = document.getElementById('saved-counter');
  const bottomNavButtons = document.querySelectorAll('.bottom-nav .nav-item');
  const toastEl = document.getElementById('app-toast');

  // URL Parameters for testing, deep-linking & screenshots
  const urlParams = new URLSearchParams(window.location.search);
  const shouldSkipSplash = urlParams.get('skipSplash') === 'true';
  const shouldTestSwipe = urlParams.get('testSwipe') === 'true';
  const shouldTestPull = urlParams.get('testPull') === 'true';
  const initialTheme = urlParams.get('theme');
  const initialTab = urlParams.get('tab');
  const shouldOpenDrawer = urlParams.get('openDrawer') === 'true';
  const shouldScrollToBottom = urlParams.get('scrollToBottom') === 'true';

  // Apply theme immediately on startup so splash screen has correct PRO / LITE badge
  const brandLogoToggle = document.getElementById('brand-logo-theme-toggle');
  const themeStatusBadge = document.getElementById('theme-status-badge');
  const savedTheme = localStorage.getItem('studyWithGauravTheme') || localStorage.getItem('theme');
  const currentTheme = initialTheme || savedTheme || 'dark';
  if (!savedTheme) {
    localStorage.setItem('studyWithGauravTheme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('studyWithGauravTheme', theme);
    localStorage.setItem('theme', theme);

    // Update all PRO / LITE badges across app (Header & Splash Screen)
    const allProBadges = document.querySelectorAll('.pro-badge');
    allProBadges.forEach(badge => {
      if (theme === 'light') {
        badge.textContent = 'LITE';
        badge.classList.add('badge-light-mode');
      } else {
        badge.textContent = 'PRO';
        badge.classList.remove('badge-light-mode');
      }
    });

    if (typeof updateSpotlightPosition === 'function') updateSpotlightPosition();
  }

  applyTheme(currentTheme);

  // ==================== IN-MEMORY & LOCALSTORAGE DATA / LOGO CACHING ====================
  const MEMORY_CACHE = {
    appLogo: localStorage.getItem('gt_cached_app_logo') || '',
    categories: null,
    websites: null
  };

  function cacheAppDataInMemory() {
    try {
      // 1. Cache Categories and Websites data into memory and LocalStorage
      MEMORY_CACHE.categories = categoriesData;
      MEMORY_CACHE.websites = WEBSITES;
      localStorage.setItem('gt_cached_categories', JSON.stringify(categoriesData));
      localStorage.setItem('gt_cached_websites', JSON.stringify(WEBSITES));

      // 2. Pre-cache app logo as base64 data URI if not already cached
      if (!MEMORY_CACHE.appLogo) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'Anonymous';
        logoImg.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = logoImg.naturalWidth || 128;
            canvas.height = logoImg.naturalHeight || 128;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(logoImg, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            if (dataUrl && dataUrl.startsWith('data:image/')) {
              MEMORY_CACHE.appLogo = dataUrl;
              localStorage.setItem('gt_cached_app_logo', dataUrl);
            }
          } catch (e) {
            console.warn('Canvas logo cache failed:', e);
          }
        };
        logoImg.src = 'assets/logo.png';
      }
    } catch (err) {
      console.warn('Could not cache app data to memory/localStorage:', err);
    }
  }

  cacheAppDataInMemory();

  function recoverOfflineMedia() {
    const cachedLogo = MEMORY_CACHE.appLogo || localStorage.getItem('gt_cached_app_logo') || 'assets/logo.png';
    // Restore brand & splash logos
    document.querySelectorAll('.brand-logo, .splash-logo').forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        img.src = cachedLogo;
      }
    });
    // Restore cards logo
    document.querySelectorAll('.allapps-card').forEach(card => {
      const img = card.querySelector('img');
      const originalSrc = card.getAttribute('data-logo-src') || (img ? img.getAttribute('data-original-src') : '');
      if (img && (!img.complete || img.naturalWidth === 0)) {
        if (originalSrc && navigator.onLine) {
          img.src = originalSrc;
        } else {
          img.src = cachedLogo;
        }
      }
    });
  }

  // ==================== TOAST NOTIFICATION ====================
  let toastTimer;
  function showToast(message) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2400);
  }

  // ==================== 1. SPLASH SCREEN LOGIC ====================
  function hideSplashScreenImmediate() {
    if (!splashScreen) return;
    document.documentElement.classList.add('splash-already-shown');
    splashScreen.classList.add('hide');
    splashScreen.style.display = 'none';
    splashScreen.style.opacity = '0';
    splashScreen.style.visibility = 'hidden';
  }

  function hideSplashScreen() {
    if (!splashScreen || splashScreen.classList.contains('hide')) return;
    document.documentElement.classList.add('splash-already-shown');
    splashScreen.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s ease';
    splashScreen.style.opacity = '0';
    splashScreen.style.transform = 'scale(1.05)';
    setTimeout(() => {
      splashScreen.classList.add('hide');
      splashScreen.style.display = 'none';
    }, 460);
  }

  function replaySplashScreen() {
    if (!splashScreen) return;
    document.documentElement.classList.remove('splash-already-shown');
    splashScreen.classList.remove('hide');
    splashScreen.style.display = 'flex';
    splashScreen.style.opacity = '1';
    splashScreen.style.transform = 'none';
    splashScreen.style.visibility = 'visible';
    const logoRow = splashScreen.querySelector('.splash-logo-row');
    if (logoRow) {
      logoRow.style.animation = 'none';
      void logoRow.offsetWidth; // trigger reflow
      logoRow.style.animation = 'splashZoomInOut 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
    }
    setTimeout(hideSplashScreen, 3000);
  }

  if (shouldSkipSplash || localStorage.getItem('gt_splash_shown') === 'true') {
    hideSplashScreenImmediate();
  } else {
    if (splashScreen) {
      document.documentElement.classList.remove('splash-already-shown');
      splashScreen.classList.remove('hide');
      splashScreen.style.display = 'flex';
      splashScreen.style.opacity = '1';
      splashScreen.style.visibility = 'visible';
      const logoRow = splashScreen.querySelector('.splash-logo-row');
      if (logoRow) {
        logoRow.style.animation = 'none';
        void logoRow.offsetWidth; // trigger reflow
        logoRow.style.animation = 'splashZoomInOut 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
      }
    }
    // Dismiss native splash screen once web splash screen is ready to take over
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.SplashScreen) {
      try {
        window.Capacitor.Plugins.SplashScreen.hide();
      } catch (e) {}
    }
    setTimeout(hideSplashScreen, 3000);
  }

  if (splashScreen) {
    splashScreen.addEventListener('click', hideSplashScreen);
  }

  if (replaySplashBtn) {
    replaySplashBtn.addEventListener('click', replaySplashScreen);
  }

  // ==================== 2. DAILY STREAK & XP SYSTEM ====================
  const headerStreakPill = document.getElementById('header-streak-pill');
  const headerStreakValue = document.getElementById('header-streak-value');

  function checkAndRecordStreak() {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      let streak = parseInt(localStorage.getItem('studyWithGauravStreak') || '1', 10);
      const lastVisit = localStorage.getItem('studyWithGauravLastVisitDate');

      if (!lastVisit) {
        // First visit
        streak = 1;
        localStorage.setItem('studyWithGauravStreak', streak.toString());
        localStorage.setItem('studyWithGauravLastVisitDate', todayStr);
      } else if (lastVisit === todayStr) {
        // Already recorded today, maintain streak
      } else {
        const lastDate = new Date(lastVisit);
        // Calculate difference in whole calendar days
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive 24-hour / daily return!
          streak += 1;
          const currentXp = parseInt(localStorage.getItem('studyWithGauravXP') || '439', 10) + 20;
          localStorage.setItem('studyWithGauravXP', currentXp.toString());
          setTimeout(() => {
            showToast(`🔥 ${streak} Day Streak Unlocked! (+20 XP Daily Bonus)`);
          }, 1200);
        } else if (diffDays > 1) {
          // Missed days - reset to 1
          streak = 1;
        }
        localStorage.setItem('studyWithGauravStreak', streak.toString());
        localStorage.setItem('studyWithGauravLastVisitDate', todayStr);
      }

      if (headerStreakValue) {
        headerStreakValue.textContent = streak;
      }
      return streak;
    } catch (e) {
      console.warn('Could not compute streak', e);
      return 1;
    }
  }

  const currentStreak = checkAndRecordStreak();

  if (headerStreakPill) {
    headerStreakPill.addEventListener('click', () => {
      const streak = localStorage.getItem('studyWithGauravStreak') || '1';
      showToast(`🔥 ${streak} Day Streak Active! Visit daily to maintain your streak.`);
    });
  }

  // ==================== 3. LIGHT / DARK THEME (TOGGLED VIA LOGO) ====================
  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = active === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  if (brandLogoToggle) {
    brandLogoToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
    brandLogoToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // ==================== 3. LOCAL STORAGE DATA HELPERS ====================
  function getRecentlyVisited() {
    try {
      const stored = localStorage.getItem('studyWithGauravRecentlyVisited');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not parse recently visited', e);
    }
    localStorage.setItem('studyWithGauravRecentlyVisited', JSON.stringify(defaultRecentlyVisited));
    return defaultRecentlyVisited;
  }

  function setRecentlyVisited(list) {
    localStorage.setItem('studyWithGauravRecentlyVisited', JSON.stringify(list.slice(0, 10)));
  }

  function getSavedItems() {
    try {
      const stored = localStorage.getItem('studyWithGauravSavedItems');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Only return real websites saved by user, discard dummy samples
          return parsed.filter(p => p && p.id && !p.id.startsWith('rec-'));
        }
      }
    } catch (e) {
      console.warn('Could not parse saved items', e);
    }
    // No auto-saved or sample seeds! Only real-time user-saved websites.
    return [];
  }

  function toggleSaveItem(item, cardElement = null) {
    let saved = getSavedItems();
    const existsIndex = saved.findIndex(s => s.id === item.id);
    const wasSaved = existsIndex !== -1;

    if (wasSaved) {
      saved.splice(existsIndex, 1);
      localStorage.setItem('studyWithGauravSavedItems', JSON.stringify(saved));
      showToast(`Removed from Library`);

      // If removed from within the Library screen container, animate card disappearance smoothly
      if (cardElement && cardElement.parentElement && cardElement.parentElement.id === 'saved-items-container') {
        cardElement.classList.add('removing');
        setTimeout(() => {
          cardElement.remove();
          const remaining = saved.length;
          if (savedCounter) {
            savedCounter.textContent = `${remaining} item${remaining === 1 ? '' : 's'}`;
          }
          if (remaining === 0 && savedEmptyState) {
            savedEmptyState.style.display = 'flex';
          }
        }, 320);
      }
    } else {
      saved.unshift({
        id: item.id,
        title: item.title || item.name,
        name: item.title || item.name,
        category: item.category,
        desc: item.desc || item.url,
        url: item.desc || item.url,
        logo: item.logo || PW_LOGO
      });
      localStorage.setItem('studyWithGauravSavedItems', JSON.stringify(saved));
      showToast(`Saved to Library ★`);
    }

    // Update counter
    if (savedCounter) {
      savedCounter.textContent = `${saved.length} item${saved.length === 1 ? '' : 's'}`;
    }

    // Sync all bookmark buttons across the app for this item ID
    const isSavedNow = !wasSaved;
    document.querySelectorAll(`.allapps-save-btn[data-id="${item.id}"]`).forEach(btn => {
      btn.classList.toggle('is-saved', isSavedNow);
      btn.setAttribute('aria-label', isSavedNow ? 'Remove from saved' : 'Save to library');
      btn.setAttribute('title', isSavedNow ? 'Saved' : 'Save');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isSavedNow ? 'currentColor' : 'none');
    });

    // If currently on library screen and card was not animated away, re-render
    if (!cardElement || cardElement.parentElement?.id !== 'saved-items-container') {
      const activeScreen = navHistoryStack[navHistoryStack.length - 1];
      if (activeScreen === 'library') {
        renderSavedScreen();
      }
    }
  }

  // ==================== 4. CATEGORY SIDEBAR DRAWER ====================
  function openDrawer() {
    if (!categorySidebar || !sidebarBackdrop) return;
    categorySidebar.classList.add('open');
    sidebarBackdrop.classList.add('open');
    categorySidebar.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-lock');
  }

  function closeDrawer() {
    if (!categorySidebar || !sidebarBackdrop) return;
    categorySidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
    categorySidebar.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-lock');
  }

  if (openCategoryBtn) openCategoryBtn.addEventListener('click', openDrawer);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeDrawer);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && categorySidebar?.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Render Category Items in Drawer with logos
  function renderSidebarCategories() {
    if (!sidebarCategoriesList) return;
    sidebarCategoriesList.innerHTML = categoriesData.map((cat, idx) => `
      <button class="sidebar-cat-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat.name}" data-id="${cat.id}" type="button">
        <div class="sidebar-cat-left">
          <div class="sidebar-cat-logo-wrap">
            <img src="${cat.logo}" alt="${cat.name} Logo" class="sidebar-cat-logo" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <span class="sidebar-cat-logo-fallback" style="display:none;">📚</span>
          </div>
          <span class="sidebar-cat-title">${cat.name}</span>
        </div>
        <svg class="sidebar-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    `).join('');

    sidebarCategoriesList.querySelectorAll('.sidebar-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sidebarCategoriesList.querySelectorAll('.sidebar-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const catName = btn.getAttribute('data-cat');
        showToast(`Category: ${catName}`);
        closeDrawer();

        const currentChips = document.querySelectorAll('.filter-chip');
        currentChips.forEach(chip => {
          if (chip.getAttribute('data-filter')?.toLowerCase() === catName.toLowerCase()) {
            currentChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });

        filterCardsByCategory(catName);
      });
    });
  }
  renderSidebarCategories();

  // Populate horizontal category chips dynamically with logos
  const categoryChipsTrack = document.getElementById('category-chips-track');
  if (categoryChipsTrack) {
    categoryChipsTrack.innerHTML = categoriesData.map(cat => `
      <button class="filter-chip" data-filter="${cat.name}" role="tab" aria-selected="false">
        <img src="${cat.logo}" alt="${cat.name}" class="chip-logo" loading="lazy" onerror="this.style.display='none';" />
        <span>${cat.name}</span>
      </button>
    `).join('');

    categoryChipsTrack.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');
        const isAlreadyActive = chip.classList.contains('active');

        if (isAlreadyActive) {
          // Toggle off if already active -> redirect to home page
          chip.classList.remove('active');
          chip.setAttribute('aria-selected', 'false');
          closeCategoryWebsites();
          switchScreen('home');
        } else {
          categoryChipsTrack.querySelectorAll('.filter-chip').forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-selected', 'false');
          });
          chip.classList.add('active');
          chip.setAttribute('aria-selected', 'true');
          showToast(`Category: ${filter}`);
          filterCardsByCategory(filter);
        }
      });
    });
  }

  let currentSelectedCategory = null;

  function closeCategoryWebsites() {
    currentSelectedCategory = null;
    const categoryExploreSection = document.getElementById('category-explore-section');
    if (categoryExploreSection) {
      categoryExploreSection.style.display = 'none';
    }
    if (categoriesRectContainer) {
      categoriesRectContainer.querySelectorAll('.category-rect-box').forEach(b => b.classList.remove('active'));
    }
    if (categoryChipsTrack) {
      categoryChipsTrack.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
    }
    // Redirect to home screen
    switchScreen('home');
  }


  // ==================== 5. HERO SLIDER CAROUSEL ====================
  let currentHeroIndex = 0;
  let heroTimer = null;

  function renderHeroSlider() {
    if (!heroSlidesContainer) return;

    heroSlidesContainer.innerHTML = heroSlidesData.map((slide, idx) => `
      <article class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}" role="tabpanel" aria-label="${slide.title}">
        <div class="hero-card">
          <!-- Category Logo Blurred Background -->
          <div class="hero-card-blur-bg" style="background-image: url('${slide.logo}');"></div>
          <div class="hero-card-scrim"></div>

          <!-- Category Name Title -->
          <h2 class="hero-slide-title">${slide.title}</h2>

          <!-- Category Logo Badge with Frosted Blur Backdrop -->
          <div class="hero-category-logo-wrap">
            <div class="hero-logo-blur-backdrop" style="background-image: url('${slide.logo}');"></div>
            <img src="${slide.logo}" alt="${slide.title} Logo" class="hero-category-logo-img" loading="lazy" onerror="this.onerror=null; this.src='assets/logo.png';" />
          </div>

          <div class="hero-slide-spacer"></div>

          <!-- CTA Button: Explore Now -->
          <button class="hero-watch-btn" type="button" data-title="${slide.title}" aria-label="Explore ${slide.title} Now">
            Explore Now
          </button>
        </div>
      </article>
    `).join('');

    if (heroDotsContainer) {
      heroDotsContainer.style.display = 'none';
    }

    // Attach CTA events: Explore Now filters category and scrolls to courses
    heroSlidesContainer.querySelectorAll('.hero-watch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const categoryName = btn.getAttribute('data-title');
        showToast(`Exploring ${categoryName} 🚀`);
        filterCardsByCategory(categoryName);
        const chipsTrack = document.getElementById('category-chips-track');
        if (chipsTrack) {
          chipsTrack.querySelectorAll('.filter-chip').forEach(chip => {
            if (chip.getAttribute('data-filter')?.toLowerCase() === categoryName.toLowerCase()) {
              chip.classList.add('active');
            } else {
              chip.classList.remove('active');
            }
          });
        }
        if (recentCardsContainer) {
          recentCardsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function goToSlide(index) {
    if (!heroSlidesContainer) return;
    const slides = heroSlidesContainer.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    currentHeroIndex = (index + heroSlidesData.length) % heroSlidesData.length;
    heroSlidesContainer.style.transform = `translateX(-${currentHeroIndex * 100}%)`;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentHeroIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentHeroIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentHeroIndex - 1);
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroTimer = setInterval(nextSlide, 5000);
  }

  function stopHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
  }

  renderHeroSlider();
  startHeroAutoplay();

  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopHeroAutoplay);
    heroCarousel.addEventListener('mouseleave', startHeroAutoplay);

    // Touch / Pointer Swipe
    let touchStartX = 0;
    let touchStartY = 0;
    heroCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      stopHeroAutoplay();
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      // Only horizontal swipes
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) nextSlide();
        else prevSlide();
      }
      startHeroAutoplay();
    }, { passive: true });
  }

  // ==================== 5b. CATEGORY RECTANGULAR BOXES ====================
  function renderCategoryRectangles(activeCategory = 'All') {
    if (!categoriesRectContainer) return;

    if (categoryCountPill) {
      categoryCountPill.textContent = `${categoriesData.length} Topics`;
    }

    categoriesRectContainer.innerHTML = categoriesData.map(cat => {
      const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
      const siteCount = WEBSITES.filter(w => {
        const catObj = categoriesData.find(c => c.id === w.category);
        const cName = catObj ? catObj.name.toLowerCase() : '';
        return w.category === cat.id || cName === cat.name.toLowerCase();
      }).length;

      return `
        <button class="category-rect-box ${isActive ? 'active' : ''}" data-cat="${cat.name}" data-id="${cat.id}" type="button" aria-label="Open ${cat.name} websites">
          <div class="category-rect-left">
            <div class="category-rect-logo-wrap">
              <img src="${cat.logo}" alt="${cat.name}" class="category-rect-logo-img" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <span class="category-rect-logo-fallback" style="display:none;">📚</span>
            </div>
            <div class="category-rect-info">
              <span class="category-rect-name">${cat.name}</span>
              <span class="category-rect-sub">${siteCount > 0 ? `${siteCount} Websites` : 'Explore'}</span>
            </div>
          </div>
          <div class="category-rect-arrow-box" aria-hidden="true">
            <svg class="category-rect-arrow-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </button>
      `;
    }).join('');

    categoriesRectContainer.querySelectorAll('.category-rect-box').forEach(box => {
      box.addEventListener('click', () => {
        const catName = box.getAttribute('data-cat');
        categoriesRectContainer.querySelectorAll('.category-rect-box').forEach(b => b.classList.remove('active'));
        box.classList.add('active');

        // Sync with top category chips
        const currentChips = document.querySelectorAll('.filter-chip');
        currentChips.forEach(chip => {
          const isMatch = chip.getAttribute('data-filter')?.toLowerCase() === catName.toLowerCase();
          chip.classList.toggle('active', isMatch);
          chip.setAttribute('aria-selected', isMatch ? 'true' : 'false');
          if (isMatch) chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });

        showToast(`Opening Explore: ${catName} 🚀`);
        openCategoryExplore(catName);
      });
    });
  }
  renderCategoryRectangles();

  // ==================== EXACT ALLAPPS.CFD CARD UI ====================
  function createAllAppsCard(item, isSaved) {
    const catObj = categoriesData.find(c => c.id === item.category);
    const cachedAppLogo = MEMORY_CACHE.appLogo || localStorage.getItem('gt_cached_app_logo') || 'assets/logo.png';
    const fallbackLogo = catObj ? catObj.logo : cachedAppLogo;

    return `
      <article class="allapps-card" data-id="${item.id}" data-url="${item.url}" data-title="${item.name}" tabindex="0" role="link" aria-label="${item.name}">
        <!-- Save Bookmark Button -->
        <button
          class="allapps-save-btn ${isSaved ? 'is-saved' : ''}"
          type="button"
          aria-label="${isSaved ? 'Remove from saved' : 'Save to library'}"
          data-id="${item.id}"
          title="${isSaved ? 'Saved' : 'Save'}"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <!-- Logo Wrapper (from allapps.cfd) -->
        <div class="allapps-logo-wrapper">
          <img
            src="${item.logo}"
            data-original-src="${item.logo}"
            alt="${item.name} Logo"
            loading="lazy"
            onerror="this.onerror=null; this.src='${fallbackLogo}';"
          />
        </div>
        <a class="allapps-visit-btn" href="${item.url}" target="_blank" rel="noopener noreferrer">Visit Now</a>
      </article>
    `;
  }

  // Helper to attach click & save events to allapps cards
  function attachAllAppsCardListeners(container) {
    if (!container) return;

    container.querySelectorAll('.allapps-card').forEach(card => {
      const handleOpen = (e) => {
        if (e.target.closest('.allapps-save-btn')) return;
        const url = card.getAttribute('data-url');
        const title = card.getAttribute('data-title');
        if (url) {
          e.preventDefault();
          openInAppBrowser(url, title);
        }
      };

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen(e);
        }
      });
    });

    container.querySelectorAll('.allapps-visit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.allapps-card');
        if (!card) return;
        const url = card.getAttribute('data-url');
        const title = card.getAttribute('data-title');
        if (url) openInAppBrowser(url, title);
      });
    });

    container.querySelectorAll('.allapps-save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const card = btn.closest('.allapps-card');

        // Add micro-animation bounce/pop
        btn.classList.remove('save-pop-anim');
        void btn.offsetWidth; // Force reflow
        btn.classList.add('save-pop-anim');
        setTimeout(() => btn.classList.remove('save-pop-anim'), 360);

        let item = WEBSITES.find(i => i.id === id);
        if (!item) {
          const savedItems = getSavedItems();
          item = savedItems.find(s => s.id === id);
        }

        if (item) {
          const catObj = categoriesData.find(c => c.id === item.category);
          toggleSaveItem({
            id: item.id,
            title: item.name || item.title,
            name: item.name || item.title,
            category: catObj ? catObj.name : (item.category || 'General'),
            desc: item.url || item.desc,
            url: item.url || item.desc,
            logo: item.logo || PW_LOGO
          }, card);
        }
      });
    });
  }

  // ==================== 6. EXPLORE + {CATEGORY NAME} DEDICATED SCREEN ====================
  function openCategoryExplore(categoryName, pushHistory = true) {
    if (!categoryName) return;
    currentSelectedCategory = categoryName;

    // 1. Update Title and description on Explore Screen
    const exploreCatNameEl = document.getElementById('explore-page-cat-name');
    if (exploreCatNameEl) {
      exploreCatNameEl.textContent = categoryName;
    }

    // 2. Filter websites for this category
    const saved = getSavedItems();
    const savedIds = new Set(saved.map(s => s.id));
    const filterLower = categoryName.toLowerCase();

    const filteredWebsites = WEBSITES.filter(item => {
      const catObj = categoriesData.find(c => c.id === item.category);
      const catName = catObj ? catObj.name.toLowerCase() : '';
      return (
        item.category.toLowerCase() === filterLower ||
        catName === filterLower ||
        item.category.toLowerCase().includes(filterLower) ||
        catName.includes(filterLower) ||
        item.name.toLowerCase().includes(filterLower)
      );
    });

    // 3. Update Hero Badge text
    const badgeTextEl = document.getElementById('explore-hero-badge-text');
    if (badgeTextEl) {
      badgeTextEl.textContent = `${filteredWebsites.length} Free Learning Platform${filteredWebsites.length === 1 ? '' : 's'}`;
    }

    // 4. Render exact allapps.cfd cards into explore grid
    const exploreGrid = document.getElementById('explore-cards-grid');
    const exploreEmpty = document.getElementById('explore-empty-state');
    if (exploreGrid) {
      if (filteredWebsites.length === 0) {
        exploreGrid.innerHTML = '';
        if (exploreEmpty) {
          exploreEmpty.style.display = 'flex';
          exploreEmpty.querySelector('.empty-title').textContent = `No platforms found in "${categoryName}"`;
        }
      } else {
        if (exploreEmpty) exploreEmpty.style.display = 'none';
        exploreGrid.innerHTML = filteredWebsites.map(item => {
          const isSaved = savedIds.has(item.id);
          return createAllAppsCard(item, isSaved);
        }).join('');
        attachAllAppsCardListeners(exploreGrid);
      }
    }

    // 5. Removed legacy home inline sync

    // 6. Transition to the dedicated Explore Screen!
    switchScreen('explore', pushHistory);
  }

  // Wire Explore Screen Back Button ("one step back")
  const explorePageBackBtn = document.getElementById('explore-page-back-btn');
  if (explorePageBackBtn) {
    explorePageBackBtn.addEventListener('click', () => {
      if (window.history.length > 1 && navHistoryStack.length > 1) {
        window.history.back();
      } else {
        switchScreen('home');
      }
    });
  }

  const exploreEmptyBackBtn = document.getElementById('explore-empty-back-btn');
  if (exploreEmptyBackBtn) {
    exploreEmptyBackBtn.addEventListener('click', () => {
      if (window.history.length > 1 && navHistoryStack.length > 1) {
        window.history.back();
      } else {
        switchScreen('home');
      }
    });
  }

  // Legacy alias for compatibility with sidebar and chips
  function filterCardsByCategory(categoryName, pushHistory = true) {
    openCategoryExplore(categoryName, pushHistory);
  }



  // Close explore section button listener
  const closeExploreBtn = document.getElementById('close-explore-btn');
  if (closeExploreBtn) {
    closeExploreBtn.addEventListener('click', () => {
      closeCategoryWebsites();
    });
  }

  // ==================== 7. SEARCH FUNCTIONALITY (EVERYTHING: WEBSITES & CATEGORIES) ====================
  function handleSearch() {
    if (!searchInput) return;
    const query = searchInput.value.trim().toLowerCase();
    
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    const searchResultsSection = document.getElementById('search-results-section');
    const searchTitleEl = document.getElementById('search-results-title');
    const searchCountPill = document.getElementById('search-count-pill');
    const searchCardsContainer = document.getElementById('search-cards-container');
    const searchEmptyState = document.getElementById('search-empty-state');
    const categoryBoxes = categoriesRectContainer?.querySelectorAll('.category-rect-box');

    // If query is empty, reset back to normal view
    if (!query) {
      // Restore all category rectangular boxes
      if (categoryBoxes) {
        categoryBoxes.forEach(b => {
          b.style.display = 'flex';
        });
      }
      if (categoryCountPill) {
        categoryCountPill.textContent = `${categoriesData.length} Topics`;
      }

      if (searchResultsSection) searchResultsSection.style.display = 'none';
      return;
    }

    // 1. FILTER CATEGORIES IN RECTANGULAR BOXES
    let matchingCatCount = 0;
    if (categoryBoxes) {
      categoryBoxes.forEach(box => {
        const catName = (box.getAttribute('data-cat') || '').toLowerCase();
        const catId = (box.getAttribute('data-id') || '').toLowerCase();
        if (catName.includes(query) || catId.includes(query)) {
          box.style.display = 'flex';
          matchingCatCount++;
        } else {
          box.style.display = 'none';
        }
      });
      if (categoryCountPill) {
        categoryCountPill.textContent = `${matchingCatCount} Categor${matchingCatCount === 1 ? 'y' : 'ies'}`;
      }
    }

    // 2. HERO CAROUSEL SYNC
    const matchedSlideIdx = heroSlidesData.findIndex(s => s.title.toLowerCase().includes(query));
    if (matchedSlideIdx !== -1) {
      goToSlide(matchedSlideIdx);
    }

    // 3. FILTER WEBSITES ACROSS ALL WEBSITES
    const saved = getSavedItems();
    const savedIds = new Set(saved.map(s => s.id));

    const matchedWebsites = WEBSITES.filter(item => {
      const catObj = categoriesData.find(c => c.id === item.category);
      const catName = catObj ? catObj.name.toLowerCase() : '';
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        catName.includes(query) ||
        item.url.toLowerCase().includes(query)
      );
    });

    // Reveal search section for search results
    if (searchResultsSection) {
      searchResultsSection.style.display = 'block';
    }
    if (searchTitleEl) {
      searchTitleEl.textContent = `Search: "${searchInput.value.trim()}"`;
    }
    if (searchCountPill) {
      searchCountPill.style.display = 'inline-block';
      searchCountPill.textContent = `${matchedWebsites.length} found`;
    }

    if (matchedWebsites.length === 0) {
      searchCardsContainer.innerHTML = '';
      if (searchEmptyState) {
        searchEmptyState.style.display = 'flex';
        searchEmptyState.querySelector('.empty-title').textContent = `No websites matching "${query}"`;
        searchEmptyState.querySelector('.empty-subtitle').textContent =
          matchingCatCount > 0
            ? `Found ${matchingCatCount} matching category above.`
            : 'Try checking your spelling or searching for another subject.';
      }
    } else {
      if (searchEmptyState) searchEmptyState.style.display = 'none';

      searchCardsContainer.innerHTML = matchedWebsites.map(item => {
        const isSaved = savedIds.has(item.id);
        return createAllAppsCard(item, isSaved);
      }).join('');

      attachAllAppsCardListeners(searchCardsContainer);
    }
  }

  // Search Submit Button and Suggestions Popover
  const searchSubmitBtn = document.getElementById('search-submit-btn');
  const searchSuggestionsDropdown = document.getElementById('search-suggestions-dropdown');
  const suggestionsChipsContainer = document.getElementById('suggestions-chips-container');

  function renderCategorySuggestions(filterText = '') {
    if (!suggestionsChipsContainer) return;
    const q = (filterText || '').toLowerCase().trim();

    let suggestions = [];
    if (q) {
      // Filter categories matching query
      suggestions = categoriesData.filter(cat => 
        cat.name.toLowerCase().includes(q) || cat.id.toLowerCase().includes(q)
      );
    } else {
      // Top default suggestions (popular / featured categories)
      const topIds = ['nda', 'cds', 'afcat', 'physics-wallah', 'pw-ott-pi-pro', 'next-toppers', 'unacademy', 'missionjeet'];
      suggestions = categoriesData.filter(c => topIds.includes(c.id)).slice(0, 8);
      if (suggestions.length < 4) {
        suggestions = categoriesData.slice(0, 8);
      }
    }

    if (suggestions.length === 0) {
      suggestionsChipsContainer.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); padding: 4px;">No category match. Searching all websites...</span>`;
      return;
    }

    suggestionsChipsContainer.innerHTML = suggestions.map(cat => `
      <button type="button" class="suggest-cat-chip" data-cat="${cat.name}">
        <img src="${cat.logo}" alt="${cat.name}" class="chip-logo" onerror="this.style.display='none';" />
        <span>${cat.name}</span>
      </button>
    `).join('');

    suggestionsChipsContainer.querySelectorAll('.suggest-cat-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catName = btn.getAttribute('data-cat');
        if (searchInput) searchInput.value = catName;
        if (searchSuggestionsDropdown) searchSuggestionsDropdown.style.display = 'none';
        if (clearSearchBtn) clearSearchBtn.style.display = 'block';

        showToast(`Selected category: ${catName}`);
        filterCardsByCategory(catName);

        // Sync header chips
        if (categoryChipsTrack) {
          categoryChipsTrack.querySelectorAll('.filter-chip').forEach(chip => {
            if (chip.getAttribute('data-filter')?.toLowerCase() === catName.toLowerCase()) {
              chip.classList.add('active');
              chip.setAttribute('aria-selected', 'true');
            } else {
              chip.classList.remove('active');
              chip.setAttribute('aria-selected', 'false');
            }
          });
        }
      });
    });
  }

  function openSuggestions() {
    if (!searchSuggestionsDropdown) return;
    const q = searchInput ? searchInput.value.trim() : '';
    renderCategorySuggestions(q);
    searchSuggestionsDropdown.style.display = 'block';
  }

  function closeSuggestions() {
    if (searchSuggestionsDropdown) {
      searchSuggestionsDropdown.style.display = 'none';
    }
  }

  function triggerSearchSubmit() {
    closeSuggestions();
    handleSearch();
    const val = searchInput ? searchInput.value.trim() : '';
    if (!val) return;

    // Check if the query closely or exactly matches a category
    const matchedCat = categoriesData.find(c => 
      c.name.toLowerCase() === val.toLowerCase() || 
      c.id.toLowerCase() === val.toLowerCase()
    );

    if (matchedCat) {
      filterCardsByCategory(matchedCat.name);
      return;
    }

    // Scroll to search results section if websites are found
    const searchResultsSection = document.getElementById('search-results-section');
    if (searchResultsSection && searchResultsSection.style.display !== 'none') {
      searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      handleSearch();
      openSuggestions();
    });

    searchInput.addEventListener('focus', () => {
      openSuggestions();
    });

    searchInput.addEventListener('click', () => {
      openSuggestions();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearchSubmit();
      } else if (e.key === 'Escape') {
        closeSuggestions();
      }
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = searchInput ? searchInput.value.trim() : '';
      if (!val) {
        openSuggestions();
        if (typeof searchInput.focus === 'function') searchInput.focus();
        return;
      }
      triggerSearchSubmit();
    });
  }

  // Dismiss suggestions dropdown when clicking outside search section
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-section')) {
      closeSuggestions();
    }
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      closeSuggestions();
      handleSearch();
      searchInput.focus();
    });
  }

  // ==================== 8. SAVED ITEMS SCREEN ====================
  function renderSavedScreen() {
    if (!savedItemsContainer) return;
    const saved = getSavedItems();
    
    if (savedCounter) {
      savedCounter.textContent = `${saved.length} item${saved.length === 1 ? '' : 's'}`;
    }
    const librarySavedCountPill = document.getElementById('library-saved-count-pill');
    if (librarySavedCountPill) {
      librarySavedCountPill.textContent = `${saved.length} Saved`;
    }

    if (saved.length === 0) {
      savedItemsContainer.innerHTML = '';
      if (savedEmptyState) savedEmptyState.style.display = 'flex';
      return;
    }

    if (savedEmptyState) savedEmptyState.style.display = 'none';

    savedItemsContainer.innerHTML = saved.map(item => {
      let fullItem = WEBSITES.find(w => w.id === item.id);
      if (!fullItem) {
        fullItem = {
          id: item.id,
          name: item.title || item.name || 'Saved Platform',
          url: item.url || item.desc || '#',
          logo: item.logo || PW_LOGO,
          category: item.category || 'physics-wallah'
        };
      }
      return createAllAppsCard(fullItem, true);
    }).join('');

    attachAllAppsCardListeners(savedItemsContainer);
  }
  renderSavedScreen();

  // ==================== 10. BOTTOM NAVIGATION CONTROLLER (3 ITEMS) ====================
  // 3 Items: Home | Donation (heart) | Library
  let currentActiveScreen = 'home';
  const navHistoryStack = ['home'];

  function saveAppStateBeforeNavigation() {
    try {
      const appState = {
        screen: currentActiveScreen || 'home',
        category: currentSelectedCategory || '',
        searchQuery: searchInput ? searchInput.value.trim() : '',
        scrollY: window.scrollY || document.documentElement.scrollTop || 0,
        timestamp: Date.now()
      };
      sessionStorage.setItem('studyWithGauravLastState', JSON.stringify(appState));
      sessionStorage.setItem('studyWithGauravSplashShown', 'true');
    } catch (err) {
      console.warn('Could not save navigation state:', err);
    }
  }

  function switchScreen(screenName, pushHistory = true, animate = true) {
    if (!screenName) return;

    if (screenName === 'back') {
      if (window.history.length > 1) {
        window.history.back();
      } else if (navHistoryStack.length > 1) {
        navHistoryStack.pop();
        const previousScreen = navHistoryStack[navHistoryStack.length - 1];
        switchScreen(previousScreen, false);
      } else {
        switchScreen('home', false);
      }
      return;
    }

    // Support aliases: donation maps to view-donation (or view-pro)
    let effectiveScreen = screenName;
    if (screenName === 'pro') effectiveScreen = 'donation';
    const targetViewId = `view-${effectiveScreen}`;
    let targetView = document.getElementById(targetViewId);
    if (!targetView && effectiveScreen === 'donation') {
      targetView = document.getElementById('view-pro');
    }

    currentActiveScreen = effectiveScreen;

    // Update active nav item
    const targetItem = document.querySelector(`.bottom-nav .nav-item[data-screen="${effectiveScreen}"]`);
    const allNavButtons = document.querySelectorAll('.bottom-nav .nav-item');
    if (targetItem) {
      allNavButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      });
      targetItem.classList.add('active');
      targetItem.setAttribute('aria-current', 'page');
    } else if (effectiveScreen === 'explore') {
      allNavButtons.forEach(btn => {
        const isHome = btn.getAttribute('data-screen') === 'home';
        btn.classList.toggle('active', isHome);
      });
    }

    // Push to navigation history & browser history
    if (pushHistory) {
      if (navHistoryStack[navHistoryStack.length - 1] !== effectiveScreen) {
        navHistoryStack.push(effectiveScreen);
      }
      let hash = effectiveScreen === 'home' ? '' : `#${effectiveScreen}`;
      if (effectiveScreen === 'explore' && currentSelectedCategory) {
        hash = `#explore-${encodeURIComponent(currentSelectedCategory)}`;
      }
      const stateObj = {
        screen: effectiveScreen,
        category: currentSelectedCategory || '',
        searchQuery: searchInput ? searchInput.value.trim() : ''
      };
      if (!history.state || history.state.screen !== effectiveScreen || (effectiveScreen === 'explore' && history.state.category !== currentSelectedCategory)) {
        history.pushState(stateObj, '', hash || window.location.pathname + window.location.search);
      }
    }

    // Transition SPA views
    document.querySelectorAll('.view-panel').forEach(panel => {
      if (panel === targetView || panel.id === targetViewId) {
        panel.style.display = 'block';
        panel.classList.remove('panel-entering');
        if (animate) {
          void panel.offsetWidth; // Force CSS reflow for smooth animation
          panel.classList.add('panel-entering');
        }
      } else {
        panel.style.display = 'none';
        panel.classList.remove('panel-entering');
      }
    });

    // Smooth scroll to top of view if animate
    if (animate) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Refresh library/saved screen if active
    if (effectiveScreen === 'library') {
      renderSavedScreen();
    }

    // Toggle Home header search & filter controls visibility (only visible on Home screen)
    const homeHeaderControls = document.getElementById('home-header-controls');
    if (homeHeaderControls) {
      homeHeaderControls.style.display = (effectiveScreen === 'home') ? 'block' : 'none';
    }

    // Update screen state on body & sync fixed header height
    document.body.setAttribute('data-screen', effectiveScreen);
    document.body.classList.toggle('screen-home', effectiveScreen === 'home');
    if (typeof window.syncAppHeaderHeight === 'function') {
      window.syncAppHeaderHeight();
    }

    // Save app state
    saveAppStateBeforeNavigation();
  }

  // ==================== IN-APP BROWSER ====================
  // On Android (Capacitor APK): Java's MainActivity intercepts ALL external URL
  // navigation via shouldOverrideUrlLoading() and shows them in a native in-app
  // browser overlay — so we just do window.location.href here.
  //
  // On plain web browser: we use window.open('_blank') so the app stays alive.
  function openInAppBrowser(url) {
    if (!url) return;

    // If running inside Capacitor Android/iOS native wrapper:
    // The Java/Swift layer intercepts shouldOverrideUrlLoading and shows the
    // URL in a custom in-app WebView overlay. Just navigate the current frame.
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      window.location.href = url;
      return;
    }

    // For plain web browser: open in a new tab so the app stays open
    try {
      const newWin = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Popup was blocked — navigate current tab as fallback
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
  }


  // Wire navigation item click and keyboard handlers
  const allNavButtons = document.querySelectorAll('.bottom-nav .nav-item');
  allNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.getAttribute('data-screen');
      switchScreen(screen);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Screen App Bar Back Buttons (Explore, Donation, Library)
  const donationPageBackBtn = document.getElementById('donation-page-back-btn');
  if (donationPageBackBtn) {
    donationPageBackBtn.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  const libraryPageBackBtn = document.getElementById('library-page-back-btn');
  if (libraryPageBackBtn) {
    libraryPageBackBtn.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  // Go Home from Saved/Library button
  const goHomeFromSavedBtn = document.getElementById('go-home-from-saved');
  if (goHomeFromSavedBtn) {
    goHomeFromSavedBtn.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  // Brand Logo Header -> Home screen
  const brandHomeLink = document.getElementById('brand-home-link');
  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchScreen('home');
    });
  }

  // Restore previous app state (e.g. Back from external website, or page reload)
  function restorePreviousState() {
    try {
      const hash = window.location.hash;
      let targetScreen = null;
      let targetCategory = null;

      if (hash.startsWith('#explore-')) {
        targetScreen = 'explore';
        targetCategory = decodeURIComponent(hash.substring(9));
      } else if (hash === '#donation' || hash === '#pro') {
        targetScreen = 'donation';
      } else if (hash === '#library') {
        targetScreen = 'library';
      } else if (hash === '#home') {
        targetScreen = 'home';
      }

      const rawState = sessionStorage.getItem('studyWithGauravLastState');
      let savedState = null;
      if (rawState) {
        try { savedState = JSON.parse(rawState); } catch (e) {}
      }
      // Also check localStorage — used when returning from same-tab external navigation
      if (!savedState) {
        const lsRaw = localStorage.getItem('gt_last_app_state');
        if (lsRaw) {
          try {
            const lsState = JSON.parse(lsRaw);
            // Only use it if recent (within 1 hour) to avoid stale states
            if (lsState.timestamp && (Date.now() - lsState.timestamp) < 3600000) {
              savedState = lsState;
            }
          } catch (e) {}
        }
      }

      if (!targetScreen && savedState && savedState.screen) {
        targetScreen = savedState.screen;
        targetCategory = savedState.category;
      }

      if (targetScreen && targetScreen !== 'home') {
        if (targetScreen === 'explore' && targetCategory) {
          openCategoryExplore(targetCategory, false);
        } else {
          switchScreen(targetScreen, false, false);
        }

        if (savedState && savedState.searchQuery && searchInput) {
          searchInput.value = savedState.searchQuery;
          handleSearch();
        }

        if (savedState && typeof savedState.scrollY === 'number' && savedState.scrollY > 0) {
          setTimeout(() => {
            window.scrollTo({ top: savedState.scrollY, behavior: 'instant' });
          }, 80);
        }
        return true;
      } else if (savedState && savedState.searchQuery && searchInput) {
        searchInput.value = savedState.searchQuery;
        handleSearch();
        if (typeof savedState.scrollY === 'number' && savedState.scrollY > 0) {
          setTimeout(() => {
            window.scrollTo({ top: savedState.scrollY, behavior: 'instant' });
          }, 80);
        }
      }
    } catch (err) {
      console.warn('Error restoring previous state:', err);
    }
    return false;
  }

  // Handle popstate for browser Back / Forward buttons ("one step back")
  window.addEventListener('popstate', (event) => {
    const state = event.state;
    if (state && state.screen) {
      if (state.screen === 'explore' && state.category) {
        openCategoryExplore(state.category, false);
      } else {
        switchScreen(state.screen, false, true);
      }
      if (state.searchQuery !== undefined && searchInput) {
        searchInput.value = state.searchQuery;
        handleSearch();
      }
    } else {
      const hash = window.location.hash;
      if (hash.startsWith('#explore-')) {
        const cat = decodeURIComponent(hash.substring(9));
        openCategoryExplore(cat, false);
      } else if (hash === '#donation' || hash === '#pro') {
        switchScreen('donation', false, true);
      } else if (hash === '#library') {
        switchScreen('library', false, true);
      } else {
        switchScreen('home', false, true);
      }
    }
    saveAppStateBeforeNavigation();
  });

  // Handle pageshow (only restore and hide splash on Safari/Chrome bfcache restores)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      hideSplashScreenImmediate();
      restorePreviousState();
    }
  });

  // Save state on page navigation or tab close (do NOT set gt_splash_shown here — it prevents splash replay)
  window.addEventListener('beforeunload', saveAppStateBeforeNavigation);
  window.addEventListener('pagehide', saveAppStateBeforeNavigation);

  // Initialize initial history entry
  if (!history.state) {
    history.replaceState({ screen: 'home', category: '', searchQuery: '' }, '', window.location.href);
  }

  // Handle initial tab deep linking (e.g. ?tab=donation or ?tab=library)
  if (initialTab) {
    const validTabs = ['home', 'donation', 'pro', 'library', 'explore'];
    if (validTabs.includes(initialTab.toLowerCase())) {
      switchScreen(initialTab.toLowerCase(), false, false);
    }
  } else {
    // Restore previous state if returning from external website
    restorePreviousState();
  }

  if (shouldOpenDrawer) {
    openDrawer();
  }

  // Explore courses action
  const exploreCoursesBtn = document.getElementById('explore-courses-btn');
  if (exploreCoursesBtn) {
    exploreCoursesBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        handleSearch();
      }
      const catSection = document.getElementById('categories-bar-section');
      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== DONATION PAGE INTERACTION HANDLERS ====================
  const copyUpiBtn = document.getElementById('copy-upi-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const upiIdText = document.getElementById('upi-id-text');
  const copyLiveAnnouncer = document.getElementById('copy-live-announcer');
  const directUpiPayBtn = document.getElementById('direct-upi-pay-btn');
  const donationAmountGrid = document.getElementById('donation-amount-grid');

  if (copyUpiBtn && upiIdText) {
    copyUpiBtn.addEventListener('click', async () => {
      const textToCopy = upiIdText.textContent.trim() || 'gauraveducation@fam';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback copy
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        if (copyBtnText) copyBtnText.textContent = 'Copied ✓';
        copyUpiBtn.classList.add('copied');
        if (copyLiveAnnouncer) copyLiveAnnouncer.textContent = 'UPI ID copied to clipboard: ' + textToCopy;
        showToast('UPI ID copied successfully');

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy UPI ID';
          copyUpiBtn.classList.remove('copied');
          if (copyLiveAnnouncer) copyLiveAnnouncer.textContent = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy UPI ID:', err);
        showToast('UPI ID: ' + textToCopy);
      }
    });
  }

  // Quick Amount Selector (Native Segment Chips & Amount Chips)
  if (donationAmountGrid && directUpiPayBtn) {
    const chips = donationAmountGrid.querySelectorAll('.native-segment-chip, .amount-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const amount = chip.getAttribute('data-amount') || '101';
        directUpiPayBtn.setAttribute('href', `upi://pay?pa=gauraveducation@fam&pn=Study%20With%20Gaurav&am=${amount}&cu=INR`);
        showToast(`Selected ₹${amount} contribution tier ❤️`);
      });
    });
  }

  // ==================== 11. SWIPE TO REFRESH (PULL-TO-REFRESH) ====================
  const ptrIndicator = document.getElementById('ptr-indicator');
  const ptrText = document.getElementById('ptr-text');
  const ptrArrow = ptrIndicator?.querySelector('.ptr-arrow');
  const ptrSpinner = ptrIndicator?.querySelector('.ptr-spinner');
  const refreshLoadingScreen = document.getElementById('refresh-loading-screen');
  const refreshLogoRow = document.getElementById('refresh-logo-row');

  let touchStartY = 0;
  let touchCurrentY = 0;
  let isPulling = false;
  let isRefreshing = false;
  let hasVibrated = false;
  const PULL_THRESHOLD = 68; // pixels required to trigger refresh

  function setIndicatorPosition(distance) {
    if (!ptrIndicator) return;
    const clampedDist = Math.min(distance, 92);
    ptrIndicator.style.transform = clampedDist > 8 ? `translateY(${clampedDist + 80}px)` : 'translateY(0px)';
    if (clampedDist > 8) {
      ptrIndicator.classList.add('ptr-active');
    } else {
      ptrIndicator.classList.remove('ptr-active');
    }

    if (clampedDist >= PULL_THRESHOLD) {
      ptrIndicator.classList.add('ptr-ready');
      if (ptrText) ptrText.textContent = 'Release to refresh ⚡';
      if (!hasVibrated) {
        if (navigator.vibrate) {
          try { navigator.vibrate(15); } catch (e) {}
        }
        hasVibrated = true;
      }
    } else {
      ptrIndicator.classList.remove('ptr-ready');
      if (ptrText) ptrText.textContent = 'Pull down to refresh...';
      hasVibrated = false;
    }
  }

  function resetIndicator() {
    if (!ptrIndicator) return;
    ptrIndicator.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
    ptrIndicator.style.transform = 'translateY(0px)';
    ptrIndicator.classList.remove('ptr-active', 'ptr-ready');
    if (ptrArrow) ptrArrow.style.display = 'block';
    if (ptrSpinner) ptrSpinner.style.display = 'none';
    if (ptrText) ptrText.textContent = 'Pull to refresh';
    setTimeout(() => {
      if (ptrIndicator) ptrIndicator.style.transition = '';
    }, 320);
  }

  async function performRefresh() {
    if (isRefreshing) return;
    isRefreshing = true;

    // 1. Reset PTR indicator
    resetIndicator();

    // 2. Show splash-style refresh loading screen
    if (refreshLoadingScreen) {
      refreshLoadingScreen.classList.remove('fade-out');
      refreshLoadingScreen.classList.add('show');
      refreshLoadingScreen.style.display = 'flex';
      if (refreshLogoRow) {
        refreshLogoRow.style.animation = 'none';
        void refreshLogoRow.offsetWidth; // Force reflow
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        refreshLogoRow.style.animation = isLight
          ? 'refreshLogoPulseLight 1.2s infinite alternate ease-in-out'
          : 'refreshLogoPulse 1.2s infinite alternate ease-in-out';
      }
    }

    // 3. Perform in-app data refresh & synchronization
    try {
      checkAndRecordStreak();
      renderSavedScreen();
      if (currentActiveScreen === 'explore' && currentSelectedCategory) {
        openCategoryExplore(currentSelectedCategory, false);
      } else if (searchInput && searchInput.value.trim()) {
        handleSearch();
      } else {
        renderCategoryRectangles(currentSelectedCategory || 'All');
      }
      saveAppStateBeforeNavigation();
    } catch (err) {
      console.warn('Error during data refresh:', err);
    }

    // 4. Hold splash-style screen for seamless visual experience (~850ms)
    await new Promise(resolve => setTimeout(resolve, 850));

    // 5. Smooth punch-out fade identical to splash screen
    if (refreshLoadingScreen) {
      refreshLoadingScreen.classList.add('fade-out');
      setTimeout(() => {
        refreshLoadingScreen.classList.remove('show', 'fade-out');
        refreshLoadingScreen.style.display = 'none';
        isRefreshing = false;
        showToast('App refreshed successfully! 🚀');
      }, 350);
    } else {
      isRefreshing = false;
      showToast('App refreshed successfully! 🚀');
    }
  }

  // Touch Event Listeners for Mobile
  window.addEventListener('touchstart', (e) => {
    if (window.scrollY <= 2 && !isRefreshing) {
      touchStartY = e.touches[0].clientY;
      isPulling = true;
      hasVibrated = false;
    } else {
      isPulling = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isPulling || isRefreshing) return;
    touchCurrentY = e.touches[0].clientY;
    const diff = touchCurrentY - touchStartY;

    if (diff > 0 && window.scrollY <= 2) {
      const resistanceDistance = Math.pow(diff, 0.82) * 1.6;
      setIndicatorPosition(resistanceDistance);
    } else {
      setIndicatorPosition(0);
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isPulling || isRefreshing) return;
    isPulling = false;
    const diff = touchCurrentY - touchStartY;
    const resistanceDistance = Math.pow(Math.max(0, diff), 0.82) * 1.6;

    if (resistanceDistance >= PULL_THRESHOLD && window.scrollY <= 2) {
      performRefresh();
    } else {
      resetIndicator();
    }
    touchStartY = 0;
    touchCurrentY = 0;
  }, { passive: true });

  window.addEventListener('touchcancel', () => {
    isPulling = false;
    resetIndicator();
  }, { passive: true });

  // Mouse drag support for desktop testing
  let isMouseDown = false;
  let mouseStartY = 0;
  window.addEventListener('mousedown', (e) => {
    if (window.scrollY <= 2 && !isRefreshing && e.clientY < 120) {
      isMouseDown = true;
      mouseStartY = e.clientY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDown || isRefreshing) return;
    const diff = e.clientY - mouseStartY;
    if (diff > 0 && window.scrollY <= 2) {
      const dist = Math.pow(diff, 0.82) * 1.6;
      setIndicatorPosition(dist);
    }
  });

  window.addEventListener('mouseup', (e) => {
    if (!isMouseDown || isRefreshing) return;
    isMouseDown = false;
    const diff = e.clientY - mouseStartY;
    const dist = Math.pow(Math.max(0, diff), 0.82) * 1.6;
    if (dist >= PULL_THRESHOLD && window.scrollY <= 2) {
      performRefresh();
    } else {
      resetIndicator();
    }
  });

  // Expose global trigger for user testing & automated verification
  window.triggerSwipeToRefresh = performRefresh;

  if (shouldTestPull) {
    setTimeout(() => {
      setIndicatorPosition(75);
    }, 300);
  } else if (shouldTestSwipe) {
    setTimeout(() => {
      performRefresh();
    }, 200);
  }

  if (shouldScrollToBottom) {
    window.scrollTo(0, 99999);
    document.documentElement.scrollTop = 99999;
    document.body.scrollTop = 99999;
  }

  // ==================== GITHUB VERSION CONTROL & UPDATE NOTIFIER ====================
  const APP_VERSION = '1.2.0';
  const GITHUB_REPO = 'Gaurav1000m/GT-pro';
  const GITHUB_RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
  const updateModal = document.getElementById('app-update-modal');
  const updateVersionEl = document.getElementById('update-modal-version');
  const updateTagEl = document.getElementById('update-modal-tag');
  const updateNotesEl = document.getElementById('update-modal-notes');
  const updateDownloadBtn = document.getElementById('update-download-btn');
  const updateLaterBtn = document.getElementById('update-later-btn');
  const checkUpdatesBtn = document.getElementById('sidebar-check-updates-btn');
  const sidebarVersionEl = document.getElementById('sidebar-app-version');

  if (sidebarVersionEl) {
    sidebarVersionEl.textContent = `GT pro v${APP_VERSION}`;
  }

  function compareVersions(v1, v2) {
    const clean1 = (v1 || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    const clean2 = (v2 || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(clean1.length, clean2.length); i++) {
      const num1 = clean1[i] || 0;
      const num2 = clean2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  async function checkAppUpdates(isManual = false) {
    try {
      if (isManual) {
        showToast('Checking for updates...');
      }
      const response = await fetch(GITHUB_RELEASES_API, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      if (!response.ok) {
        if (isManual) showToast('Already on the latest release');
        return;
      }
      const release = await response.json();
      const latestTag = release.tag_name || release.name || '';
      
      // Compare latest release version with APP_VERSION
      if (compareVersions(latestTag, APP_VERSION) > 0) {
        const ignoredVersion = localStorage.getItem('ignored_update_version');
        if (!isManual && ignoredVersion === latestTag) {
          return; // User already chose to ignore this specific update version
        }
        // Find apk asset if available, otherwise fall back to release page
        let apkDownloadUrl = release.html_url;
        if (release.assets && release.assets.length > 0) {
          const apkAsset = release.assets.find(a => a.name && a.name.endsWith('.apk'));
          if (apkAsset && apkAsset.browser_download_url) {
            apkDownloadUrl = apkAsset.browser_download_url;
          }
        }

        if (updateVersionEl) updateVersionEl.textContent = `Version ${latestTag} is now available with new improvements.`;
        if (updateTagEl) updateTagEl.textContent = latestTag;
        if (updateNotesEl) updateNotesEl.textContent = release.body || 'Performance improvements, stability enhancements, and new features.';
        if (updateDownloadBtn) {
          updateDownloadBtn.href = apkDownloadUrl;
          updateDownloadBtn.onclick = (e) => {
            if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
              e.preventDefault();
              window.open(apkDownloadUrl, '_system');
            }
          };
        }
        if (updateModal) {
          updateModal.dataset.version = latestTag;
          updateModal.classList.add('active');
          updateModal.setAttribute('aria-hidden', 'false');
        }
      } else {
        if (isManual) {
          showToast(`You have the latest version (v${APP_VERSION})`);
        }
      }
    } catch (err) {
      console.warn('Update check error:', err);
      if (isManual) {
        showToast('Could not reach GitHub releases');
      }
    }
  }

  if (checkUpdatesBtn) {
    checkUpdatesBtn.addEventListener('click', () => {
      closeDrawer();
      checkAppUpdates(true);
    });
  }

  if (updateLaterBtn) {
    updateLaterBtn.addEventListener('click', () => {
      if (updateModal) {
        if (updateModal.dataset.version) {
          localStorage.setItem('ignored_update_version', updateModal.dataset.version);
        }
        updateModal.classList.remove('active');
        updateModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Check for updates automatically 3 seconds after startup
  setTimeout(() => {
    checkAppUpdates(false);
  }, 3000);

  // ==================== VPN EXIT BUTTON HANDLER ====================
  const vpnExitBtn = document.getElementById('vpn-exit-btn');
  if (vpnExitBtn) {
    vpnExitBtn.addEventListener('click', () => {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.exitApp();
      } else {
        window.close();
      }
    });
  }

  // ==================== NO INTERNET CONNECTION HANDLER ====================
  const noInternetScreen = document.getElementById('no-internet-screen');
  const noInternetRetryBtn = document.getElementById('no-internet-retry-btn');

  function updateOnlineStatus() {
    if (!navigator.onLine) {
      if (noInternetScreen) {
        noInternetScreen.classList.add('active');
        noInternetScreen.setAttribute('aria-hidden', 'false');
      }
    } else {
      if (noInternetScreen && noInternetScreen.classList.contains('active')) {
        noInternetScreen.classList.remove('active');
        noInternetScreen.setAttribute('aria-hidden', 'true');
        showToast('Internet connection restored');
      }
      recoverOfflineMedia();
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  if (noInternetRetryBtn) {
    noInternetRetryBtn.addEventListener('click', () => {
      noInternetRetryBtn.classList.add('loading');
      setTimeout(() => {
        noInternetRetryBtn.classList.remove('loading');
        if (navigator.onLine) {
          updateOnlineStatus();
          recoverOfflineMedia();
          showToast('Connection verified! 🚀');
        } else {
          showToast('Still offline. Check Wi-Fi or Mobile Data.');
        }
      }, 700);
    });
  }

  // Check network state on startup
  if (!navigator.onLine) {
    updateOnlineStatus();
  }

  // ==================== CAPACITOR ANDROID HARDWARE BACK BUTTON ====================
  function handleAndroidBackButton() {
    // 0. If No Internet Screen is open, exit or minimize app
    if (noInternetScreen && noInternetScreen.classList.contains('active')) {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.exitApp();
      }
      return;
    }

    // 1. If Update Modal is open, close it
    if (updateModal && updateModal.classList.contains('active')) {
      updateModal.classList.remove('active');
      updateModal.setAttribute('aria-hidden', 'true');
      return;
    }

    // 2. If Categories Sidebar drawer is open, close it
    if (categorySidebar && categorySidebar.classList.contains('active')) {
      closeDrawer();
      return;
    }

    // 3. If currently on a non-home screen (donation, library, explore), go back to home
    if (typeof currentActiveScreen !== 'undefined' && currentActiveScreen !== 'home') {
      switchScreen('home', true, true);
      return;
    }

    // 4. If search query is entered, clear search
    if (searchInput && searchInput.value.trim().length > 0) {
      searchInput.value = '';
      handleSearch();
      return;
    }

    // 5. If on home and idle, exit or minimize app
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
    }
  }

  // Listen for Capacitor App backButton event
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
    window.Capacitor.Plugins.App.addListener('backButton', () => {
      handleAndroidBackButton();
    });
  }

  // ==================== FIXED UPPER HEADER SCROLL SHADOW & HEIGHT SYNC ====================
  const upperAppHeader = document.getElementById('app-header');
  window.syncAppHeaderHeight = function() {
    if (upperAppHeader) {
      const h = upperAppHeader.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--app-header-height', `${h}px`);
      }
    }
  };

  if (upperAppHeader) {
    const onScrollHeader = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollPos > 8) {
        upperAppHeader.classList.add('is-scrolled');
      } else {
        upperAppHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    window.addEventListener('resize', window.syncAppHeaderHeight);
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => window.syncAppHeaderHeight());
      ro.observe(upperAppHeader);
    }
    window.syncAppHeaderHeight();
    onScrollHeader();
  }

  // ==================== DEV SERVER NOTIFICATION CLEANUP ====================
  const removeDevServerToast = () => {
    const el = document.getElementById('fiveserver-info-wrapper');
    if (el) el.remove();
  };
  removeDevServerToast();
  try {
    const obs = new MutationObserver(() => removeDevServerToast());
    obs.observe(document.body, { childList: true, subtree: false });
  } catch (e) {}
});
