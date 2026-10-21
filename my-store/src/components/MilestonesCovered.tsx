import { Link } from "react-router-dom";

type Milestone = {
  number: number;
  emoji: string;
  title: string;
  learned: string[];
  jokes: string[];
};

const milestones: Milestone[] = [
  {
    number: 1,
    emoji: "🪩",
    title: "Setup & React Basics",
    learned: [
      "Vite + React + TypeScript project setup",
      "Components, JSX, props",
      "Basic styling with CSS",
    ],
    jokes: [
      "npm install broke 4 times, but we made it 🎉",
      "Still occasionally writes class instead of className 😅",
      "Our first component was 400 lines. We've since discovered scrolling.",
      "Centered a div. Will mention this at every family dinner.",
    ],
  },
  {
    number: 2,
    emoji: "🌐",
    title: "API Fetching & Routing",
    learned: [
      "useState and useEffect",
      "Fetching data from fakestoreapi.com",
      "React Router: multiple pages, URL params",
      "Product detail page",
    ],
    jokes: [
      "fakestoreapi.com is more reliable than my professor's zoom link",
      "useEffect ran 47 times before we added the dependency array 🫠",
      ".then().then().catch().then().cry()",
      "React Router: the ancient art of changing URLs without reloading",
    ],
  },
  {
    number: 3,
    emoji: "🛒",
    title: "Cart & Context API",
    learned: [
      "Global state with Context API",
      "Add to cart, remove, update quantity",
      "Dedicated Cart page",
    ],
    jokes: [
      "Context API saved us from prop-drilling hell 🪜",
      "Our cart has more state than most governments 🏛️",
      "The cart remembers more than we do",
      "Add to Cart button: 3 weeks of work, 1 line of satisfaction",
    ],
  },
  {
    number: 4,
    emoji: "🎣",
    title: "Custom Hooks & Polish",
    learned: [
      "Custom hooks: useProduct, useAddToCart",
      "Fly-to-cart animation",
      "Reusable Loader & ErrorMessage components",
      "Code organization & refactoring",
    ],
    jokes: [
      "Refactored everything into hooks. We feel like real devs now 🎩",
      "useProduct, useAddToCart, useRespect-for-the-rules-of-hooks",
      "Fly-to-cart animation: 2 hours of coding, 0.3 seconds of joy ✈️",
      "Separation of concerns? Barely. But hey, we tried.",
    ],
  },
];

function MilestonesCovered() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            The Milestone Hall of Fame 🏆
          </h1>
          <p className="mt-3 text-slate-500 text-lg">
            Four milestones. Countless bugs. One e-commerce store.
          </p>
          <p className="mt-1 text-slate-400 text-sm italic">
            (A journey of self-discovery, mostly through Stack Overflow)
          </p>
        </header>

        <div className="space-y-8">
          {milestones.map((m) => (
            <section
              key={m.number}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{m.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Milestone {m.number}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {m.title}
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    What we learned
                  </h3>
                  <ul className="space-y-1 text-slate-600">
                    {m.learned.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    What really happened
                  </h3>
                  <ul className="space-y-1 text-slate-600 italic">
                    {m.jokes.map((joke) => (
                      <li key={joke} className="flex gap-2">
                        <span>😅</span>
                        <span>{joke}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 italic mb-4">
            Powered by caffeine, chaos, and <code>console.log('why')</code>
          </p>
          <Link to="/" className="btn btn-primary">
            Back to the shop
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MilestonesCovered;
