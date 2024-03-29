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
  if (blogs.length === 0) return null
  // return same blog obj if one blog is passed
  if (blogs.length === 1) {
    const blog = blogs[0]

    const favoriteBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }

    return favoriteBlog
  }

  // find most liked blog and return its info
  const favoriteBlog = blogs.reduce((prev, curr) => {
    return (curr.likes > prev.likes) ? curr : prev
  })

  const result = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
