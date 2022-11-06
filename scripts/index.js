#!/env/node

const fs = require("fs");
const grayMatter = require("gray-matter");
const M = require("marked");
const fg = require("fast-glob");

require('dotenv').config()

const removeMd = require("remove-markdown");
const {
  Octokit
} = require("octokit");
const octokit = new Octokit({
  auth: process.env.GITHUB_KEY,
});

function getMarkdownExcerpt(markdownText, maxLength = 120) {
  let text = removeMd(markdownText);
  text = text.trim().replace(/\s+/g, " ");

  const excerpt = text.substring(0, maxLength);
  if (text.length > maxLength) {
    return excerpt + "...";
  }
  return excerpt;
}

function transformMDToJSON() {
  const mdList = fg.sync("public/content/*.md", {});
  const postContentList = {};
  const postList = mdList.map((mdPath) => {
    const res = fs.readFileSync(mdPath, {
      encoding: "utf-8",
    });
    const mdData = grayMatter(res);
    const data = mdData.data;
    data.excerpt = getMarkdownExcerpt(mdData.content);
    data.updated = data.updated.replace("T", " ").replace("Z", " ");
    data.created = data.created.replace("T", " ").replace("Z", " ");
    data.avatar = `https://avatars.githubusercontent.com/u/26271337?v=4`;
    data.id = mdPath.substring(
      mdPath.lastIndexOf("/") + 1,
      mdPath.lastIndexOf(".")
    );

    postContentList[data.id] = {
      content: M.marked(mdData.content),
      ...data,
    };
    return data;
  });

  fs.writeFile(
    "public/data/list.json",
    JSON.stringify(postList, null, 4), {
      encoding: "utf-8",
    },
    (err) => {}
  );
  fs.writeFile(
    "public/data/content.json",
    JSON.stringify(postContentList, null, 4), {
      encoding: "utf-8",
    },
    (err) => {}
  );
}

function getAllIssues(owner, repo) {
  return octokit
    .request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
    })
    .then((res) => res.data);
}

function backupIssueToMarkdownFile(issue, folder = 'content') {
  const preffix = `---\ntitle: "${issue.title}"\ncreated: "${issue.created_at}\n"updated: "${issue.updated_at}"\n---\n`;
  const mdContent = preffix + issue.body;
  const path = `public/${folder}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  fs.writeFile(
    `${path}/${issue.number}.md`,
    mdContent, {
      encoding: "utf-8",
    },
    (err) => {
      console.log(err);
    }
  );
}

function transformIssueToPostData(issue) {
  return {
    title: issue.title,
    excerpt: getMarkdownExcerpt(issue.body),
    updated: issue.updated_at.replace("T", " ").replace("Z", " "),
    created: issue.created_at.replace("T", " ").replace("Z", " "),
    avatar: `https://avatars.githubusercontent.com/u/26271337?v=4`,
    id: issue.number,
    content: M.marked(issue.body),
  }
}


function generatePostDetail(issue, folderName) {
  const data = transformIssueToPostData(issue)
  const path = `public/data/${folderName}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  fs.writeFile(
    `${path}/${issue.number}.json`,
    JSON.stringify(data, null, 4), {
      encoding: "utf-8",
    },
    (err) => {
      console.log(err);
    }
  );
}

function generatePostList(list, folderName) {
  fs.writeFile(
    `public/data/${folderName}/list.json`,
    JSON.stringify(list, null, 4), {
      encoding: "utf-8",
    },
    (err) => {}
  );
}

async function tranformIssueToData(repoOwnder, repoName) {
  const issues = await getAllIssues(repoOwnder, repoName);
  let postList = []
  Object.values(issues).forEach((issue) => {
    // 备份markdown 文件
    backupIssueToMarkdownFile(issue, repoName.toLowerCase())
    // 转化为JSON
    // generatePostDetail(issue, repoName.toLowerCase())
    const data = transformIssueToPostData(issue)

    delete data.content
    postList.push(data)
  });
  generatePostList(postList, repoName.toLowerCase())
}

function main() {
  tranformIssueToData('vivipure', 'blog');
}

main();