const dummy = (blog) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes

  const likes = blogs.map(blog => blog.likes)
  const totalLikes = likes.reduce((sum, curr) => sum + curr, 0)

  return totalLikes
}


module.exports = {
  dummy,
  totalLikes
}
