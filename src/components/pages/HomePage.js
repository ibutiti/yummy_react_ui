import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import LoginPage from '../modals/LoginPage';
import SignUpPage from '../modals/SignUpPage';

const HomePage = () => (
  <div className="home-page">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ marginTop: 200, maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Welcome to Yummy Recipes!
        </Header>
        <Segment stacked>
          <LoginPage />
        </Segment>
        <Segment stacked>
          <SignUpPage />
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
);

export default HomePage;
