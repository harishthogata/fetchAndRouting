import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogsItemData()
  }

  getBlogsItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()

    const updateData = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      author: data.author,
      content: data.content,
    }
    this.setState({blogData: updateData, isLoading: false})
  }

  blogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, avatarUrl, content, author} = blogData

    return (
      <div className="blog-info">
        <h2 className="blog-item-title">{title}</h2>
        <div className="author-info">
          <img className="avatar-img" alt={author} src={avatarUrl} />
          <p className="author-name">{author}</p>
        </div>
        <img className="img-url" alt={title} src={imageUrl} />
        <p className="content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blogs-item-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.blogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
