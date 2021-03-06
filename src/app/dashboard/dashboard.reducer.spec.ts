import { dashBoardReducer, initialState } from './dashboard.reducer';

describe('Dashboard Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = dashBoardReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
