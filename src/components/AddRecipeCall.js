import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import NewRecipeModal from './modals/NewRecipeModal';

const AddRecipeCall = () => (
  <Grid.Column width={8}>
    <Card color="violet">
      <Card.Content textAlign="center">
        <NewRecipeModal />
      </Card.Content>
    </Card>
  </Grid.Column>
);

export default AddRecipeCall;
