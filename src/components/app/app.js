import React from 'react';
import appStyle from './app.module.css'
import AppHeader from '../header/header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'



class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        ingredients: []
    };
  }
  getData() {
      fetch('../utils/data.json')
        .then(response => response.json())
        .then(data => {         
          this.setState({ ingredients: data })
          })
        .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    return (
      <>
        <AppHeader />
        <main>
          <div className={appStyle.container}>
            <BurgerIngredients ingredients={this.state.ingredients} />
            <BurgerConstructor ingredients={this.state.ingredients} />
          </div>
        </main>
      </>

    );
  }
}
export default App;