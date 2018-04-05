import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import NewCategoryPage from './modals/NewCategoryPage';

const AddCategoryCall = () => (
  <Grid.Column width={8}>
    <Card color="violet">
      <Card.Content textAlign="center">
        <NewCategoryPage />
      </Card.Content>
    </Card>
  </Grid.Column>
);

export default AddCategoryCall;
