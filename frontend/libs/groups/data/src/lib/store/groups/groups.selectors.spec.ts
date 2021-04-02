import * as groupSelectors from './groups.selectors';

describe('GroupSelectors', () => {
  it('should get correct entities', () => {
    const entity = { entity: 'entity', id: 99, name: 'some' };

    const state = {
      entities: {
        99: entity,
      },
    };

    const expected = [entity];

    expect(groupSelectors.selectAllEntities.projector(state)).toEqual(expected);
  });
});
