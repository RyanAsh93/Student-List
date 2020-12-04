import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import './student.css';

const calculateAvgGrade = (grades) => {
    if(grades.length === 0) return "n/a";
    const avg = grades.reduce((sumScores, grade) => parseFloat(grade) + sumScores, 0) / grades.length;
    return `${avg.toFixed(2)}%`;
}

class Student extends Component {
    static propTypes = {
        pic: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        skill: PropTypes.string.isRequired,
        grades: PropTypes.arrayOf(PropTypes.string).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        onAddTag: PropTypes.func.isRequired,
    }

    state = {
        showDetails: false,
        tag: ''
    }

    handleToggleDetails = () => this.setState(state => ({showDetails: !state.showDetails}));

    handleNewTag = (event) => this.setState({tag: event.target.value})

    handleAddTag = () => {
        const {tag} = this.state;
        this.props.onAddTag(tag);
        this.setState({
            tag: ''
        })
    }
        
    render() {
        const {
            pic,
            firstName,
            lastName,
            email,
            company,
            skill,
            grades,
            tags,
        } = this.props;
        const {
            showDetails,
            tag,
        } = this.state;

        return (
        <div className="student">
            <div>
                <img className="studentPic" src={pic} />
            </div>
            <div className="studentInfo">
                <h1 className="studentName">{firstName} {lastName}</h1>
                <div className="studentDetails">
                    <p>Email: {email}</p>
                    <p>Company: {company}</p>
                    <p>Skill: {skill}</p>
                    <p>Average: {calculateAvgGrade(grades)}</p>
                    <p>{tags.map(tag => <span className="studentTag">{tag}</span>)}</p>
                    <TextField 
                      label="Add a tag"
                      value={tag}
                      onChange={this.handleNewTag}
                      onBlur={this.handleAddTag}
                    />
                    {
                        showDetails && grades.map((grade,index) => (
                            <p>{`Test ${index + 1}: ${grade}%`}</p>
                        ))
                    }
                </div>
            </div>
            <button type="button" className="studentExpandIcon"
                onClick={this.handleToggleDetails}>
                {showDetails ? '-' : '+'}
            </button>
        </div> 
        )
    }
}
export default Student;
