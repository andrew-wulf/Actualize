import { useState, useEffect } from 'react'
import axios from 'axios'
import { ProjectsIndex } from './ProjectsIndex'

export function Content() {


  const [projects, setProjects] = useState({})

  const projectsIndex = () => {
    axios.get('http://localhost:3000/projects.json')
    .then(response => {
      console.log(response);
      setProjects(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(projectsIndex, [])




  return (
    <div className="content">
      <ProjectsIndex data={projects}/>
    </div>

  )
}