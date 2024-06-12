
export function ProjectsIndex(props) {

  if (props.data.length > 0) {
    return (
      <div>
        <h2>All Projects</h2>
        <div className='projectsIndex'>
          {
            props.data.map(row => {

              return (
                <div className='projectsRow' key={row.id}>
                  
                  
                  <img src= "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                  <h2>{row.title}</h2>
                  <h3>{row.description}</h3>
                </div>
              )
            })
          
          }
        </div>
      </div>
    )
  }

  else {
    return (
      <div>
        <h2>Nothing to see here...</h2>
      </div>
    )
  }
}