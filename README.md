React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git push -u origin main
# 1. Initialize Git
git init

# 2. Stage and commit your files
git add .
git commit -m "Initial commit"

# 3. Log in to GitHub (only needed once)
gh auth login

# 4. Create a GitHub repo and push your code
gh repo create my-project --private --source=. --remote=origin --push
Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
To run it:

npm install
npm run dev
Remember to install Tailwind before!

npm install tailwindcss @tailwindcss/vite
