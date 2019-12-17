const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) =>{
    const reducer = (sum, item) => {
        return sum + item.likes
      }
    return blogs.length === 0
      ? 0 
      : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs)=>{
    let max = 0
    for(let i = 0;i < blogs.length;i++){
        if(blogs[i].likes>max){
            max = blogs[i].likes
        }
    }
    return blogs.find(blog => blog.likes === max)
}

const mostBlogs = (blogs)=>{
    let authors=[]
    for(let i = 0;i < blogs.length;i++){
        if(authors.filter(name => name.author === blogs[i].author).length >0){
            authors.filter(name => name.author === blogs[i].author)[0].blogs =
            authors.filter(name => name.author === blogs[i].author)[0].blogs+1 
        }
        else{
            authors = authors.concat({author:blogs[i].author,
            blogs: 1})
        }
    }
    console.log(authors)
    let max = 0
    for(let i = 0;i < authors.length;i++){
        if(authors[i].blogs>max){
            max = authors[i].blogs
        }
    }
    return authors.find(blog => blog.blogs === max)
}


const mostLikes = (blogs)=>{
    let authors=[]
    for(let i = 0;i < blogs.length;i++){
        if(authors.filter(name => name.author === blogs[i].author).length >0){
            authors.filter(name => name.author === blogs[i].author)[0].likes =
            authors.filter(name => name.author === blogs[i].author)[0].likes+
            blogs[i].likes
        }
        else{
            authors = authors.concat({author:blogs[i].author,
            likes: blogs[i].likes})
        }
    }
    console.log(authors)
    let max = 0
    for(let i = 0;i < authors.length;i++){
        if(authors[i].likes>max){
            max = authors[i].likes
        }
    }
    return authors.find(blog => blog.likes === max)
}

module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}
