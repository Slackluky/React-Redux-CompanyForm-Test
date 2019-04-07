import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OfficeList from './components/OfficeList'
import AllComponent from './components';


const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AllComponent}/>
      <Route path='/officelist/:targetId' component={OfficeList} //mengambil id dengan :targetId
      />
    </Switch>
  </main>
)

export default Routes