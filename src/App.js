import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AddBookmark from './AddBookmark/AddBookmark'
import BookmarkList from './BookmarkList/BookmarkList'
import EditBookmark from './EditBookmark/EditBookmark'
import Nav from './Nav/Nav'
import config from './config'
import './App.css'

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
]

class App extends Component {
  state = {
    page: 'list',
    bookmarks,
    error: null,
    currentEdit: null,
  }

  changePage = page => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })
  }

  editBookmark = (id, data) => {
    const filteredBookmarks = this.state.bookmarks.filter(b => b.id !== id)
    const bookmarkToUpdate = this.state.bookmarks.find(b => b.id === id)
    const updatedBookmark = { ...bookmarkToUpdate, ...data }

    this.setState({
      bookmarks: [...filteredBookmarks, updatedBookmark],
      page: 'list',
    })
  }

  handleEditClick = id => {
    this.setState({
      currentEdit: id,
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks } = this.state
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <Nav />
        <Route
          exact path="/"
          render={routerProps => (
            <BookmarkList
              {...routerProps}
              bookmarks={bookmarks}
              handleEditClicked={this.handleEditClick}
            />
          )}
        />
        <div className="content" aria-live="polite">
          <Route path='/add-bookmark' render={(routerProps) => (
            <AddBookmark
            {...routerProps}
            onAddBookmark={this.addBookmark}
          />
          )} />
          <Route path='/edit-bookmark' render={(routerProps) => (
            <EditBookmark
            {...routerProps}
            onEditBookmark={this.editBookmark}
            currentEdit={this.state.currentEdit}
          />
          )}/>
        </div>
      </main>
    )
  }
}

export default App
