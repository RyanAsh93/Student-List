import React from 'react';
import './displayPage.css';
import {findIndex, uniq} from 'lodash';
import {TextField} from '@material-ui/core';
import Student from './Student';

class displayPage extends React.Component {

  state = {
    loading: true,
    students: [],
    tags: {},
    search: '',
    tagSearch: '',
  };

  componentDidMount() {
      fetch("https://api.hatchways.io/assessment/students")
        .then(response => response.json())
        .then(response => {
          this.setState({
            students: response.students,
            loading: false
          })
        })
      .catch(error => this.setState({ error, loading: false}))
  }

  filterStudents = () => {
    const {
      search,
      tagSearch,
      students,
      tags,
    } = this.state;

    const matchName = (student) =>  (
      student.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ||
      student.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )

    const matchTag = (student) => (
      tags[student.id] && tags[student.id].filter(tag => tag.toLowerCase().indexOf(tagSearch) !== -1).length > 0
    )

    return students.filter(student => {
      if(search.length > 0 && tagSearch.length > 0){
        return (matchName(student) && matchTag(student));
      }
      if(search.length > 0){
        return matchName(student);
      }
      if(tagSearch.length > 0){
        return matchTag(student);
      }
      return true;
    })
  }

  handleOnSearchChange = (event) => this.setState({search: event.target.value})

  handleOnTagSearchChange = (event) => this.setState({tagSearch: event.target.value})

  handleAddTag = (id) => (tag) => this.setState(state => {
      const {tags} = state;
      const newTags = {...tags};

      if(newTags[id]){
        newTags[id] = uniq(newTags[id].concat(tag.toLowerCase()));
      }else{
        newTags[id] = [tag.toLowerCase()]
      }
      return ({
        tags: newTags
      })
  })

  render() {
    const {loading, students, filterStudent, tags, search, tagSearch} = this.state;
    if (loading) return <div>loading...</div>;
      console.log(tags)

    return (
      <div className="container">
        <TextField
          label="Search By Name"
          value={search}
          fullWidth 
          onChange={this.handleOnSearchChange}
          />
        <TextField 
          label="Search By Tag"
          value={tagSearch}
          fullWidth
          onChange={this.handleOnTagSearchChange}
        />
        {this.filterStudents().map(student =>  (
          <Student
            key={student.id}
            {...student}
            tags={tags[student.id]  || []}
            onAddTag={this.handleAddTag(student.id)}
            />
        ))}
      </div>
    );
  }
}

export default displayPage
