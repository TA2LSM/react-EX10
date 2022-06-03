import React, { Component } from 'react';

import Input from './common/input';
import withParams from './productDetails';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    // boş string ya da server'dan çekilen değer ile init edilmeli. null ya da
    // tanımsız ( account: {  password: '' }, gibi ) OLAMAZ. Hata alırız...
  };

  // gerçek DOM'da bir şeye erişmek için kullanılır. Mümkün olduğu kadar kullanmamaya
  // ya da en az sayıda kullanmaya çalışılır.
  //username = React.createRef();

  // Lifecycle Hook
  //   componentDidMount() {
  //     // sayfa yüklenince bu komponent'e gidilip yazı kısmı aktif olacak
  //     // bunu aşağıda autoFocus ile yaptık. Her zaman bu yöntemi kullanmamalıyız.
  //     // Gerçekten gerekli ise kullanmalıyız.
  //     this.username.current.focus();
  //   }

  // submit durumunda tüm sayfa tekrar yüklenmesin diye e(event) normal davranışında
  // kullanılmayacak (preventDefault)
  handleSubmit = e => {
    e.preventDefault();
    // Call the server, save the changes, redirect user to different page

    // const username = document.getElementById("username").value; << javascript'te böyle
    // const username = this.username.current.value; // DOM'a erişip dom elementinin değerini alabiliriz.
    // console.log(username);

    //console.log(this.state.account);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account }; // kopya oluştur

    // account.username (account["username"]) ve account.password'e erişip
    // e.currentTarget.value'dan gelen değeri kaydeder. (e.currentTarget >> input olarak içeri alındı)
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Please Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            name='password'
            value={account.password}
            onChange={this.handleChange}
          />
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label
              className='form-check-label'
              htmlFor='exampleCheck1'
            >
              Keep me logged in
            </label>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

{
  /* <div className='mb-3'>
    <label
        htmlFor='username'
        className='form-label'
    >
        Username
    </label>
    <input
        // autoFocus
        // ref={this.username}
        value={account.username}
        name='username'
        // input field artık kendi state'i yerine bu class'ın state'ine bağlandı
        // controlled element oldu. Mutlaka value değeri buraya yazılmalı !!!
        onChange={this.handleChange}
        type='text'
        className='form-control'
        id='username'
        aria-describedby='usernameHelp'
    />
    <div
        id='usernameHelp'
        className='form-text'
    >
        Enter your username
    </div>
    </div>
    <div className='mb-3'>
    <label
        htmlFor='password'
        className='form-label'
    >
        Password
    </label>
    <input
        value={account.password}
        name='password'
        onChange={this.handleChange}
        type='password'
        className='form-control'
        id='password'
        aria-describedby='passwordHelp'
    />
    <div
        id='passwordHelp'
        className='form-text'
    >
        Enter your password
    </div>
    </div> */
}
