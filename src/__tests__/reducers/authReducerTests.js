import AuthReducer from '../../reducers/userReducer';

describe('Auth reducers dont change state on', () => {
  it('maintains state on undefined action', () => {
    expect(AuthReducer(undefined, { type: 'non auth action type' })).toEqual(
      {}
    );
  });
});

describe('Auth login returns actual user', () => {
  it('returns user and apikey', () => {
    const user = { first_name: 'user', apikey: '1234' };
    expect(AuthReducer({}, { type: 'user-logged-in', user })).toEqual(user);
  });
});

describe('Auth logout removes user from state', () => {
  const user = { first_name: 'user', apikey: '1234' };
  it('returns user and apikey', () => {
    expect(AuthReducer(user, { type: 'user-logged-out' })).toEqual({});
  });
});
