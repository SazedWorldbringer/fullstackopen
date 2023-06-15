const dummy = (blog) => {
  return 1
}

const totalLikes = (blogs) => {
  // return 0 if the no blogs are passed
  if (blogs.length === 0) return 0
  // if one blog is passed, return it's likes
  if (blogs.length === 1) return blogs[0].likes

  // calculate total likes and return for a normal blog list
  const likes = blogs.map(blog => blog.likes)
  const totalLikes = likes.reduce((sum, curr) => sum + curr, 0)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  // return null if no blogs are passed
  if(blogs.length === 0) return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
