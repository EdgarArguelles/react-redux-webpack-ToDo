import './TodoApp.scss';
import React from 'react';
import Header from './components/header/Header.container';
import MainSection from './components/main_section/MainSection.container';
import Footer from './components/footer/Footer.container';

export default class TodoApp extends React.Component {
  render() {
    return (
      <div id="todo-app">
        <Header />
        <MainSection />
        <Footer />
      </div>
    );
  }
}