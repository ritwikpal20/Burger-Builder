# Burger Builder

<p align="center"><img src="src/assets/images/burger-logo.png"></p>

    Create dynamic burger and add them to your order list.

View the website at:
[BurgerBuilder](https://burger-builder-e56e6.web.app)

## Built With :

-   `React & Redux` as frontend
-   `Firebase` as backend

## Some Insights :

For viewing and placing orders , the user is required to sign up. A token is saved on browser local storage , which is then send with each request to API endpoint that is protected.

The website is hosted on Firebase , which also provide as backend infrastructure (act as a API server) to which we can send request from our React app. It always returns us the index.html and javascript files. Any url we make request is parsed by React and it then renders different component.

Some routes are loaded via **lazy loading** , to decrease load time upfront when user visits the site , since they may not visit all the routes.
