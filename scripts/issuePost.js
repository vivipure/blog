#!/env/node

const fs = require("fs");
const grayMatter = require("gray-matter");
const M = require("marked");
const fg = require("fast-glob");

const removeMd = require("remove-markdown");

function generatePostListByPosts() {
  // 遍历所有post
  // 生成数据
}

function getMarkdownExcerpt(markdownText, maxLength = 120) {
  let text = removeMd(markdownText);
  text = text.trim().replace(/\s+/g, " ");

  const excerpt = text.substring(0, maxLength);
  if(text.length > maxLength) {
    return excerpt + '...'
  }
  return excerpt
}

function main() {
  const mdList = fg.sync("public/content/*.md", {});
  const postContentList = {};
  const postList = mdList.map((mdPath) => {
    const res = fs.readFileSync(mdPath, {
      encoding: "utf-8",
    });
    const mdData = grayMatter(res);
    const data = mdData.data;
    data.excerpt = getMarkdownExcerpt(mdData.content)
    data.updated = data.updated.replace("T", " ").replace("Z", " ");
    data.created = data.created.replace("T", " ").replace("Z", " ");
    data.avatar = `https://avatars.githubusercontent.com/u/26271337?v=4`;
    data.id = mdPath.substring(
      mdPath.lastIndexOf("/") + 1,
      mdPath.lastIndexOf(".")
    );

    postContentList[data.id] = M.marked(mdData.content);
    return data;
  });

  fs.writeFile(
    "public/data/list.json",
    JSON.stringify(postList, null, 4),
    {
      encoding: "utf-8",
    },
    (err) => {}
  );
  fs.writeFile(
    "public/data/content.json",
    JSON.stringify(postContentList, null, 4),
    {
      encoding: "utf-8",
    },
    (err) => {}
  );
}

main();
