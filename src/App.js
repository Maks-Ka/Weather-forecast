import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import Info from './components/Info';
import React from 'react';

const API_KEY = '19f54e42d0b7095eb9f53f8438ba09cb'

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    pressure: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value

    if (city === true) {
      const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await api_url.json();
      if (data.cod === '404') {
        this.setState({
          error: 'Введите правильно название на английском'
        })
        return;
      }

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunset_date = date.getHours() + ':' + date.getMinutes() + '+' + date.getSeconds();
      
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        error: undefined
      })
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        pressure: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: 'Введите название города'
      })

    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-5 info'>
                <Info />
              </div>
              <div className='col-sm-7 form'>
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
