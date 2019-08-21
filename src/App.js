import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import View from './View';
import Project from './Project';
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';

var urlPrefix = 'http://10.2.24.38:4000/api'

class  App extends Component {
  constructor(props){
    super(props)

    this.state = {

      activeView: 'projects',
      projects:[
        {
          id:1,
          name:'Build a hut',
          description:'Nice projects'
        },
        {
          id:2,
          name:'Make a pizza',
          description:'Nice pizza'
        }
      ],

      projectToUpdate: null

    };
  }

  setActiveView = (view) => {
    this.setState({activeView:view});
  }

  setProjectToUpdate = (id) => {
    var foundProject = this.state.projects.find((project) => {
      return project.id === id;
    })
    this.setState({projectToUpdate:foundProject});

  }


  getProjects = () => {
    axios.get(urlPrefix + '/projects')
    .then(res => {
      this.setState({projects: res.data});
    })
  }

  addProjects = (data) => {
    axios.post(urlPrefix + '/projects', data)
    .then(res => {
      this.getProjects()
    })
  }

  deleteProjects = (id) => {
    axios.delete(urlPrefix + '/projects/'+id)
    .then(res => {
      console.log(res);
      this.getProjects();
    })
  }

  updateProjects = (id,data) => {
    axios.put(urlPrefix + '/projects/'+id,data)
    .then(res => {
      this.getProjects();
    })
  }

  componentDidMount(){
    this.getProjects();
  }



  render(){


    return (
      <div className="app">
    
        <View viewName="projects" activeView={this.state.activeView} className="color1">
            <div className="header">
            <i onClick = {() => this.setActiveView('add-project')} className="fas fa-plus"></i>
            <i onClick = {() => this.setActiveView('nav')} className="fas fa-bars"></i>
            </div>

            <div className="main">
              <h3>Projects</h3>

              {this.state.projects.map((project) => {

                var projectProps = {
                  ...project,
                  key: project.id,
                  deleteProjects: this.deleteProjects,
                  setActiveView: this.setActiveView,
                  setProjectToUpdate: this.setProjectToUpdate
                };

                return (<Project {...projectProps} />)
              })}


            </div>
        </View>

        <View viewName="add-project" activeView={this.state.activeView} className="color2">
            <div className="header"><i onClick = {() => this.setActiveView('projects')} className="fas fa-times"></i></div>
            <div className="main">
             <h3> Add a project </h3>
             <AddProjectForm addProjects={this.addProjects} setActiveView={this.setActiveView}/>


            </div>
        </View>

        <View viewName="edit-project" activeView={this.state.activeView} className="color3">
            <div className="header"><i onClick = {() => this.setActiveView('projects')} className="fas fa-times"></i></div>
            <div className="main">
             <h3> Edit a project </h3>
             <EditProjectForm {...this.state.projectToUpdate} updateProjects={this.updateProjects} setActiveView={this.setActiveView}/>
             {/*<AddProjectForm addProjects={this.addProjects} setActiveView={this.setActiveView}/>*/}


            </div>
        </View>

        <View viewName="nav" activeView={this.state.activeView} className="color5">
            <div className="header"><i onClick = {() => this.setActiveView('projects')} className="fas fa-times"></i></div>
            <div className="main">

              <ul className="menu">
                <li onClick = {() => this.setActiveView('projects')}>
                  <a className="color1" href="#">Projects</a>
                </li>
                <li onClick = {() => this.setActiveView('add-project')}>
                  <a className="color2" href="#">Add a project</a>
                </li>
              </ul>

            </div>
        </View>






      </div>
    );
  }  
}

export default App;
