#!/env/node 

const fs = require('fs')
const marked = require("gray-matter")

// 生成流程

// issue更新后判断时 新增还是编辑
// 新增 在list新增一项数据
// 编辑  在list更新数据


function generatePostListByPosts() {
    // 遍历所有post
    // 生成数据
}



fs.readFile('./content/posts/1.md', {
    encoding: "utf-8",
    flag: 'a+'
},(err, data) => {
    if(err) return 
    const info = marked(data)
    console.log('data', info)


    // let list = data ? JSON.parse(data):[]
    // console.log(list)
})