# Portfolio

A one-page portfolio you can edit in the browser and publish for free with GitHub Pages.

GitHub Pages hosts files. It does not run a database or a private server. This site is three pieces:

| File | Job |
| --- | --- |
| `index.html` | The words and structure. Change your name, projects, and links here. |
| `css/styles.css` | The look. Colors live in the variables at the top. |
| `js/main.js` | The behavior: theme, menu, project filters, and copy email. |

Paths such as `css/styles.css` are relative. That matters because a project site is served from `https://YOUR_USERNAME.github.io/portfolio/`, not from the domain root.

## 1. See it on your computer

Double-click `index.html`. It opens in your browser.

The theme switch, menu, and project filters work in that view. The copy-email button is more reliable once the site is on GitHub Pages, because that address is secure. Until then, select the email address and copy it yourself.

## 2. Tell Git who you are

Do this once on your computer. Use the name and email you want on your commits.

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.name@email.com"
```

## 3. Create an empty GitHub repository

1. Sign in at https://github.com
2. Choose **New repository**
3. Name it `portfolio`
4. Set it to **Public**
5. Leave **Add a README** unchecked, so this folder can be the first commit
6. Create the repository

## 4. Save a commit and push

From this folder:

```powershell
git add .
git commit -m "Add starter portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. GitHub will ask you to sign in.

## 5. Turn on GitHub Pages

1. Open the repository on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, choose **Deploy from a branch**
4. Choose branch `main` and folder `/ (root)`
5. Save

After a minute or two, the site is at:

`https://YOUR_USERNAME.github.io/portfolio/`

Each later update is the same loop: edit the files, `git add`, `git commit`, `git push`.

## Make it yours

- Name, about text, projects, and links: `index.html`
- Project categories: the `data-category` value on each card (`electrical`, `hobby`, or `other`)
- Colors: the `:root` block in `css/styles.css`
- New behavior: `js/main.js`

A repository named exactly `YOUR_USERNAME.github.io` is published at `https://YOUR_USERNAME.github.io/` instead of `/portfolio/`. The files in this project work either way.
